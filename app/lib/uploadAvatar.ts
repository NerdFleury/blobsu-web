"use server";

import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCanvas, loadImage } from "canvas";

export async function UploadAvatar(formData: FormData) {
  console.log(formData.get("image"));

  const image: File = formData.get("image") as File;
  const userid = formData.get("userid");
  const extension = image.name.split(".").pop();
  const buffer = Buffer.from(await image.arrayBuffer());

  if (image.size > 4e6 || image.size === 0) {
    return;
  }

  let newBuffer;
  if (extension === "jpg" || extension === "jpeg") {
    try {
      const img = await loadImage(buffer);
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext("2d");

      ctx.drawImage(img, 0, 0);
      newBuffer = canvas.toBuffer("image/png");
    } catch (error) {
      console.log("Error during image conversion:", error);
      return;
    }
  } else {
    newBuffer = buffer;
  }

  const path = process.env.PATH_TO_FILE! + userid?.toString() + ".png";

  try {
    await writeFile(path, newBuffer);
    console.log("I win?");
  } catch (error) {
    console.log(error);
    return;
  }
  revalidatePath("/settings, layout");
  redirect("/settings");
}
