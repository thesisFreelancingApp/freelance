import {
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
  Pressable,
  StyleSheet,
} from "react-native";
import { Text } from "~/components/ui/text";
import { useServices } from "~/lib/hooks/use-services";
import { ServiceCard } from "~/components/service-card";
import { ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { Search, Sliders, TrendingUp, Star, Clock } from "lucide-react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Image } from "expo-image";

const { width } = Dimensions.get("window");

const categories = [
  { name: "Development", icon: "💻", color: "#E8F5FF", textColor: "#0096FF" },
  { name: "Design", icon: "🎨", color: "#FFE8EC", textColor: "#FF4D6A" },
  { name: "Marketing", icon: "📱", color: "#E6FFE8", textColor: "#00B517" },
  { name: "Writing", icon: "✍️", color: "#FFF3E5", textColor: "#FF8B00" },
  { name: "Video", icon: "🎥", color: "#F5E8FF", textColor: "#9747FF" },
  { name: "Music", icon: "🎵", color: "#FFE8F5", textColor: "#FF00A8" },
];

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: "rgba(0,0,0,0.05)",
    paddingLeft: 40,
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: 14,
    zIndex: 1,
  },
});

export default function HomeScreen() {
  const { services, isLoading, error, refetch } = useServices();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const featuredServices = services?.slice(0, 5) || [];
  const trendingServices = services?.slice(5, 10) || [];

  return (
    <ScrollView
      className="flex-1 bg-background"
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      stickyHeaderIndices={[1]} // Make search bar sticky
    >
      {/* Hero Section */}
      <View className="bg-primary pt-4 pb-16 px-4">
        <Text className="text-3xl font-bold text-primary-foreground mb-2">
          Trouvez le talent
        </Text>
        <Text className="text-4xl font-bold text-primary-foreground mb-4">
          qu'il vous faut
        </Text>
        <Text className="text-primary-foreground/80 text-base mb-8">
          Des milliers de freelances à votre service
        </Text>
      </View>

      {/* Search Section - Sticky */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Search size={20} style={styles.searchIcon} color="#666" />
            <Input
              placeholder="Rechercher un service..."
              style={styles.searchInput}
              onPressIn={() => router.push("/search")}
            />
          </View>
          <Button variant="outline" style={{ height: 48, width: 48 }}>
            <Sliders size={20} color="#000" />
          </Button>
        </View>
      </View>

      {/* Categories */}
      <View className="mt-6">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <Text className="text-xl font-bold">Categories</Text>
          <Button variant="ghost" size="sm">
            <Text className="text-primary font-medium">See All</Text>
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
        >
          {categories.map((category, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100)}
              key={category.name}
            >
              <Pressable
                style={{ backgroundColor: category.color }}
                className="mr-4 rounded-2xl p-4 w-24 h-24 items-center justify-center"
              >
                <Text className="text-2xl mb-2">{category.icon}</Text>
                <Text
                  className="text-xs text-center font-medium"
                  style={{ color: category.textColor }}
                >
                  {category.name}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Featured Services */}
      <View className="mt-8">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <View className="flex-row items-center">
            <Star className="text-primary mr-2" size={24} />
            <Text className="text-xl font-bold">Featured</Text>
          </View>
          <Button variant="ghost" size="sm">
            <Text className="text-primary font-medium">See All</Text>
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
          decelerationRate="fast"
          snapToInterval={width - 48}
        >
          {featuredServices.map((service, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100)}
              key={service.id}
              style={{ width: width - 48 }}
              className="mr-4"
            >
              <ServiceCard
                service={service}
                onPress={() => router.push(`/service/${service.id}`)}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </View>

      {/* Trending Services */}
      <View className="mt-8 mb-8">
        <View className="flex-row justify-between items-center px-4 mb-4">
          <View className="flex-row items-center">
            <TrendingUp className="text-primary mr-2" size={24} />
            <Text className="text-xl font-bold">Trending</Text>
          </View>
          <Button variant="ghost" size="sm">
            <Text className="text-primary font-medium">See All</Text>
          </Button>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4"
          decelerationRate="fast"
          snapToInterval={width - 48}
        >
          {trendingServices.map((service, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 100)}
              key={service.id}
              style={{ width: width - 48 }}
              className="mr-4"
            >
              <ServiceCard
                service={service}
                onPress={() => router.push(`/service/${service.id}`)}
              />
            </Animated.View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
