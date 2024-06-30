"use client";

import Link from "next/link";
import { Button, Title, Stack, Text } from "@mantine/core";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Stack align="center">
      <Title>Welcome To Blobsu</Title>
      <Button component={Link} href="/create">
        Create Account
      </Button>
      {children}
    </Stack>
  );
}
