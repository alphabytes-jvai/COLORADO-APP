// app/(main)/map.tsx
import React, { useState, useEffect} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  TextInput,
  FlatList,
  Modal,
  StatusBar,
  Platform,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TranslatedText } from "@/components/ui/TranslatedText";
import {
  Navigation,
  MapPin,
  ChevronRight,
  ArrowLeft,
  Search,
  Download,
  CheckCircle2,
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

// Mock offline map regions
const offlineMapRegions = [
  {
    id: "denver",
    name: "Greater Denver Area",
    size: "245 MB",
    downloaded: false,
    downloading: false,
    coverage: "Denver, Boulder, Aurora, Lakewood",
  },
  {
    id: "colorado-springs",
    name: "Colorado Springs Region",
    size: "187 MB",
    downloaded: true,
    downloading: false,
    coverage: "Colorado Springs, Manitou Springs, Fountain",
  },
  {
    id: "rocky-mountains",
    name: "Rocky Mountain National Park",
    size: "156 MB",
    downloaded: false,
    downloading: false,
    coverage: "Estes Park, Grand Lake, Trail Ridge Road",
  },
  {
    id: "western-slope",
    name: "Western Colorado",
    size: "298 MB",
    downloaded: false,
    downloading: false,
    coverage: "Grand Junction, Aspen, Vail, Durango",
  },
];

interface InteractiveMapProps {
  onClose: () => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onClose }) => {
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
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#4DBA28" />

      {/* Header */}
      <View className="bg-green-500 pt-12 pb-4 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={onClose} className="p-2">
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
    </View>
  );
};

interface OfflineMapProps {
  onClose: () => void;
}

