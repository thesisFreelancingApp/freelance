"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { getSearchSuggestions } from "@/server.actions/search.actions";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Search, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Suggestion {
  text: string;
  type: "completion";
}

export default function SearchHero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const trendingSearches = [
    "Développement Web",
    "Logo Design",
    "Marketing Digital",
    "Rédaction SEO",
    "Applications Mobiles",
  ];

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedSearch.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const suggestions = await getSearchSuggestions(debouncedSearch);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearch) {
      fetchSuggestions();
    }
  }, [debouncedSearch]);

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8" ref={searchContainerRef}>
        <div className="relative">
          <Input
            placeholder="Recherchez un service..."
            className="pl-12 text-lg transition-colors h-14 rounded-xl"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => setShowSuggestions(true)}
          />
          <Search className="absolute w-5 h-5 -translate-y-1/2 left-4 top-1/2 text-muted-foreground" />
          {isLoading ? (
            <Loader2 className="absolute w-5 h-5 -translate-y-1/2 right-4 top-1/2 animate-spin" />
          ) : (
            <Button
              className="absolute h-10 -translate-y-1/2 right-2 top-1/2"
              onClick={() => handleSearch()}
            >
              Rechercher
            </Button>
          )}

          {/* Suggestions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (searchQuery.length >= 2 || !searchQuery) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 right-0 z-50 mt-2 overflow-hidden shadow-lg bg-background rounded-xl x"
              >
                <div className="p-4">
                  {/* Trending Searches */}
                  {!searchQuery && (
                    <div className="mb-4">
                      <h3 className="flex items-center mb-2 text-sm font-medium text-muted-foreground">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Recherches populaires
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {trendingSearches.map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            className="text-sm hover:bg-accent"
                            onClick={() => handleSearch(term)}
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Search Suggestions */}
                  {searchQuery && suggestions.length > 0 && (
                    <div className="space-y-2">
                      {suggestions.map((suggestion) => (
                        <div
                          key={suggestion.text}
                          className="px-4 py-2 rounded-lg cursor-pointer hover:bg-accent"
                          onClick={() => handleSearch(suggestion.text)}
                        >
                          <span>{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {searchQuery && suggestions.length === 0 && !isLoading && (
                    <div className="py-4 text-center text-muted-foreground">
                      Aucune suggestion pour "{searchQuery}"
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
