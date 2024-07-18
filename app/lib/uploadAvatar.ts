"use server";

import { writeFile, unlink } from "fs/promises";
import { readdir } from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import path from "path";

export async function UploadAvatar(formData: FormData) {
  console.log(formData.get("image"));

  const image: File = formData.get("image") as File;
  const userid = formData.get("userid");
  const extension = image.name.split(".").pop()!.toLowerCase();
  const buffer = Buffer.from(await image.arrayBuffer());

  if (image.size > 4e6 || image.size == 0) {
    return;
  }

  const uploadPath = process.env.PATH_TO_FILE!;
  const newFilePath = path.join(uploadPath, `${userid}.${extension}`);

  try {
    // Delete any other image files with the same name but different extensions
    const files = await readdir(uploadPath);
    const baseFileName = userid?.toString();

    for (const file of files) {
      const fileExtension = path.extname(file).toLowerCase();
      const fileNameWithoutExtension = path.basename(file, fileExtension);

      if (
        fileNameWithoutExtension === baseFileName &&
        fileExtension !== `.${extension}` &&
        (fileExtension === ".jpeg" ||
          fileExtension === ".jpg" ||
          fileExtension === ".png")
      ) {
        await unlink(path.join(uploadPath, file));
      }
    }

    await writeFile(newFilePath, buffer);
    console.log("File uploaded successfully");
  } catch (error) {
    console.log(error);
    return;
  }
  redirect("/settings");
}
