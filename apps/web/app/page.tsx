import CenterWrapper from "./layout/Center";
import CategoriesBar from "./pages/HomePage/CategoriesBar";
import LoginCard from "./pages/HomePage/LoginCard";
import MainNavbar from "./pages/HomePage/MainNavbar";
// import Image from "next/image";
import { AuthFormComponent } from "../components/auth-form";
export default function IndexPage() {
    return (
        <>
            <MainNavbar />
            <CategoriesBar />
            <CenterWrapper>
                <AuthFormComponent />
                {/* <LoginCard /> */}
            </CenterWrapper>
        </>
    );
}
