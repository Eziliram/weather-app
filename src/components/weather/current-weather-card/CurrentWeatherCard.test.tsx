// @vitest-environment jsdom

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CurrentWeatherCard from "./CurrentWeatherCard";
import type { Weather } from "@/types/weather";

const renderCard = (
  props: Partial<ComponentProps<typeof CurrentWeatherCard>> = {},
) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <CurrentWeatherCard
        currentWeather={undefined}
        isLoading={false}
        hasError={false}
        onForceRefresh={vi.fn()}
        {...props}
      />
    </ChakraProvider>,
  );

const createWeather = (): Weather => ({
  data: {
    request: {
      type: "City",
      query: "Cape Town",
      language: "en",
      unit: "m",
    },
    location: {
      name: "Cape Town",
      country: "South Africa",
      region: "Western Cape",
      lat: "-33.9258",
      lon: "18.4232",
      timezone_id: "Africa/Johannesburg",
      localtime: "2024-01-01 12:00",
      localtime_epoch: 1704115200,
      utc_offset: "+02:00",
    },
    current: {
      observation_time: "12:00 PM",
      temperature: 24,
      weather_code: 113,
      weather_icons: ["https://example.com/sun.png"],
      weather_descriptions: ["Sunny"],
      astro: {
        sunrise: "06:00",
        sunset: "18:00",
        moonrise: "05:00",
        moonset: "19:00",
        moon_phase: "Waxing Crescent",
        moon_illumination: 25,
      },
      air_quality: {
        co: "",
        no2: "",
        o3: "",
        so2: "",
        pm2_5: "",
        pm10: "",
        "us-epa-index": "",
        "gb-defra-index": "",
      },
      wind_speed: 15,
      wind_degree: 180,
      wind_dir: "N",
      pressure: 1012,
      precip: 0,
      humidity: 55,
      cloudcover: 20,
      feelslike: 25,
      uv_index: 5,
      visibility: 10,
      is_day: "yes",
    },
  },
  timestamp: new Date("2024-01-01T12:00:00Z"),
});

afterEach(() => {
  cleanup();
});

describe("CurrentWeatherCard", () => {
  it("renders an error message when loading fails", () => {
    renderCard({ hasError: true });

    expect(screen.getByText(/Oops! We ran into an error/i)).toBeTruthy();
    expect(screen.getByText(/Click on the Refresh button/i)).toBeTruthy();
  });

  it("renders a no-data message when no weather payload is available", () => {
    renderCard();

    expect(screen.getByText(/No weather data available/i)).toBeTruthy();
  });

  it("renders current weather details and triggers a refresh", () => {
    const onForceRefresh = vi.fn();

    renderCard({ currentWeather: createWeather(), onForceRefresh });

    expect(
      screen.getByText(/Cape Town, Western Cape, South Africa/i),
    ).toBeTruthy();
    expect(screen.getByRole("img", { name: /Sunny/i })).toBeTruthy();
    expect(screen.getByText(/24°C/i)).toBeTruthy();
    expect(screen.getByText(/Humidity/i)).toBeTruthy();
    expect(screen.getByText(/Wind/i)).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: /button_refresh/i }));

    expect(onForceRefresh).toHaveBeenCalledTimes(1);
  });

  it("disables the refresh button while loading", () => {
    renderCard({ currentWeather: createWeather(), isLoading: true });

    const refreshButton = screen.getByRole("button", {
      name: /button_refresh/i,
    });

    expect(refreshButton).toHaveProperty("disabled", true);
  });
});
