import { View, Pressable } from "react-native";
import { Text } from "./ui/text";
import { Image } from "expo-image";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Star, Clock } from "lucide-react-native";
import { Badge } from "./ui/badge";
import type { Service } from "~/types/service";
import Animated, { FadeInDown } from "react-native-reanimated";

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
  index?: number;
}

export function ServiceCard({ service, onPress, index = 0 }: ServiceCardProps) {
  const averageRating =
    service.ratings && service.ratings.length > 0
      ? (
          service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        ).toFixed(1)
      : "New";

  const lowestPackage = service.packages[0];
  const creatorProfile = service.creator?.profile;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      className="overflow-hidden"
    >
      <Pressable
        onPress={onPress}
        className="bg-card rounded-2xl shadow-sm border border-border"
      >
        {/* Image Section */}
        <View className="relative w-full h-48 overflow-hidden">
          {service.medias?.images?.[0] ? (
            <Image
              source={{ uri: service.medias.images[0] }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
              transition={300}
              priority="high"
            />
          ) : (
            <View className="w-full h-full bg-muted" />
          )}

          {/* Price Badge */}
          <View className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="shadow-lg backdrop-blur-lg bg-background/90"
            >
              <Text className="text-sm font-semibold">
                ${lowestPackage?.price?.toFixed(2)}
              </Text>
            </Badge>
          </View>

          {/* Rating Badge */}
          {averageRating !== "New" && (
            <View className="absolute top-3 left-3">
              <Badge className="shadow-lg backdrop-blur-lg bg-background/90 flex-row items-center">
                <Star
                  size={12}
                  className="text-yellow-500 fill-yellow-500 mr-1"
                />
                <Text className="text-sm font-medium">{averageRating}</Text>
              </Badge>
            </View>
          )}

          {/* Delivery Time */}
          <View className="absolute bottom-3 right-3">
            <Badge
              variant="secondary"
              className="shadow-lg backdrop-blur-lg bg-background/90 flex-row items-center"
            >
              <Clock size={12} className="text-muted-foreground mr-1" />
              <Text className="text-sm">
                {lowestPackage?.deliveryTime} days
              </Text>
            </Badge>
          </View>
        </View>

        {/* Content Section */}
        <View className="p-4">
          {/* Title and Description */}
          <View className="mb-3">
            <Text className="text-lg font-semibold mb-1" numberOfLines={2}>
              {service.name}
            </Text>
            <Text className="text-sm text-muted-foreground" numberOfLines={2}>
              {service.description}
            </Text>
          </View>

          {/* Tags */}
          <View className="flex-row flex-wrap gap-1 mb-4">
            {service.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-2 py-0.5 rounded-full"
              >
                <Text className="text-xs">{tag}</Text>
              </Badge>
            ))}
          </View>

          {/* Creator Info */}
          <View className="flex-row items-center justify-between pt-3 border-t border-border">
            <View className="flex-row items-center">
              <Avatar
                className="h-6 w-6 mr-2"
                alt={creatorProfile?.firstName || "Creator"}
              >
                <AvatarImage
                  source={{ uri: creatorProfile?.profilePic || undefined }}
                />
                <AvatarFallback>
                  <Text>{creatorProfile?.firstName?.[0] || "C"}</Text>
                </AvatarFallback>
              </Avatar>
              <Text className="text-sm text-muted-foreground">
                {creatorProfile?.firstName} {creatorProfile?.lastName}
              </Text>
            </View>
            {creatorProfile?.title && (
              <Badge variant="secondary" className="text-xs">
                <Text>{creatorProfile.title}</Text>
              </Badge>
            )}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
