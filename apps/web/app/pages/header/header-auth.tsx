import { Button } from "@/components/ui/button";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import UserMenu from "./user-menu"; // Changement ici pour importer correctement

export default async function AuthButton() {
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

  return user ? (
    <div className="flex items-center gap-2">
      Hey,
      <span className="font-bold text-primary">
        {userData?.profile?.firstName || userData?.name || user.email || null}
      </span>
      !
      <UserMenu data={userData || user} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
