// components\shared\SearchScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Search, X } from "lucide-react-native";
import { TranslatedText } from "@/components/ui/TranslatedText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ExploreSection } from "../main/HomeSections/ExploreSection";
import { ExploreItem } from "@/types/homeTypes";
import { CategoryService } from "@/services/homeService";

interface SearchResult {
  id: string;
  title: string;
  type: "place" | "event" | "business" | "category";
  description?: string;
  location?: string;
  image?: string;
  dateRange?: string;
}

interface SearchScreenProps {
  visible: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = "recent_searches";
const POPULAR_SEARCHES_KEY = "popular_searches";
const MAX_RECENT_SEARCHES = 10;

// Mock search results with images and proper data
const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Explore Colorado the best places to go",
    type: "place",
    description: "",
    location: "",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    dateRange: "12 Fev - 30 Mar",
  },
  {
    id: "2",
    title: "Hiking location for Colorado",
    type: "place",
    description: "",
    location: "",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    dateRange: "12 Fev - 30 Mar",
  },
  {
    id: "3",
    title: "Top 10 best places",
    type: "place",
    description: "",
    location: "",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    dateRange: "12 Fev - 30 Mar",
  },
  {
    id: "4",
    title: "How to find places in Colorado",
    type: "category",
    description: "",
    image:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
    dateRange: "12 Fev - 30 Mar",
  },
  {
    id: "5",
    title: "Offline maps that we can use",
    type: "business",
    description: "",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    dateRange: "12 Fev - 30 Mar",
  },
];

