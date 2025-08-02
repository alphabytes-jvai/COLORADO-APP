import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, Search, X, Clock } from "lucide-react-native";
import { TranslatedText } from "@/components/ui/TranslatedText";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SearchResult {
  id: string;
  title: string;
  type: "place" | "event" | "business" | "category";
  description?: string;
  location?: string;
}

interface SearchScreenProps {
  visible: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = "recent_searches";
const MAX_RECENT_SEARCHES = 10;

// Mock search suggestions
const searchSuggestions = [
  "Best place fro hiking",
  "Colorado Hiking's",
  "Store near me", 
  "Best climbing shop",
  "Colorado Hiking's",
  "Top 10 places to go",
];

// Mock search results
const mockSearchResults: SearchResult[] = [
  {
    id: "1",
    title: "Rocky Mountain National Park",
    type: "place",
    description: "Beautiful hiking trails and mountain views",
    location: "Estes Park, CO",
  },
  {
    id: "2", 
    title: "Garden of the Gods",
    type: "place",
    description: "Stunning red rock formations",
    location: "Colorado Springs, CO",
  },
  {
    id: "3",
    title: "Denver Art Museum",
    type: "place",
    description: "Contemporary art and exhibitions",
    location: "Denver, CO",
  },
  {
    id: "4",
    title: "Hiking Events",
    type: "category",
    description: "Find hiking events and groups",
  },
  {
    id: "5",
    title: "Local Restaurants",
    type: "business",
    description: "Best dining options in Colorado",
  },
];

export function SearchScreen({ visible, onClose }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (visible) {
      loadRecentSearches();
    }
  }, [visible]);

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

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

  const saveRecentSearch = async (query: string) => {
    try {
      const updatedSearches = [
        query,
        ...recentSearches.filter(s => s !== query)
      ].slice(0, MAX_RECENT_SEARCHES);
      
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error saving recent search:", error);
    }
  };

  const removeRecentSearch = async (query: string) => {
    try {
      const updatedSearches = recentSearches.filter(s => s !== query);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error("Error removing recent search:", error);
    }
  };

  const performSearch = async (query: string) => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filtered = mockSearchResults.filter(
        result =>
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
      // Navigate to results or perform action
      onClose();
    }
  };

  const handleSuggestionPress = (suggestion: string) => {
    setSearchQuery(suggestion);
    saveRecentSearch(suggestion);
  };

  const handleResultPress = (result: SearchResult) => {
    saveRecentSearch(result.title);
    onClose();
    
    // Navigate based on result type
    switch (result.type) {
      case "place":
        router.push({
          pathname: "/(main)/detail/[id]",
          params: { id: result.id, type: "place" }
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
      className="p-4 border-b border-gray-100"
    >
      <Text className="text-gray-800 font-semibold text-base mb-1">
        {item.title}
      </Text>
      {item.description && (
        <Text className="text-gray-600 text-sm mb-1">
          {item.description}
        </Text>
      )}
      {item.location && (
        <Text className="text-gray-500 text-xs">
          {item.location}
        </Text>
      )}
    </TouchableOpacity>
  );

  if (!visible) return null;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity onPress={onClose} className="mr-3">
          <ChevronLeft size={24} color="#374151" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800">
          <TranslatedText>Search</TranslatedText>
        </Text>
      </View>

      {/* Search Input */}
      <View className="px-4 py-3">
        <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search here"
            placeholderTextColor="#9CA3AF"
            className="flex-1 text-gray-800 text-base"
            autoFocus
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")} className="ml-2">
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity onPress={handleSearchSubmit} className="ml-2">
            <Search size={20} color="#4DBA28" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1">
        {searchQuery.trim() ? (
          // Search Results
          <View>
            {isSearching ? (
              <View className="p-4">
                <Text className="text-gray-500 text-center">
                  <TranslatedText>Searching...</TranslatedText>
                </Text>
              </View>
            ) : searchResults.length > 0 ? (
              <FlatList
                data={searchResults}
                renderItem={renderSearchResult}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            ) : (
              <View className="p-4">
                <Text className="text-gray-500 text-center">
                  <TranslatedText>No results found</TranslatedText>
                </Text>
              </View>
            )}
          </View>
        ) : (
          // Recent Searches and Suggestions
          <View>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <View className="mb-6">
                <Text className="text-gray-800 font-semibold text-lg px-4 mb-3">
                  <TranslatedText>Recent Searches</TranslatedText>
                </Text>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSuggestionPress(search)}
                    className="flex-row items-center justify-between px-4 py-3"
                  >
                    <View className="flex-row items-center flex-1">
                      <Clock size={16} color="#9CA3AF" />
                      <Text className="text-gray-700 ml-3 flex-1">
                        {search}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeRecentSearch(search)}
                      className="p-1"
                    >
                      <X size={16} color="#9CA3AF" />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Search Suggestions */}
            <View>
              <Text className="text-gray-800 font-semibold text-lg px-4 mb-3">
                <TranslatedText>Popular Searches</TranslatedText>
              </Text>
              {searchSuggestions.map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSuggestionPress(suggestion)}
                  className="flex-row items-center justify-between px-4 py-3"
                >
                  <View className="flex-row items-center flex-1">
                    <Search size={16} color="#9CA3AF" />
                    <Text className="text-gray-700 ml-3 flex-1">
                      <TranslatedText>{suggestion}</TranslatedText>
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleSuggestionPress(suggestion)}
                    className="p-1"
                  >
                    <X size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}