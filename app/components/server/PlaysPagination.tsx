"use client";

import { Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function PlaysPagination({
  mode,
  slug,
  pagecount,
}: {
  mode: string;
  slug: string;
  pagecount: number;
}) {
  const router = useRouter();

  return (
    <Pagination
      value={parseInt(slug)}
      onChange={(e) => router.push(`/topplays/${parseInt(mode)}/${e}`)}
      total={pagecount}
      radius="xl"
      withControls={false}
    />
  );
}
