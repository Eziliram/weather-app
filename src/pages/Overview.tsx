import CurrentWeatherCard from "@/components/weather/current-weather-card/CurrentWeatherCard";
import weatherService from "@/service/weatherService";
import type { CurrentWeather, WeatherResponse } from "@/types/weather";
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { HiOutlineRefresh } from "react-icons/hi";

const mockWeatherData = {
  request: {
    type: "City",
    query: "New York, United States of America",
    language: "en",
    unit: "m",
  },
  location: {
    name: "New York",
    country: "United States of America",
    region: "New York",
    lat: "40.714",
    lon: "-74.006",
    timezone_id: "America/New_York",
    localtime: "2026-06-28 05:50",
    localtime_epoch: 1782625800,
    utc_offset: "-4.0",
  },
  current: {
    observation_time: "09:50 AM",
    temperature: 21,
    weather_code: 143,
    weather_icons: [
      "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0006_mist.png",
    ],
    weather_descriptions: ["Mist"],
    astro: {
      sunrise: "05:28 AM",
      sunset: "08:31 PM",
      moonrise: "08:01 PM",
      moonset: "03:49 AM",
      moon_phase: "Waxing Gibbous",
      moon_illumination: 96,
    },
    air_quality: {
      co: "199",
      no2: "59.2",
      o3: "16",
      so2: "3",
      pm2_5: "39.5",
      pm10: "39.7",
      "us-epa-index": "2",
      "gb-defra-index": "2",
    },
    wind_speed: 6,
    wind_degree: 287,
    wind_dir: "WNW",
    pressure: 1016,
    precip: 0,
    humidity: 96,
    cloudcover: 100,
    feelslike: 21,
    uv_index: 0,
    visibility: 5,
    is_day: "yes",
  },
};

const mock = {
  data: mockWeatherData,
  timestamp: Date.now(),
};

const DEFAULT_CITY = "Cape Town";

const Overview = () => {
  const [currentWeather, setCurrentWeather] = React.useState<CurrentWeather>();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(false);

  const fetchCurrentWeather = async (city: string) => {
    try {
      setIsLoading(true);
      // const currentWeatherData = await weatherService.getCurrent(city);
      // setCurrentWeather({
      //   data: currentWeatherData,
      //   timestamp: Date.now(),
      // } as CurrentWeather);
      setCurrentWeather(mock as CurrentWeather);
    } catch (error) {
      console.error("Error fetching current weather:", error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    // TODO: On page load, check if theres cached weather data
  }, []);

  return (
    <Box margin={8}>
      <section id="weather_today">
        <CurrentWeatherCard
          currentWeather={currentWeather}
          isLoading={isLoading}
          hasError={hasError}
        />
        <Button
          id="button_refresh"
          colorPalette="teal"
          onClick={() => fetchCurrentWeather(DEFAULT_CITY)}
          aria-label="button_refresh">
          <HiOutlineRefresh />
          Refresh
        </Button>
      </section>
    </Box>
  );
};

export default Overview;
