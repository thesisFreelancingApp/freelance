<<<<<<< HEAD
// import CenterWrapper from "./layout/Center";
import CategoriesBar from "./pages/Home/CategoriesBar";
// import LoginCard from "./pages/HomePage/LoginCard";
// import MainNavbar from "./pages/HomePage/MainNavbar";
import HomePage from "./pages/Home/Index";
// import Image from "next/image";
=======
import Hero from "@/components/hero";
>>>>>>> e6e740c110d3d572cc2d37b18186e3e88be20a79

export default async function Index() {
  return (
    <>
      <Hero />
      <main className="flex flex-col flex-1 gap-6 px-4">
        {/* <h2 className="mb-4 text-xl font-medium">Next steps</h2> */}
        {/* {hasEnvVars ? <SignUpUserSteps /> : <ConnectSupabaseSteps />} */}
      </main>
    </>
  );
}
