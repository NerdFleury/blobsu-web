"use client";

import Leaderboard from "../components/client/leaderboardData";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  return (
    <>
      <Suspense>
        <Leaderboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
