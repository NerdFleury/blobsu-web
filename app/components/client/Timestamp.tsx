import { Paper, Text } from "@mantine/core";
import classes from "../styles/StatsCard.module.css";
import { useMantineTheme, Group } from "@mantine/core";

function formatRelativeTime(seconds: number) {
  const d = new Date();
  seconds = d.getTime() / 1000 - seconds;
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let unit of units) {
    if (seconds >= unit.seconds) {
      const value = Math.floor(seconds / unit.seconds);
      return `Last seen ${value} ${unit.label}${value > 1 ? "s ago" : " ago"}`;
    }
  }
  return "Currently Online";
}

function formatToMonthsAndYears(seconds: number) {
  const startDate = new Date(1970, 0, 1);
  const targetDate = new Date(startDate.getTime() + seconds * 1000);

  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[month]} ${year}`;
}

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
        bg={theme.colors.dark[6]}
        shadow="md"
        miw={400}
        className={classes.minicard}
      >
        <Group justify="center">
          <Text size="sm" c="dimmed">
            {formatRelativeTime(latest_activity)}
          </Text>
          <Text size="sm" c="dimmed">
            Date registered {formatToMonthsAndYears(creation_time)}
          </Text>
        </Group>
      </Paper>
    </>
  );
}
