import {
  Table,
  TableScrollContainer,
  TableTbody,
  TableTd,
  TableTh,
  TableThead,
  Text,
  TableTr,
  UnstyledButton,
} from "@mantine/core";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
  let data;
  try {
    const response = await fetch(
      `https://api.blobsu.xyz/v1/get_leaderboard?sort=${sort}&mode=${mode}&limit=50&offset=${offset}`,
      {
        method: "GET",
        cache: "no-store",
      }
    ).then((res) => {
      res;
      return res;
    });
    data = await response.json();
    return data;
  } catch (error) {
    error;
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
    data;

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
      error;
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

    fetchData().catch((e) => {});
  }, [searchParams]);

  return (
    <div style={{ paddingLeft: 10 }}>
      <TableScrollContainer minWidth={510} type="native">
        <Table
          align="center"
          maw={"60%"}
          striped
          stripedColor="#053f47"
          highlightOnHover
          withRowBorders={false}
        >
          <TableThead>
            <TableTr>
              <TableTh>Rank</TableTh>
              <TableTh>Country</TableTh>
              <TableTh>Player</TableTh>
              <TableTh>Play Count</TableTh>
              <TableTh>Accuracy</TableTh>
              <TableTh>PP</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody style={{ backgroundColor: "#042b30" }}>
            {leaderboard
              ? leaderboard.leaderboard.map((player, index) => (
                  <TableTr key={player.name}>
                    <TableTd fw={500}>#{offset + index + 1}</TableTd>
                    <TableTd>
                      <Image
                        src={`https://flagcdn.com/w40/${player.country}.png`}
                        width={24}
                        height={16}
                        alt={player.country}
                      />
                    </TableTd>

                    <TableTd>
                      {" "}
                      <UnstyledButton
                        component={Link}
                        href={`/user/${player.player_id}`}
                        fw={500}
                      >
                        {player.name}
                      </UnstyledButton>
                    </TableTd>

                    <TableTd fw={500}>{player.plays}</TableTd>
                    <TableTd fw={500}>{player.acc.toFixed(2)}%</TableTd>
                    <TableTd fw={500}>{player.pp}</TableTd>
                  </TableTr>
                ))
              : null}
          </TableTbody>
        </Table>
      </TableScrollContainer>
      <Text mt="xl"></Text>
    </div>
  );
}
