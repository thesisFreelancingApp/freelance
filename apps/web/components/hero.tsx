"use client";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getFeaturedServices, searchServices } from "@/server.actions/services.actions";
import { getCategories } from "@/server.actions/category.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Router, Search, Star } from "lucide-react";
import { debounce } from "lodash"; // lodash for debouncing
import { log } from "console";

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
  price: string;
  ratings: Rating[];
  category: Category;
}

// const popularCategories = [
//   { name: "Web Development", icon: "💻", id: "" },
//   { name: "Graphic Design", icon: "🎨", id: "" },
//   { name: "Digital Marketing", icon: "📱", id: "" },
//   { name: "Writing & Translation", icon: "✍️", id: "" },
//   { name: "Video & Animation", icon: "🎥", id: "" },
//   { name: "Music & Audio", icon: "🎵", id: "" },
// ];



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
        /* @ts-ignore */
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
        /* @ts-ignore */
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
  const debouncedSearch = useMemo(() => {
    return debounce(async (query: string) => {
      setLoading(true);
      setError(null); // Reset error on new search
      try {
        const services = await searchServices(query);
        setFeaturedServices(services);
      } catch (error) {
        console.error("Error searching services:", error);
        setError("Failed to search services.");
      }
      setLoading(false);
    }, 300);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query); // Perform debounced search
    
  };

  const handleSearch = () => {
    router.push(`/gigs/?query=${encodeURIComponent(searchQuery)}`)
  }


 const handleCategory = (id: any) =>{
  console.log(id);
    router.push(`/gigs/?query=${encodeURIComponent(searchQuery)}&category_id=${id}`)
 }

  return (
    <section className="bg-background text-foreground">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Bienvenue sur <span className="text-primary">Waia!</span> <br />
            Trouvez les freelances dont vous avez besoin.
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Plateforme positive et efficace pour connecter les freelances avec
            des projets ambitieux.
          </p>
          <Link
            className="bg-primary font-bold hover:bg-primary-foreground text-background py-3 px-8 rounded-lg shadow-md transition duration-300"
            href="/sign-up"
          >
            Inscrivez-vous
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-primary/10 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto relative">
            <Input
              type="text"
              placeholder="Rechercher des services..."
              className="pl-12 pr-4 py-6 rounded-full text-lg shadow-lg"
              value={searchQuery}
              onChange={handleSearchChange} // Update state and trigger debounced search
            />
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={24}
            />
            <Button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full"
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
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Catégories populaires</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 select-none">
        {popularCategories.map((category, index) => (
          <div
            key={index}
            className="text-center hover:scale-105 transition duration-300"
            onClick={() => handleCategory(category.id)} 
          >
            <div className="text-4xl mb-2">💻</div>
            <p
              className="font-medium"
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>

      {/* Featured Gigs */}
      <div className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Gigs en vedette
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredServices.map((service) => (
              <div
                key={service.id}
                className="bg-background p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="font-bold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>
                <div className="flex items-center mb-2">
                  <Star
                    className="text-yellow-400 fill-yellow-400 mr-1"
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
                <p className="font-bold text-primary">{service.price}</p>
                <Link href={`/service/${service.id}`}>
                  <Button className="mt-4 w-full">View Details</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Comment ça fonctionne
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "Inscrivez-vous",
              "Trouvez un freelance",
              "Obtenez du travail de qualité",
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {index + 1}
                  </span>
                </div>
                <h3 className="font-bold mb-2">{step}</h3>
                <p className="text-muted-foreground">
                  Une description de l'étape à remplir ici.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Freelancers */}
      <div className="bg-secondary/10 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Freelances de premier ordre
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topFreelancers.map((freelancer, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="font-bold mb-2">{freelancer.name}</h3>
                <p className="text-muted-foreground mb-2">
                  {freelancer.expertise}
                </p>
                <div className="flex items-center justify-center mb-4">
                  <Star
                    className="text-yellow-400 fill-yellow-400 mr-1"
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
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Pourquoi choisir Waia
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <h3 className="font-bold mb-2">{benefit.text}</h3>
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
