"use client";

import { Title, Center } from "@mantine/core";
import { ModeSwitch } from "./FloatingTopIndicator";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Center>
        <Title ta="center" mt="xl">
          Global Top Plays
          <ModeSwitch />
        </Title>
      </Center>
      {children}
    </>
  );
}
