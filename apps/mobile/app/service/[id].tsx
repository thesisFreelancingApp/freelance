import {
  View,
  ScrollView,
  Dimensions,
  StatusBar,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Text } from "~/components/ui/text";
import { Image } from "expo-image";
import { useService } from "~/lib/hooks/use-service";
import { useState } from "react";
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
  const { service, isLoading, error } = useService(id as string);
  const [selectedPackage, setSelectedPackage] = useState(0);
  const [liked, setLiked] = useState(false);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  if (error || !service) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-destructive text-center mb-4">
          {error?.message || "Service not found"}
        </Text>
        <Button onPress={() => router.back()}>
          <Text className="text-primary-foreground">Go Back</Text>
        </Button>
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

  return (
    <View className="flex-1 bg-background">
      <StatusBar barStyle="light-content" />
      <ScrollView
        className="flex-1"
        stickyHeaderIndices={[0]}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Sticky Header */}
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

        {/* Hero Image */}
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
          {/* Service Info Card */}
          <Card className="mb-6 shadow-lg">
            <CardContent className="p-5">
              <Badge variant="secondary" className="mb-4">
                <Text className="text-sm">
                  À partir de ${service.packages[0]?.price}
                </Text>
              </Badge>

              <Text className="text-2xl font-bold mb-5">{service.name}</Text>

              {/* Seller Info */}
              <View className="flex-row items-center mb-6">
                <Avatar
                  className="h-14 w-14 mr-4 border-2 border-background"
                  alt={`${service.seller?.firstName || "User"}'s avatar`}
                >
                  <AvatarImage source={{ uri: service.seller?.profilePic }} />
                  <AvatarFallback>
                    {service.seller?.firstName?.[0] || "S"}
                  </AvatarFallback>
                </Avatar>
                <View className="flex-1">
                  <Text className="font-semibold text-base">
                    {service.seller?.firstName} {service.seller?.lastName}
                  </Text>
                  <View className="flex-row items-center mt-1">
                    <Star
                      size={16}
                      className="text-yellow-400 fill-yellow-400 mr-1"
                    />
                    <Text className="text-sm text-muted-foreground">
                      {averageRating} • {service.ratings?.length || 0} avis
                    </Text>
                  </View>
                </View>
                <Button
                  variant="outline"
                  onPress={() => router.push(`/chat/${service.seller?.id}`)}
                  className="rounded-full"
                >
                  <MessageCircle size={18} className="mr-2" />
                  <Text>Contact</Text>
                </Button>
              </View>

              {/* Description */}
              <Text className="text-base leading-relaxed text-muted-foreground mb-6">
                {service.description}
              </Text>

              {/* Tags */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-4"
              >
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
            </CardContent>
          </Card>

          {/* Packages */}
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
                  <Pressable
                    onPress={() => setSelectedPackage(index)}
                    className={cn(
                      "border-2 rounded-lg p-4 bg-card",
                      selectedPackage === index
                        ? "border-primary"
                        : "border-border"
                    )}
                  >
                    <Text className="text-lg font-semibold">{pkg.name}</Text>
                    <Text className="text-2xl font-bold text-primary mt-2">
                      ${pkg.price}
                    </Text>
                    <Text className="text-muted-foreground mt-2">
                      {pkg.description}
                    </Text>

                    <Separator className="my-4" />

                    {pkg.features?.map((feature, i) => (
                      <View key={i} className="flex-row items-center mb-3">
                        <Check size={16} className="text-primary mr-2" />
                        <Text className="text-sm">{feature}</Text>
                      </View>
                    ))}

                    <View className="flex-row items-center mt-4 pt-4 border-t border-border">
                      <Clock size={16} className="text-muted-foreground mr-2" />
                      <Text className="text-muted-foreground">
                        Livraison en {pkg.deliveryTime} jours
                      </Text>
                    </View>
                  </Pressable>
                </Animated.View>
              ))}
            </ScrollView>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Action */}
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
