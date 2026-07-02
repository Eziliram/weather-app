// @vitest-environment jsdom

import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import weatherService from "@/service/weatherService";
import { useWeather } from "./useWeather";

vi.mock("@/service/weatherService", () => ({
  default: {
    getCurrent: vi.fn(),
  },
}));

const mockedGetCurrent = vi.mocked(weatherService.getCurrent);

describe("useWeather", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("loads weather data on mount and exposes forecast and history data", async () => {
    const currentWeatherPayload = {
      data: {
        request: { unit: "m" },
        location: { name: "Cape Town" },
        current: {
          weather_icons: ["/sun.png"],
          weather_descriptions: ["Sunny"],
          temperature: 22,
        },
      },
      lastUpdated: new Date("2024-01-01T12:00:00Z"),
    };

    mockedGetCurrent.mockResolvedValue(currentWeatherPayload as never);

    const { result } = renderHook(() => useWeather("Cape Town"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockedGetCurrent).toHaveBeenCalledWith("Cape Town", false);
    expect(result.current.weather?.current?.data).toEqual(currentWeatherPayload.data);
    expect(result.current.weather?.forecast).toHaveLength(3);
    expect(result.current.weather?.history).toHaveLength(3);
  });

  it("forces a refresh when forceRefresh is called", async () => {
    const currentWeatherPayload = {
      data: { request: { unit: "m" } },
      lastUpdated: new Date("2024-01-02T12:00:00Z"),
    };

    mockedGetCurrent.mockResolvedValue(currentWeatherPayload as never);

    const { result } = renderHook(() => useWeather("Cape Town"));

    await act(async () => {
      await result.current.forceRefresh("Cape Town", true);
    });

    expect(mockedGetCurrent).toHaveBeenLastCalledWith("Cape Town", true);
    expect(result.current.weather?.current?.cachedAt).toEqual(
      currentWeatherPayload.lastUpdated,
    );
  });

  it("sets hasError when weather loading fails", async () => {
    mockedGetCurrent.mockRejectedValueOnce(new Error("network failed"));

    const { result } = renderHook(() => useWeather("Cape Town"));

    await waitFor(() => {
      expect(result.current.hasError).toBe(true);
    });

    expect(result.current.weather).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
  });
});
