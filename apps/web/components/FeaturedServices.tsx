import { Service } from "@/types/FeaturedServices";
import ServiceCard from "./ServiceCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FeaturedServicesProps {
  services: Service[];
}

export const FeaturedServices: React.FC<FeaturedServicesProps> = ({
  services,
}) => {
  return (
    <section className="py-16 bg-secondary/5">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold">Services Recommandés</h2>
          <p className="mt-2 text-muted-foreground">
            Découvrez nos services les mieux notés par la communauté
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} featured={true} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/services">
            <Button variant="outline" className="group">
              Voir tous les services
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;
