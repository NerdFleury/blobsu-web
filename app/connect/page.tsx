"use client";

import { Text, Title, Stack, Container } from "@mantine/core";
import Link from "next/link";

export default function Page() {
  return (
    <Stack gap="lg" mt="xl">
      <Title ta="center">How do I connect to Blobsu?</Title>
      <Text ta="center">
        This must be your first time here. This is a Step-By-Step guide on how
        to connect to Blobsu!
      </Text>
      <Container maw="80%">
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 1</Text>
          <Text>
            <Text component={Link} href="/create" c="cyan">
              Create an account
            </Text>{" "}
            if you haven&apos;t already.
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 2</Text>
          <Text>
            Create a new shortcut for osu! (You can do this by accessing your
            osu! folder through drive:\Users\ username \AppData\Local\osu! and
            creating a shortcut of osu!.exe)
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 3</Text>
          <Text>
            Right click the new shortcut for osu!.exe and open Properties. Under
            Shortcut, make sure that the Target is directed to your local
            osu!.exe.
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 4</Text>
          <Text>
            At the end of the Target after the osu!.exe add the following:
            <br />
            <ul>
              <li>
                <Text>-devserver blobsu.xyz</Text>
              </li>
            </ul>
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text>
            Your Target should now look like:
            <br />
            drive:\Users\username\AppData\Local\osu!\osu!.exe -devserver
            blobsu.xyz
          </Text>
          <Text>
            Note: If your shortcut doesn&apos;t open the osu!.exe you&apos;ve
            likely made a mistake and should try again from Step 2.
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 5</Text>
          <Text>
            Click apply and click okay to close the Properties window.
          </Text>
        </Stack>
        <Stack mb="xl" gap="xs">
          <Text fw={700}>Step 6</Text>
          <Text>
            Launch your new osu! shortcut, enter your login information and you
            will be connected to Blobsu!
          </Text>
        </Stack>
      </Container>
    </Stack>
  );
}
