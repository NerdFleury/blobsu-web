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
      <Text size="xs">{formatRelativeTime(latest_activity)}</Text>
      <Text size="xs">Registered {formatToMonthsAndYears(creation_time)}</Text>
    </>
  );
}
