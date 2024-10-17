import { Button } from "@/components/ui/button";

const PromotionalBanner = () => {
  return (
    <section className="bg-primary py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary-foreground">
          Limited Time Offer!
        </h2>
        <p className="text-xl mb-8 text-primary-foreground/90">
          Get 20% off on your first project. Use code: FIRST20
        </p>
        <Button size="lg" variant="secondary">
          Start Now
        </Button>
      </div>
    </section>
  );
};

export default PromotionalBanner;
