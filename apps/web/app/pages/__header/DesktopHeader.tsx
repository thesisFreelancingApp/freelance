import { ThemeSwitcher } from "@/components/theme-switcher";
import Logo from "@/public/WaiaHub-LogoIcon.svg";
import Link from "next/link";
import CategoryBar from "./DesktopCategoryBar";
import HeaderAuth from "./header-auth";

// Type definitions
interface WebHeaderProps {
  userData: any;
  user: any;
  categories: any;
  isSeller: any;
}

const WebHeader: React.FC<WebHeaderProps> = async ({
  userData,
  user,
  categories,
  isSeller,
}) => {
  return (
    <header className="sticky top-0 z-50 flex-col hidden w-full border-b bg-background md:flex border-b-foreground/6">
      <nav className="container flex items-center justify-between h-16 px-4 mx-auto md:px-8 border-b-foreground/6">
        <Link href="/">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 md:w-16 md:h-16"
              src={Logo.src}
              alt="WaiaHub Logo"
            />
            <p className="text-3xl font-semibold">WaiaHub</p>
          </div>
        </Link>
        <div className="flex gap-5">
          <ThemeSwitcher />
          <HeaderAuth isSeller={isSeller} user={user} userData={userData} />
        </div>
      </nav>
      <div className="container mx-auto">
        <CategoryBar allCategories={categories} />
      </div>
    </header>
  );
};

export default WebHeader;
