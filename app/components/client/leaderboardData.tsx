import {
  Table,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  TableTr,
  Title,
  Center,
} from "@mantine/core";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface leaderboard {
  player_id: number;
  name: string;
  country: string;
  tscore: number;
  rscore: number;
  pp: number;
  plays: number;
  playtime: number;
  acc: number;
  max_combo: number;
  xh_count: number;
  x_count: number;
  sh_count: number;
  s_count: number;
  a_count: number;
  clan_id: number | null;
  clan_name: string | null;
  clan_tag: string | null;
}

interface data {
  status: string;
  leaderboard: leaderboard[];
}

let offset = 0;

async function fetchGlobal({
  sort,
  mode,
  pageNumber,
}: {
  sort: string;
  mode: number;
  pageNumber: number;
}) {
  offset = 50 * (pageNumber - 1);
  try {
    const response = await fetch(
      `https://api.blobsu.xyz/v1/get_leaderboard?sort=${sort}&mode=${mode}&limit=50&offset=${offset}`,
      {
        method: "GET",
      }
    ).then((res) => {
      console.log(res);
      return res;
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function getLeaderboard(searchParams: ReadonlyURLSearchParams) {
  let leaderboard = null;
  if (
    !searchParams.has("sort") ||
    !searchParams.has("mode") ||
    !searchParams.has("pagenumber")
  ) {
    const data: data = await fetchGlobal({
      sort: "pp",
      mode: 0,
      pageNumber: 1,
    }).then((res) => {
      return res;
    });
    console.log(data);

    leaderboard = data;
  } else {
    try {
      const data: data = await fetchGlobal({
        sort: searchParams.get("sort")!,
        mode: parseInt(searchParams.get("mode")!),
        pageNumber: parseInt(searchParams.get("pagenumber")!),
      }).then((res) => {
        return res;
      });
      leaderboard = data;
    } catch (error) {
      console.log(error);
    }
  }
  return leaderboard;
}

export default function Leaderboard({
  searchParams,
}: {
  searchParams: ReadonlyURLSearchParams;
}) {
  const [leaderboard, setLeaderboard] = useState<data>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await getLeaderboard(searchParams);
      setLeaderboard(res!);
    };

    fetchData().catch((e) => {
      console.error("an error has occured");
    });
  }, []);

  return (
    <div>
      <Center mb={"3em"} mt={"2em"}>
        <Title>Global Leaderboards</Title>
      </Center>
      <Table align="center" maw={"80%"}>
        <TableThead>
          <TableTr>
            <TableTh>Rank</TableTh>
            <TableTh>Country</TableTh>
            <TableTh>Player</TableTh>
            <TableTh>Play Count</TableTh>
            <TableTh>Accuracy</TableTh>
            <TableTh>Performance Points</TableTh>
          </TableTr>
        </TableThead>
        <TableTbody>
          {leaderboard
            ? leaderboard.leaderboard.map((player, index) => (
                <TableTr key={player.name}>
                  <TableTd>#{offset + index + 1}</TableTd>
                  <TableTd>{player.country}</TableTd>
                  <TableTd>{player.name}</TableTd>
                  <TableTd>{player.plays}</TableTd>
                  <TableTd>{player.acc.toFixed(2)}%</TableTd>
                  <TableTd>{player.pp}</TableTd>
                </TableTr>
              ))
            : null}
        </TableTbody>
      </Table>
    </div>
  );
}
