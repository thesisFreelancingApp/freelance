import { User, Session } from "@supabase/supabase-js";

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
