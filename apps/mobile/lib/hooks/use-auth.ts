import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Session, User, AuthError } from "@supabase/supabase-js";
import { signInWithGoogle } from "../supabase";

interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: AuthError | null;
}

interface AuthResponse<T = void> {
  data: T | null;
  error: AuthError | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    session: null,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
      }));
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => ({
        ...prev,
        session,
        user: session?.user ?? null,
        loading: false,
        error: null,
      }));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name?: string
  ): Promise<AuthResponse> => {
    try {
      const now = new Date().toISOString();

      const { data: authData, error: signUpError } = await supabase.auth.signUp(
        {
          email,
          password,
          options: {
            data: { name },
          },
        }
      );

      if (signUpError) throw signUpError;

      if (authData.user) {
        // Create user profile in a transaction-like manner
        const { error: profileError } = await supabase.from("AuthUser").insert([
          {
            id: authData.user.id,
            email: authData.user.email!,
            name,
            username: `user${authData.user.id.slice(0, 8)}`,
            role: "USER",
            createdAt: now,
            updatedAt: now,
          },
        ]);

        if (profileError) throw profileError;

        const { error: personalProfileError } = await supabase
          .from("PersonalProfile")
          .insert([
            {
              id: authData.user.id,
              userEmail: authData.user.email!,
              firstName: name,
              profilePic: "/profile.webp",
              createdAt: now,
              updatedAt: now,
            },
          ]);

        if (personalProfileError) throw personalProfileError;

        return { data: authData, error: null };
      }

      return {
        data: null,
        error: new Error("User creation failed") as AuthError,
      };
    } catch (error) {
      console.error("Signup error:", error);
      return { data: null, error: error as AuthError };
    }
  };

  const signIn = async (
    email: string,
    password: string
  ): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: error as AuthError };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await signInWithGoogle();
      if (error) throw error;

      const session = data?.session;
      const user = session?.user;

      if (!user) {
        throw new Error("No user data returned");
      }

      // Check if user profile exists
      const { data: existingProfile } = await supabase
        .from("AuthUser")
        .select()
        .eq("id", user.id)
        .single();

      if (!existingProfile) {
        const now = new Date().toISOString();

        // Create user profile
        const { error: profileError } = await supabase.from("AuthUser").insert([
          {
            id: user.id,
            email: user.email!,
            name: user.user_metadata.full_name,
            username: `user${user.id.slice(0, 8)}`,
            role: "USER",
            createdAt: now,
            updatedAt: now,
          },
        ]);

        if (profileError) throw profileError;

        // Create personal profile
        const { error: personalProfileError } = await supabase
          .from("PersonalProfile")
          .insert([
            {
              id: user.id,
              userEmail: user.email!,
              firstName: user.user_metadata.full_name?.split(" ")[0],
              lastName: user.user_metadata.full_name?.split(" ")[1],
              profilePic: user.user_metadata.avatar_url || "/profile.webp",
              createdAt: now,
              updatedAt: now,
            },
          ]);

        if (personalProfileError) throw personalProfileError;
      }

      return { data: { session, user }, error: null };
    } catch (error) {
      console.error("Google sign in error:", error);
      return { data: null, error };
    }
  };

  return {
    session: state.session,
    user: state.user,
    loading: state.loading,
    error: state.error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    handleGoogleSignIn,
  };
}
