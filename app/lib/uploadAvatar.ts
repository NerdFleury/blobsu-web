"use server";

import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";

export async function UploadAvatar(formData: FormData) {
  console.log(formData.get("image"));

  const image: File = formData.get("image") as File;
  const userid = formData.get("userid");
  const extension = image.name.split(".").pop();
  const buffer = Buffer.from(await image.arrayBuffer());

  if (image.size > 4e6 || image.size == 0) {
    return;
  }

  let path = process.env.PATH_TO_FILE! + userid?.toString();

  try {
    let processedBuffer = buffer;
    if (
      extension!.toLowerCase() === "jpg" ||
      extension!.toLowerCase() === "jpeg"
    ) {
      path += ".png";
      processedBuffer = await sharp(buffer).png().toBuffer();
    } else {
      path += "." + extension;
    }

    await writeFile(path, processedBuffer);
    console.log("I win?");
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/settings");
}
