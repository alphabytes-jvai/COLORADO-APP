// app/(main)/explore.tsx
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
import { SearchInput } from "@/components/shared/SearchInput";
import { CategoryService } from "@/services/homeService";
import type { ExploreItem } from "@/types/homeTypes";
import { ChevronLeft, Calendar, Star } from "lucide-react-native";

// Mock explore data with more detailed items
const exploreData = [
  {
    id: "hiking-1",
    category: "Hiking",
    title: "Explore Colorado with the best and good locations here.",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero1.png"),
    isFavorite: false,
    rating: 4.8,
    description: "Discover the most breathtaking hiking trails in Colorado with stunning mountain views and pristine wilderness.",
  },
  {
    id: "hiking-2", 
    category: "Hiking",
    title: "Find the finest and greatest places",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero2.png"),
    isFavorite: true,
    rating: 4.9,
    description: "Experience the beauty of Colorado's natural landscapes with guided tours to the most scenic locations.",
  },
  {
    id: "hiking-3",
    category: "Hiking", 
    title: "The best sunset and sky view from the top of the hill of Colorado!",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero3.png"),
    isFavorite: false,
    rating: 4.7,
    description: "Witness spectacular sunsets from Colorado's highest peaks with panoramic views that will take your breath away.",
  },
  {
    id: "travels-1",
    category: "Travels",
    title: "Explore Colorado with the best and good locations here.",
    date: "Jun 30 2025", 
    image: require("@/assets/recommend/recommend1.png"),
    isFavorite: false,
    rating: 4.6,
    description: "Complete travel guide to Colorado's most iconic destinations and hidden gems.",
  },
  {
    id: "travels-2",
    category: "Travels",
    title: "The best sunset and sky view from the top of the hill of Colorado!",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend2.png"), 
    isFavorite: false,
    rating: 4.8,
    description: "Experience Colorado's majestic mountain ranges and pristine wilderness areas.",
  },
  {
    id: "travels-3",
    category: "Travels",
    title: "Explore Colorado with the best and good locations here.",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend3.png"),
    isFavorite: false,
    rating: 4.5,
    description: "Discover Colorado's rich cultural heritage and historic landmarks throughout the state.",
  },
];

export default function ExploreScreen() {
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleItemPress = (item: any) => {
    router.push({
      pathname: "/(main)/detail/[id]",
      params: { 
        id: item.id,
        type: "explore",
        title: item.title,
        description: item.description,
        date: item.date,
        rating: item.rating.toString(),
        category: item.category
      }
    });
  };

  const filteredData = exploreData.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof exploreData>);

  const renderExploreItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      className="mb-4"
      activeOpacity={0.7}
    >
      <View className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <View className="relative h-48">
          <Image
            source={item.image}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black/30" />
          
          {/* Favorite button */}
          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center"
          >
            <Star 
              size={20} 
              color={favorites.has(item.id) ? "#FFD700" : "white"}
              fill={favorites.has(item.id) ? "#FFD700" : "transparent"}
            />
          </TouchableOpacity>

          {/* Content overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-4">
            <Text className="text-white text-lg font-bold mb-2 leading-tight">
              <TranslatedText>{item.title}</TranslatedText>
            </Text>
            <View className="flex-row items-center">
              <Calendar size={16} color="white" />
              <Text className="text-white text-sm ml-2">
                <TranslatedText>{item.date}</TranslatedText>
              </Text>
            </View>
          </View>
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
          <TranslatedText>Explore</TranslatedText>
        </Text>
      </View>

      {/* Search */}
      <View className="px-5 py-4 bg-white">
        <SearchInput
          placeholder="Search places, activities..."
          value={searchText}
          onChangeText={setSearchText}
          className="bg-gray-50"
        />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {Object.entries(groupedData).map(([category, items]) => (
          <View key={category} className="px-5 py-4">
            <Text className="text-2xl font-bold text-black mb-4">
              <TranslatedText>{category}</TranslatedText>
            </Text>
            {items.map(renderExploreItem)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}