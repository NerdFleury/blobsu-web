"use client";

import { Button, Center, Group, Stack, Table, Text } from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { Plays } from "@/app/components/server/playerTable";
import { StatsCard } from "@/app/components/server/userInfo";
import { LoadingDef } from "../client/DefaultLoading";
import { useRouter } from "next/navigation";

interface Beatmap {
  md5: string;
  id: number;
  set_id: number;
  artist: string;
  title: string;
  version: string;
  creator: string;
  last_update: string;
  total_length: number;
  max_combo: number;
  status: number;
  plays: number;
  passes: number;
  mode: number;
  bpm: number;
  cs: number;
  od: number;
  ar: number;
  hp: number;
  diff: number;
}

interface Score {
  id: number;
  score: number;
  pp: number;
  acc: number;
  max_combo: number;
  mods: number;
  n300: number;
  n100: number;
  n50: number;
  nmiss: number;
  ngeki: number;
  nkatu: number;
  grade: string;
  status: number;
  mode: number;
  play_time: string;
  time_elapsed: number;
  perfect: number;
  beatmap: Beatmap;
}

interface PlayerInfo {
  id: number;
  name: string;
  safe_name: string;
  priv: number;
  country: string;
  silence_end: number;
  donor_end: number;
  creation_time: number;
  latest_activity: number;
  clan_id: number;
  clan_priv: number;
  preferred_mode: number;
  play_style: number;
  custom_badge_name: string | null;
  custom_badge_icon: string | null;
  userpage_content: string | null;
}

interface ScoreTable {
  scoreid: number;
  mapName: string;
  mapDifficulty: string;
  mods: number;
  accuracy: number;
  pp: number;
}

interface PlayerStats {
  id: number;
  mode: number;
  tscore: number;
  rscore: number;
  pp: number;
  plays: number;
  playtime: number;
  acc: number;
  max_combo: number;
  total_hits: number;
  replay_views: number;
  xh_count: number;
  x_count: number;
  sh_count: number;
  s_count: number;
  a_count: number;
  rank: number;
  country_rank: number;
}
interface Player {
  info: PlayerInfo;
  stats: {
    [key: string]: PlayerStats;
  };
}

interface ApiResponse {
  status: string;
  player: Player;
}

interface PlayerScores {
  id: number;
  name: string;
  clan: string | null;
}

interface ApiResponseScores {
  status: string;
  scores: Score[];
  player: PlayerScores;
}

async function fetchUserData({ userId }: { userId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PLAYER_INFO}?scope=all&id=${userId}`,
    {
      method: "GET",
    }
  );
  const data: ApiResponse = await response.json();
  data;
  return data;
}

async function fetchTopPlays({
  userId,
  mode,
}: {
  userId: string;
  mode: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PLAYER_SCORES}?scope=best&id=${userId}&limit=20&mode=${mode}`,
    {
      method: "GET",
    }
  );
  const data: ApiResponseScores = await response.json();
  return data;
}

function necessaryData(rawData: Score[]) {
  const newScores: ScoreTable[] = rawData.map((score) => ({
    scoreid: score.id,
    mapName: score.beatmap.title,
    mapDifficulty: score.beatmap.version,
    mods: score.mods,
    accuracy: score.acc,
    pp: score.pp,
  }));
  return newScores;
}

export default function Page({
  params,
  mode,
}: {
  params: { slug: string };
  mode: number;
}) {
  const [userData, setUserData] = useState<Player | null>();
  const [scoreData, setScoreData] = useState<ScoreTable[] | null>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const scoresData = fetchTopPlays({ userId: params.slug, mode: mode });
      const playerData = fetchUserData({ userId: params.slug });

      const [scores, player] = await Promise.all([scoresData, playerData]);

      setUserData(player.player);
      setScoreData(necessaryData(scores.scores));
    };

    fetchData().catch((e) => {});
  }, [params]);

  return (
    <>
      <Suspense fallback={<LoadingDef />}>
        <Stack mt="xl" align="center">
          {userData ? (
            <StatsCard
              name={userData!.info.name}
              globalRank={userData!.stats[mode].rank}
              countryRank={userData!.stats[mode].country_rank}
              pp={userData!.stats[mode].pp}
              acc={userData!.stats[mode].acc}
              region={userData!.info.country}
              creation_time={userData!.info.creation_time}
              latest_activity={userData!.info.latest_activity}
            />
          ) : (
            <LoadingDef />
          )}
        </Stack>
      </Suspense>
      <Group mt="xl" justify="center"></Group>
      <Suspense fallback={<LoadingDef />}>
        <Center>
          {scoreData ? <Plays scores={scoreData} /> : <LoadingDef />}
        </Center>
      </Suspense>
      <Text mt="xl"></Text>
    </>
  );
}
