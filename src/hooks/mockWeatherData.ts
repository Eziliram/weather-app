import type { Weather, WeatherResponse } from "@/types/weather";

// Test Data
const mockWeatherResponse: WeatherResponse = {
  request: {
    type: "City",
    query: "New York",
    language: "en",
    unit: "m",
  },
  location: {
    name: "New York",
    country: "United States of America",
    region: "New York",
    lat: "40.712776",
    lon: "-74.005974",
    timezone_id: "America/New_York",
    localtime: "2024-01-15 10:30:00",
    localtime_epoch: 1705335000,
    utc_offset: "-5.0",
  },
  current: {
    observation_time: "10:30 AM",
    temperature: 5,
    weather_code: 116,
    weather_icons: ["https://cdn.weatherapi.com/weather/128x128/day/116.png"],
    weather_descriptions: ["Partly cloudy"],
    astro: {
      sunrise: "07:20 AM",
      sunset: "05:00 PM",
      moonrise: "11:45 PM",
      moonset: "10:30 AM",
      moon_phase: "Waning Gibbous",
      moon_illumination: 62,
    },
    air_quality: {
      co: "250",
      no2: "45",
      o3: "80",
      so2: "15",
      pm2_5: "25",
      pm10: "50",
      "us-epa-index": "2",
      "gb-defra-index": "3",
    },
    wind_speed: 15,
    wind_degree: 230,
    wind_dir: "SW",
    pressure: 1013,
    precip: 0,
    humidity: 65,
    cloudcover: 40,
    feelslike: 2,
    uv_index: 2,
    visibility: 10,
    is_day: "yes",
  },
};

export const mockForecastData: Weather[] = [
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-16"),
  },
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-17"),
  },
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-18"),
  },
];

export const mockHistoryData: Weather[] = [
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-12"),
  },
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-13"),
  },
  {
    data: mockWeatherResponse,
    timestamp: new Date("2024-01-14"),
  },
];