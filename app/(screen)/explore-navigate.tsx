// app/(screen)/explore-navigate.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  StatusBar,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import {
  MapPin,
  ArrowLeft,
  Search,
  Navigation2,
  Locate,
  RotateCcw,
  Menu,
  X,
} from "lucide-react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Mock location data
const mockLocations = [
  {
    id: "1",
    name: "Rocky Mountain National Park",
    address: "1000 US Hwy 36, Estes Park, CO 80517",
    latitude: 40.3428,
    longitude: -105.6836,
    type: "National Park",
  },
  {
    id: "2",
    name: "Garden of the Gods",
    address: "1805 N 30th St, Colorado Springs, CO 80904",
    latitude: 38.8719,
    longitude: -104.8761,
    type: "Park",
  },
  {
    id: "3",
    name: "Red Rocks Amphitheatre",
    address: "18300 W Alameda Pkwy, Morrison, CO 80465",
    latitude: 39.6654,
    longitude: -105.2057,
    type: "Entertainment",
  },
  {
    id: "4",
    name: "Mesa Verde National Park",
    address: "Mesa Verde National Park, CO 81330",
    latitude: 37.2308,
    longitude: -108.4618,
    type: "National Park",
  },
  {
    id: "5",
    name: "Pikes Peak",
    address: "Pikes Peak, Colorado Springs, CO",
    latitude: 38.8405,
    longitude: -105.0442,
    type: "Mountain",
  },
];

export default function ExploreNavigateScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredLocations, setFilteredLocations] = useState(mockLocations);
  const [selectedLocation, setSelectedLocation] = useState(mockLocations[2]); // Red Rocks as default
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredLocations(mockLocations);
    } else {
      const filtered = mockLocations.filter(
        (location) =>
          location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [searchQuery]);

  const handleLocationSelect = (location: (typeof mockLocations)[0]) => {
    setSelectedLocation(location);
    setIsSearching(false);
    setSearchQuery("");
  };

  const handleGetDirections = () => {
    if (selectedLocation) {
      const url = Platform.select({
        ios: `maps:0,0?q=${selectedLocation.latitude},${selectedLocation.longitude}`,
        android: `geo:0,0?q=${selectedLocation.latitude},${selectedLocation.longitude}(${selectedLocation.name})`,
      });

      if (url) {
        Linking.openURL(url).catch(() => {
          // Fallback to Google Maps
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.latitude},${selectedLocation.longitude}`;
          Linking.openURL(googleMapsUrl);
        });
      }
    }
  };

  const MapPlaceholder = () => (
    <View className="flex-1 bg-green-100 relative justify-center items-center">
      {/* Map Background Pattern */}
      <View className="absolute inset-0 opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            className="absolute bg-green-300"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: Math.random() * SCREEN_WIDTH,
              top: Math.random() * SCREEN_HEIGHT * 0.6,
              borderRadius: Math.random() * 25,
            }}
          />
        ))}
      </View>

      {/* Selected Location Marker */}
      <View className="absolute top-1/3 left-1/2 transform -translate-x-6 -translate-y-12">
        <View className="bg-red-500 w-12 h-12 rounded-full items-center justify-center shadow-lg">
          <MapPin size={24} color="white" />
        </View>
        <View className="w-1 h-6 bg-red-500 self-center" />
      </View>

      {/* Route Path */}
      <View className="absolute top-1/2 left-1/4 w-48 h-24">
        <View className="border-4 border-green-500 border-dashed rounded-full opacity-60 transform rotate-12" />
      </View>

      {/* Navigation Info */}
      <View className="absolute bottom-4 left-4 right-4">
        <View className="bg-white rounded-xl p-4 shadow-lg">
          <View className="flex-row items-center mb-2">
            <MapPin size={16} color="#ef4444" />
            <Text className="text-sm font-semibold text-black ml-2 flex-1">
              {selectedLocation.name}
            </Text>
          </View>
          <Text className="text-xs text-gray-600 mb-3">
            {selectedLocation.address}
          </Text>
          <TouchableOpacity
            onPress={handleGetDirections}
            className="bg-green-500 rounded-lg py-3 flex-row items-center justify-center"
          >
            <Navigation2 size={16} color="white" />
            <Text className="text-white font-semibold ml-2">
              <TranslatedText>Get Directions</TranslatedText>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#4DBA28" />

      {/* Header */}
      <View className="bg-green-500 pt-4 pb-4 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            <TranslatedText>Explore & Navigate</TranslatedText>
          </Text>
          <TouchableOpacity className="p-2">
            <Menu size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="bg-white rounded-lg flex-row items-center px-3 py-2">
          <Search size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-black"
            placeholder="Search places..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => setIsSearching(true)}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <X size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results Overlay */}
      {isSearching && (
        <View className="absolute top-32 left-4 right-4 bg-white rounded-lg shadow-lg z-10 max-h-64">
          <FlatList
            data={filteredLocations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleLocationSelect(item)}
                className="p-4 border-b border-gray-100"
              >
                <Text className="font-semibold text-black">{item.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">
                  {item.address}
                </Text>
                <Text className="text-xs text-green-600 mt-1">{item.type}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="p-4">
                <Text className="text-gray-500 text-center">
                  <TranslatedText>No locations found</TranslatedText>
                </Text>
              </View>
            }
          />
        </View>
      )}

      {/* Map Area */}
      <MapPlaceholder />

      {/* Map Controls */}
      <View className="absolute right-4 top-48 space-y-2">
        <TouchableOpacity className="bg-white p-3 rounded-lg shadow-lg">
          <Locate size={20} color="#4DBA28" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-white p-3 rounded-lg shadow-lg">
          <RotateCcw size={20} color="#4DBA28" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
