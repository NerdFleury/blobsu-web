import {
  Paper,
  Text,
  Group,
  Stack,
  BackgroundImage,
  Center,
  Box,
} from "@mantine/core";

export default function MostPlayedTableRow({
  set_id,
  artist,
  title,
  version,
  creator,
  plays,
}: {
  set_id: number;
  artist: string;
  title: string;
  version: string;
  creator: string;
  plays: number;
}) {
  return (
    <Paper shadow="0" bg="#022226" radius={0} h="40" p="0">
      <Group>
        <Box h="40" w={60}>
          <BackgroundImage
            src={`https://assets.ppy.sh/beatmaps/${set_id}/covers/list@2x.jpg?`}
          >
            <Stack>
              <Text
                span
                style={{
                  backdropFilter: "blur(1px) brightness(50%)",
                }}
                fw={500}
                pt={7}
                w={60}
                h={40}
                ta={"center"}
                c="yellow"
              >
                {plays}
              </Text>
            </Stack>
          </BackgroundImage>
        </Box>
        <Stack gap="xs">
          {" "}
          <Group gap="3">
            <Text size="0.7em" c="white">
              {title} [{version}]
            </Text>
            <Text size="0.6em" c="dimmed">
              {" "}
              by {artist}
            </Text>
          </Group>
          <Group gap={3}>
            <Text size="0.5em" c="dimmed">
              Mapped by
            </Text>
            <Text size="0.5em" c="dimmed" fw={600}>
              {creator}
            </Text>
          </Group>
        </Stack>
      </Group>
    </Paper>
  );
}
