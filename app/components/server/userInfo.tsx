import {
  ThemeIcon,
  Text,
  Group,
  Paper,
  rem,
  Stack,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";
import classes from "../styles/StatsCard.module.css";
import TimeStamp from "../client/Timestamp";
import Image from "next/image";
import defaultImg from "@/public/default.png";

// this will be dealt with fully once user profile ability is completed

export function StatsCard({
  name,
  globalRank,
  countryRank,
  region,
  pp,
  acc,
  latest_activity,
  creation_time,
  userid,
}: {
  name: string;
  globalRank: number;
  countryRank: number;
  region: string;
  pp: number;
  acc: number;
  latest_activity: number;
  creation_time: number;
  userid: string;
}) {
  const theme = useMantineTheme();
  return (
    <Stack align="center">
      <Paper
        radius="md"
        bg="#00292e"
        shadow="md"
        w="90%"
        maw={360}
        className={classes.card}
        mt={20}
      >
        <ThemeIcon className={classes.icon} size={90} radius={90}>
          <Image
            src={`https://a.blobsu.xyz/${userid}`}
            width="90"
            height="90"
            alt="user avatar"
            style={{ borderRadius: 90 }}
          />
        </ThemeIcon>

        <Text ta="center" fw={700} className={classes.title}>
          {name}
        </Text>
        <Center mt="sm">
          <Image
            src={`https://flagcdn.com/w40/${region}.png`}
            width={24}
            height={16}
            alt={region}
          />
        </Center>

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
