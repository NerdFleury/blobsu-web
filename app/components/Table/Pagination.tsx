"use client";

import { Pagination } from "@mantine/core";
import { useRouter } from "next/navigation";

export default function TablePagination({
  mode,
  currentpage,
  pagecount,
  route,
}: {
  mode: string;
  currentpage: string;
  pagecount: number;
  route: string;
}) {
  const router = useRouter();

  return (
    <Pagination
      value={parseInt(currentpage)}
      onChange={(e) =>
        router.push(`/${route}?mode=${parseInt(mode)}&page=${e}`)
      }
      total={pagecount}
      bd={0}
      mb="xl"
      radius="md"
      withControls={false}
    />
  );
}
