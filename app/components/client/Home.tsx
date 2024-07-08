"use client";

import Link from "next/link";
import { SignIn } from "../server/SignInButton";
import { Button, Title, Stack, Text } from "@mantine/core";
import HeroLogo from "@/public/Text.png";
import Background from "./Background";
import Image from "next/image";
import Socials from "./Socials";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Stack mt="6em" align="center">
      <Image
        src={HeroLogo}
        style={{ maxWidth: 800, width: "90%", maxHeight: 255, height: "30%" }}
        alt="blobsu text logo"
      />
      <Title order={1} c="white">
        Welcome to Blobsu
      </Title>
      <Button
        variant="filled"
        color="black"
        mt="xl"
        radius="md"
        size="lg"
        component={Link}
        href="/connect"
      >
        How To Connect
      </Button>
      {children}
    </Stack>
  );
}
