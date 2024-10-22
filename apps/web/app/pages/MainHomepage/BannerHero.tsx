import Banner from "@/assets/main-banner/banner.webp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";
interface HeroProps {
  authenticated: boolean;
}

const Hero32 = ({ authenticated }: HeroProps) => {
  return (
    <>
      {!authenticated ? (
        <section className="py-16 xl:py-32">
          <div className="container">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
                <Badge variant="outline">
                  Découvrir
                  <ArrowDownRight className="ml-2 size-4" />
                </Badge>
                <h1 className="my-6 text-4xl font-bold text-pretty lg:text-6xl">
                  Besoin d'un coup de pouce ?
                </h1>
                <p className="max-w-xl mb-8 text-muted-foreground lg:text-xl">
                  Les freelances parfaits sont là pour propulser tes idées !
                </p>
                <div className="flex flex-col justify-center w-full gap-2 sm:flex-row lg:justify-start">
                  <Button className="w-full sm:w-auto">
                    Commence dès maintenant
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Chercher mes talents
                    <ArrowDownRight className="ml-2 size-4" />
                  </Button>
                </div>
              </div>
              <Image
                width={1080}
                height={720}
                src={Banner.src}
                alt="placeholder hero"
                className="object-cover w-full rounded-md max-h-96"
              />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Hero32;
