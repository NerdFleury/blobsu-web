"use client";

import TopPlaysTable from "@/app/components/server/TopPlaysTable";
import { useParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { ModeSwitch } from "@/app/components/client/FloatingTopIndicator";
import { Stack, Title } from "@mantine/core";

export default function Page() {
  const params = useParams<{ mode: string; slug: string }>();

  return (
    <>
      <Stack align="center" mb={"3em"} mt={"2em"}>
        <Title>Global Top Plays</Title>
        <ModeSwitch />
      </Stack>
      <Suspense fallback={<Loading />}>
        <TopPlaysTable mode={params.mode} slug={params.slug} />
      </Suspense>
    </>
  );
}
