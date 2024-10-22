"use server";

import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { CredentialResponse } from "google-one-tap";

interface HandleCredentialResponseProps {
  response: CredentialResponse;
  nonce: string;
}

export async function handleCredentialResponse({
  response,
  nonce,
}: HandleCredentialResponseProps) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase.auth.signInWithIdToken({
      provider: "google",
      token: response.credential,
      nonce: nonce,
    });

    if (error) throw error;

    const session = data.session;
    const user = data.user;

    const email = user.email || undefined;
    const fullName = user.user_metadata.full_name || "Anonymous";
    const provider = user.app_metadata.provider || "google";
    const providers = user.app_metadata.providers || ["google"];
    const accessToken = session.access_token;
    const refreshToken = session.refresh_token;
    const expiresAt = session.expires_at;
    const providerAccountId = user.id;
    const isNew = false;
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
          email: email || "",
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
              userEmail: email || "",
              role: "user",
            },
          },
        },
      });

      return {
        success: true,
        message: "New user created",
        path: "/username",
        email: newUser.email,
      };
    } else {
      const account = existingUser.account;
      const shouldUpdate =
        account?.lastProvider !== provider ||
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

        return {
          success: true,
          path: "/welcome-back",
          message: "Account updated",
          email: existingUser.email,
        };
      }

      return {
        success: true,
        path: "/welcome-back",
        message: "No updates needed",
        email: existingUser.email,
      };
    }
  } catch (error) {
    return { success: false, error: error };
  }
}
