"use server";
import { welcomeBack, welcome } from "@/config/routes";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";
import { NextResponse } from "next/server";

// Advanced error logging
function logError(errorMessage: string, details?: any) {
  console.error(
    `[${new Date().toISOString()}] ERROR: ${errorMessage}`,
    details,
  );
}

// Utility function to get session and user
async function fetchSessionAndUser(supabase: any) {
  const [
    { data: sessionData, error: sessionError },
    { data: userData, error: userError },
  ] = await Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]);

  if (sessionError) logError("Session retrieval failed", sessionError);
  if (userError) logError("User retrieval failed", userError);

  return { sessionData, userData, sessionError, userError };
}

// Update account only if data has changed
async function updateAccountIfNeeded(
  existingUser: any,
  provider: string,
  providers: string[],
  accessToken: string | null,
  refreshToken: string | null,
  expiresAt: number | null,
) {
  const account = existingUser.account;

  const shouldUpdate =
    account.lastProvider !== provider ||
    JSON.stringify(account.providers) !== JSON.stringify(providers) ||
    account.accessToken !== accessToken ||
    account.refreshToken !== refreshToken ||
    account.expiresAt !== expiresAt;

  if (shouldUpdate) {
    await prisma.account.update({
      where: { userEmail: existingUser.email },
      data: {
        lastProvider: provider,
        providers,
        accessToken,
        refreshToken,
        expiresAt,
      },
    });

    console.log("Account updated for user:", existingUser.email);
  } else {
    console.log("No updates needed for user:", existingUser.email);
  }
}

// Main function that handles GET request
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  const supabase = createClient();
  let isNewUser = false;

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { sessionData, userData, sessionError, userError } =
    await fetchSessionAndUser(supabase);

  const session = sessionError ? null : sessionData?.session;
  const user = userData?.user;

  if (!session || !user) {
    return encodedRedirect(
      "error",
      "/sign-in",
      "An unexpected error occurred. Please try again.",
    );
  }

  const provider = session?.user?.app_metadata?.provider || "email";
  const fullName = user.user_metadata?.full_name || "Anonymous";
  const providers = session?.user?.app_metadata?.providers || ["email"];
  const providerAccountId = user.id || user.user_metadata?.provider_id;
  const accessToken = session?.access_token || null;
  const refreshToken = session?.refresh_token || null;
  const expiresAt = session?.expires_at || null;
  const email = user.email;

  const existingUser = await prisma.authUser.findUnique({
    where: { email },
    select: {
      email: true,
      account: {
        select: {
          lastProvider: true,
          providers: true,
          accessToken: true,
          refreshToken: true,
          expiresAt: true,
        },
      },
    },
  });

  if (!existingUser) {
    const newUser = await prisma.authUser.create({
      data: {
        id: user.id,
        email,
        name: fullName,
        username: "user" + user.id,
        role: "USER",
        account: {
          create: {
            providerAccountId,
            lastProvider: provider,
            providers,
            accessToken,
            refreshToken,
            expiresAt,
          },
        },
        profile: {
          create: {
            userEmail: email,
            // You can add more profile fields here if needed
          },
        },
      },
    });
    if (newUser) {
      isNewUser = true;
    }
  } else {
    await updateAccountIfNeeded(
      existingUser,
      provider,
      providers,
      accessToken,
      refreshToken,
      expiresAt,
    );
  }

  if (redirectTo) {
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  return isNewUser
    ? NextResponse.redirect(`${origin}${welcome}`)
    : NextResponse.redirect(`${origin}${welcomeBack}`);
}
