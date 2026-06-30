import CurrentWeatherCard from "@/components/weather/current-weather-card/CurrentWeatherCard";
import { useWeather } from "@/hooks/useWeather";
import weatherService from "@/service/weatherService";
import type { CurrentWeather, WeatherResponse } from "@/types/weather";
import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { HiOutlineRefresh } from "react-icons/hi";

// Set default city as Cape Town
// Enhancement: Ability to select/detect location
const DEFAULT_CITY = "Cape Town";

const Overview = () => {
  const { weather, isLoading, hasError, refreshWeather } =
    useWeather(DEFAULT_CITY);

  React.useEffect(() => {
    refreshWeather(DEFAULT_CITY);
  }, []);

  return (
    <Box margin={8}>
      <section id="weather_today">
        <CurrentWeatherCard
          currentWeather={weather?.current}
          isLoading={isLoading}
          hasError={hasError}
        />
        <Button
          id="button_refresh"
          colorPalette="teal"
          onClick={() => refreshWeather(DEFAULT_CITY)}
          aria-label="button_refresh">
          <HiOutlineRefresh />
          Refresh
        </Button>
      </section>
    </Box>
  );
};

export default Overview;
