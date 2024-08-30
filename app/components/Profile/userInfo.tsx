import {
  ThemeIcon,
  Text,
  Group,
  Paper,
  Stack,
  Center,
  Divider,
} from "@mantine/core";
import classes from "../styles/StatsCard.module.css";
import TimeStamp from "./Timestamp";
import Image from "next/image";
import { convertSeconds } from "./Tools";
import { ModeSwitch } from "./FloatingUserIndicator";

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
  playcount,
  playtime,
  totalhits,
  maxcombo,
  rscore,
  tscore,
  params,
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
  playcount: number;
  playtime: number;
  totalhits: number;
  maxcombo: number;
  rscore: number;
  tscore: number;
  params: { slug: string };
}) {
  const time = convertSeconds(playtime);
  const label = 200;
  const lSize = 10;
  return (
    <Stack align="center">
      <Paper
        c="white"
        bg="#022e33"
        shadow="md"
        w="100%"
        mt="-3em"
        maw={360}
        className={classes.card}
      >
        <ThemeIcon className={classes.icon} size={90} radius="md">
          <Image
            src={`https://a.blobsu.xyz/${userid}`}
            width="90"
            height="90"
            alt="user avatar"
            style={{ borderRadius: 9 }}
          />
        </ThemeIcon>

        <Text ta="center" fw={500} className={classes.title}>
          {name}
        </Text>
        <Center mt="sm" mb={0}>
          <Image
            src={`https://flagcdn.com/w80/${region}.png`}
            width={24}
            height={16}
            alt={region}
          />
        </Center>

        <Stack gap={0} mt="2em">
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Global Rank:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;#{globalRank.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Country Rank:
            </Text>
            <Text size="0.6em" mt="1em">
              #{countryRank.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Performance:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;{pp.toLocaleString("en-US")}pp
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Play Count:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {playcount.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Play Time:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{time.hours}h{" "}
              {time.minutes}m
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Total Hits:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {totalhits.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Accuracy:{" "}
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{acc.toFixed(2)}%
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Max Combo:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;{maxcombo.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Ranked Score:
            </Text>
            <Text size="0.6em" mt="1em">
              {rscore.toLocaleString("en-US")}
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="0.6em" mt="1em" fw={label}>
              Total Score:
            </Text>
            <Text size="0.6em" mt="1em">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {tscore.toLocaleString("en-US")}
            </Text>
          </Group>
        </Stack>
        <Divider mt="1em" mb={0} />
        <TimeStamp
          creation_time={creation_time}
          latest_activity={latest_activity}
        />
        <Divider my="14" />
        <ModeSwitch params={params} />
      </Paper>
    </Stack>
  );
}
