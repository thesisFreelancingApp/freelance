import { welcomeBack } from "@/config/routes";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { encodedRedirect } from "@/lib/utils-encodedRedirect";
import { redirect } from "next/navigation";

// Fonction utilitaire pour récupérer l'utilisateur uniquement
async function fetchUser(supabase: any) {
  console.log("[DEBUG] Attempting to fetch user");
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    console.error("[DEBUG] User retrieval failed or no user found", userError);
    return null;
  }
  console.log("[DEBUG] User fetched successfully", userData.user);
  return userData.user;
}

// Met à jour le compte uniquement si les données ont changé
async function updateAccountIfNeeded(existingUser: any, updates: any) {
  console.log("[DEBUG] Checking if account update is needed for:", existingUser.email);
  const shouldUpdate = Object.keys(updates).some(key => updates[key] !== existingUser.account[key]);
  
  if (shouldUpdate) {
    console.log("[DEBUG] Account update required, performing update...");
    await prisma.account.update({
      where: { userEmail: existingUser.email },
      data: updates,
    });
    console.log("[DEBUG] Account updated successfully for user:", existingUser.email);
  } else {
    console.log("[DEBUG] No account update needed for user:", existingUser.email);
  }
}

export default async function ProtectedPage() {
  console.log("[DEBUG] Initializing ProtectedPage");
  const supabase = createClient();
  const user = await fetchUser(supabase);

  // Si l'utilisateur n'est pas trouvé, redirige vers la page de connexion
  if (!user) {
    console.log("[DEBUG] User not found, redirecting to sign-in");
    return redirect("/sign-in");
  }

  const { provider, providers = ["email"], provider_id } = user?.app_metadata || {};
  const email = user.email;
  
  console.log("[DEBUG] Checking if user exists in the database for email:", email);
  // Vérifie si l'utilisateur existe déjà dans la base de données
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

  // Si l'utilisateur n'existe pas, le créer et rediriger vers la page "/username"
  if (!existingUser) {
    console.log("[DEBUG] New user detected, creating new user record for email:", email);
    const newUser = await prisma.authUser.create({
      data: {
        email,
        name: user.user_metadata?.full_name || "Anonymous",
        id: user.id,
        account: {
          create: {
            providerAccountId: provider_id,
            lastProvider: provider,
            providers,
          },
        },
        profile: {
          create: {
            username: `user${user.id}`,
            userEmail: email,
            role: "user",
          },
        },
      },
    });

    if (newUser) {
      console.log("[DEBUG] New user created successfully, redirecting to /username");
      // Forcer la redirection immédiatement après la création
      return redirect('/username');
    }
  }

  // Mise à jour du compte existant si nécessaire
  console.log("[DEBUG] Existing user found, checking if account update is needed");
  const accountUpdates = {
    lastProvider: provider,
    providers,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  };
  await updateAccountIfNeeded(existingUser, accountUpdates);

  // Si l'utilisateur est déjà existant, rediriger vers la page d'accueil ou une autre page
  console.log("[DEBUG] User already exists, redirecting to welcomeBack page");
  return encodedRedirect("success", welcomeBack, "Welcome Back");
}
