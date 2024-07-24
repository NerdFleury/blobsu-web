"use client";

import TopPlaysTable from "@/app/components/TopPlays/TopPlaysTable";
import { useParams, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "./loading";
import ModeSwitch from "@/app/components/Table/FloatingIndicator";
import { Stack, Title } from "@mantine/core";
import std from "@/public/stdlogo.svg";
import mania from "@/public/manialogo.svg";
import taiko from "@/public/taikologo.svg";
import ctb from "@/public/catchlogo.svg";
import relax from "@/public/relaxlogo.svg";

interface mode {
  name: string;
  mode: string;
  link: string;
}

const data: mode[] = [
  {
    name: "standard",
    mode: std,
    link: "/topplays?mode=0&page=1",
  },
  {
    name: "taiko",
    mode: taiko,
    link: "/topplays?mode=1&page=1",
  },
  {
    name: "catch",
    mode: ctb,
    link: "/topplays?mode=2&page=1",
  },
  {
    name: "mania",
    mode: mania,
    link: "/topplays?mode=3&page=1",
  },
  {
    name: "relax",
    mode: relax,
    link: "/topplays?mode=4&page=1",
  },
];

export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    searchParams;
  }, [searchParams]);
  return (
    <>
      <Stack align="center" mb={"3em"} mt={"2em"}>
        <Title>Global Top Plays</Title>
        <ModeSwitch data={data} />
      </Stack>
      <Suspense fallback={<Loading />}>
        <TopPlaysTable
          mode={searchParams.has("mode") ? searchParams.get("mode")! : "0"}
          slug={searchParams.has("page") ? searchParams.get("page")! : "1"}
        />
      </Suspense>
    </>
  );
}
