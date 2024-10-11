import CenterWrapper from "./layout/Center";
import CategoriesBar from "./pages/HomePage/CategoriesBar";
// import LoginCard from "./pages/HomePage/LoginCard";
import MainNavbar from "./pages/HomePage/MainNavbar";
// import Image from "next/image";
import AuthFormComponent from "../components/auth-form";
import CategoriesIcon from "./pages/HomePage/CategoriesIcon";
export default function IndexPage() {
    return (
        <>
            <MainNavbar />
            <CategoriesBar />
            <CategoriesIcon />
            <CenterWrapper>
                <AuthFormComponent />
                {/* <LoginCard /> */}
            </CenterWrapper>
        </>
    );
}
