import { welcome, welcomeBack } from "@/config/routes";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";
export default async function ProtectedPage() {
  const supabase = createClient();
  let isNewUser = false;

  // Récupération de la session avec gestion d'erreurs
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  const session = sessionError ? null : sessionData?.session;

  if (!sessionData) {
    console.error("session error", sessionError);
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
    console.error("user error", userError);
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
  const email = user.email;

  const existingUser = await prisma.authUser.findUnique({
    where: { email },
    include: { account: true },
  });

  if (!existingUser) {
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
            accessToken: accessToken,
            refreshToken: refreshToken,
            expiresAt: session?.expires_at || null,
          },
        },
      },
    });
    if (newUser) {
      console.log("---- New user has been added:", newUser);

      isNewUser = true;
    }
  } else {
    const updatedUser = await prisma.account.update({
      where: { userEmail: existingUser.email },
      data: {
        lastProvider: provider,
        providers,
        accessToken: accessToken,
        refreshToken: refreshToken,
        expiresAt: session?.expires_at || null,
      },
    });
    console.log("---- User has been updated:", updatedUser);
  }

  // Redirection selon si l'utilisateur est nouveau ou ancien
  if (isNewUser) {
    return encodedRedirect("success", welcome, "Welcome to WaiahuB");
  } else {
    return encodedRedirect("success", welcomeBack, "Welcome Back");
  }
}
