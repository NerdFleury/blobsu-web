"use client";
import Loading from "./loading";
import Leaderboard from "../components/server/leaderboardData";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Stack, Title, Group, Button } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function LeaderboardPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    searchParams;
  }, [searchParams]);
  return (
    <>
      <Stack align="center" mb={"3em"} mt={"2em"}>
        <Title>Global Leaderboards</Title>
        <Group justify="center">
          <Button
            onClick={() =>
              router.push("/leaderboard?sort=pp&mode=0&pagenumber=1")
            }
          >
            Standard
          </Button>
          <Button
            onClick={() =>
              router.push("/leaderboard?sort=pp&mode=1&pagenumber=1")
            }
          >
            Taiko
          </Button>
          <Button
            onClick={() =>
              router.push("/leaderboard?sort=pp&mode=2&pagenumber=1")
            }
          >
            Catch
          </Button>
          <Button
            onClick={() =>
              router.push("/leaderboard?sort=pp&mode=3&pagenumber=1")
            }
          >
            Mania
          </Button>
          <Button
            onClick={() =>
              router.push("/leaderboard?sort=pp&mode=4&pagenumber=1")
            }
          >
            Relax
          </Button>
        </Group>
      </Stack>
      <Suspense fallback={<Loading />}>
        <Leaderboard searchParams={searchParams} />
      </Suspense>
    </>
  );
}
