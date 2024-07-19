"use client";

import Loading from "./loading";
import Leaderboard from "../components/Performance/leaderboardData";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Stack, Title } from "@mantine/core";
import { ModeSwitch } from "../components/Performance/FloatingIndicator";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams;
  }, [searchParams]);
  return (
    <>
      <Stack align="center" mb={"3em"} mt={"2em"}>
        <Title>Global Leaderboards</Title>
        <ModeSwitch />
      </Stack>
      <Suspense fallback={<Loading />}>
        <Leaderboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
