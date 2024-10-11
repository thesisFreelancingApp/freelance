import CenterWrapper from "./layout/Center";
import CategoriesBar from "./pages/HomePage/CategoriesBar";
// import LoginCard from "./pages/HomePage/LoginCard";
import MainNavbar from "./pages/HomePage/MainNavbar";
import HomePage from "./pages/HomePage/HomePage";
// import Image from "next/image";

export default function IndexPage() {
  return (
    <>
      <CategoriesBar />
      <HomePage />
    </>
  );
}
