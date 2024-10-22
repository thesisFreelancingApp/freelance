import { Button } from "@/components/ui/button";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Suspense } from "react";
import UserMenu from "./user-menu";

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
    <>
      <div className="flex items-center gap-2">
        <Suspense fallback={<p>Loading name...</p>}>
          <div className="items-center hidden md:flex">
            Hey,{" "}
            <span className="ml-1 font-bold text-primary">
              {userData?.profile?.firstName ||
                userData?.name ||
                user.email ||
                null}
            </span>
            <span className="ml-1">!</span>
          </div>
        </Suspense>

        {/* UserMenu s'affiche toujours */}
        <UserMenu data={userData || user} />
      </div>
    </>
  ) : (
    <div className="flex gap-2">
      <Suspense fallback={<p>Loading name...</p>}>
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </Suspense>
    </div>
  );
}
