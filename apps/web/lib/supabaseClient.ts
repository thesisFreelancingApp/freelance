import { createClient } from "@supabase/supabase-js";
import { createAuthService } from "../../../shared/auth/authService";

// a client that is used to connect to the supabase database
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const authService = createAuthService(supabase);
