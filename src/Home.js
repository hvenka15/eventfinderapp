import { Amplify } from "aws-amplify";
import { MapView } from "@aws-amplify/ui-react-geo";
import "@aws-amplify/ui-react-geo/styles.css";
import { faker } from "@faker-js/faker";
import { Card, Flex, View } from "@aws-amplify/ui-react";

const actitivies = new Array(10).fill(null).map(() => ({
  name: faker.word.adverb(),
  description: faker.lorem.lines(3),
  id: faker.string.uuid(),
  time: faker.date.anytime(),
  location: faker.location.nearbyGPSCoordinate(),
}));

export function Home() {
  return (
    <Flex direction="row" width="100%">
      <View width="80%">
        <View
          as={MapView}
          width={'100%'}
          maxWidth={"100%"}
          initialViewState={{
            latitude: 37.8,
            longitude: -122.4,
            zoom: 14,
          }}
        />
      </View>
      <Flex direction={"column"} width="20%">
        {actitivies.map((act) => (
          <Card>
            <h2>{act.name}</h2>
            <p>{act.description}</p>
            <p>{act.time.toDateString()}</p>
            <p>{JSON.stringify(act.location)}</p>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
}
