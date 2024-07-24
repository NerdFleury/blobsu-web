"use server";

import pool from "./mysql";

export async function getUserCount({ mode }: { mode: number }) {
  try {
    let gamemode = mode;
    if (isNaN(mode)) {
      gamemode = 0;
    }
    const db = await pool.getConnection();
    const query =
      "SELECT count(id) FROM stats where mode=? and rscore>0 LIMIT 100";
    let rows = (await db.query(query, [gamemode.toString()])) as any;
    db.release();
    return rows[0][0];
  } catch (error) {
    console.log(error);
    return { "count(id)": 1 };
  }
}
