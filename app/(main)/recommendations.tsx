// app/(main)/recommendations.tsx
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { AnimatedHeader } from "@/components/shared/AnimatedHeader";
import { CategoryService } from "@/services/homeService";
import type { RecommendedItem } from "@/types/homeTypes";
import { ChevronLeft } from "lucide-react-native";

export default function RecommendationsScreen() {
  const [recommendations, setRecommendations] = useState<RecommendedItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      const items = CategoryService.getRecommendedItems();
      setRecommendations(items);
    } catch (error) {
      console.error("Error loading recommendations:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadRecommendations();
    setRefreshing(false);
  };

  const handleItemPress = (item: RecommendedItem) => {
    router.push({
      pathname: "/(main)/detail/[id]",
      params: { 
        id: item.id,
        type: "recommendation",
        title: item.title,
        description: item.description || "",
        location: item.location || "",
        dateRange: item.dateRange,
        rating: item.rating?.toString() || "0",
        price: item.price?.toString() || "0"
      }
    });
  };

  const renderRecommendationItem = (item: RecommendedItem) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      className="mb-4"
      activeOpacity={0.7}
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <View className="h-48 w-full">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>
        <View className="p-4">
          <Text className="text-xl font-bold text-black mb-2">
            <TranslatedText>{item.title}</TranslatedText>
          </Text>
          <Text className="text-gray-500 text-sm">
            <TranslatedText>{item.dateRange}</TranslatedText>
          </Text>
          {item.description && (
            <Text className="text-gray-600 text-sm mt-2 leading-5">
              <TranslatedText>{item.description}</TranslatedText>
            </Text>
          )}
          {item.location && (
            <Text className="text-primary-dark text-sm mt-1 font-medium">
              <TranslatedText>{item.location}</TranslatedText>
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="flex-row items-center px-5 py-4 bg-white border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <ChevronLeft size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">
          <TranslatedText>Recommendations</TranslatedText>
        </Text>
      </View>

      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="py-4">
          {recommendations.map(renderRecommendationItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}