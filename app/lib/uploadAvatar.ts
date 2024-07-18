"use server";

import { writeFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createCanvas, loadImage } from "canvas";

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

  if (isJPEG) {
    try {
      // Create a canvas and draw the image on it
      const canvas = createCanvas(0, 0);
      const ctx = canvas.getContext("2d");
      const img = await loadImage(buffer);

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Convert the canvas to a buffer
      const pngBuffer = canvas.toBuffer("image/png");

      await writeFile(newPath, pngBuffer);
      console.log("Image converted and saved!");
    } catch (error) {
      console.error("Error during image conversion:", error);
      return;
    }
  } else {
    try {
      await writeFile(newPath, buffer);
      console.log("Image saved without conversion!");
    } catch (error) {
      console.error("Error saving image:", error);
      return;
    }
  }

  revalidatePath("/settings, layout");
  redirect("/settings");
}
