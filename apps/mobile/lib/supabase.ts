import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "~/types/supabase";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import {
  exchangeCodeAsync,
  loadAsync,
  refreshAsync,
  revokeAsync,
  TokenResponse,
} from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export async function signInWithGoogle() {
  try {
    const redirectUri = makeRedirectUri({
      scheme: "your-app", // Make sure this matches your app.json scheme
    });

    const discovery = {
      authorizationEndpoint: `${supabaseUrl}/auth/v1/authorize`,
      tokenEndpoint: `${supabaseUrl}/auth/v1/token`,
      revocationEndpoint: `${supabaseUrl}/auth/v1/logout`,
    };

    const request = await loadAsync(
      {
        clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID!,
        redirectUri,
        scopes: ["openid", "profile", "email"],
        responseType: "code",
        extraParams: {
          provider: "google",
        },
      },
      discovery
    );

    const response = await request.promptAsync(discovery);

    if (response?.type === "success") {
      const { code } = response.params;

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            code,
            redirect_uri: redirectUri,
          },
        },
      });

      if (error) throw error;
      return { data, error: null };
    }

    return { data: null, error: new Error("Google sign in cancelled") };
  } catch (error) {
    console.error("Error signing in with Google:", error);
    return { data: null, error };
  }
}
