export async function fetchGlobal({
  sort,
  mode,
  pageNumber,
}: {
  sort: string;
  mode: number;
  pageNumber: number;
}) {
  const offset = 50 * (pageNumber - 1);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_LEADERBOARD}?sort=${sort}&mode=${mode}&limit=50&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
