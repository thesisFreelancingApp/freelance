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
  const supabase = createClient();
  const { data: user, error: authError } = await supabase.auth.getUser();

  if (authError || !user?.user?.email) {
    console.error("Error fetching user from Supabase:", authError);
    return null;
  }

  const dbUser = await prisma.authUser.findUnique({
    where: { email: user.user.email },
    include: { profile: true },
  });

  if (!dbUser) {
    console.error("No user found in the database for the given email");
  }

  return dbUser;
};

export const getUser = async () => {
  // Initialize Supabase client
  const supabase = createClient();

  const { data: user, error } = await supabase.auth.getUser();

  return user.user;
};
