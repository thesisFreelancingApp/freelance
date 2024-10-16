"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";

export const getSession = async () => {
  // Initialize Supabase client
  const supabase = createClient();

  const { data: session, error } = await supabase.auth.getSession();
  return session;
};

export const getUserDB = async () => {
  const user = await prisma.authUser.findUnique({
    where: { email: "mak.prod07@gmail.com" },
    include: { profile: true },
  });
  return user;
};
