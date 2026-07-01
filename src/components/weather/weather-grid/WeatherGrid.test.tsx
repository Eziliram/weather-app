// @vitest-environment jsdom

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WeatherGrid from "./WeatherGrid";
import type { Weather } from "@/types/weather";

vi.mock("../weather-tile/WeatherTile", () => ({
  default: ({ data }: { data: Weather }) => (
    <div>{data.data.current.weather_descriptions[0]}</div>
  ),
}));

const renderGrid = (data?: Weather[]) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <WeatherGrid id="forecast" title="3-day forecast" data={data} />
    </ChakraProvider>,
  );

describe("WeatherGrid", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the empty state when no data is provided", () => {
    renderGrid();

    expect(screen.getByText("3-day forecast")).toBeTruthy();
    expect(screen.getByText("Feature not available.")).toBeTruthy();
  });

  it("renders weather tiles when data is provided", () => {
    const data = [
      {
        data: {
          request: { unit: "m" },
          current: {
            weather_descriptions: ["Sunny"],
            weather_icons: ["/sun.png"],
            temperature: 20,
          },
        },
      },
      {
        data: {
          request: { unit: "m" },
          current: {
            weather_descriptions: ["Cloudy"],
            weather_icons: ["/cloud.png"],
            temperature: 18,
          },
        },
      },
    ] as Weather[];

    renderGrid(data);

    expect(screen.getByText("Sunny")).toBeTruthy();
    expect(screen.getByText("Cloudy")).toBeTruthy();
  });
});
