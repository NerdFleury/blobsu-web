"use server";

import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

export async function UploadAvatar(formData: FormData) {
  console.log(formData.get("image"));

  const image: File = formData.get("image") as File;
  const userid = formData.get("userid");
  const extension = image.name.split(".").pop();
  const buffer = Buffer.from(await image.arrayBuffer());

  console.log(userid);
  console.log(extension);

  if (image.size > 5e6 || image.size == 0) {
    return;
  }

  const path = process.env.PATH_TO_FILE! + userid?.toString() + "." + extension;

  console.log(path);

  try {
    await writeFile(path, buffer);
    return NextResponse.json({ Message: "Success", status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
}
