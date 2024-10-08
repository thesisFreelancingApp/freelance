import CenterWrapper from "./layout/Center";
import CategoriesBar from "./pages/HomePage/CategoriesBar";
import LoginCard from "./pages/HomePage/LoginCard";
import MainNavbar from "./pages/HomePage/MainNavbar";

export default function IndexPage() {
    return (
        <>
            <MainNavbar />
            <CategoriesBar />
            <CenterWrapper>
                <LoginCard />
            </CenterWrapper>
        </>
    );
}
