// app/(main)/favorites.tsx
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Star, Heart } from "lucide-react-native";

// Mock favorites data
const favoritesData = [
  {
    id: "fav-1",
    title: "Explore Colorado",
    dateRange: "12 Feb - 30 Mar",
    image: require("@/assets/recommend/recommend1.png"),
    type: "recommendation",
    rating: 4.9,
  },
  {
    id: "fav-2", 
    title: "Hiking & Moving",
    dateRange: "12 Feb - 30 Mar",
    image: require("@/assets/recommend/recommend2.png"),
    type: "recommendation", 
    rating: 4.7,
  },
  {
    id: "fav-3",
    title: "Mountain Adventures",
    dateRange: "15 Mar - 20 Apr",
    image: require("@/assets/recommend/recommend3.png"),
    type: "explore",
    rating: 4.8,
  },
];

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState(favoritesData);

  const handleItemPress = (item: any) => {
    router.push({
      pathname: "/(main)/detail/[id]",
      params: { 
        id: item.id,
        type: item.type,
        title: item.title,
        dateRange: item.dateRange,
        rating: item.rating.toString()
      }
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const renderFavoriteItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      className="mb-4"
      activeOpacity={0.7}
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <View className="h-48 w-full relative">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => removeFavorite(item.id)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <Heart size={20} color="#FF6B6B" fill="#FF6B6B" />
          </TouchableOpacity>
        </View>
        <View className="p-4">
          <Text className="text-xl font-bold text-black mb-2">
            <TranslatedText>{item.title}</TranslatedText>
          </Text>
          <Text className="text-gray-500 text-sm mb-2">
            <TranslatedText>{item.dateRange}</TranslatedText>
          </Text>
          <View className="flex-row items-center">
            <Star size={16} color="#FFD700" fill="#FFD700" />
            <Text className="text-gray-700 ml-1 font-medium">
              {item.rating}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <View className="flex-1">
        {/* Header */}
        <View className="px-5 py-4 bg-white border-b border-gray-100">
          <Text className="text-2xl font-bold text-black">
            <TranslatedText>Favorites</TranslatedText>
          </Text>
        </View>

        {favorites.length > 0 ? (
          <ScrollView
            className="flex-1 px-5"
            showsVerticalScrollIndicator={false}
          >
            <View className="py-4">
              {favorites.map(renderFavoriteItem)}
            </View>
          </ScrollView>
        ) : (
          <View className="flex-1 items-center justify-center px-5">
            <Heart size={64} color="#ccc" />
            <Text className="text-gray-500 text-lg text-center mt-4">
              <TranslatedText>No favorites yet</TranslatedText>
            </Text>
            <Text className="text-gray-400 text-center mt-2">
              <TranslatedText>
                Start exploring and add places to your favorites!
              </TranslatedText>
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}