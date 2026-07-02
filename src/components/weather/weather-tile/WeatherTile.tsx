import type { Weather } from "@/types/weather";
import { formatDate, formatTemperature } from "@/utils/formatter";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const WeatherTile = ({
  data,
  onClick,
  isSelected,
}: {
  data: Weather;
  onClick: () => void;
  isSelected: boolean;
}) => {
  return (
    <Box
      borderWidth={isSelected ? "2px" : "1px"}
      borderColor={isSelected ? "teal.500" : "gray.700"}
      borderRadius="md"
      padding={[3, 4]}
      width={["100%", "120px"]}
      textAlign="center"
      onClick={onClick}>
      <Text fontSize="xs" mb={2}>
        {formatDate(data.cachedAt, "short")}
      </Text>

      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Image
          src={data.data.current.weather_icons[0]}
          alt={data.data.current.weather_descriptions[0]}
          borderRadius={8}
          height={["50px", "40px"]}
        />
        <Heading fontSize="xl">
          {formatTemperature(
            data.data.current.temperature,
            data.data.request.unit === "m",
          )}
        </Heading>
      </Box>

      <Text fontSize={"xs"} fontStyle="italic">
        {data.data.current.weather_descriptions[0]}
      </Text>
    </Box>
  );
};

export default WeatherTile;
