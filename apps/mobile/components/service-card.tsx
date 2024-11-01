import { View } from "react-native";
import { Text } from "./ui/text";
import { Card, CardContent } from "./ui/card";
import { Image } from "expo-image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Star, Clock } from "lucide-react-native";
import { Badge } from "./ui/badge";
import type { Service } from "~/types/service";

interface ServiceCardProps {
  service: Service;
  onPress?: () => void;
}

export function ServiceCard({ service, onPress }: ServiceCardProps) {
  const averageRating =
    service.ratings && service.ratings.length > 0
      ? (
          service.ratings.reduce((acc, curr) => acc + curr.rating, 0) /
          service.ratings.length
        ).toFixed(1)
      : "New";

  const lowestPackage = service.packages[0];

  return (
    <Card onPress={onPress} className="overflow-hidden border-0 shadow-lg">
      <View className="relative">
        {service.medias?.images?.[0] && (
          <Image
            source={{ uri: service.medias.images[0] }}
            className="w-full h-48"
            contentFit="cover"
          />
        )}
      </View>

      <CardContent className="p-4">
        <View className="flex-row justify-between items-start">
          <View className="flex-1">
            <Text className="text-lg font-semibold" numberOfLines={2}>
              {service.name}
            </Text>
            <Text
              className="text-sm text-muted-foreground mt-1"
              numberOfLines={2}
            >
              {service.description}
            </Text>
          </View>
          <View className="bg-primary/10 rounded-full px-3 py-1 flex-row items-center ml-2">
            <Star size={16} className="text-primary mr-1" />
            <Text className="text-primary font-medium">{averageRating}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-1 mt-3">
          {service.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="px-2 py-0.5">
              <Text className="text-xs">{tag}</Text>
            </Badge>
          ))}
        </View>

        <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-border">
          <View className="flex-row items-center">
            <Clock size={12} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground ml-1">
              {lowestPackage?.deliveryTime} days
            </Text>
          </View>
          <View>
            <Text className="text-xs text-muted-foreground">Starting at</Text>
            <Text className="text-sm font-semibold text-primary">
              ${parseFloat(lowestPackage?.price || "0").toFixed(2)}
            </Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}
