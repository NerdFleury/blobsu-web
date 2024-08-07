"use client";

import { Button, Spoiler, Stack, Title } from "@mantine/core";

import TopPlaysTableRow from "./TopPlayRow";

interface score {
  scoreid: number;
  mapName: string;
  mapDifficulty: string;
  mods: number;
  accuracy: number;
  pp: number;
  set_id: number;
  rank: string;
}

export function Plays({ scores }: { scores: score[] }) {
  return (
    <>
      <Stack mb="1em">
        <Title c="white" fw={500} order={3}>
          Top Plays
        </Title>
        <Spoiler
          maxHeight={224}
          styles={{ control: { right: 0 } }}
          showLabel=<Button
            color="gray"
            px="xl"
            radius="xl"
            fw={500}
            c="gray"
            size="compact-xs"
            mt="sm"
          >
            Show more Scores
          </Button>
          hideLabel=<Button
            color="gray"
            px="xl"
            radius="xl"
            fw={500}
            c="gray"
            size="compact-xs"
            mt="sm"
          >
            Hide Scores
          </Button>
        >
          <Stack gap="0.3em">
            {scores.map((score: score) => (
              <TopPlaysTableRow
                key={score.scoreid}
                set_id={score.set_id}
                title={score.mapName}
                version={score.mapDifficulty}
                pp={score.pp}
                rank={score.rank}
                mods={score.mods}
                acc={score.accuracy}
              />
            ))}
          </Stack>
        </Spoiler>
      </Stack>
    </>
  );
}
