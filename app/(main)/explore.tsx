// app/(main)/explore.tsx
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
  ImageBackground,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { SearchInput } from "@/components/shared/SearchInput";
import { ChevronLeft, Calendar, Star, X, Search } from "lucide-react-native";

// Enhanced explore data with all categories
const exploreData = [
  // Hiking Category
  {
    id: "hiking-1",
    category: "hiking",
    title: "Explore Colorado with the best and good locations here.",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero1.png"),
    isFavorite: false,
    rating: 4.8,
    description:
      "Discover the most breathtaking hiking trails in Colorado with stunning mountain views and pristine wilderness.",
  },
  {
    id: "hiking-2",
    category: "hiking",
    title: "Find the finest and greatest places",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero2.png"),
    isFavorite: true,
    rating: 4.9,
    description:
      "Experience the beauty of Colorado's natural landscapes with guided tours to the most scenic locations.",
  },
  {
    id: "hiking-3",
    category: "hiking",
    title: "The best sunset and sky view from the top of the hill of Colorado!",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero3.png"),
    isFavorite: false,
    rating: 4.7,
    description:
      "Witness spectacular sunsets from Colorado's highest peaks with panoramic views that will take your breath away.",
  },
  // Food Category
  {
    id: "food-1",
    category: "food",
    title: "Best Local Restaurants and Cafes in Colorado",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend1.png"),
    isFavorite: false,
    rating: 4.6,
    description:
      "Discover amazing local cuisine and hidden culinary gems across Colorado.",
  },
  {
    id: "food-2",
    category: "food",
    title: "Farm to Table Dining Experiences",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend2.png"),
    isFavorite: false,
    rating: 4.8,
    description:
      "Experience fresh, locally sourced ingredients in Colorado's finest restaurants.",
  },
  {
    id: "food-3",
    category: "food",
    title: "Colorado Craft Beer and Brewery Tours",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend3.png"),
    isFavorite: true,
    rating: 4.7,
    description:
      "Explore Colorado's thriving craft beer scene with guided brewery tours.",
  },
  // Store Category
  {
    id: "store-1",
    category: "store",
    title: "Local Artisan Shops and Markets",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend4.png"),
    isFavorite: false,
    rating: 4.5,
    description:
      "Find unique handcrafted items and local products in Colorado's artisan shops.",
  },
  {
    id: "store-2",
    category: "store",
    title: "Colorado Outdoor Gear Stores",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend5.png"),
    isFavorite: false,
    rating: 4.7,
    description:
      "Get equipped for your Colorado adventures at the best outdoor gear stores.",
  },
  {
    id: "store-3",
    category: "store",
    title: "Vintage and Antique Shopping Districts",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend6.png"),
    isFavorite: false,
    rating: 4.4,
    description:
      "Discover unique vintage finds and antiques in Colorado's historic districts.",
  },
  // Concert Category
  {
    id: "concert-1",
    category: "concert",
    title: "Red Rocks Amphitheatre Events",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero1.png"),
    isFavorite: true,
    rating: 4.9,
    description:
      "Experience world-class performances at Colorado's iconic Red Rocks venue.",
  },
  {
    id: "concert-2",
    category: "concert",
    title: "Denver Music Scene and Live Venues",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero2.png"),
    isFavorite: false,
    rating: 4.6,
    description:
      "Explore Denver's vibrant music scene with live performances across the city.",
  },
  // Towns Category
  {
    id: "towns-1",
    category: "towns",
    title: "Historic Mountain Towns of Colorado",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero3.png"),
    isFavorite: false,
    rating: 4.8,
    description:
      "Visit charming historic mountain towns with rich Colorado heritage.",
  },
  {
    id: "towns-2",
    category: "towns",
    title: "Aspen and Vail: Luxury Mountain Destinations",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend1.png"),
    isFavorite: false,
    rating: 4.7,
    description:
      "Experience luxury and natural beauty in Colorado's premier mountain towns.",
  },
  // Events Category
  {
    id: "events-1",
    category: "events",
    title: "Colorado Festivals and Seasonal Events",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend2.png"),
    isFavorite: false,
    rating: 4.6,
    description:
      "Join exciting festivals and events happening throughout Colorado.",
  },
  {
    id: "events-2",
    category: "events",
    title: "Summer Music Festivals in the Rockies",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend3.png"),
    isFavorite: true,
    rating: 4.8,
    description:
      "Dance and sing along at Colorado's amazing summer music festivals.",
  },
  // Resources Category
  {
    id: "resources-1",
    category: "resources",
    title: "Colorado Visitor Centers and Information",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend4.png"),
    isFavorite: false,
    rating: 4.5,
    description:
      "Get helpful information and resources for your Colorado adventure.",
  },
  {
    id: "resources-2",
    category: "resources",
    title: "Emergency Services and Safety Information",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend5.png"),
    isFavorite: false,
    rating: 4.7,
    description:
      "Stay safe with important emergency contacts and safety resources.",
  },
  // Additional categories for completeness
  {
    id: "attractions-1",
    category: "attraction",
    title: "Colorado National Parks and Monuments",
    date: "Jun 30 2025",
    image: require("@/assets/recommend/recommend6.png"),
    isFavorite: false,
    rating: 4.9,
    description:
      "Explore Colorado's stunning national parks and historic monuments.",
  },
  {
    id: "business-1",
    category: "local business",
    title: "Support Local Colorado Businesses",
    date: "Jun 30 2025",
    image: require("@/assets/images/hero1.png"),
    isFavorite: false,
    rating: 4.6,
    description:
      "Discover and support amazing local businesses across Colorado.",
  },
];

