import { Button, Card, Flex, Input, TextField, View } from "@aws-amplify/ui-react";
import { faker } from "@faker-js/faker";
import { atom, useAtom } from "jotai";
import { useForm } from "react-hook-form";

function EventActivityCard({ activity }) {
  const [, dispatch] = useActivities();
  return (
    <Card variation="elevated" display={"flex"} direction={"column"} className="activity-item">
      {/* top */}
      {/* left right */}
      <Flex direction="row" className="image-datetime">
        {/* image */}
        <View as="img" width="150px" sizes="contain" backgroundColor={"blue.100"} src={activity?.images?.[0]?.url} alt={activity?.images?.[0]?.alt} />

        {/* Title date time */}
        <Flex direction="column" className="datetime">
          <p> {activity?.title}</p>
          <p> {activity?.datetime}</p>
        </Flex>
      </Flex>
      {/* bottom */}
      <p>location: {activity?.location}</p>
      {/* notes */}
      <p>notes: {activity?.description}</p>

      <Flex direction="row">
        <Button variation="link">Favourite</Button>
        <Button variation="link">Bookmark</Button>
        <Button variation="link">un-favourite</Button>
        <Button variation="link" onClick={() => dispatch((actions) => actions.deleteActivity, activity)}>
          delete
        </Button>
      </Flex>
    </Card>
  );
}

const fakeActivities = new Array(10).fill(null).map((_) => ({
  id: faker.number.bigInt(),
  title: faker.lorem.lines(1),
  datetime: faker.date.anytime().toISOString(),
  location: faker.commerce.department(),
  description: faker.lorem.paragraph(2),
  images: [{ url: faker.image.url(), alt: faker.lorem.lines(1) }],
}));

const activitesAtom = atom(fakeActivities);

const useActivities = () => {
  const [activities, setActivites] = useAtom(activitesAtom); // read from amplify db

  /**
   * @description update or add new activity
   */
  const upsertActivity = (act) => {
    //pushes to amplify db
    setActivites((prev) => [...prev, { ...act, id: faker.number.bigInt() }]);
  };

  const deleteActivity = (act) => {
    // delete activity from amplify
    setActivites((prev) => prev.filter((_act) => act.id !== _act.id));
  };

  const dispatch = (/** @type {{[key:'deleteActivity'|'updateActivity'|'upsertActivity'|]:(data)=>null}} */ callbackfn, activity) => {
    callbackfn({ deleteActivity, upsertActivity })(activity);
    //refresh out activities list
  };

  const reload = () => {
    // reload activites
    // populate from amplify
  };
  return [activities, dispatch, reload];
};

export function Explore() {
  const [activities, dispatch] = useActivities();
  const { handleSubmit, register } = useForm({
    title: "",
    datetime: "",
    location: "",
    images: [],
    description: "",
  });

  console.log({ activities });
  const onSubmit = (data) => dispatch((actions) => actions.upsertActivity, data);

  return (
    <Flex direction="row">
      <Flex direction="column" flex="80%" className="explore-activities-items">
        {activities.map((activity) => (
          <EventActivityCard key={activity.id} activity={activity} />
        ))}
      </Flex>

      <View as="form" onSubmit={handleSubmit(onSubmit)} display={"flex"} flex={"20%"} direction="column" className="activities form" style={{ gap: "10px" }}>
        <legend>Activity Details</legend>
        {/* name */}
        <Input placeholder="Baggins" {...register("name")} />
        {/* location */}
        <Input {...register("location")} placeholder="Baggins" />
        {/* time */}
        <Input {...register("time")} placeholder="Baggins" />
        {/* images */}
        <Input {...register("images")} placeholder="Baggins" />
        {/* notes */}
        <TextField {...register("notes")} descriptiveText="Enter notes or descriptions" placeholder="Baggins" label="Notes" errorMessage="There is an error" />

        <Button type="submit">Submit</Button>
      </View>
    </Flex>
  );
}
