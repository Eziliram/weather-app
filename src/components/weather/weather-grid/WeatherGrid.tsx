import { Box, Heading, Text } from "@chakra-ui/react";
import WeatherTile from "../weather-tile/WeatherTile";
import type { Weather } from "@/types/weather";

type Props = {
  id: string;
  title: string;
  data?: Weather[];
  selectedWeather?: Weather | null;
  onSelectWeather: (weather: Weather) => void;
};

const WeatherGrid: React.FC<Props> = (props) => {
  return (
    <Box id={props.id} width="100%" px={[4, 6]}>
      <Heading fontSize={["xl", "2xl"]}>{props.title}</Heading>
      {props.data?.length ? (
        <Box
          display="flex"
          flexDirection={["column", "row"]}
          flexWrap="wrap"
          alignItems={["stretch", "center"]}
          justifyContent={["flex-start", "center"]}
          gap={[2, 4]}
          marginTop={4}>
          {props.data?.map((item, index) => {
            return (
              <WeatherTile
                key={index}
                data={item}
                isSelected={props.selectedWeather?.cachedAt === item.cachedAt}
                onClick={() => props.onSelectWeather(item)}
              />
            );
          })}
        </Box>
      ) : (
        <Box mt={4}>
          <Heading>Feature not available.</Heading>
          <Text>Click on the "Show preview" button to see a demo preview.</Text>
        </Box>
      )}
    </Box>
  );
};

export default WeatherGrid;
