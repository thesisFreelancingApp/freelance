// a shared service for authentication
import { SupabaseClient, User, Session } from "@supabase/supabase-js";

export interface AuthService {
  signIn: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ user: User | null; session: Session | null }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  getCurrentUser: () => Promise<User | null>;
  onAuthStateChange: (
    callback: (event: string, session: Session | null) => void
  ) => () => void;
  signInWithGoogle: () => Promise<void>;
}

export const createAuthService = (supabase: SupabaseClient): AuthService => ({
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  resetPassword: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  },

  getCurrentUser: async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  },

  onAuthStateChange: (callback) => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(callback);
    return () => subscription.unsubscribe();
  },

  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/welcome`,
      },
    });
    if (error) throw error;
  },
});
