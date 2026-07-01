// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { weatherCache } from "./weatherCache";

describe("weatherCache", () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("stores data in localStorage and returns it through get", () => {
    const payload = { temperature: 20 };

    weatherCache.set("current-Cape Town", payload);

    const cached = weatherCache.get("current-Cape Town");

    expect(cached?.data).toEqual(payload);
    expect(cached?.lastUpdated).toBeInstanceOf(Date);
  });

  it("returns null when no entry exists for the key", () => {
    expect(weatherCache.get("missing-key")).toBeNull();
  });

  it("removes expired entries and returns null", () => {
    const payload = { temperature: 20 };
    const expiredTimestamp = Date.now() - 24 * 60 * 60 * 1000 - 1;

    localStorage.setItem(
      "current-Cape Town",
      JSON.stringify({
        data: payload,
        timestamp: expiredTimestamp,
      }),
    );

    expect(weatherCache.get("current-Cape Town")).toBeNull();
    expect(localStorage.getItem("current-Cape Town")).toBeNull();
  });
});
