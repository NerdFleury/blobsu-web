"use client";
import Loading from "./loading";
import Leaderboard from "../components/server/RankedScoreData";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Stack, Title, Group, Button } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ModeSwitch } from "../components/client/FloatingRankedIndicator";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    searchParams;
  }, [searchParams]);
  return (
    <>
      <Stack align="center" mb={"3em"} mt={"2em"}>
        <Title>Ranked Score Leaderboards</Title>
        <ModeSwitch />
      </Stack>
      <Suspense fallback={<Loading />}>
        <Leaderboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
