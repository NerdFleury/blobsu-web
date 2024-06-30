"use client";

import { Title } from "@mantine/core";

export default function LeaderboardTable({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Title>Global Leaderboards</Title>
      {children}
    </>
  );
}
