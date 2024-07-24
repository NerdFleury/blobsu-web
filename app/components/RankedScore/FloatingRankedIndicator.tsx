import std from "@/public/stdlogo.svg";
import mania from "@/public/manialogo.svg";
import taiko from "@/public/taikologo.svg";
import ctb from "@/public/catchlogo.svg";
import ModeSwitch from "../Table/FloatingIndicator";

interface mode {
  name: string;
  mode: string;
  link: string;
}

const data: mode[] = [
  {
    name: "standard",
    mode: std,
    link: "/scorerank?sort=rscore&mode=0&pagenumber=1",
  },
  {
    name: "taiko",
    mode: taiko,
    link: "/scorerank?sort=rscore&mode=1&pagenumber=1",
  },
  {
    name: "catch",
    mode: ctb,
    link: "/scorerank?sort=rscore&mode=2&pagenumber=1",
  },
  {
    name: "mania",
    mode: mania,
    link: "/scorerank?sort=rscore&mode=3&pagenumber=1",
  },
];

export function Mode() {
  return (
    <>
      <ModeSwitch data={data} />
    </>
  );
}
