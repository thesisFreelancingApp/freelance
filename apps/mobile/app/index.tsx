import { View, ScrollView, RefreshControl, Dimensions } from "react-native";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import { ServiceCard } from "~/components/service-card";
import { useServices } from "~/lib/hooks/use-services";
import { Search, ChevronRight } from "lucide-react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

const categories = [
  { name: "Graphisme & Design", icon: "🎨" },
  { name: "Marketing digital", icon: "📱" },
  { name: "Rédaction & Traduction", icon: "✍️" },
  { name: "Vidéo & Animation", icon: "🎥" },
  { name: "Musique & Audio", icon: "🎵" },
  { name: "Programmation & Tech", icon: "💻" },
  { name: "Business", icon: "💼" },
  { name: "Data", icon: "📊" },
];

export default function HomeScreen() {
  const { services, isLoading, refetch } = useServices();
  console.log("services ++++++++++", services);
  const width = Dimensions.get("window").width;

  const featuredServices = services?.slice(0, 5) || [];

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      {/* Hero Section */}
      <View className="bg-primary/5 p-4 pb-8">
        <Text className="text-2xl font-bold mb-2">
          Trouvez le freelance idéal
        </Text>
        <Text className="text-muted-foreground mb-4">
          Des milliers de talents à votre service
        </Text>
        <View className="relative">
          <Input
            placeholder="Rechercher un service..."
            className="pl-10 bg-background"
            onPressIn={() => router.push("/search")}
          />
          <Search
            size={20}
            className="absolute left-3 top-2.5 text-muted-foreground"
          />
        </View>
      </View>

      {/* Categories Carousel */}
      <View className="py-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-lg font-semibold">Catégories</Text>
          <Button variant="ghost" onPress={() => router.push("/categories")}>
            <Text className="text-primary mr-1">Voir tout</Text>
            <ChevronRight size={16} className="text-primary" />
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {categories.map((category, index) => (
            <View
              key={index}
              className="mr-4 items-center bg-secondary/10 rounded-lg p-4 w-24"
            >
              <Text className="text-2xl mb-2">{category.icon}</Text>
              <Text className="text-xs text-center" numberOfLines={2}>
                {category.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Featured Services Carousel */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <View>
            <Text className="text-lg font-semibold">Services Populaires</Text>
            <Text className="text-sm text-muted-foreground">
              Les mieux notés
            </Text>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {featuredServices.map((service) => (
            <View
              key={service.id}
              className="mr-4"
              style={{ width: width - 48 }}
            >
              <ServiceCard
                service={service}
                onPress={() =>
                  router.push({
                    pathname: "/service/[id]",
                    params: { id: service.id },
                  })
                }
              />
            </View>
          ))}
        </ScrollView>
      </View>

      {/* How it Works */}
      <View className="px-4 py-6 bg-secondary/5">
        <Text className="text-lg font-semibold mb-4">Comment ça marche</Text>
        {[
          "Inscrivez-vous",
          "Trouvez un freelance",
          "Obtenez du travail de qualité",
        ].map((step, index) => (
          <View key={index} className="flex-row items-center mb-4">
            <View className="w-8 h-8 rounded-full bg-primary/10 items-center justify-center mr-3">
              <Text className="font-semibold text-primary">{index + 1}</Text>
            </View>
            <View>
              <Text className="font-medium">{step}</Text>
              <Text className="text-sm text-muted-foreground">
                Une description de l'étape à remplir ici.
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Regular Services List */}
      <View className="p-4">
        <Text className="text-lg font-semibold mb-4">Tous les services</Text>
        <View className="gap-4">
          {services?.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onPress={() =>
                router.push({
                  pathname: "/service/[id]",
                  params: { id: service.id },
                })
              }
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
