import type { Weather, WeatherResponse } from "@/types/weather";

const createWeatherResponse = (
  overrides: Partial<WeatherResponse> = {},
): WeatherResponse => ({
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
    lat: "-33.9249",
    lon: "18.4241",
    timezone_id: "Africa/Johannesburg",
    localtime: "2024-01-15 10:30:00",
    localtime_epoch: 1705335000,
    utc_offset: "2.0",
  },
  current: {
    observation_time: "10:30 AM",
    temperature: 5,
    weather_code: 116,
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
    ],
    weather_descriptions: ["Cloudy"],
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
  ...overrides,
});

export const mockForecastData: Weather[] = [
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 21,
        feelslike: 22,
        weather_descriptions: ["Sunny"],
      },
    }),
    timestamp: new Date("2024-01-16"),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 12,
        feelslike: 10,
        weather_descriptions: ["Rain"],
      },
    }),
    timestamp: new Date("2024-01-17"),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: -3,
        feelslike: -8,
        weather_descriptions: ["Snow"],
      },
    }),
    timestamp: new Date("2024-01-18"),
  },
];

export const mockHistoryData: Weather[] = [
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 7,
        feelslike: 5,
        weather_descriptions: ["Fog"],
      },
    }),
    timestamp: new Date("2024-01-12"),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 11,
        feelslike: 9,
        weather_descriptions: ["Windy"],
      },
    }),
    timestamp: new Date("2024-01-13"),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 19,
        feelslike: 18,
        weather_descriptions: ["Clear"],
      },
    }),
    timestamp: new Date("2024-01-14"),
  },
];