import type { CurrentWeather } from "@/types/weather";
import { Box, Heading, Text } from "@chakra-ui/react";
import { HiOutlineLocationMarker } from "react-icons/hi";

type Props = {
  currentWeather?: CurrentWeather;
  isLoading: boolean;
  hasError: boolean;
};

const CurrentWeatherCard: React.FC<Props> = ({
  currentWeather,
  isLoading,
  hasError,
}) => {
  const locationLabel = currentWeather?.data.location
    ? `${currentWeather?.data.location.region}, ${currentWeather?.data.location.country}`
    : "Location unavailable";

  if (isLoading) {
    return (
      <Box>
        <Heading fontSize="xl">Loading current weather data...</Heading>
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

  if (!currentWeather?.data) {
    return (
      <Box>
        <Heading fontSize="xl">No weather data available.</Heading>
        <Text>Click on the Refresh button to get the latest weather data.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading fontSize="2xl" display="flex" gap={2}>
        <HiOutlineLocationMarker />
        {locationLabel}
      </Heading>
      <Heading fontSize="6xl">Today</Heading>
      <Text>{currentWeather?.data.current.weather_descriptions[0]}</Text>
    </Box>
  );
};

export default CurrentWeatherCard;
