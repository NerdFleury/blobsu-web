"use client";

import ModeSwitch from "../Table/FloatingIndicator";
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
    link: "/topplays/0/1",
  },
  {
    name: "taiko",
    mode: taiko,
    link: "/topplays/1/1",
  },
  {
    name: "catch",
    mode: ctb,
    link: "/topplays/2/1",
  },
  {
    name: "mania",
    mode: mania,
    link: "/topplays/3/1",
  },
  {
    name: "relax",
    mode: relax,
    link: "/topplays/4/1",
  },
];

export function Mode() {
  return <ModeSwitch data={data} />;
}
