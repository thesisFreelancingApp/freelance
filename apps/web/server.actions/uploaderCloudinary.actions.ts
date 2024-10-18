"use server";

import cloudinary from "@/lib/cloudinary";
export async function uploadProfilePicture(file) {
  "use server";

  if (!file) throw new Error("No file uploaded");

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload vers Cloudinary
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "profile_pictures",
          upload_preset: "testpresets",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        },
      )
      .end(buffer);
  });
  // console.log(result);
  // revalidatePath("/");
  return result.secure_url;
}
