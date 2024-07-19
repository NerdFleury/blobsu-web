"use client";

import React, { useState } from "react";
import { FloatingIndicator, UnstyledButton } from "@mantine/core";
import classes from "@/app/components/styles/Float.module.css";
import Link from "next/link";
import std from "@/public/stdlogo.svg";
import mania from "@/public/manialogo.svg";
import taiko from "@/public/taikologo.svg";
import ctb from "@/public/catchlogo.svg";
import relax from "@/public/relaxlogo.svg";
import Image from "next/image";
import { Center } from "@mantine/core";
import { useSearchParams } from "next/navigation";

interface mode {
  name: string;
  mode: string;
  link: string;
}

export function ModeSwitch({
  params,
  children,
}: {
  params: { slug: string };
  children: React.ReactNode;
}) {
  const data: mode[] = [
    {
      name: "standard",
      mode: std,
      link: `/user/${params.slug}`,
    },
    {
      name: "taiko",
      mode: taiko,
      link: `/user/${params.slug}/taiko`,
    },
    {
      name: "catch",
      mode: ctb,
      link: `/user/${params.slug}/catch`,
    },
    {
      name: "mania",
      mode: mania,
      link: `/user/${params.slug}/mania`,
    },
    {
      name: "relax",
      mode: relax,
      link: `/user/${params.slug}/relax`,
    },
  ];

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const [active, setActive] = useState(0);

  const setControlRef = (index: number) => (node: HTMLButtonElement) => {
    controlsRefs[index] = node;
    setControlsRefs(controlsRefs);
  };

  const controls = data.map((item, index) => (
    <UnstyledButton
      key={item.name}
      className={classes.control}
      component={Link}
      href={item.link}
      onClick={() => setActive(index)}
      mod={{ active: active === index }}
    >
      <span className={classes.controlLabel}>
        <Image
          width={20}
          height={20}
          src={item.mode}
          alt={item.name}
          priority
        />
      </span>
    </UnstyledButton>
  ));

  return (
    <>
      <Center mt="xl">
        <div className={classes.root} ref={setRootRef}>
          {controls}

          <FloatingIndicator
            target={controlsRefs[active]}
            parent={rootRef}
            className={classes.indicator}
          />
        </div>
      </Center>
      {children}
    </>
  );
}
