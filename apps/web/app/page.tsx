import LandingPage from "@/app/pages/LandingPage/index";
import { isAuthenticated } from "@/server.actions/auth/auth.actions";
import MainHomepage from "./pages/MainHomepage";
import getProfileCompletionStatus from "@/server.actions/userInfo/infoUser.actions";
import { redirect } from "next/navigation";

export default async function Index() {
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    const profileStatus = await getProfileCompletionStatus();

    if (profileStatus?.seller) {
      redirect("/seller/dashboard");
    }

    return <MainHomepage />;
  }

  return <LandingPage />;
}
