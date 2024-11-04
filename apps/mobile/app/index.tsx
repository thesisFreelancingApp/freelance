import { Redirect } from "expo-router";
import { useAuth } from "~/lib/hooks/use-auth";

export default function Index() {
  const { session } = useAuth();
  // Redirect to tabs home if authenticated, otherwise to auth
  return <Redirect href={session ? "/(tabs)/" : "/(auth)/"} />;
}
