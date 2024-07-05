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
    <Stack mt="10em" align="center">
      <Image src={HeroLogo} width={800} height={255} alt="blobsu text logo" />
      <Text fw={600} c="white" size="45px">
        Welcome to Blobsu
      </Text>
      <Button
        variant="filled"
        color="black"
        mt="xl"
        radius="md"
        size="lg"
        component={Link}
        href="/create"
      >
        How To Connect
      </Button>
      {children}
      <Socials />
    </Stack>
  );
}
