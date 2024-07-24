"use client";

import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LeaderboardSkeleton from "../Table/Leaderboard";
import TablePagination from "../Table/Pagination";
import { Performance } from "./Types";
import { getUserCount } from "@/app/lib/getUserCount";
import { getLeaderboard } from "./Tools";
import { Center } from "@mantine/core";

export let offset = 0;

export default function Leaderboard({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const [leaderboard, setLeaderboard] = useState<Performance[]>();
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      const Response = getLeaderboard(searchParams);
      const FetchCount = getUserCount({
        mode: parseInt(searchParams.get("mode")!),
      });
      const [res, fetchcount] = await Promise.all([Response, FetchCount]);
      if (fetchcount["count(id)"] < 500) {
        setCount(Math.ceil(fetchcount["count(id)"] / 50));
      } else {
        setCount(10);
      }
      setLeaderboard(
        res?.leaderboard.map((player, index) => ({
          player_id: player.player_id,
          Rank: `#${offset + index + 1}`,
          Country: player.country,
          Player: player.name,
          Playcount: player.plays,
          Accuracy: `${player.acc.toFixed(2)}%`,
          PP: player.pp.toFixed(0),
        }))
      );
    };

    fetchData().catch((e) => {});
  }, [searchParams]);

  return (
    <>
      {leaderboard ? <LeaderboardSkeleton data={leaderboard} /> : null}
      <Center mt="xl">
        <TablePagination
          route="leaderboard"
          mode={searchParams.has("mode") ? searchParams.get("mode")! : "0"}
          currentpage={
            searchParams.has("pagenumber")
              ? searchParams.get("pagenumber")!
              : "1"
          }
          pagecount={count}
        />
      </Center>
    </>
  );
}
