import {
  TableScrollContainer,
  Text,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  UnstyledButton,
  Center,
} from "@mantine/core";
import { redirect } from "next/navigation";
import PlaysPagination from "./PlaysPagination";
import { getTopPlays } from "@/app/lib/getTopPlays";
import { useEffect, useState } from "react";

interface TableElement {
  TableArray: TableArray[];
  pagecount: number;
}

interface TableArray {
  pp: number;
  acc: number;
  mods: number;
  name: string;
  title: string;
  version: string;
}

const MODS = {
  NM: 0,
  NF: 1 << 0,
  EZ: 1 << 1,
  TD: 1 << 2, // old: 'NOVIDEO'
  HD: 1 << 3,
  HR: 1 << 4,
  SD: 1 << 5,
  DT: 1 << 6,
  RX: 1 << 7,
  HT: 1 << 8,
  NC: 1 << 9,
  FL: 1 << 10,
  AT: 1 << 11,
  SO: 1 << 12,
  AP: 1 << 13,
  PF: 1 << 14,
  "4K": 1 << 15,
  "5K": 1 << 16,
  "6K": 1 << 17,
  "7K": 1 << 18,
  "8K": 1 << 19,
  FADEIN: 1 << 20,
  RANDOM: 1 << 21,
  CINEMA: 1 << 22,
  TARGET: 1 << 23,
  KEY9: 1 << 24,
  KEYCOOP: 1 << 25,
  KEY1: 1 << 26,
  KEY3: 1 << 27,
  KEY2: 1 << 28,
  SCOREV2: 1 << 29,
  MR: 1 << 30,
};

function pageCount(count: number) {
  let pagecount = Math.ceil(count / 50);

  if (pagecount > 10) {
    pagecount = 10;
  }
  return pagecount;
}

function getMods(bitmask: number): string[] {
  const activeMods: string[] = [];

  for (const [modName, modValue] of Object.entries(MODS)) {
    if ((bitmask & modValue) !== 0) {
      activeMods.push(modName);
    }
  }

  return activeMods;
}

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

  const [data, setData] = useState<TableElement>();

  useEffect(() => {
    const fetchData = async () => {
      const res: TableElement = (await getTopPlays({
        slug: slug,
        mode: mode,
      })) as TableElement;
      setData(res);
    };
    fetchData().catch((e) => {});
  }, [mode, slug]);

  const page = (parseInt(slug) - 1) * 50;

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
              <TableTh>Player</TableTh>
              <TableTh>Score</TableTh>
              <TableTh>Mods</TableTh>
              <TableTh>Accuracy</TableTh>
              <TableTh>PP</TableTh>
            </TableTr>
          </TableThead>
          <TableTbody style={{ backgroundColor: "#042b30" }}>
            {data
              ? data.TableArray.map((player, index) => (
                  <TableTr key={index}>
                    <TableTd fw={500}>#{page + index + 1}</TableTd>
                    <TableTd fw={500}>{player.name}</TableTd>
                    <TableTd fw={500}>
                      {player.title}
                      <br />
                      <Text size="sm" c="dimmed">
                        {player.version}
                      </Text>
                    </TableTd>

                    <TableTd fw={500}>{getMods(player.mods)}</TableTd>
                    <TableTd fw={500}>{player.acc.toFixed(2)}%</TableTd>
                    <TableTd fw={500}>{player.pp.toFixed(2)}pp</TableTd>
                  </TableTr>
                ))
              : null}
          </TableTbody>
        </Table>
      </TableScrollContainer>
      <Center mt="lg" mb="xl">
        {data ? (
          <PlaysPagination
            slug={slug}
            mode={mode}
            pagecount={pageCount(data.pagecount)}
          />
        ) : null}
      </Center>
    </div>
  );
}
