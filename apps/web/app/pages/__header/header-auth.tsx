import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import UserMenu from "./user-menu";

// Define the structure for user data and user types, allowing for null values as needed
interface UserProfile {
  firstName?: string | null;
}

interface UserData {
  profile?: UserProfile | null;
  name?: string | null;
  email?: string | null;
}

interface AuthButtonProps {
  userData?: UserData | undefined;
  user?: { email: string };
}

export default function AuthButton({ userData, user }: AuthButtonProps) {
  return user ? (
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
      {/* UserMenu always displays */}
      <UserMenu data={userData ? userData : { email: user.email }} />
    </div>
  ) : (
    <div className="flex gap-2">
      <Suspense fallback={<p>Loading name...</p>}>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/sign-in">Connexion</Link>
        </Button>
      </Suspense>
    </div>
  );
}
