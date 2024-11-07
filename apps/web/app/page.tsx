import LandingPage from "@/app/pages/LandingPage/index";
import MainHomepage from "@/app/pages/MainHomepage/index";
import { isAuthenticated } from "@/server.actions/auth/auth.actions";

export default async function Index() {
  const isUserAuthenticated = await isAuthenticated();
  return !isUserAuthenticated ? <LandingPage /> : <MainHomepage />;
  // return <MainHomepage />;
}
