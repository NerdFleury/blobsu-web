"use client";
import Loading from "./loading";
import Leaderboard from "../components/client/leaderboardData";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Leaderboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
