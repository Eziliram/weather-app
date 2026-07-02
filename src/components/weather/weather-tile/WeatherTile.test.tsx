// @vitest-environment jsdom

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import WeatherTile from "./WeatherTile";
import type { Weather } from "@/types/weather";

const renderTile = (data: Weather) =>
  render(
    <ChakraProvider value={defaultSystem}>
      <WeatherTile
        data={data}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        isSelected={false}
      />
    </ChakraProvider>,
  );

describe("WeatherTile", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the weather date, description, image, and temperature", () => {
    const data: Weather = {
      data: {
        request: { unit: "m" },
        current: {
          weather_descriptions: ["Sunny"],
          weather_icons: ["/sun.png"],
          temperature: 21,
        },
      },
      cachedAt: new Date("2024-01-01T12:00:00Z"),
    } as Weather;

    renderTile(data);

    expect(screen.getByText("Mon 01 Jan")).toBeTruthy();
    expect(screen.getByAltText("Sunny")).toBeTruthy();
    expect(screen.getByText("21°C")).toBeTruthy();
    expect(screen.getByText("Sunny")).toBeTruthy();
  });
});
