"use server";

import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Jimp from "jimp";

export async function UploadAvatar(formData: FormData) {
  console.log(formData.get("image"));

  const image: File = formData.get("image") as File;
  const userid = formData.get("userid");
  const extension = image.name.split(".").pop()!.toLowerCase();
  const buffer = Buffer.from(await image.arrayBuffer());

  if (image.size > 4e6 || image.size === 0) {
    return;
  }

  const isJPEG = extension === "jpg" || extension === "jpeg";
  const newPath = process.env.PATH_TO_FILE! + userid?.toString() + ".png";

  try {
    let finalBuffer = buffer;

    if (isJPEG) {
      const jimpImage = await Jimp.read(buffer);
      finalBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);
    }

    await writeFile(newPath, finalBuffer);
    console.log("Image saved!");
  } catch (error) {
    console.error("Error saving image:", error);
    return;
  }

  revalidatePath("/", "layout");
  redirect("https://www.blobsu.xyz/settings");
}
