import { View, ScrollView, RefreshControl } from "react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Search as SearchIcon, Filter, X } from "lucide-react-native";
import { useState } from "react";
import { useDebounce } from "~/lib/hooks/use-debounce";
import { useSearch } from "~/lib/hooks/use-search";
import { ServiceCard } from "~/components/service-card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

const categories = [
  "Development",
  "Design",
  "Marketing",
  "Writing",
  "Video",
  "Music",
  "Business",
];

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const debouncedQuery = useDebounce(query, 300);
  const { results, isLoading } = useSearch(debouncedQuery);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <View className="flex-1 bg-background">
      {/* Search Header */}
      <View className="p-4 bg-card shadow-sm">
        <View className="flex-row items-center space-x-2">
          <View className="flex-1 relative">
            <SearchIcon
              size={20}
              className="absolute left-3 top-3 text-muted-foreground"
            />
            <Input
              placeholder="Search services..."
              value={query}
              onChangeText={setQuery}
              className="pl-10 h-12 bg-secondary/50"
            />
            {query && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2"
                onPress={() => setQuery("")}
              >
                <X size={16} className="text-muted-foreground" />
              </Button>
            )}
          </View>
          <Button variant="outline" size="icon" className="h-12 w-12">
            <Filter size={20} className="text-foreground" />
          </Button>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className="mr-2 rounded-full"
              onPress={() => toggleCategory(category)}
            >
              <Text
                className={
                  selectedCategories.includes(category)
                    ? "text-primary-foreground"
                    : "text-foreground"
                }
              >
                {category}
              </Text>
            </Button>
          ))}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={() => {}} />
        }
      >
        <View className="p-4">
          {query && (
            <Text className="text-muted-foreground mb-4">
              {results.length} results for "{query}"
            </Text>
          )}

          <View className="space-y-4">
            {results.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </View>

          {!query && (
            <View>
              <Text className="text-lg font-semibold mb-4">
                Popular Searches
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {[
                  "Website Development",
                  "Logo Design",
                  "Content Writing",
                  "Social Media",
                  "Mobile Apps",
                  "SEO",
                ].map((term) => (
                  <Badge
                    key={term}
                    variant="secondary"
                    className="px-3 py-1.5"
                    onPress={() => setQuery(term)}
                  >
                    <Text>{term}</Text>
                  </Badge>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
