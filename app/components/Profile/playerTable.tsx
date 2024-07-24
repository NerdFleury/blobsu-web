"use client";

import {
  Button,
  Center,
  Spoiler,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { getMods } from "./Tools";

interface score {
  scoreid: number;
  mapName: string;
  mapDifficulty: string;
  mods: number;
  accuracy: number;
  pp: number;
}

export function Plays({ scores }: { scores: score[] }) {
  return (
    <>
      <Stack mb="4em">
        <Title order={2}>Top Plays</Title>
        <Spoiler
          maxHeight={308.7}
          styles={{ control: { right: 0 } }}
          showLabel=<Button color="gray" size="xs" mt="xl">
            Show more Scores
          </Button>
          hideLabel=<Button
            mt="xl"
            mb="xl"
            color="gray"
            size="xs"
            styles={{ root: { right: "0" } }}
          >
            Hide Scores
          </Button>
        >
          <Table.ScrollContainer minWidth={300} type="native">
            <Table
              align="center"
              maw={900}
              w="100%"
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
                      <Text size="sm">{score.mapName}</Text>
                      <Text size="sm" c="dimmed">
                        {score.mapDifficulty}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{getMods(score.mods)}</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{score.accuracy.toFixed(2)}%</Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{score.pp.toFixed(2)}pp</Text>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Spoiler>
      </Stack>
    </>
  );
}
