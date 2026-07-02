import { useState } from "react";
import WeatherDetailCard from "@/components/weather/weather-detail-card/WeatherDetailCard";
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

  // Keep all weather fetching/caching logic inside the hook so that
  // the page component only needs to manage UI state.
  const { weather, isLoading, hasError, forceRefresh } =
    useWeather(selectedCity);

  // If no weather is selected, show todays weather.
  // Selecting a forecast/history tile overrides the detail card.
  const [selectedWeather, setSelectedWeather] = useState<Weather | null>(null);

  // Weatherstacks free tier doesnt support forecast or historical data,
  // so this toggle displays mocked data to demonstrate the intended UX.
  const [showWeatherInsightsPreview, setWeatherInsightsPreview] =
    useState(false);

  const forecastData = showWeatherInsightsPreview ? weather?.forecast : [];
  const historyData = showWeatherInsightsPreview ? weather?.history : [];

  const handleForceRefresh = () => {
    // Future enhancement:
    // limit how often users can force a refresh to reduce API usage.
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
                // Reset any preview selections when switching locations so that
                // the UI always reflects the newly selected city.
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
          // Allow users to easily switch back to todays weather
          // after selecting a forecast/history preview.
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
