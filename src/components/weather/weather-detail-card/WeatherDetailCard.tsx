import type { Weather } from "@/types/weather";
import {
  formatDate,
  formatDistance,
  formatSpeed,
  formatTemperature,
  formatTime,
} from "@/utils/formatter";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { HiOutlineLocationMarker, HiOutlineRefresh } from "react-icons/hi";
import {
  WiDaySunny,
  WiFog,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
} from "react-icons/wi";

type Props = {
  weather?: Weather;
  isLoading: boolean;
  hasError: boolean;
  onForceRefresh: () => void;
};

const WeatherDetailCard: React.FC<Props> = ({
  weather,
  isLoading,
  hasError,
  onForceRefresh,
}) => {
  const locationLabel = weather?.data.location
    ? `${weather?.data.location.name}, ${weather?.data.location.region}, ${weather?.data.location.country}`
    : "Location unavailable";

  const weatherIconUrl = weather?.data.current.weather_icons[0];
  const weatherDescription = weather?.data.current.weather_descriptions[0];

  const isMetric = weather?.data?.request?.unit === "m";

  const now = new Date();
  const formattedDate = formatDate(now);
  const formattedTime = formatTime(now);
  const formattedDateTime = `${formattedDate} · ${formattedTime}`;

  const formatLastUpdated = () => {
    if (!weather?.cachedAt) {
      return "Unknown";
    }
    return `${formatDate(weather?.cachedAt)} · ${formatTime(weather?.cachedAt)}`;
  };

  const StatItem: React.FC<{
    label: string;
    value: React.ReactNode;
    icon?: React.ReactNode;
  }> = ({ label, value, icon }) => (
    <Box
      display="flex"
      flexDirection="row"
      width={{ base: "45%", sm: "180px", md: "auto" }}
      minW="140px">
      {icon && (
        <Box display="flex" alignItems="center" marginRight={2} fontSize="3xl">
          {icon}
        </Box>
      )}

      <VStack alignItems="flex-start" gap={0}>
        <Text fontSize="sm" color="gray.400">
          {label}
        </Text>
        <Text fontSize="md" fontWeight="bold">
          {value}
        </Text>
      </VStack>
    </Box>
  );

  // Skeleton loaders were intentionally ignored here to prioritise
  // core functionality and test coverage within the scope.
  // TODO: Replace with Chakra Skeleton components.
  if (isLoading) {
    return (
      <Box>
        <Heading fontSize="xl">Loading weather data...</Heading>
      </Box>
    );
  }

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

  if (!weather?.data) {
    return (
      <Box>
        <Heading fontSize="xl">No weather data available.</Heading>
        <Text>Click on the Refresh button to get the latest weather data.</Text>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="flex-start"
      alignItems="flex-start"
      padding={8}>
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Heading display="flex" gap={2}>
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
            {formatTemperature(weather.data.current.temperature, isMetric)}
          </Heading>
        </Box>

        <Heading>{weatherDescription}</Heading>

        <Box
          display="flex"
          flexWrap="wrap"
          gap={4}
          marginTop={6}
          marginBottom={8}>
          <Box width="100%" display="flex" flexWrap="wrap" gap={4}>
            <StatItem
              label="Feels like"
              value={formatTemperature(
                weather.data.current.feelslike,
                isMetric,
              )}
              icon={<WiThermometer />}
            />
            <StatItem
              label="Sunrise"
              value={weather.data.current.astro.sunrise}
              icon={<WiSunrise />}
            />
            <StatItem
              label="Sunset"
              value={weather.data.current.astro.sunset}
              icon={<WiSunset />}
            />
            <StatItem
              label="UV index"
              value={weather.data.current.uv_index}
              icon={<WiDaySunny />}
            />
            <StatItem
              label="Humidity"
              value={`${weather.data.current.humidity}%`}
              icon={<WiHumidity />}
            />
            <StatItem
              label="Wind"
              value={`${formatSpeed(weather.data.current.wind_speed, isMetric)} (${weather.data.current.wind_dir})`}
              icon={<WiStrongWind />}
            />
            <StatItem
              label="Visibility"
              value={formatDistance(weather.data.current.visibility, isMetric)}
              icon={<WiFog />}
            />
          </Box>
        </Box>

        <HStack alignItems="center" gap={3}>
          {/* Manual refresh allows users to bypass cached data */}
          <IconButton
            id="button_refresh"
            variant="ghost"
            onClick={onForceRefresh}
            disabled={isLoading}
            aria-label="Refresh weather">
            <HiOutlineRefresh />
          </IconButton>
          <Text fontSize="sm" color="gray.400">
            Last updated: {formatLastUpdated()}
          </Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default WeatherDetailCard;
