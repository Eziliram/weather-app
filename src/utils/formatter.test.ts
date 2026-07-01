import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatDistance,
  formatSpeed,
  formatTemperature,
  formatTime,
} from "./formatter";

describe("formatter", () => {
  it("formats dates in long and short forms", () => {
    const value = new Date("2024-01-01T12:00:00Z");

    expect(formatDate(value, "long")).toBe("Monday 01 January");
    expect(formatDate(value, "short")).toBe("Mon 01 Jan");
  });

  it("formats times in 12-hour format", () => {
    const value = new Date("2024-01-01T13:05:00Z");

    expect(formatTime(value)).toBe("03:05 PM");
  });

  it("formats temperatures with metric and imperial units", () => {
    expect(formatTemperature(21, true)).toBe("21°C");
    expect(formatTemperature(70, false)).toBe("70°F");
  });

  it("formats speed with metric and imperial units", () => {
    expect(formatSpeed(15, true)).toBe("15 km/h");
    expect(formatSpeed(10, false)).toBe("10 mph");
  });

  it("formats distance with metric and imperial units", () => {
    expect(formatDistance(12, true)).toBe("12 km");
    expect(formatDistance(7, false)).toBe("7 miles");
  });
});
