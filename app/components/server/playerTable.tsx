"use client";

import { Center, Stack, Table, Text, Title } from "@mantine/core";

interface score {
  scoreid: number;
  mapName: string;
  mapDifficulty: string;
  mods: number;
  accuracy: number;
  pp: number;
}

const MODS = {
  NM: 0,
  NF: 1 << 0,
  EZ: 1 << 1,
  TD: 1 << 2, // old: 'NOVIDEO'
  HD: 1 << 3,
  HR: 1 << 4,
  SD: 1 << 5,
  DT: 1 << 6,
  RX: 1 << 7,
  HT: 1 << 8,
  NC: 1 << 9,
  FL: 1 << 10,
  AT: 1 << 11,
  SO: 1 << 12,
  AP: 1 << 13,
  PF: 1 << 14,
  "4K": 1 << 15,
  "5K": 1 << 16,
  "6K": 1 << 17,
  "7K": 1 << 18,
  "8K": 1 << 19,
  FADEIN: 1 << 20,
  RANDOM: 1 << 21,
  CINEMA: 1 << 22,
  TARGET: 1 << 23,
  KEY9: 1 << 24,
  KEYCOOP: 1 << 25,
  KEY1: 1 << 26,
  KEY3: 1 << 27,
  KEY2: 1 << 28,
  SCOREV2: 1 << 29,
  MR: 1 << 30,
};

function getMods(bitmask: number): string[] {
  const activeMods: string[] = [];

  for (const [modName, modValue] of Object.entries(MODS)) {
    if ((bitmask & modValue) !== 0) {
      activeMods.push(modName);
    }
  }

  return activeMods;
}

export function Plays({ scores }: { scores: score[] }) {
  return (
    <>
      <Stack mt={50} w={"80%"}>
        <Center>
          <Title order={2}>Top Plays</Title>
        </Center>

        <Table
          align="center"
          maw={"70%"}
          withRowBorders={false}
          striped
          stripedColor="#052c30"
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Map</Table.Th>
              <Table.Th>Mods</Table.Th>
              <Table.Th>Accuracy</Table.Th>
              <Table.Th>Performance</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody style={{ backgroundColor: "#022226" }}>
            {scores.map((score: score) => (
              <Table.Tr key={score.scoreid}>
                <Table.Td>
                  <Text>{score.mapName}</Text>
                  <Text c="dimmed">{score.mapDifficulty}</Text>
                </Table.Td>
                <Table.Td>{getMods(score.mods)}</Table.Td>
                <Table.Td>{score.accuracy.toFixed(2)}%</Table.Td>
                <Table.Td>{score.pp.toFixed(2)}pp</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Stack>
    </>
  );
}
