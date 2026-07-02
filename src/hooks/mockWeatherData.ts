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
        feelslike: 24,
        weather_descriptions: ["Sunny"],
        wind_speed: 8,
        humidity: 35,
        uv_index: 9,
        visibility: 20,
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "05:42 AM",
          sunset: "07:31 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 12,
        feelslike: 9,
        weather_descriptions: ["Rain"],
        wind_speed: 22,
        humidity: 88,
        uv_index: 1,
        visibility: 5,
        precip: 12,
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "06:10 AM",
          sunset: "06:45 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: -3,
        feelslike: -10,
        weather_descriptions: ["Snow"],
        wind_speed: 35,
        humidity: 92,
        uv_index: 0,
        visibility: 2,
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "07:48 AM",
          sunset: "04:52 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
];

export const mockHistoryData: Weather[] = [
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 7,
        feelslike: 4,
        weather_descriptions: ["Fog"],
        wind_speed: 5,
        humidity: 95,
        uv_index: 0,
        visibility: 1,
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "06:32 AM",
          sunset: "06:20 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 11,
        feelslike: 7,
        weather_descriptions: ["Windy"],
        wind_speed: 48,
        humidity: 55,
        uv_index: 4,
        visibility: 18,
        wind_dir: "NW",
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "06:15 AM",
          sunset: "06:28 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
  {
    data: createWeatherResponse({
      current: {
        ...createWeatherResponse().current,
        temperature: 19,
        feelslike: 18,
        weather_descriptions: ["Clear"],
        wind_speed: 10,
        humidity: 42,
        uv_index: 6,
        visibility: 25,
        astro: {
          ...createWeatherResponse().current.astro,
          sunrise: "05:58 AM",
          sunset: "06:52 PM",
        },
      },
    }),
    cachedAt: new Date(),
  },
];