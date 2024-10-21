import { welcome, welcomeBack } from "@/config/routes";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";
import { redirect } from "next/navigation";

// Journalisation avancée des erreurs
function logError(errorMessage: string, details?: any) {
  console.error(
    `[${new Date().toISOString()}] ERROR: ${errorMessage}`,
    details,
  );
}

// Fonction utilitaire pour récupérer la session et l'utilisateur
async function fetchSessionAndUser(supabase: any) {
  console.log("new in");
  const [
    { data: sessionData, error: sessionError },
    { data: userData, error: userError },
  ] = await Promise.all([supabase.auth.getSession(), supabase.auth.getUser()]);

  if (sessionError) logError("Session retrieval failed", sessionError);
  if (userError) logError("User retrieval failed", userError);

  return { sessionData, userData, sessionError, userError };
}

// Met à jour le compte uniquement si les données ont changé
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
    const updatedUser = await prisma.account.update({
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

export default async function ProtectedPage() {
  const supabase = createClient();
  let isNewUser = false;

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
  const fullName = user.user_metadata?.full_name || "Waia";
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
        email,
        name: fullName,
        id: user.id,
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
            username: "user" + user.id,
            userEmail: email,
            role: "user",
          },
        },
      },
    });
    if (newUser) {
      // console.log("New user created:", newUser);
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

  return isNewUser
    ? redirect(welcome + `?email=${email}`)
    : encodedRedirect("success", welcomeBack, "Welcome Back");
}
