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
import MostPlayedTableRow from "./PlayedTableRow";
import { MostPlayedObject, MostPlayedSingle } from "./Types";

export function MostPlayed({ maps }: { maps: MostPlayedObject }) {
  return (
    <>
      <Stack mb="1em">
        <Title c="white" fw={500} order={3}>
          Most Played
        </Title>
        <Spoiler
          maxHeight={220}
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
            Show more
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
            Hide
          </Button>
        >
          <Stack gap="0.3em">
            {maps.maps.map((score: MostPlayedSingle) => (
              <MostPlayedTableRow
                key={`${score.set_id} + ${score.version}`}
                set_id={score.set_id}
                artist={score.artist}
                title={score.title}
                version={score.version}
                creator={score.creator}
                plays={score.plays}
              />
            ))}
          </Stack>
        </Spoiler>
      </Stack>
    </>
  );
}
