import { MODS } from "./Constants";
import { ApiResponse, ApiResponseScores, Score, ScoreTable } from "./Types";

export function formatRelativeTime(seconds: number) {
  const d = new Date();
  seconds = d.getTime() / 1000 - seconds;
  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (let unit of units) {
    if (seconds >= unit.seconds) {
      const value = Math.floor(seconds / unit.seconds);
      return `Last seen ${value} ${unit.label}${value > 1 ? "s ago" : " ago"}`;
    }
  }
  return "Currently Online";
}
export function formatToMonthsAndYears(seconds: number) {
  const startDate = new Date(1970, 0, 1);
  const targetDate = new Date(startDate.getTime() + seconds * 1000);

  const year = targetDate.getUTCFullYear();
  const month = targetDate.getUTCMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return `${monthNames[month]} ${year}`;
}
export async function fetchUserData({ userId }: { userId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PLAYER_INFO}?scope=all&id=${userId}`,
    {
      method: "GET",
    }
  );
  const data: ApiResponse = await response.json();
  data;
  return data;
}
export async function fetchTopPlays({
  userId,
  mode,
}: {
  userId: string;
  mode: number;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PLAYER_SCORES}?scope=best&id=${userId}&limit=20&mode=${mode}`,
    {
      method: "GET",
    }
  );
  const data: ApiResponseScores = await response.json();
  return data;
}
export function necessaryData(rawData: Score[]) {
  const newScores: ScoreTable[] = rawData.map((score) => ({
    scoreid: score.id,
    mapName: score.beatmap.title,
    mapDifficulty: score.beatmap.version,
    mods: score.mods,
    accuracy: score.acc,
    pp: score.pp,
  }));
  return newScores;
}
export function getMods(bitmask: number): string[] {
  const activeMods: string[] = [];

  for (const [modName, modValue] of Object.entries(MODS)) {
    if ((bitmask & modValue) !== 0) {
      activeMods.push(modName);
    }
  }

  return activeMods;
}

export function convertSeconds(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return {
    hours: hours,
    minutes: minutes,
  };
}
