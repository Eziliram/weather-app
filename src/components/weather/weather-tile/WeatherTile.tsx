import type { Weather } from "@/types/weather";
import { formatDate, formatTemperature } from "@/utils/formatter";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const WeatherTile = ({ data }: { data: Weather }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="md"
      padding={[3, 4]}
      width={["100%", "120px"]}
      textAlign="center">
      <Text fontSize="xs" mb={2}>
        {formatDate(data.timestamp, "short")}
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
