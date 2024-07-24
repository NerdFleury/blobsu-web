import { Paper, Text } from "@mantine/core";
import classes from "../styles/StatsCard.module.css";
import { useMantineTheme, Group } from "@mantine/core";
import { formatRelativeTime, formatToMonthsAndYears } from "./Tools";

export default function TimeStamp({
  latest_activity,
  creation_time,
}: {
  latest_activity: number;
  creation_time: number;
}) {
  const theme = useMantineTheme();
  return (
    <>
      <Paper
        radius="md"
        bg="#00292e"
        shadow="md"
        w="100%"
        className={classes.lastseencard}
      >
        <Group justify="center">
          <Text size="xs" c="dimmed">
            {formatRelativeTime(latest_activity)}
          </Text>
          <Text size="xs" c="dimmed">
            Registered {formatToMonthsAndYears(creation_time)}
          </Text>
        </Group>
      </Paper>
    </>
  );
}
