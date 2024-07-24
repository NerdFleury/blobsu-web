"use client";

import Link from "next/link";
import { Button, Title, Stack } from "@mantine/core";
import HeroLogo from "@/public/Text.png";
import Image from "next/image";
import classes from "@/app/components/styles/Home.module.css";
import Background from "../Layout/Background";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Background />
      <Stack mt="6em" align="center">
        <Image
          src={HeroLogo}
          className={classes.heroimage}
          alt="blobsu text logo"
        />

        <Title className={classes.heading}>Welcome to Blobsu</Title>
        <Button
          variant="gradient"
          gradient={{ from: "#008080", to: "rgba(36, 77, 77, 1)", deg: 90 }}
          mt="sm"
          fw={400}
          radius="md"
          size="lg"
          component={Link}
          href="/connect"
        >
          How To Connect
        </Button>
        {children}
      </Stack>
    </>
  );
}
