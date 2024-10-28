import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import { getAllCategories } from "@/server.actions/category/category.actions";
import { isSellerWithProfessionalProfile } from "@/server.actions/sellers/pro-Infomation.actions";
import WebHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Header = async () => {
  const {
    data: { user },
  } = await createClient().auth.getUser();
  let userData = null;

  if (user) {
    userData = await prisma.authUser.findUnique({
      where: {
        email: user?.email,
      },
      include: { profile: true },
    });
  }
  const categories = await getAllCategories();
  const isSeller = await isSellerWithProfessionalProfile();
  return (
    <>
      <MobileHeader
        isSeller={isSeller}
        userData={userData}
        user={user}
        categories={categories}
      />
      <WebHeader
        isSeller={isSeller}
        categories={categories}
        userData={userData}
        user={user}
      />
    </>
  );
};

export default Header;
