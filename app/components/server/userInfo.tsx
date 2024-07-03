import {
  ThemeIcon,
  Text,
  Group,
  Paper,
  rem,
  Stack,
  useMantineTheme,
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import classes from "../styles/StatsCard.module.css";
import TimeStamp from "../client/Timestamp";

export function StatsCard({
  name,
  globalRank,
  countryRank,
  region,
  pp,
  acc,
  latest_activity,
  creation_time,
}: {
  name: string;
  globalRank: number;
  countryRank: number;
  region: string;
  pp: number;
  acc: number;
  latest_activity: number;
  creation_time: number;
}) {
  const theme = useMantineTheme();
  return (
    <Stack>
      <Paper
        radius="md"
        bg={theme.colors.dark[6]}
        shadow="md"
        miw={400}
        className={classes.card}
        mt={20}
      >
        <ThemeIcon className={classes.icon} size={90} radius={90}>
          <IconUserCircle
            style={{ width: rem(32), height: rem(32) }}
            stroke={1.5}
          />
        </ThemeIcon>

        <Text ta="center" fw={700} className={classes.title}>
          {name}
        </Text>
        <Text c="dimmed" ta="center" fz="lg">
          {region}
        </Text>

        <Group justify="center" mt="xs" grow>
          <Stack align="center" gap={0}>
            <Text fz="md" c="dimmed">
              Global
            </Text>
            <Text fz="h1">#{globalRank}</Text>
          </Stack>
          <Stack align="center" gap={0}>
            <Text fz="md" c="dimmed">
              Country
            </Text>
            <Text fz="h1">#{countryRank}</Text>
          </Stack>
        </Group>

        <Group justify="center" mt="md" gap="xl">
          <Stack align="center" gap={0}>
            <Text fz="sm" c="dimmed">
              PP
            </Text>
            <Text fz="xl">{pp}</Text>
          </Stack>
          <Stack align="center" gap={0}>
            <Text fz="sm" c="dimmed">
              Accuracy
            </Text>
            <Text fz="xl">{acc.toFixed(2)}%</Text>
          </Stack>
        </Group>
      </Paper>
      <TimeStamp
        latest_activity={latest_activity}
        creation_time={creation_time}
      />
    </Stack>
  );
}
