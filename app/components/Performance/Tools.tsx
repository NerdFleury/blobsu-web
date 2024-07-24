import { ReadonlyURLSearchParams } from "next/navigation";
import { offset } from "./leaderboardData";
import { data } from "./Types";

async function fetchGlobal({
  sort,
  mode,
  pageNumber,
  offset,
}: {
  sort: string;
  mode: number;
  pageNumber: number;
  offset: number;
}) {
  offset = 50 * (pageNumber - 1);
  let data;
  try {
    const response = await fetch(
      `https://api.blobsu.xyz/v1/get_leaderboard?sort=${sort}&mode=${mode}&limit=50&offset=${offset}`,
      {
        method: "GET",
        cache: "no-store",
      }
    ).then((res) => {
      res;
      return res;
    });
    data = await response.json();
    return data;
  } catch (error) {
    error;
  }
}
export async function getLeaderboard(searchParams: ReadonlyURLSearchParams) {
  let leaderboard = null;
  if (
    !searchParams.has("sort") ||
    !searchParams.has("mode") ||
    !searchParams.has("pagenumber")
  ) {
    const data: data = await fetchGlobal({
      sort: "pp",
      mode: 0,
      pageNumber: 1,
      offset: offset,
    }).then((res) => {
      return res;
    });
    data;

    leaderboard = data;
  } else {
    try {
      const data: data = await fetchGlobal({
        sort: searchParams.get("sort")!,
        mode: parseInt(searchParams.get("mode")!),
        pageNumber: parseInt(searchParams.get("pagenumber")!),
        offset: offset,
      }).then((res) => {
        return res;
      });
      leaderboard = data;
    } catch (error) {
      error;
    }
  }
  return leaderboard;
}
