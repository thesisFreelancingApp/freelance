import LandingPage from "@/app/pages/LandingPage/index";
import { isAuthenticated } from "@/server.actions/auth/auth.actions";
import MainHomepage from "./pages/MainHomepage";
export default async function Index() {
  const isUserAuthenticated = await isAuthenticated();
  return !isUserAuthenticated ? <LandingPage /> : <MainHomepage />;
  // return <MainHomepage />;
}
