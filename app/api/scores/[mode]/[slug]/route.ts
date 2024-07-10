"use server";

import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/mysql";
import { redirect } from "next/navigation";

interface score {
  userid: number;
  pp: number;
  acc: number;
  mods: number;
  map_md5: string;
}

function onlyUnique(value: any, index: any, array: string | any[]) {
  return array.indexOf(value) === index;
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string; mode: string } }
) {
  try {
    let page = parseInt(params.slug);
    if (page > 10) {
      page = 10;
    }
    let modequery = parseInt(params.mode);
    if (typeof page !== "number" || page > 1000000 || page < 1) {
      page = 1;
    }
    if (typeof modequery !== "number" || modequery > 8 || modequery < 0) {
      modequery = 0;
    }

    const lowerlimit = (page - 1) * 50;

    const db = await pool.getConnection();
    const query =
      "SELECT userid, pp, acc, mods, map_md5 FROM scores WHERE mode = ? and status = 2 ORDER BY pp desc LIMIT 50 offset ?;";
    let [rows]: any = await db.query(query, [modequery, lowerlimit]);

    let id = [];
    for (let x of rows) {
      id.push(x.userid);
    }
    let md5 = [];
    for (let x of rows) {
      md5.push(x.map_md5);
    }
    let index = 0;

    let uniqueid = id.filter(onlyUnique);

    for (let userid of uniqueid) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_PLAYER_INFO}?scope=info&id=${userid}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
      let nindex = 0;
      for (let x of rows) {
        if (data.player.info.id == x.userid) {
          x.name = data.player.info.name;
        }
        nindex++;
      }
      index = index + 1;
    }

    index = 0;

    for (let map_md5 of md5) {
      const response = await fetch(
        `${process.env.V1_API}/get_map_info?md5=${map_md5}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      rows[index].title = data.map.title;
      rows[index].version = data.map.version;
      index = index + 1;
    }
    const pagecount = "select count(*) as pagecount from scores where mode=?";
    const [pagecountrows]: any = await db.query(pagecount, [modequery]);
    const data = {
      pagecount: pagecountrows[0].pagecount,
      TableArray: rows,
    };

    db.release();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    console.log(NextResponse.json(error));
    return NextResponse.json(error);
  }
}
