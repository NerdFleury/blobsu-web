"use client";

import {
  Button,
  Center,
  Grid,
  GridCol,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { Suspense, useEffect, useState } from "react";
import { Plays } from "@/app/components/Profile/playerTable";
import { StatsCard } from "@/app/components/Profile/userInfo";
import { LoadingDef } from "../DefaultLoading";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PlaceholderBanner from "@/public/layered-waves-haikei.png";
import { ScoreTable, Player } from "./Types";
import { fetchTopPlays, fetchUserData, necessaryData } from "./Tools";

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
  }, [params, mode]);

  return (
    <>
      {" "}
      <Image
        src={PlaceholderBanner}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        width={1920}
        height={250}
        unoptimized
        alt="Profile Banner"
      />
      <Center>
        <Paper p="xl" shadow="md" mb={"xl"} w={1000} bg="#02272b">
          <Center>
            <Grid w={1000} mt="xl" gutter="xl">
              <Grid.Col mt="md" span={{ md: 3, xs: 1 }} h={"100vh"}>
                <Suspense fallback={<LoadingDef />}>
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
                      userid={params.slug}
                      playcount={userData!.stats[mode].plays}
                      playtime={userData!.stats[mode].playtime}
                      totalhits={userData!.stats[mode].total_hits}
                      maxcombo={userData!.stats[mode].max_combo}
                      rscore={userData!.stats[mode].rscore}
                      tscore={userData!.stats[mode].tscore}
                    />
                  ) : (
                    <LoadingDef />
                  )}
                </Suspense>
              </Grid.Col>
              <Grid.Col span="auto">
                <Suspense fallback={<LoadingDef />}>
                  <Paper p="xl" bg="#022e33" maw={900} mt="-2em" w={"100%"}>
                    {scoreData ? <Plays scores={scoreData} /> : <LoadingDef />}
                  </Paper>
                </Suspense>
              </Grid.Col>
            </Grid>
          </Center>
        </Paper>
      </Center>
    </>
  );
}
