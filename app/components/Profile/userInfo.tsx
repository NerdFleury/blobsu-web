import { ThemeIcon, Text, Group, Paper, Stack, Center } from "@mantine/core";
import classes from "../styles/StatsCard.module.css";
import TimeStamp from "./Timestamp";
import Image from "next/image";
import { convertSeconds } from "./Tools";

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
}) {
  const time = convertSeconds(playtime);
  return (
    <Stack align="center">
      <Paper
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

        <Text ta="center" fw={700} className={classes.title}>
          {name}
        </Text>
        <Center mt="sm">
          <Image
            src={`https://flagcdn.com/w80/${region}.png`}
            width={24}
            height={16}
            alt={region}
          />
        </Center>

        <Stack gap={0} mt="xl">
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Global Rank:
            </Text>
            <Text size="sm">#{globalRank.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Country Rank:
            </Text>
            <Text size="sm">#{countryRank.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Performance:
            </Text>
            <Text size="sm">{pp.toLocaleString("en-US")}pp</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Play Count:
            </Text>
            <Text size="sm">{playcount.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Play Time:
            </Text>
            <Text size="sm">
              {time.hours}h {time.minutes}m
            </Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Total Hits:
            </Text>
            <Text size="sm">{totalhits.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Accuracy:{" "}
            </Text>
            <Text size="sm">{acc.toFixed(2)}%</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Max Combo:
            </Text>
            <Text size="sm">{maxcombo.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Ranked Score:
            </Text>
            <Text size="sm">{rscore.toLocaleString("en-US")}</Text>
          </Group>
          <Group gap="xs">
            <Text size="sm" fw={500}>
              Total Score:
            </Text>
            <Text size="sm">{tscore.toLocaleString("en-US")}</Text>
          </Group>
        </Stack>
      </Paper>
    </Stack>
  );
}
