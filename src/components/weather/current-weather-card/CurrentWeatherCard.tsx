import type { CurrentWeather } from "@/types/weather";
import { formatDate, formatTime } from "@/utils/formatter";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineRefresh } from "react-icons/hi";

type Props = {
  currentWeather?: CurrentWeather;
  isLoading: boolean;
  hasError: boolean;
  onForceRefresh: () => void;
};

const CurrentWeatherCard: React.FC<Props> = ({
  currentWeather,
  isLoading,
  hasError,
  onForceRefresh,
}) => {
  const locationLabel = currentWeather?.data.location
    ? `${currentWeather?.data.location.name}, ${currentWeather?.data.location.region}, ${currentWeather?.data.location.country}`
    : "Location unavailable";

  const weatherIconUrl = currentWeather?.data.current.weather_icons[0];
  const weatherDescription =
    currentWeather?.data.current.weather_descriptions[0];

  const isMetric = currentWeather?.data?.request?.unit === "m";

  const now = new Date();
  const formattedDate = formatDate(now);
  const formattedTime = formatTime(now);
  const formattedDateTime = `${formattedDate} · ${formattedTime}`;

  const formatTemperature = (value: number) =>
    `${value}${isMetric ? "°C" : "°F"}`;

  const formatSpeed = (value: number) =>
    `${value} ${isMetric ? "km/h" : "mph"}`;

  const formatDistance = (value: number) =>
    `${value} ${isMetric ? "km" : "miles"}`;

  const formatLastUpdated = () => {
    if (!currentWeather?.timestamp) {
      return "Unknown";
    }
    return `${formatDate(currentWeather?.timestamp)} · ${formatTime(currentWeather?.timestamp)}`;
  };

  const StatItem: React.FC<{ label: string; value: React.ReactNode }> = ({
    label,
    value,
  }) => (
    <Box
      display="flex"
      flexDirection="column"
      width={{ base: "45%", sm: "180px", md: "auto" }}
      minW="140px">
      <Text fontSize="md" fontWeight="semibold">
        {label}
      </Text>
      <Text fontSize="lg">{value}</Text>
    </Box>
  );

  // TODO: Add skeleton loaders
  // if (isLoading) {
  //   return (
  //     <Box>
  //       <Heading fontSize="xl">Loading weather data...</Heading>
  //     </Box>
  //   );
  // }

  if (hasError) {
    return (
      <Box>
        <Heading fontSize="xl">Oops! We ran into an error :(</Heading>
        <Text>
          Click on the Refresh button to get the latest weather data, or try
          again later.
        </Text>
      </Box>
    );
  }

  if (!currentWeather?.data) {
    return (
      <Box>
        <Heading fontSize="xl">No weather data available.</Heading>
        <Text>Click on the Refresh button to get the latest weather data.</Text>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="flex-start" alignItems="flex-start">
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Heading fontSize="md" display="flex" gap={2}>
          <HiOutlineLocationMarker />
          {locationLabel}
        </Heading>

        <Text>{formattedDateTime}</Text>

        <Box display="flex" alignItems="center" gap={4}>
          <Image
            src={weatherIconUrl}
            alt={weatherDescription}
            borderRadius={8}
          />
          <Heading fontSize="6xl">
            {formatTemperature(currentWeather.data.current.temperature)}
          </Heading>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          marginTop={6}
          marginBottom={8}>
          <Box width="100%" display="flex" flexWrap="wrap" gap={4}>
            <StatItem
              label="Feels like"
              value={formatTemperature(currentWeather.data.current.feelslike)}
            />
            <StatItem
              label="Sunrise"
              value={currentWeather.data.current.astro.sunrise}
            />
            <StatItem
              label="Sunset"
              value={currentWeather.data.current.astro.sunset}
            />
            <StatItem
              label="UV index"
              value={currentWeather.data.current.uv_index}
            />
            <StatItem
              label="Humidity"
              value={`${currentWeather.data.current.humidity}%`}
            />
            <StatItem
              label="Wind"
              value={`${formatSpeed(currentWeather.data.current.wind_speed)} (${currentWeather.data.current.wind_dir})`}
            />
            <StatItem
              label="Visibility"
              value={formatDistance(currentWeather.data.current.visibility)}
            />
          </Box>
        </Box>

        <HStack alignItems="center" gap={3}>
          <Text fontSize="sm" color="gray.400">
            Last updated: {formatLastUpdated()}
          </Text>

          <IconButton
            id="button_refresh"
            variant="ghost"
            colorPalette="teal"
            onClick={onForceRefresh}
            disabled={isLoading}
            aria-label="button_refresh">
            <HiOutlineRefresh />
          </IconButton>
        </HStack>
      </Box>
    </Box>
  );
};

export default CurrentWeatherCard;
