import { Button } from "@/components/ui/button";
import prisma from "@/lib/prismaClient";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import UserMenu from "./user-menu"; // Changement ici pour importer correctement
import { Suspense } from "react";
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
      <Suspense fallback={<p>Loading name...</p>}>
        <span className="font-bold text-primary">
          {userData?.profile?.firstName || userData?.name || user.email || null}
        </span>
      </Suspense>
      !
      <UserMenu data={userData || user} />
      {/* Ajout de pre pour afficher les informations de userData */}
    </div>
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
