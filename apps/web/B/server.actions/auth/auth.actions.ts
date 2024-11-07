"use server";

import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const signUpAction = async (formData: FormData) => {
  // Extract email and password from form data
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  // Initialize Supabase client
  const supabase = createClient();
  const origin = headers().get("origin");

  // Check if email and password exist
  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  // Sign up the user with Supabase
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  // Handle Supabase sign-up error
  if (error) {
    console.error(`${error.code}: ${error}`);
    return encodedRedirect(
      "error",
      "/sign-up",
      "An unexpected error occurred.",
    );
  }

  // Return success message
  return encodedRedirect(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link.",
  );
};

export const googleSignUpAction = async () => {
  const supabase = createClient();
  const origin = headers().get("origin");

  // const { data: { session }, error } = await supabase.auth.getSession();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return encodedRedirect("error", "/sign-up", error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return encodedRedirect("error", "/sign-in", error.message);
  }

  return redirect("/");
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = createClient();
  const origin = headers().get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return encodedRedirect("error", "/forgot-password", "Email is required");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return encodedRedirect(
      "error",
      "/forgot-password",
      "Could not reset password",
    );
  }

  if (callbackUrl) {
    return redirect(callbackUrl);
  }

  return encodedRedirect(
    "success",
    "/forgot-password",
    "Check your email for a link to reset your password.",
  );
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    encodedRedirect(
      "error",
      "/reset-password",
      "Password and confirm password are required",
    );
  }

  if (password !== confirmPassword) {
    encodedRedirect("error", "/reset-password", "Passwords do not match");
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    encodedRedirect("error", "/reset-password", "Password update failed");
  }

  encodedRedirect("success", "/reset-password", "Password updated");
};

export const signOutAction = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
};

export const getUserEmail = async () => {
  // Initialize Supabase client
  const supabase = createClient();

  // Get the current user from Supabase
  const { data, error } = await supabase.auth.getUser();
  console.log(data.user?.email);
  // Handle any potential error
  if (error) {
    console.error("Error retrieving user:", error.message);
    return { error: "Unable to retrieve user" };
  }

  // Check if the user exists and extract the user's email
  if (data) {
    const email = data.user?.email;
    console.log(email);
    return { email };
  } else {
    return { error: "No user is currently signed in" };
  }
};

export const getUserId = async () => {
  // Initialiser le client Supabase
  const supabase = createClient();

  // Récupérer l'utilisateur actuel depuis Supabase
  const { data, error } = await supabase.auth.getUser();

  // Gérer les erreurs potentielles
  if (error) {
    console.error(
      "Erreur lors de la récupération de l'utilisateur :",
      error.message,
    );
    return { error: "Impossible de récupérer l'utilisateur" };
  }

  // Vérifier si l'utilisateur existe et extraire l'ID de l'utilisateur
  if (data) {
    const userId = data.user?.id;
    console.log(userId);
    return { userId };
  } else {
    return { error: "Aucun utilisateur actuellement connecté" };
  }
};

export const isAuthenticated = async () => {
  // Initialize Supabase client
  const supabase = createClient();

  // Get the current session from Supabase
  const { data, error } = await supabase.auth.getSession();

  // Handle any potential error
  if (error) {
    console.error("Error checking authentication:", error.message);
    return false;
  }

  // Check if a session exists, meaning the user is authenticated
  return !!data.session;
};
