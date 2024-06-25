"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button, Title, Stack } from "@mantine/core";

export default function Home({ children }: { children: React.ReactNode }) {
  const router = useRouter();
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
