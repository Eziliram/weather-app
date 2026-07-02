import { useState } from "react";
import WeatherDetailCard from "@/components/weather/current-weather-card/WeatherDetailCard";
import WeatherGrid from "@/components/weather/weather-grid/WeatherGrid";
import { useWeather } from "@/hooks/useWeather";
import { Heading, Text, Switch, Em, Box, Button } from "@chakra-ui/react";
import type { Weather } from "@/types/weather";

// Set default city as Cape Town
// Enhancement: Ability to search for/detect a location
const DEFAULT_CITY = "Cape Town";

const Overview = () => {
  const { weather, isLoading, hasError, forceRefresh } =
    useWeather(DEFAULT_CITY);
  const [selectedWeather, setSelectedWeather] = useState<Weather | undefined>(
    undefined,
  );
  const [showWeatherInsightsPreview, setWeatherInsightsPreview] =
    useState(false);

  const forecastData = showWeatherInsightsPreview ? weather?.forecast : [];
  const historyData = showWeatherInsightsPreview ? weather?.history : [];

  const handleForceRefresh = () => {
    // Enhancement: throttle function to only allow a specified number of refreshes in a certain timeframe
    forceRefresh(DEFAULT_CITY, true);
  };

  return (
    <>
      <section id="weather_details">
        <WeatherDetailCard
          weather={selectedWeather ?? weather?.current}
          isLoading={isLoading}
          hasError={hasError}
          onForceRefresh={handleForceRefresh}
        />
      </section>

      <section id="weather_insights">
        <Heading fontSize="3xl">Weather insights</Heading>
        <Box display="flex" alignItems="center" gap={3} mt={4} mb={4}>
          <Switch.Root
            checked={showWeatherInsightsPreview}
            onCheckedChange={() =>
              setWeatherInsightsPreview(
                (showWeatherInsightsPreview) => !showWeatherInsightsPreview,
              )
            }>
            <Switch.HiddenInput />
            <Switch.Control />
            <Switch.Label fontSize="md">Show preview*</Switch.Label>
          </Switch.Root>
        </Box>

        <Text fontSize="sm">
          <Em>
            *Toggle this switch to display mocked forecast and history data in
            the weather grid.
          </Em>
        </Text>

        {showWeatherInsightsPreview && (
          <Box marginTop={4}>
            <Button
              variant="outline"
              colorPalette="teal"
              disabled={
                !selectedWeather || selectedWeather === weather?.current
              }
              onClick={() => setSelectedWeather(weather?.current)}>
              Show today's weather
            </Button>
          </Box>
        )}
      </section>

      <section id="weather_grid">
        <WeatherGrid
          id="weather_forecast"
          title="3-day forecast"
          data={forecastData}
          selectedWeather={selectedWeather}
          onSelectWeather={setSelectedWeather}
        />
        <WeatherGrid
          id="weather_history"
          title="3-day history"
          data={historyData}
          selectedWeather={selectedWeather}
          onSelectWeather={setSelectedWeather}
        />
      </section>
    </>
  );
};

export default Overview;