const OfflineMap: React.FC<OfflineMapProps> = ({ onClose }) => {
  const [regions, setRegions] = useState(offlineMapRegions);
  const [downloadingRegions, setDownloadingRegions] = useState<string[]>([]);

  const handleDownload = (regionId: string) => {
    setDownloadingRegions((prev) => [...prev, regionId]);

    // Simulate download process
    setTimeout(() => {
      setRegions((prev) =>
        prev.map((region) =>
          region.id === regionId
            ? { ...region, downloaded: true, downloading: false }
            : region
        )
      );
      setDownloadingRegions((prev) => prev.filter((id) => id !== regionId));

      const regionName = regions.find((r) => r.id === regionId)?.name || "";
      Alert.alert(
        "Download Complete",
        `${regionName} is now available offline!`
      );
    }, 3000);
  };

  const handleDelete = (regionId: string) => {
    Alert.alert(
      "Delete Offline Map",
      "Are you sure you want to delete this offline map?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setRegions((prev) =>
              prev.map((region) =>
                region.id === regionId
                  ? { ...region, downloaded: false, downloading: false }
                  : region
              )
            );
          },
        },
      ]
    );
  };

  const renderRegion = ({ item }: { item: (typeof offlineMapRegions)[0] }) => {
    const isDownloading = downloadingRegions.includes(item.id);

    return (
      <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-black mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-2">{item.coverage}</Text>
            <Text className="text-xs text-green-600 font-medium">
              {item.size}
            </Text>
          </View>

          <View className="ml-4">
            {item.downloaded ? (
              <View className="flex-row items-center">
                <CheckCircle2 size={20} color="#22c55e" />
                <TouchableOpacity
                  onPress={() => handleDelete(item.id)}
                  className="ml-3 bg-red-100 px-3 py-1 rounded-lg"
                >
                  <Text className="text-red-600 text-sm font-medium">
                    <TranslatedText>Delete</TranslatedText>
                  </Text>
                </TouchableOpacity>
              </View>
            ) : isDownloading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#4DBA28" />
                <Text className="text-green-600 text-sm ml-2">
                  <TranslatedText>Downloading...</TranslatedText>
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => handleDownload(item.id)}
                className="bg-green-500 px-4 py-2 rounded-lg flex-row items-center"
              >
                <Download size={16} color="white" />
                <Text className="text-white text-sm font-medium ml-2">
                  <TranslatedText>Download</TranslatedText>
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isDownloading && (
          <View className="mt-3">
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View className="h-full bg-green-500 rounded-full animate-pulse w-3/4" />
            </View>
          </View>
        )}
      </View>
    );
  };

  const downloadedCount = regions.filter((r) => r.downloaded).length;
  const totalSize = regions
    .filter((r) => r.downloaded)
    .reduce((acc, region) => {
      return acc + parseInt(region.size.replace(" MB", ""));
    }, 0);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar barStyle="light-content" backgroundColor="#4DBA28" />

      {/* Header */}
      <View className="bg-green-500 pt-12 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={onClose} className="p-2">
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-semibold">
            <TranslatedText>Offline Maps</TranslatedText>
          </Text>
          <View className="w-10" />
        </View>

        {/* Stats */}
        <View className="bg-white/20 rounded-lg p-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-white/80 text-sm">
                <TranslatedText>Downloaded Regions</TranslatedText>
              </Text>
              <Text className="text-white text-xl font-bold">
                {downloadedCount}
              </Text>
            </View>
            <View>
              <Text className="text-white/80 text-sm">
                <TranslatedText>Total Size</TranslatedText>
              </Text>
              <Text className="text-white text-xl font-bold">
                {totalSize} MB
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-4 py-6">
        <Text className="text-lg font-semibold text-black mb-4">
          <TranslatedText>Available Regions</TranslatedText>
        </Text>

        <FlatList
          data={regions}
          keyExtractor={(item) => item.id}
          renderItem={renderRegion}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <View className="mt-4 p-4 bg-blue-50 rounded-xl">
              <Text className="text-blue-800 text-sm text-center">
                <TranslatedText>
                  Offline maps allow you to navigate without internet
                  connection. Download regions before traveling to remote areas.
                </TranslatedText>
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default function MapScreen() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const mapOptions = [
    {
      id: "explore-navigate",
      title: "Explore & Navigate",
      subtitle: "Interactive map with navigation",
      icon: Navigation,
      color: "#4DBA28",
      onPress: () => setActiveModal("interactive"),
    },
    {
      id: "offline-map",
      title: "Offline Map",
      subtitle: "Download maps for offline use",
      icon: MapPin,
      color: "#4DBA28",
      onPress: () => setActiveModal("offline"),
    },
  ];

  const renderMapOption = (option: (typeof mapOptions)[0]) => {
    const IconComponent = option.icon;

    return (
      <TouchableOpacity
        key={option.id}
        onPress={option.onPress}
        className="bg-green-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center flex-1">
          <View className="w-12 h-12 bg-white rounded-full items-center justify-center mr-4">
            <IconComponent size={24} color={option.color} />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-semibold text-black mb-1">
              <TranslatedText>{option.title}</TranslatedText>
            </Text>
            <Text className="text-gray-600 text-sm">
              <TranslatedText>{option.subtitle}</TranslatedText>
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color="#666" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5 py-6">
        {/* Header */}
        <Text className="text-2xl font-bold text-black mb-8">
          <TranslatedText>Map & Navigate</TranslatedText>
        </Text>

        {/* Map Options */}
        <View>{mapOptions.map(renderMapOption)}</View>

        {/* Info Text */}
        <View className="mt-8 p-4 bg-blue-50 rounded-xl">
          <Text className="text-blue-800 text-sm text-center">
            <TranslatedText>
              Access detailed maps and navigation features to explore
              Colorado&apos;s best destinations.
            </TranslatedText>
          </Text>
        </View>
      </View>

      {/* Interactive Map Modal */}
      <Modal
        visible={activeModal === "interactive"}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <InteractiveMap onClose={() => setActiveModal(null)} />
      </Modal>

      {/* Offline Map Modal */}
      <Modal
        visible={activeModal === "offline"}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <OfflineMap onClose={() => setActiveModal(null)} />
      </Modal>
    </SafeAreaView>
  );
}
