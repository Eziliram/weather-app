// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import weatherService from "./weatherService";
import weatherApi from "@/api/weatherApi";
import { weatherCache } from "@/cache/weatherCache";

vi.mock("@/api/weatherApi", () => ({
  default: {
    getCurrent: vi.fn(),
  },
}));

const mockedWeatherApi = vi.mocked(weatherApi.getCurrent);

describe("weatherService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("returns cached weather data when available and refresh is not forced", async () => {
    const cachedPayload = { temperature: 20 };
    weatherCache.set("current-Cape Town", cachedPayload);

    const result = await weatherService.getCurrent("Cape Town");

    expect(mockedWeatherApi).not.toHaveBeenCalled();
    expect(result.data).toEqual(cachedPayload);
    expect(result.lastUpdated).toBeInstanceOf(Date);
  });

  it("fetches fresh weather data from the API when no cache exists", async () => {
    const apiPayload = { temperature: 25 };
    mockedWeatherApi.mockResolvedValue(apiPayload as never);

    const result = await weatherService.getCurrent("Cape Town");

    expect(mockedWeatherApi).toHaveBeenCalledWith("Cape Town");
    expect(result.data).toEqual(apiPayload);
    expect(result.lastUpdated).toBeInstanceOf(Date);
    expect(weatherCache.get("current-Cape Town")?.data).toEqual(apiPayload);
  });

  it("forces a refresh and bypasses the cache", async () => {
    const cachedPayload = { temperature: 20 };
    weatherCache.set("current-Cape Town", cachedPayload);

    const freshPayload = { temperature: 30 };
    mockedWeatherApi.mockResolvedValue(freshPayload as never);

    const result = await weatherService.getCurrent("Cape Town", true);

    expect(mockedWeatherApi).toHaveBeenCalledWith("Cape Town");
    expect(result.data).toEqual(freshPayload);
    expect(weatherCache.get("current-Cape Town")?.data).toEqual(freshPayload);
  });
});
