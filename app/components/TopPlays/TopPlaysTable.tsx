"use client";

import { Center, TableData } from "@mantine/core";
import { redirect } from "next/navigation";
import { getTopPlays } from "@/app/lib/getTopPlays";
import { useEffect, useState } from "react";
import TablePagination from "../Table/Pagination";
import LeaderboardSkeleton from "../Table/Leaderboard";
import { pageCount } from "./Tools";
import { getMods } from "../Profile/Tools";
import { TableElement } from "./Types";

export default function TopPlaysTable({
  mode,
  slug,
}: {
  mode: string;
  slug: string;
}) {
  if (isNaN(parseInt(mode)) || isNaN(parseInt(slug))) {
    redirect("/");
  }

  const [data, setData] = useState<TableData[]>();
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res: TableElement = (await getTopPlays({
        slug: slug,
        mode: mode,
      })) as TableElement;
      const changedata: TableData[] = res.TableArray.map((player) => ({
        Player: player.name,
        Title: `${player.title} [${player.version}]`,
        PP: player.pp.toFixed(2),
        Mods: getMods(player.mods),
        Accuracy: `${player.acc.toFixed(2)}%`,
      })) as TableData[];

      setData(changedata);
      setCount(res.pagecount / 50);
    };

    fetchData().catch((e) => {});
  }, [mode, slug]);

  return (
    <>
      {data ? <LeaderboardSkeleton data={data} /> : null}
      <Center mt="lg" mb="xl">
        {data ? (
          <TablePagination
            route="topplays"
            currentpage={slug}
            mode={mode}
            pagecount={count < 10 ? count : 10}
          />
        ) : null}
      </Center>
    </>
  );
}
