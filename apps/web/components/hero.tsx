"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  getFeaturedServices,
  searchServices,
} from "@/server.actions/services.actions";
import { getCategories } from "@/server.actions/category.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Search, Star } from "lucide-react";

// Define the types for the Service
interface Rating {
  id: number;
  rating: number;
  review: string | null;
  createdAt: Date;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  parentId: number | null;
}

interface Service {
  id: number;
  name: string;
  description: string | null;
  ratings: Rating[];
  category: Category;
  images: string[];
  packages: Package[];
}

interface Package {
  id: number;
  name: string;
  price: string; // Changed from number to string due to Decimal conversion
  description: string | null;
  deliveryTime: number;
  revisions: number;
  features: string[];
}

const topFreelancers = [
  { name: "Alice Johnson", expertise: "Web Developer", rating: 4.9 },
  { name: "John Smith", expertise: "Graphic Designer", rating: 4.7 },
  { name: "Emma Davis", expertise: "Digital Marketer", rating: 4.8 },
];

const Hero = () => {
  const router = useRouter();
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [popularCategories, setPopularCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state for search

  // Fetch featured services on component mount
  useEffect(() => {
    const fetchFeaturedServices = async () => {
      setLoading(true);
      try {
        const services = await getFeaturedServices();
        console.log(services, "services heeeeere");

        setFeaturedServices(services);
      } catch (error) {
        console.error("Error fetching featured services:", error);
        setError("Failed to load featured services.");
      }
      setLoading(false);
    };

    fetchFeaturedServices();
  }, []);

  useEffect(() => {
    const fetchPopularCatgs = async () => {
      setLoading(true);
      try {
        const categories = await getCategories(6);
        setPopularCategories(categories);
      } catch (error) {
        console.error("Error fetching catgs:", error);
        setError("Failed to load catgs.");
      }
      setLoading(false);
    };

    fetchPopularCatgs();
  }, []);

  // Debounced search function to minimize API calls
  // const debouncedSearch = useMemo(() => {
  //   return debounce(async (query: string) => {
  //     setLoading(true);
  //     setError(null); // Reset error on new search
  //     try {
  //       const services = await searchServices(query);
  //       setFeaturedServices(services);
  //     } catch (error) {
  //       console.error("Error searching services:", error);
  //       setError("Failed to search services.");
  //     }
  //     setLoading(false);
  //   }, 300);
  // }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    // debouncedSearch(query); // Perform debounced search
  };

  const handleSearch = () => {
    router.push(`/gigs/?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategory = (id: any) => {
    // console.log(id);
    router.push(
      `/gigs/?query=${encodeURIComponent(searchQuery)}&category_id=${id}`,
    );
  };

  return (
    <section className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container flex flex-col items-center justify-between px-6 py-16 mx-auto md:flex-row">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
            Bienvenue sur <span className="text-primary">Waia!</span> <br />
            Trouvez les freelances dont vous avez besoin.
          </h1>
          <p className="mb-6 text-lg md:text-xl">
            Plateforme positive et efficace pour connecter les freelances avec
            des projets ambitieux.
          </p>
          <Link
            className="px-8 py-3 font-bold transition duration-300 rounded-lg shadow-md bg-primary hover:bg-primary-foreground text-background"
            href="/sign-up"
          >
            Inscrivez-vous
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="py-12 bg-primary/10">
        <div className="container px-6 mx-auto">
          <div className="relative max-w-3xl mx-auto">
            <Input
              type="text"
              placeholder="Rechercher des services..."
              className="py-6 pl-12 pr-4 text-lg rounded-full shadow-lg"
              value={searchQuery}
              onChange={handleSearchChange} // Update state and trigger debounced search
            />
            <Search
              className="absolute transform -translate-y-1/2 left-4 top-1/2 text-muted-foreground"
              size={24}
            />
            <Button
              className="absolute transform -translate-y-1/2 rounded-full right-2 top-1/2"
              size="lg"
              onClick={() => handleSearch()} // Trigger search on button click
            >
              Rechercher
            </Button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      )}

      {/* Popular Categories */}
      <div className="py-16">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Catégories populaires
          </h2>
          <div className="grid grid-cols-2 gap-6 select-none md:grid-cols-3 lg:grid-cols-6">
            {popularCategories.map((category, index) => (
              <div
                key={index}
                className="text-center transition duration-300 hover:scale-105"
                onClick={() => handleCategory(category.id)}
              >
                <div className="mb-2 text-4xl">💻</div>
                <p className="font-medium">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Gigs */}
      <div className="py-16 bg-secondary/10">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Gigs en vedette
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="flex flex-col h-full p-4 rounded-lg shadow-md bg-card"
              >
                <img
                  src={service.images?.[0] || "/placeholder.svg"}
                  alt={service.name}
                  className="object-cover w-full h-48 mb-4 rounded-t-lg"
                />
                <h3 className="mb-2 text-lg font-semibold">{service.name}</h3>
                <p className="flex-grow mb-2 text-sm text-muted-foreground">
                  {service.description}
                </p>
                <div className="flex items-center mb-2">
                  <Star
                    className="mr-1 text-yellow-400 fill-yellow-400"
                    size={16}
                  />
                  <span>
                    {service.ratings && service.ratings.length > 0
                      ? (
                          service.ratings.reduce(
                            (acc, rating) => acc + rating.rating,
                            0,
                          ) / service.ratings.length
                        ).toFixed(1)
                      : "N/A"}
                  </span>
                </div>
                {service.packages && service.packages.length > 0 && (
                  <p className="mb-2 font-bold text-primary">
                    Starting at $
                    {parseFloat(service.packages[0].price).toFixed(2)}
                  </p>
                )}
                <Link href={`/service/${service.id}`} className="mt-auto">
                  <Button className="w-full">View Details</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              "Inscrivez-vous",
              "Trouvez un freelance",
              "Obtenez du travail de qualité",
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="mb-2 font-bold">{step}</h3>
                <p className="text-muted-foreground">
                  Une description de l'étape à remplir ici.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Freelancers */}
      <div className="py-16 bg-secondary/10">
        <div className="container px-6 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">
            Freelances de premier ordre
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {topFreelancers.map((freelancer, index) => (
              <div
                key={index}
                className="p-6 text-center rounded-lg shadow-md bg-background"
              >
                <h3 className="mb-2 font-bold">{freelancer.name}</h3>
                <p className="mb-2 text-muted-foreground">
                  {freelancer.expertise}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Star
                    className="mr-1 text-yellow-400 fill-yellow-400"
                    size={16}
                  />
                  <span>{freelancer.rating}</span>
                </div>
                <Button variant="outline" className="w-full">
                  Voir le profil
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Waia */}
      <div className="py-16">
        <div className="container px-6 mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">
            Pourquoi choisir Waia
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                text: "Vérification de l'identité",
                icon: <CheckCircle size={32} />,
              },
              { text: "Support 24/7", icon: <CheckCircle size={32} /> },
              {
                text: "Garantie de satisfaction",
                icon: <CheckCircle size={32} />,
              },
              { text: "Paiements sécurisés", icon: <CheckCircle size={32} /> },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4 text-primary">
                  {benefit.icon}
                </div>
                <h3 className="mb-2 font-bold">{benefit.text}</h3>
                <p className="text-muted-foreground">
                  Un détail court sur ce bénéfice.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
