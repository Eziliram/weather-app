import { Box, Heading } from "@chakra-ui/react";
import WeatherTile from "../weather-tile/WeatherTile";
import type { Weather } from "@/types/weather";

type Props = {
  id: string;
  title: string;
  data?: Weather[];
};

const WeatherGrid: React.FC<Props> = (props) => {
  return (
    <Box id={props.id} width="100%" px={[4, 6]}>
      <Heading fontSize={["lg", "xl"]}>{props.title}</Heading>
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
            return <WeatherTile key={index} data={item} />;
          })}
        </Box>
      ) : (
        <Box mt={4}>Feature not available.</Box>
      )}
    </Box>
  );
};

export default WeatherGrid;
