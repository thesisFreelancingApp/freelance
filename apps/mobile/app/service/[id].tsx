import { View, ScrollView, Dimensions, StatusBar } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Text } from "~/components/ui/text";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase";
import type { Service } from "~/types/service";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Star,
  Clock,
  ArrowLeft,
  Check,
  Heart,
  Share2,
  MessageCircle,
} from "lucide-react-native";
import { Badge } from "~/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { cn } from "~/lib/utils";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    async function fetchService() {
      try {
        // First fetch the service with its basic relations
        const { data, error } = await supabase
          .from("Service")
          .select(
            `
            *,
            packages:ServicePackage(
              id,
              name,
              description,
              price,
              deliveryTime,
              features
            ),
            ratings:Rating(
              id,
              rating,
              review,
              createdAt
            )
          `
          )
          .eq("id", id)
          .single();

        if (error) throw error;
        setService(data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!service) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Service not found</Text>
      </View>
    );
  }

  const averageRating =
    service.ratings && service.ratings.length > 0
      ? (
          service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        ).toFixed(1)
      : "New";

  // Calculate the maximum number of features across all packages
  const maxFeatures = Math.max(
    ...(service?.packages.map((pkg) => pkg.features?.length || 0) || [])
  );

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      <ScrollView
        className="flex-1"
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Sticky Header - Made more prominent */}
        <Animated.View
          entering={FadeIn}
          className="flex-row justify-between items-center px-4 py-4 bg-background/95 backdrop-blur-xl z-10"
        >
          <Button
            variant="ghost"
            size="icon"
            onPress={() => router.back()}
            className="bg-background/80 rounded-full"
          >
            <ArrowLeft size={22} className="text-foreground" />
          </Button>
          <View className="flex-row gap-3">
            <Button
              variant="ghost"
              size="icon"
              onPress={() => setLiked(!liked)}
              className="bg-background/80 rounded-full"
            >
              <Heart
                size={22}
                className={
                  liked ? "text-red-500 fill-red-500" : "text-foreground"
                }
              />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-background/80 rounded-full"
            >
              <Share2 size={22} className="text-foreground" />
            </Button>
          </View>
        </Animated.View>

        {/* Hero Image with Gallery and Page Indicator */}
        <View className="relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {service.medias?.images?.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={{ width, height: 320 }}
                className="bg-muted"
                contentFit="cover"
              />
            ))}
          </ScrollView>
          {/* Page Indicator */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-1.5">
            {service.medias?.images?.map((_, index) => (
              <View
                key={index}
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  index === 0 ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </View>
          <View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </View>

        {/* Main Content */}
        <Animated.View entering={FadeInDown.delay(200)} className="px-4 -mt-20">
          {/* Service Info Card - Enhanced spacing and hierarchy */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-5">
              <Badge variant="secondary" className="mb-4">
                <Text className="text-sm">
                  À partir de ${service.packages[0]?.price}
                </Text>
              </Badge>

              <Text className="text-2xl font-bold mb-5">{service.name}</Text>

              {/* Seller Info - Improved layout */}
              <View className="flex-row items-center mb-6">
                <Avatar
                  className="h-14 w-14 mr-4 border-2 border-background"
                  alt={`Profile picture of ${
                    service.creator?.profile?.firstName || "user"
                  }`}
                >
                  <AvatarImage
                    source={{ uri: service.creator?.profile?.profilePic }}
                  />
                  <AvatarFallback>
                    <Text className="text-lg">
                      {service.creator?.profile?.firstName?.[0] || "S"}
                    </Text>
                  </AvatarFallback>
                </Avatar>
                <View className="flex-1">
                  <Text className="font-semibold text-base">
                    {service.creator?.profile?.firstName}{" "}
                    {service.creator?.profile?.lastName}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400 mr-1"
                    />
                    <Text className="text-sm text-muted-foreground">
                      {averageRating} • {service.ratings.length} avis
                    </Text>
                  </View>
                </View>
                <Button
                  variant="outline"
                  onPress={() => router.push("/messages")}
                  className="rounded-full"
                >
                  <MessageCircle size={18} className="mr-2" />
                  <Text>Contact</Text>
                </Button>
              </View>

              {/* Description - Better readability */}
              <Text className="text-base leading-relaxed text-muted-foreground mb-6">
                {service.description}
              </Text>

              {/* Tags - Enhanced visual */}
              <View className="mb-4">
                <Text className="font-medium mb-3">Tags</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {service.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="mr-2 px-4 py-1.5"
                    >
                      <Text>{tag}</Text>
                    </Badge>
                  ))}
                </ScrollView>
              </View>
            </CardContent>
          </Card>

          {/* Packages Section - keep existing code but update styling */}
          <View className="mb-24">
            <Text className="text-xl font-bold mb-4">Packages</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={width - 48}
              decelerationRate="fast"
              className="-mx-4 px-4"
            >
              {service.packages.map((pkg, index) => (
                <Animated.View
                  entering={FadeInDown.delay(300 + index * 100)}
                  key={pkg.id}
                  style={{ width: width - 48 }}
                  className="mr-4"
                >
                  <Card
                    className={cn(
                      "border-2",
                      selectedPackage === index
                        ? "border-primary"
                        : "border-border"
                    )}
                    onPress={() => setSelectedPackage(index)}
                  >
                    <CardContent className="p-4">
                      {/* Package Header */}
                      <View className="min-h-[120]">
                        <Text className="text-lg font-semibold mb-1">
                          {pkg.name}
                        </Text>
                        <Text className="text-2xl font-bold text-primary mb-2">
                          ${pkg.price}
                        </Text>
                        <Text className="text-muted-foreground">
                          {pkg.description}
                        </Text>
                      </View>

                      <Separator className="my-4" />

                      {/* Features Section with fixed height */}
                      <View className="min-h-[200]">
                        {pkg.features?.map((feature, i) => (
                          <View key={i} className="flex-row items-center mb-3">
                            <Check size={16} className="text-primary mr-2" />
                            <Text className="text-sm flex-1">{feature}</Text>
                          </View>
                        ))}
                        {/* Add empty spaces for missing features to maintain height */}
                        {[
                          ...Array(maxFeatures - (pkg.features?.length || 0)),
                        ].map((_, i) => (
                          <View key={`empty-${i}`} className="h-[28] mb-3" />
                        ))}
                      </View>

                      {/* Delivery Time */}
                      <View className="flex-row items-center mt-4 pt-4 border-t border-border">
                        <Clock
                          size={16}
                          className="text-muted-foreground mr-2"
                        />
                        <Text className="text-muted-foreground">
                          Livraison en {pkg.deliveryTime} jours
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </Animated.View>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action - Enhanced */}
      <Animated.View
        entering={FadeInDown.delay(500)}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-background/95 backdrop-blur-lg"
      >
        <Button className="w-full" size="lg">
          <Text className="text-primary-foreground font-semibold text-base">
            Commander • ${service.packages[selectedPackage]?.price}
          </Text>
        </Button>
      </Animated.View>
    </View>
  );
}
