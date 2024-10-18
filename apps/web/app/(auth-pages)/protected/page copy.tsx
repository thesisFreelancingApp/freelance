import { welcome, welcomeBack } from "@/config/routes";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";

// Journalisation avancée des erreurs
function logError(errorMessage: string, details?: any) {
  console.error(
    `[${new Date().toISOString()}] ERROR: ${errorMessage}`,
    details,
  );
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

export default async function ProtectedPage() {
  const supabase = createClient();
  let isNewUser = false;

  // Récupération de la session avec gestion d'erreurs
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const session = sessionError ? null : sessionData?.session;

  if (!sessionData) {
    logError("Session retrieval failed", sessionError);
    return encodedRedirect(
      "error",
      "/sign-in",
      "Session : An unexpected error occurred.",
    );
  }

  // Récupération de l'utilisateur même en cas d'erreur de session
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) {
    logError("User retrieval failed", userError);
    return encodedRedirect(
      "error",
      "/sign-in",
      "User : An unexpected error occurred.",
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

  try {
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
      // Création d'un nouvel utilisateur
      const newUser = await prisma.authUser.create({
        data: {
          email: email as string,
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
        },
      });
      if (newUser) {
        // console.log("New user created:", newUser);
        isNewUser = true;
      }
    } else {
      // Mise à jour des informations du compte existant si nécessaire
      await updateAccountIfNeeded(
        existingUser,
        provider,
        providers,
        accessToken,
        refreshToken,
        expiresAt,
      );
    }

    // Redirection selon si l'utilisateur est nouveau ou ancien
    if (isNewUser) {
      return encodedRedirect("success", welcome, "Welcome to WaiahuB");
    } else {
      return encodedRedirect("success", welcomeBack, "Welcome Back");
    }
  } catch (error) {
    logError("Error during user/account management", error);
    return encodedRedirect(
      "error",
      "/sign-in",
      "An unexpected error occurred during account processing.",
    );
  }
}
