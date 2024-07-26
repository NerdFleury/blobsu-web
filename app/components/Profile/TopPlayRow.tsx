import {
  Paper,
  Text,
  Group,
  Stack,
  BackgroundImage,
  Center,
  Box,
  ScrollArea,
} from "@mantine/core";
import Image from "next/image";
import { getMods } from "./Tools";

export default function TopPlaysTableRow({
  set_id,
  title,
  version,
  acc,
  rank,
  mods,
  pp,
}: {
  set_id: number;
  title: string;
  version: string;
  acc: number;
  rank: string;
  mods: number;
  pp: number;
}) {
  return (
    <Paper shadow="0" radius={0} h="40" p="0">
      <Group maw="100%" justify="space-between" bg="#022226">
        <Group w={"85%"}>
          <Image
            src={`https://assets.ppy.sh/beatmaps/${set_id}/covers/list@2x.jpg?`}
            height={40}
            width={60}
            alt="rank achieved"
          />
          <Stack gap="xs">
            {" "}
            <Group gap={"0.3em"}>
              <Text size="0.7em" c="white">
                {title} [{version}]
              </Text>
            </Group>
            <Group gap={3}>
              <Text size="0.6em" c="dimmed">
                {acc.toFixed(2)}% / {rank} / {getMods(mods)}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Group h={40} w={"12%"} gap={1} justify="center" bg="#0b2a2e">
          <Text c="cyan" fw={600} size="0.75em">
            {Math.round(pp)}
          </Text>
          <Text c="dimmed" size="0.6em">
            pp
          </Text>
        </Group>
      </Group>
    </Paper>
  );
}
