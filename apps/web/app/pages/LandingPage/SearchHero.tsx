"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const popularSearches = [
  "Développement Web",
  "Design Logo",
  "Marketing Digital",
  "Rédaction",
  "SEO",
];

export default function SearchHero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="relative">
        <Input
          placeholder="Recherchez un service..."
          className="pl-12 h-14 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleSearch}
        >
          Rechercher
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {popularSearches.map((term) => (
          <Button
            key={term}
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery(term);
              router.push(`/search?q=${encodeURIComponent(term)}`);
            }}
          >
            {term}
          </Button>
        ))}
      </div>
    </div>
  );
}
