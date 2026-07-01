// @vitest-environment jsdom

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Overview from "./Overview";
import { useWeather } from "@/hooks/useWeather";

vi.mock("@/hooks/useWeather", () => ({
  useWeather: vi.fn(),
}));

vi.mock("@/components/weather/current-weather-card/CurrentWeatherCard", () => ({
  default: ({ onForceRefresh }: { onForceRefresh: () => void }) => (
    <button onClick={onForceRefresh}>refresh weather</button>
  ),
}));

vi.mock("@/components/weather/weather-grid/WeatherGrid", () => ({
  default: ({ title, data }: { title: string; data?: unknown[] }) => (
    <div>
      <h2>{title}</h2>
      <span>{data?.length ? `items:${data.length}` : "empty"}</span>
    </div>
  ),
}));

const mockedUseWeather = vi.mocked(useWeather);

const renderOverview = () =>
  render(
    <ChakraProvider value={defaultSystem}>
      <Overview />
    </ChakraProvider>,
  );

describe("Overview", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    mockedUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      hasError: false,
      forceRefresh: vi.fn(),
    } as unknown as ReturnType<typeof useWeather>);
  });

  it("renders the weather overview sections and initial empty preview state", () => {
    renderOverview();

    expect(screen.getByText(/Weather insights/i)).toBeTruthy();
    expect(screen.getByText(/3-day forecast/i)).toBeTruthy();
    expect(screen.getByText(/3-day history/i)).toBeTruthy();
    expect(screen.getAllByText("empty")).toHaveLength(2);
  });

  it("shows mocked forecast and history data when the preview toggle is enabled", async () => {
    mockedUseWeather.mockReturnValue({
      weather: {
        current: undefined,
        forecast: [{ id: 1 }, { id: 2 }],
        history: [{ id: 3 }],
      },
      isLoading: false,
      hasError: false,
      forceRefresh: vi.fn(),
    } as unknown as ReturnType<typeof useWeather>);

    renderOverview();

    const toggle = screen.getByLabelText(/show preview/i);
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText("items:2")).toBeTruthy();
      expect(screen.getByText("items:1")).toBeTruthy();
    });
  });

  it("calls forceRefresh with the default city when the refresh button is triggered", () => {
    const forceRefresh = vi.fn();

    mockedUseWeather.mockReturnValue({
      weather: undefined,
      isLoading: false,
      hasError: false,
      forceRefresh,
    } as unknown as ReturnType<typeof useWeather>);

    renderOverview();

    fireEvent.click(screen.getByRole("button", { name: /refresh weather/i }));

    expect(forceRefresh).toHaveBeenCalledWith("Cape Town", true);
  });
});
