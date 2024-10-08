import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BriefcaseIcon, SearchIcon, StarIcon } from "lucide-react";
import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <header className="bg-yellow-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">FreelanceHub</h1>
          <nav></nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-yellow-800 mb-4">
            Welcome to FreelanceHub
          </h2>
          <p className="text-xl text-yellow-700 mb-6">
            Connect with top freelancers and exciting projects
          </p>
        </section>

        <section className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<SearchIcon className="h-10 w-10 text-yellow-500" />}
            title="Find Opportunities"
            description="Browse thousands of freelance projects and find the perfect match for your skills."
          />
          <FeatureCard
            icon={<BriefcaseIcon className="h-10 w-10 text-yellow-500" />}
            title="Showcase Your Talent"
            description="Create a stunning portfolio to highlight your best work and attract clients."
          />
          <FeatureCard
            icon={<StarIcon className="h-10 w-10 text-yellow-500" />}
            title="Build Your Reputation"
            description="Earn reviews and ratings to stand out in the freelance marketplace."
          />
        </section>
      </main>

      <footer className="bg-yellow-100 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-yellow-800">
          <p>&copy; 2024 FreelanceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-yellow-800">{title}</h3>
        <p className="text-yellow-700">{description}</p>
      </CardContent>
    </Card>
  );
}
