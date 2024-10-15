import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";

const MobileAppPromo = () => {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Get Our Mobile App</h2>
            <p className="text-xl mb-8 opacity-90">
              Find freelancers and manage your projects on the go with our
              mobile app.
            </p>
            <div className="flex space-x-4">
              <Button variant="secondary" className="flex items-center">
                <Apple className="mr-2" />
                App Store
              </Button>
              <Button variant="secondary" className="flex items-center">
                <Smartphone className="mr-2" />
                Google Play
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://via.placeholder.com/400x600.png?text=App+Screenshot"
              alt="Mobile App Screenshot"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromo;
