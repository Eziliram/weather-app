import { useState } from "react";
import WeatherDetailCard from "@/components/weather/current-weather-card/WeatherDetailCard";
import WeatherGrid from "@/components/weather/weather-grid/WeatherGrid";
import { useWeather } from "@/hooks/useWeather";
import {
  Heading,
  Text,
  Switch,
  Em,
  Box,
  Button,
  NativeSelect,
} from "@chakra-ui/react";
import { DEFAULT_CITY, WEATHER_LOCATIONS, type Weather } from "@/types/weather";

const Overview = () => {
  const [selectedCity, setSelectedCity] = useState(DEFAULT_CITY);
  const { weather, isLoading, hasError, forceRefresh } =
    useWeather(selectedCity);
  const [selectedWeather, setSelectedWeather] = useState<Weather | null>(null);
  const [showWeatherInsightsPreview, setWeatherInsightsPreview] =
    useState(false);

  const forecastData = showWeatherInsightsPreview ? weather?.forecast : [];
  const historyData = showWeatherInsightsPreview ? weather?.history : [];

  const handleForceRefresh = () => {
    // Enhancement: throttle function to only allow a specified number of refreshes in a certain timeframe
    forceRefresh(selectedCity, true);
  };

  return (
    <>
      <section id="weather_details">
        <Box marginTop={8} marginX={8}>
          <Text mb={2} fontWeight="medium">
            Select location
          </Text>

          <NativeSelect.Root disabled={isLoading}>
            <NativeSelect.Field
              value={selectedCity}
              aria-label="Select location"
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedWeather(null);
                setWeatherInsightsPreview(false);
              }}>
              {WEATHER_LOCATIONS.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Box>

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
            onCheckedChange={() => {
              const next = !showWeatherInsightsPreview;
              setWeatherInsightsPreview(next);
              if (!next) {
                setSelectedWeather(null);
              }
            }}>
            <Switch.HiddenInput aria-label="Show weather preview" />
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
              disabled={selectedWeather === null}
              onClick={() => setSelectedWeather(null)}>
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
