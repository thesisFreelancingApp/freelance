"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "@/hooks/use-debounce";
import { getSearchSuggestions } from "@/server.actions/search.actions";

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
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8" ref={searchContainerRef}>
        <div className="relative">
          <Input
            placeholder="Recherchez un service..."
            className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-primary transition-colors"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            onFocus={() => setShowSuggestions(true)}
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          {isLoading ? (
            <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin" />
          ) : (
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10"
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
                className="absolute z-50 left-0 right-0 mt-2 bg-background rounded-xl border shadow-lg overflow-hidden"
              >
                <div className="p-4">
                  {/* Trending Searches */}
                  {!searchQuery && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center">
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
                          className="px-4 py-2 hover:bg-accent rounded-lg cursor-pointer"
                          onClick={() => handleSearch(suggestion.text)}
                        >
                          <span>{suggestion.text}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {searchQuery && suggestions.length === 0 && !isLoading && (
                    <div className="text-center py-4 text-muted-foreground">
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
