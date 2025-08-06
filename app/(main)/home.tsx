// app/(main)/home.tsx
import type React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ImageBackground,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { SearchInput } from "@/components/shared/SearchInput";
import { SearchScreen } from "@/components/shared/SearchScreen";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { useAppStore } from "@/store/useAppStore";
import { useTranslation } from "@/hooks/useTranslation";
import { Bell } from "lucide-react-native";
import { CategoryService } from "@/services/homeService";
import type { Category, AllDataStructure, HeroSlide } from "@/types/homeTypes";
import { HeroSlider } from "@/components/main/HomeSections/HeroSlider";
import { DynamicCategoriesSection } from "@/components/main/HomeSections/DynamicCategoriesSection";
import { RecommendedSection } from "@/components/main/HomeSections/RecommendedSection";
import { ExploreSection } from "@/components/main/HomeSections/ExploreSection";

export default function HomeScreen() {
  const { user } = useAppStore();
  const { currentLanguage } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showSearchScreen, setShowSearchScreen] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  // Data from service
  const [categories, setCategories] = useState<Category[]>([]);
  const [exploreItems, setExploreItems] = useState<AllDataStructure[]>([]);
  const [recommendedItems, setRecommendedItems] = useState<AllDataStructure[]>(
    []
  );
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  // Get current flag based on language
  const getCurrentFlag = () => {
    switch (currentLanguage) {
      case "es":
        return require("@/assets/images/spain-flag.png");
      case "en":
      default:
        return require("@/assets/images/us-flag.png");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // In real app, these would be API calls
      setCategories(CategoryService.getCategoriesByPriority());
      setExploreItems(CategoryService.getExploreItems());
      setRecommendedItems(CategoryService.getRecommendedItems());
      setHeroSlides(CategoryService.getHeroSlides());
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleCategoryPress = (category: Category) => {
    console.log("Category pressed:", category.name);
    router.push({
      pathname: "/(main)/explore",
      params: {
        category: category.name.toLowerCase(),
        categoryId: category.id,
        categoryName: category.name,
      },
    });
  };

 const handleExploreItemPress = (item: AllDataStructure) => {
   console.log("Explore item pressed:", item.title);
   router.push({
     pathname: "/(main)/detail/[id]" as const,
     params: {
       id: item.id,
       // Pass the full item as JSON string for reliable data transfer
       itemData: JSON.stringify({
         id: item.id,
         title: item.title || item.name,
         name: item.name,
         description: item.description || "",
         location: item.location || "",
         address: item.address || "",
         rating: item.rating || 4.5,
         dateRange: item.dateRange || "Available year-round",
         price: item.price,
         priceLevel: item.priceLevel,
         category: item.categories?.[0] || "Attraction",
         categories: item.categories,
         phone: item.phone || "",
         openingHours: item.openingHours || "",
         latitude: item.latitude,
         longitude: item.longitude,
         images: item.images,
         socialLinks: item.socialLinks,
         type: item.type,
         eventCount: item.eventCount,
         isFeatured: item.isFeatured,
         offlineSupported: item.offlineSupported,
         offlineData: item.offlineData,
       }),
     },
   });
 };

 const handleRecommendedItemPress = (item: AllDataStructure) => {
   console.log("Recommended item pressed:", item.title);
   router.push({
     pathname: "/(main)/detail/[id]" as const,
     params: {
       id: item.id,
       // Pass the full item as JSON string for reliable data transfer
       itemData: JSON.stringify({
         id: item.id,
         title: item.title || item.name,
         name: item.name,
         description: item.description || "",
         location: item.location || "",
         address: item.address || "",
         rating: item.rating || 4.5,
         dateRange: item.dateRange || "Available year-round",
         price: item.price,
         priceLevel: item.priceLevel,
         category: item.categories?.[0] || "Attraction",
         categories: item.categories,
         phone: item.phone || "",
         openingHours: item.openingHours || "",
         latitude: item.latitude,
         longitude: item.longitude,
         images: item.images,
         socialLinks: item.socialLinks,
         type: item.type,
         eventCount: item.eventCount,
         isFeatured: item.isFeatured,
         offlineSupported: item.offlineSupported,
         offlineData: item.offlineData,
       }),
     },
   });
 };


  const handleHeroSlidePress = (slide: HeroSlide) => {
    console.log("Hero slide pressed:", slide.title);
    router.push("/(main)/explore");
  };

  const handleRecommendedSeeAll = () => {
    console.log("See all recommended pressed");
    router.push("/(main)/recommendations");
  };

  const handleExploreSeeAll = () => {
    console.log("See all explore pressed");
    router.push("/(main)/explore");
  };

  const handleSearchInputPress = () => {
    setShowSearchScreen(true);
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  const handleNotificationPress = () => {
    router.push("/(main)/map");
  };

  const handleLanguagePress = () => {
    setShowLanguageSelector(true);
  };

  const handleLanguageSelect = () => {
    setShowLanguageSelector(false);
  };

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
    Dimensions.get("window");

  return (
    <>
      <SafeAreaView className='flex-1 bg-white'>
        {/* Header Background */}
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
        <View className='px-5 py-3 z-10'>
          <View className='flex-row items-center justify-between mb-4'>
            <View className='flex-1'>
              <Text className='text-sm text-gray-600 mb-1'>
                <TranslatedText>
                  {user ? `Welcome, ${user.name}!` : "Welcome, Nayon!"}
                </TranslatedText>
              </Text>
              <Text className='text-2xl font-bold text-black'>
                <TranslatedText>Explore Colorado</TranslatedText>
              </Text>
            </View>
            <View className='flex-row items-center space-x-3'>
              {/* Language Selector Button */}
              <TouchableOpacity
                onPress={handleLanguagePress}
                className='w-9 h-9 bg-white/40 rounded-full border border-[#E6E6E6] items-center justify-center p-2'
                activeOpacity={0.7}
              >
                <Image
                  source={getCurrentFlag()}
                  className='w-5 h-5'
                  resizeMode='contain'
                />
              </TouchableOpacity>

              {/* Notification Button */}
              <TouchableOpacity
                onPress={handleNotificationPress}
                className='relative w-9 h-9 bg-white/40 rounded-full border border-[#E6E6E6] items-center justify-center p-2'
              >
                <Bell size={20} color='#333' />
                <View className='absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <SearchInput
            placeholder='Search here'
            value={searchText}
            onChangeText={handleSearchChange}
            onPress={handleSearchInputPress}
            className='mb-4 bg-white'
          />
        </View>

        <ScrollView
          className='flex-1'
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <HeroSlider
            slides={heroSlides}
            onSlidePress={handleHeroSlidePress}
            autoPlay={true}
            autoPlayInterval={5000}
            showIndicators={true}
          />

          {/* Dynamic Categories Section */}
          <DynamicCategoriesSection
            categories={categories}
            categoryShow={12}
            title='Categories'
            onCategoryPress={handleCategoryPress}
            showTitle={true}
            columns={4}
          />

          {/* Explore Section */}
          <ExploreSection
            items={exploreItems}
            title='Explore'
            onItemPress={handleExploreItemPress}
            showTitle={true}
            columns={2}
            showSeeAll={true}
            onSeeAllExplore={handleExploreSeeAll}
          />

          {/* Recommended Section */}
          <RecommendedSection
            items={recommendedItems}
            title='Recommended'
            onItemPress={handleRecommendedItemPress}
            showTitle={true}
            showSeeAll={true}
            onSeeAllPress={handleRecommendedSeeAll}
          />

          {/* Bottom Padding for Tab Bar */}
          <View className='h-5' />
        </ScrollView>
      </SafeAreaView>

      {/* Search Screen Modal */}
      <Modal
        visible={showSearchScreen}
        animationType='slide'
        presentationStyle='fullScreen'
        onRequestClose={() => setShowSearchScreen(false)}
      >
        <SearchScreen
          visible={showSearchScreen}
          onClose={() => setShowSearchScreen(false)}
        />
      </Modal>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
        onLanguageSelect={handleLanguageSelect}
      />
    </>
  );
}