// Skeleton component for loading state
const SkeletonItem = () => (
  <View className='mb-4'>
    <View className='bg-white rounded-lg overflow-hidden shadow-sm'>
      <View className='relative h-72'>
        {/* Image skeleton */}
        <View className='w-full h-full bg-gray-200 animate-pulse' />

        {/* Rating badge skeleton */}
        <View className='absolute top-4 left-4 bg-gray-300 rounded-full px-2 py-1 w-12 h-6 animate-pulse' />

        {/* Favorite button skeleton */}
        <View className='absolute top-4 right-4 w-10 h-10 bg-gray-300 rounded-full animate-pulse' />

        {/* Content overlay skeleton */}
        <View className='absolute bottom-0 left-0 right-0 p-4'>
          <View className='bg-gray-300 h-6 w-3/4 mb-2 rounded animate-pulse' />
          <View className='bg-gray-300 h-4 w-1/2 mb-2 rounded animate-pulse' />
          <View className='flex-row items-center justify-between'>
            <View className='bg-gray-300 h-4 w-1/3 rounded animate-pulse' />
            <View className='bg-gray-300 h-6 w-16 rounded-full animate-pulse' />
          </View>
        </View>
      </View>
    </View>
  </View>
);

export default function ExploreScreen() {
  const params = useLocalSearchParams();
  const [searchText, setSearchText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState(exploreData);

  // Get category from navigation params with proper type handling
  const selectedCategory =
    typeof params.category === "string" ? params.category : "";
  const categoryName =
    typeof params.categoryName === "string" ? params.categoryName : "";

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const clearSearch = () => {
    setSearchText("");
  };

  const clearCategoryFilter = () => {
    // Clear category filter by updating route params
    router.setParams({ category: "all", categoryName: "" });
  };

  const filterData = useCallback(() => {
    let filtered = exploreData;

    // Filter by category if specified
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search text
    if (searchText.trim()) {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          item.category.toLowerCase().includes(searchLower) ||
          item.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredData(filtered);
  }, [searchText, selectedCategory]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
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
        category: item.category,
      },
    });
  };

  // Group filtered data by category for better organization
  const groupedData = filteredData.reduce(
    (acc, item) => {
      const categoryKey =
        item.category.charAt(0).toUpperCase() + item.category.slice(1);
      if (!acc[categoryKey]) {
        acc[categoryKey] = [];
      }
      acc[categoryKey].push(item);
      return acc;
    },
    {} as Record<string, typeof exploreData>
  );

  const renderExploreItem = (item: any) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      className='mb-4'
      activeOpacity={0.7}
    >
      <View className='bg-white rounded-lg overflow-hidden shadow-sm'>
        <View className='relative h-72'>
          <Image
            source={item.image}
            className='w-full h-full'
            resizeMode='cover'
          />
          <View className='absolute inset-0 bg-black/30' />

          {/* Rating badge */}
          <View className='absolute top-4 left-4 bg-black/50 rounded-full px-2 py-1 flex-row items-center'>
            <Star size={12} color='#FFD700' fill='#FFD700' />
            <Text className='text-white text-xs ml-1 font-medium'>
              {item.rating}
            </Text>
          </View>

          {/* Favorite button */}
          <TouchableOpacity
            onPress={() => toggleFavorite(item.id)}
            className='absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center'
          >
            <Star
              size={20}
              color={favorites.has(item.id) ? "#FFD700" : "white"}
              fill={favorites.has(item.id) ? "#FFD700" : "transparent"}
            />
          </TouchableOpacity>

          {/* Content overlay */}
          <View className='absolute bottom-0 left-0 right-0 p-4'>
            <Text className='text-white text-lg font-bold mb-2 leading-tight'>
              <TranslatedText>{item.title}</TranslatedText>
            </Text>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center flex-1'>
                <Calendar size={16} color='white' />
                <Text className='text-white text-sm ml-2'>
                  <TranslatedText>{item.date}</TranslatedText>
                </Text>
              </View>
              <View className='bg-white/20 rounded-full px-2 py-1'>
                <Text className='text-white text-xs font-medium capitalize'>
                  {item.category}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Get page title with proper type handling
  const getPageTitle = (): string => {
    if (categoryName) {
      return categoryName;
    }
    if (selectedCategory && selectedCategory !== "all") {
      return (
        selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)
      );
    }
    return "Explore";
  };
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");
  return (
    <SafeAreaView className='flex-1 bg-surface'>
      <View className='absolute top-0 left-0 right-0'>
        <ImageBackground
          source={require("@/assets/images/top-cloud.png")}
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.35,
          }}
          resizeMode='cover'
        />
      </View>
      {/* Header */}
      <View className='flex-row items-center justify-between px-5 py-3'>
        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className='w-10 h-10 bg-white/40 rounded-full items-center justify-center p-2 border border-[#E6E6E6]'
        >
          <ChevronLeft size={24} color='#1F2937' />
        </TouchableOpacity>

        {/* Centered title */}
        <Text className='text-xl font-bold text-black'>
          <TranslatedText>{getPageTitle()}</TranslatedText>
        </Text>

        {/* Right side filler with same width as the back button */}
        <View className='w-9 h-9' />
      </View>

      {/* Search */}
      <View className='px-5 py-1'>
        <View className='relative'>
          <SearchInput
            placeholder={`Search in ${getPageTitle().toLowerCase()}...`}
            value={searchText}
            onChangeText={setSearchText}
            className='bg-white'
            iconShow={false}
          />
          {/* Search/Clear icon */}
          <TouchableOpacity
            onPress={searchText.length > 0 ? clearSearch : undefined}
            className='absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center'
          >
            {searchText.length > 0 ? (
              <View className='w-6 h-6 bg-gray-400/20 rounded-full items-center justify-center'>
                <X size={16} color='#6B7280' />
              </View>
            ) : (
              <Search size={20} color='#4DBA28' />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Results count */}
      <View className='px-5 py-2 border-b border-gray-100'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-sm text-gray-600 flex-1'>
            <TranslatedText>
              {(() => {
                if (loading) {
                  return "Loading...";
                }

                let text = `${filteredData.length} ${filteredData.length === 1 ? "result" : "results"} found`;

                if (selectedCategory && selectedCategory !== "all") {
                  text += ` in ${getPageTitle()}`;
                }

                if (searchText) {
                  text += ` for "${searchText}"`;
                }

                return text;
              })()}
            </TranslatedText>
          </Text>

          {/* Clear category filter button */}
          {selectedCategory && selectedCategory !== "all" && (
            <TouchableOpacity
              onPress={clearCategoryFilter}
              className='ml-3 bg-gray-100 rounded-full px-3 py-1 flex-row items-center'
            >
              <X size={12} color='#6B7280' />
              <Text className='text-xs text-gray-600 ml-1'>
                <TranslatedText>Clear</TranslatedText>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {loading ? (
          // Loading skeleton
          <View className='px-5 py-4'>
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonItem key={index} />
            ))}
          </View>
        ) : filteredData.length === 0 ? (
          <View className='flex-1 items-center justify-center py-20'>
            <Text className='text-gray-500 text-center text-lg mb-2'>
              <TranslatedText>No results found</TranslatedText>
            </Text>
            <Text className='text-gray-400 text-center px-8'>
              <TranslatedText>
                Try adjusting your search terms or browse all categories
              </TranslatedText>
            </Text>
          </View>
        ) : (
          Object.entries(groupedData).map(([category, items]) => (
            <View key={category} className='px-5 py-4'>
              {/* Only show category header if not filtering by specific category */}
              {(!selectedCategory || selectedCategory === "all") && (
                <Text className='text-2xl font-bold text-black mb-4'>
                  <TranslatedText>{category}</TranslatedText>
                </Text>
              )}
              {items.map(renderExploreItem)}
            </View>
          ))
        )}

        {/* Bottom padding */}
        <View className='h-20' />
      </ScrollView>
    </SafeAreaView>
  );
}