export function SearchScreen({ visible, onClose }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [exploreItems, setExploreItems] = useState<ExploreItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (visible) {
      loadRecentSearches();
      loadPopularSearches();
      loadData();
    }
  }, [visible]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const loadData = async () => {
    try {
      // In real app, these would be API calls
      setExploreItems(CategoryService.getExploreItems());
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleExploreItemPress = (item: ExploreItem) => {
    console.log("Explore item pressed:", item.title);
    // Navigate to explore detail screen
    router.push({
      pathname: "/(main)/detail/[id]",
      params: {
        id: item.id,
        type: "explore",
        title: item.title,
        description: item.description || "",
        location: item.location || "",
        rating: item.rating?.toString() || "0",
      },
    });
  };

  const loadRecentSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading recent searches:", error);
    }
  };

  const loadPopularSearches = async () => {
    try {
      const stored = await AsyncStorage.getItem(POPULAR_SEARCHES_KEY);
      if (stored) {
        setPopularSearches(JSON.parse(stored));
      } else {
        // Initialize with default popular searches
        const defaultPopularSearches = [
          "Best place fro hiking",
          "Colorado Hiking's",
          "Store near me",
          "Best climbing shop",
          "Colorado Hiking's",
          "Top 10 places to go",
        ];
        setPopularSearches(defaultPopularSearches);
        await AsyncStorage.setItem(
          POPULAR_SEARCHES_KEY,
          JSON.stringify(defaultPopularSearches)
        );
      }
    } catch (error) {
      console.error("Error loading popular searches:", error);
      // Fallback to default if error
      setPopularSearches([
        "Best place fro hiking",
        "Colorado Hiking's",
        "Store near me",
        "Best climbing shop",
        "Colorado Hiking's",
        "Top 10 places to go",
      ]);
    }
  };

  const saveRecentSearch = async (query: string) => {
    try {
      const updatedSearches = [
        query,
        ...recentSearches.filter((s) => s !== query),
      ].slice(0, MAX_RECENT_SEARCHES);

      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const removeRecentSearch = async (query: string) => {
    try {
      const updatedSearches = recentSearches.filter((s) => s !== query);
      await AsyncStorage.setItem(
        RECENT_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error removing recent search:", error);
    }
  };

  const removePopularSearch = async (query: string) => {
    try {
      const updatedSearches = popularSearches.filter((s) => s !== query);
      await AsyncStorage.setItem(
        POPULAR_SEARCHES_KEY,
        JSON.stringify(updatedSearches)
      );
      setPopularSearches(updatedSearches);
    } catch (error) {
      console.error("Error removing popular search:", error);
    }
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);

    // Simulate API call
    setTimeout(() => {
      const filtered = mockSearchResults.filter(
        (result) =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim());
      // Perform actual search and show results
      performSearch(searchQuery.trim());
      // Don't close immediately, let user see results
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    saveRecentSearch(suggestion);
    // Automatically perform search when suggestion is selected
    performSearch(suggestion);
  };

  // Function to demonstrate how searches are automatically added
  const addNewSearchToHistory = (searchTerm: string) => {
    // This function is called whenever:
    // 1. User types and presses search button
    // 2. User selects a suggestion
    // 3. User selects a search result
    // 4. User clicks on category cards
    saveRecentSearch(searchTerm);
  };

  // Clear all recent searches function
  const clearAllRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (error) {
      console.error("Error clearing recent searches:", error);
    }
  };

  // Clear all popular searches function
  const clearAllPopularSearches = async () => {
    try {
      await AsyncStorage.removeItem(POPULAR_SEARCHES_KEY);
      setPopularSearches([]);
    } catch (error) {
      console.error("Error clearing popular searches:", error);
    }
  };

  const handleResultPress = (result: SearchResult) => {
    // Automatically add to recent searches
    addNewSearchToHistory(result.title);
    onClose();

    // Navigate based on result type
    switch (result.type) {
      case "place":
        router.push({
          pathname: "/(main)/detail/[id]",
          params: { id: result.id, type: "place" },
        });
        break;
      case "category":
        router.push("/(main)/explore");
        break;
      default:
        break;
    }
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <TouchableOpacity
      onPress={() => handleResultPress(item)}
      className='flex-row p-3 mb-3 bg-white rounded-base mx-4'
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 3,
      }}
    >
      <Image
        source={{ uri: item.image }}
        className='w-16 h-16 rounded-base mr-3'
        resizeMode='cover'
      />
      <View className='flex-1 justify-center'>
        <Text
          className='text-gray-800 font-semibold text-base mb-1'
          numberOfLines={2}
        >
          <TranslatedText>{item.title}</TranslatedText>
        </Text>
        {item.dateRange && (
          <Text className='text-gray-500 text-sm'>
            <TranslatedText>{item.dateRange}</TranslatedText>
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );

  if (!visible) return null;

  const handleRecommendedSeeAll = () => {
    console.log("See all recommended pressed");
    // Navigate to recommended list screen
    router.push("/(main)/recommendations");
  };
  const handleExploreSeeAll = () => {
    console.log("See all recommended pressed");
    // Navigate to recommended list screen
    router.push("/(main)/explore");
  };
  return (
    <SafeAreaView className='flex-1 bg-gray-50'>
      {/* Header */}
      <View className='flex-row items-center px-4 py-3 bg-white border-b border-gray-100'>
        <View className='w-9 h-9 bg-white/40 rounded-full border border-[#E6E6E6] items-center justify-center p-2'>
          <TouchableOpacity onPress={onClose}>
            <ChevronLeft size={24} color='#374151' />
          </TouchableOpacity>
        </View>
        <Text className='text-xl font-semibold text-gray-800 ml-3'>
          <TranslatedText>Search</TranslatedText>
        </Text>
      </View>

      {/* Search Input */}
      <View className='px-4 py-3 bg-white'>
        <View className='flex-row items-center bg-gray-100 rounded-base px-4 py-2'>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder='Search here'
            placeholderTextColor='#9CA3AF'
            className='flex-1 text-gray-800 text-base'
            autoFocus
            onSubmitEditing={handleSearchSubmit}
            returnKeyType='search'
          />
          {searchQuery ? (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              className='ml-2'
            >
              <X size={20} color='#9CA3AF' />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={handleSearchSubmit} className='ml-2'>
            <Search size={20} color='#4DBA28' />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        className='flex-1'
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchQuery.trim() ? (
          // Search Results
          <View className='pt-4'>
            {/* Results Header */}
            <View className='flex-row items-center justify-between px-4 mb-4'>
              <Text className='text-lg font-semibold text-gray-800'>
                <TranslatedText>Best Locations to go</TranslatedText>
              </Text>
              <TouchableOpacity>
                <X size={20} color='#9CA3AF' />
              </TouchableOpacity>
            </View>

            {isSearching ? (
              <View className='p-4'>
                <Text className='text-gray-500 text-center'>
                  <TranslatedText>Searching...</TranslatedText>
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View className='p-4'>
                <Text className='text-gray-500 text-center'>
                  <TranslatedText>No results found</TranslatedText>
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Default content when no search query
          <View className='pt-4'>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View className='mb-6'>
                <View className='flex-row items-center justify-between px-4 mb-4'>
                  <Text className='text-lg font-semibold text-gray-800'>
                    <TranslatedText>Recent Searches</TranslatedText>
                  </Text>
                  <TouchableOpacity onPress={clearAllRecentSearches}>
                    <Text className='text-red-500 text-sm font-medium'>
                      <TranslatedText>Clear All</TranslatedText>
                    </Text>
                  </TouchableOpacity>
                </View>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={`recent-${index}`}
                    onPress={() => handleSuggestionPress(search)}
                    className='flex-row items-center justify-between px-4 py-3'
                  >
                    <View className='flex-row items-center flex-1'>
                      <Search size={16} color='#9CA3AF' />
                      <Text className='text-gray-700 ml-3 flex-1'>
                        <TranslatedText>{search}</TranslatedText>
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(search);
                      }}
                      className='p-1'
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <X size={16} color='#9CA3AF' />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Popular Searches */}
            {popularSearches.length > 0 && (
              <View className='mb-6'>
                <View className='flex-row items-center justify-between px-4 mb-4'>
                  <Text className='text-lg font-semibold text-gray-800'>
                    <TranslatedText>Popular Searches</TranslatedText>
                  </Text>
                  <TouchableOpacity onPress={clearAllPopularSearches}>
                    <Text className='text-red-500 text-sm font-medium'>
                      <TranslatedText>Clear All</TranslatedText>
                    </Text>
                  </TouchableOpacity>
                </View>
                {popularSearches.map((suggestion, index) => (
                  <TouchableOpacity
                    key={`popular-${index}`}
                    onPress={() => handleSuggestionPress(suggestion)}
                    className='flex-row items-center justify-between px-4 py-3'
                  >
                    <View className='flex-row items-center flex-1'>
                      <Search size={16} color='#9CA3AF' />
                      <Text className='text-gray-700 ml-3 flex-1'>
                        <TranslatedText>{suggestion}</TranslatedText>
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={(e) => {
                        e.stopPropagation();
                        removePopularSearch(suggestion);
                      }}
                      className='p-1'
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <X size={16} color='#9CA3AF' />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Explore Categories */}
            <ExploreSection
              items={exploreItems}
              title='Explore'
              onItemPress={handleExploreItemPress}
              showTitle={true}
              columns={2}
              showSeeAll={true}
              onSeeAllExplore={handleExploreSeeAll}
            />

            {/* Recommended Section Header */}
            <View className='flex-row items-center justify-between px-4 mb-4'>
              <Text className='text-lg font-semibold text-gray-800'>
                <TranslatedText>Recommended</TranslatedText>
              </Text>
              <TouchableOpacity onPress={handleRecommendedSeeAll}>
                <Text className='text-green-500 font-medium'>
                  <TranslatedText>See All</TranslatedText>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
