import { useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "@/app/components/styles/Float.module.css";
import Link from "next/link";
import std from "@/public/stdlogo.svg";
import mania from "@/public/manialogo.svg";
import taiko from "@/public/taikologo.svg";
import ctb from "@/public/catchlogo.svg";
import relax from "@/public/relaxlogo.svg";
import Image from "next/image";

interface mode {
  name: string;
  mode: string;
  link: string;
}

const data: mode[] = [
  {
    name: "standard",
    mode: std,
    link: "/leaderboard?sort=pp&mode=0&pagenumber=1",
  },
  {
    name: "taiko",
    mode: taiko,
    link: "/leaderboard?sort=pp&mode=1&pagenumber=1",
  },
  {
    name: "catch",
    mode: ctb,
    link: "/leaderboard?sort=pp&mode=2&pagenumber=1",
  },
  {
    name: "mania",
    mode: mania,
    link: "/leaderboard?sort=pp&mode=3&pagenumber=1",
  },
  {
    name: "relax",
    mode: relax,
    link: "/leaderboard?sort=pp&mode=4&pagenumber=1",
  },
];

export function ModeSwitch() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<number, HTMLAnchorElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLAnchorElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item.name}
      className={classes.control}
      component={Link}
      href={item.link}
      ref={setControlRef(index)}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>
        <Image width={20} height={20} src={item.mode} alt={item.name} />
      </span>
    </UnstyledButton>
  ));

  return (
    <div className={classes.root} ref={setRootRef}>
      {controls}

      <FloatingIndicator
        target={controlsRefs[active]}
        parent={rootRef}
        className={classes.indicator}
      />
    </div>
  );
}