import CurrentWeatherCard from "@/components/weather/current-weather-card/CurrentWeatherCard";
import { useWeather } from "@/hooks/useWeather";
import { Box } from "@chakra-ui/react";

// Set default city as Cape Town
// Enhancement: Ability to search for/detect a location
const DEFAULT_CITY = "Cape Town";

const Overview = () => {
  const { weather, isLoading, hasError, forceRefresh } =
    useWeather(DEFAULT_CITY);

  const handleForceRefresh = () => {
    // Enhancement: throttle function to only allow a specified number of refreshes in a certain timeframe
    forceRefresh(DEFAULT_CITY, true);
  };

  return (
    <Box margin={8}>
      <section id="weather_today">
        <CurrentWeatherCard
          currentWeather={weather?.current}
          isLoading={isLoading}
          hasError={hasError}
          onForceRefresh={handleForceRefresh}
        />
      </section>
    </Box>
  );
};

export default Overview;
