"use client";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils-cn";
import Link from "next/link";

interface HeroProps {
  authenticated: boolean;
}

export const Hero = ({ authenticated }: HeroProps) => {
  return (
    <div className="container flex flex-col items-center justify-between mx-auto md:flex-row">
      <div className="text-center md:text-left md:w-1/2">
        {authenticated ? (
          <>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
              Ravie de vous revoir sur{" "}
              <span className="text-primary">Waia!</span> <br />
              Découvrez de nouveaux projets à réaliser.
            </h1>
            <p className="mb-6 text-lg md:text-xl">
              Votre espace pour explorer des opportunités positives et
              inspirantes.
            </p>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                `px-8 py-3 font-bold transition duration-300`,
              )}
              href="/projects"
            >
              Explorer les Projets
            </Link>
          </>
        ) : (
          <>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
              Bienvenue sur <span className="text-primary">Waia!</span> <br />
              Trouvez les freelances dont vous avez besoin.
            </h1>
            <p className="mb-6 text-lg md:text-xl">
              Connectez-vous à des freelances talentueux pour des projets
              ambitieux.
            </p>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                `px-8 py-3 font-bold transition duration-300`,
              )}
              href="/sign-up"
            >
              Inscrivez-vous
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Hero;
