"use client";

import Pagination from "@/app/components/Table/Pagination";

export default function PlaysPagination({
  mode,
  slug,
  pagecount,
}: {
  mode: string;
  slug: string;
  pagecount: number;
}) {
  return (
    <Pagination
      route="topplays"
      mode={mode}
      pagecount={10}
      currentpage={slug}
    />
  );
}
