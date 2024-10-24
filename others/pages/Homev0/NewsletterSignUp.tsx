import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSignUp = () => {
  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
          Sign up for our newsletter to receive updates on top freelancers, new
          features, and exclusive offers.
        </p>
        <form className="max-w-md mx-auto">
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none"
            />
            <Button type="submit" className="rounded-l-none">
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSignUp;
