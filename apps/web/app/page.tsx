import LoginCard from "./customComponents/LoginCard";
import MainNavbar from "./customComponents/MainNavbar";
import CenterWrapper from "./layout/Center";

export default function Component() {
    return (
        <>
            <MainNavbar />
            <CenterWrapper>
                <LoginCard />
            </CenterWrapper>
        </>
    );
}
