// app/upload/actions.ts

import { createClient } from "@/lib/supabase/client";
import { nanoid } from "nanoid";

export async function uploadImage(file: File): Promise<string> {
  const supabase = createClient();
  const bucketName = "files";
  const filePath = `uploads/${nanoid()}.${file.name.split(".").pop()}`;

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file);

  if (error) {
    throw new Error(`Erreur lors de l'upload : ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(bucketName)
    .getPublicUrl(filePath);

  // console.log("-----------------", urlData.publicUrl, "-----------------");
  if (!urlData) {
    throw new Error("Impossible d'obtenir l'URL publique des fichers");
  }

  return urlData.publicUrl;
}
