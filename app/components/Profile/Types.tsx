interface Beatmap {
  md5: string;
  id: number;
  set_id: number;
  artist: string;
  title: string;
  version: string;
  creator: string;
  last_update: string;
  total_length: number;
  max_combo: number;
  status: number;
  plays: number;
  passes: number;
  mode: number;
  bpm: number;
  cs: number;
  od: number;
  ar: number;
  hp: number;
  diff: number;
}
export interface Score {
  id: number;
  score: number;
  pp: number;
  acc: number;
  max_combo: number;
  mods: number;
  n300: number;
  n100: number;
  n50: number;
  nmiss: number;
  ngeki: number;
  nkatu: number;
  grade: string;
  status: number;
  mode: number;
  play_time: string;
  time_elapsed: number;
  perfect: number;
  beatmap: Beatmap;
}
interface PlayerInfo {
  id: number;
  name: string;
  safe_name: string;
  priv: number;
  country: string;
  silence_end: number;
  donor_end: number;
  creation_time: number;
  latest_activity: number;
  clan_id: number;
  clan_priv: number;
  preferred_mode: number;
  play_style: number;
  custom_badge_name: string | null;
  custom_badge_icon: string | null;
  userpage_content: string | null;
}
export interface ScoreTable {
  scoreid: number;
  mapName: string;
  mapDifficulty: string;
  mods: number;
  accuracy: number;
  pp: number;
  set_id: number;
  rank: string;
}
interface PlayerStats {
  id: number;
  mode: number;
  tscore: number;
  rscore: number;
  pp: number;
  plays: number;
  playtime: number;
  acc: number;
  max_combo: number;
  total_hits: number;
  replay_views: number;
  xh_count: number;
  x_count: number;
  sh_count: number;
  s_count: number;
  a_count: number;
  rank: number;
  country_rank: number;
}
export interface Player {
  info: PlayerInfo;
  stats: {
    [key: string]: PlayerStats;
  };
}
export interface ApiResponse {
  status: string;
  player: Player;
}
interface PlayerScores {
  id: number;
  name: string;
  clan: string | null;
}
export interface ApiResponseScores {
  status: string;
  scores: Score[];
  player: PlayerScores;
}

export interface MostPlayedSingle {
  md5: string;
  id: number;
  set_id: number;
  status: number;
  artist: string;
  title: string;
  version: string;
  creator: string;
  plays: number;
}

export interface MostPlayedObject {
  status: "string";
  maps: MostPlayedSingle[];
}
