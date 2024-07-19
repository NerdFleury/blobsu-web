"use client";
import Loading from "./loading";
import Leaderboard from "../components/RankedScore/RankedScoreData";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Stack, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import { ModeSwitch } from "../components/RankedScore/FloatingRankedIndicator";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();

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
