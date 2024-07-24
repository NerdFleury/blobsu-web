"use client";
export function pageCount(count: number) {
  let pagecount = Math.ceil(count / 50);

  if (pagecount > 10) {
    pagecount = 10;
  }
  return pagecount;
}
