// app/(screen)/offline-maps.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { MockDataService } from "@/services/mockDataService";
import type { AllDataStructure } from "@/types/homeTypes";
import {
  ArrowLeft,
  Download,
  CircleCheck as CheckCircle2,
  MapPin,
} from "lucide-react-native";

interface OfflineRegion {
  id: string;
  name: string;
  size: string;
  sizeInMB: number;
  downloaded: boolean;
  downloading: boolean;
  coverage: string;
  locations: AllDataStructure[];
  bounds: {
    northeast: { latitude: number; longitude: number };
    southwest: { latitude: number; longitude: number };
  };
}

export default function OfflineMapsScreen() {
  const [regions, setRegions] = useState<OfflineRegion[]>([]);
  const [downloadingRegions, setDownloadingRegions] = useState<string[]>([]);

  // Generate offline regions from unified data
  useEffect(() => {
    const allLocations = MockDataService.getMapLocations();
    const offlineRegions = generateOfflineRegions(allLocations);
    setRegions(offlineRegions);
  }, []);

  const generateOfflineRegions = (
    locations: AllDataStructure[]
  ): OfflineRegion[] => {
    // Group locations by regions based on proximity and location names
    const regionGroups: { [key: string]: AllDataStructure[] } = {
      denver: [],
      "colorado-springs": [],
      "rocky-mountains": [],
      "western-colorado": [],
      "central-colorado": [],
    };

    // Categorize locations into regions
    locations.forEach((location) => {
      const locationName = (
        location.location ||
        location.name ||
        ""
      ).toLowerCase();
      const address = (location.address || "").toLowerCase();

      if (
        locationName.includes("denver") ||
        address.includes("denver") ||
        locationName.includes("boulder") ||
        locationName.includes("aurora") ||
        locationName.includes("lakewood")
      ) {
        regionGroups.denver.push(location);
      } else if (
        locationName.includes("colorado springs") ||
        address.includes("colorado springs") ||
        locationName.includes("manitou") ||
        locationName.includes("fountain")
      ) {
        regionGroups["colorado-springs"].push(location);
      } else if (
        locationName.includes("estes") ||
        locationName.includes("rocky mountain") ||
        locationName.includes("grand lake") ||
        address.includes("rocky mountain")
      ) {
        regionGroups["rocky-mountains"].push(location);
      } else if (
        locationName.includes("aspen") ||
        locationName.includes("vail") ||
        locationName.includes("durango") ||
        locationName.includes("grand junction") ||
        locationName.includes("montrose") ||
        locationName.includes("gunnison")
      ) {
        regionGroups["western-colorado"].push(location);
      } else {
        regionGroups["central-colorado"].push(location);
      }
    });

    // Create region definitions
    const regionDefinitions: {
      [key: string]: Omit<OfflineRegion, "locations">;
    } = {
      denver: {
        id: "denver",
        name: "Greater Denver Area",
        size: "245 MB",
        sizeInMB: 245,
        downloaded: false,
        downloading: false,
        coverage: "Denver, Boulder, Aurora, Lakewood",
        bounds: {
          northeast: { latitude: 40.1, longitude: -104.5 },
          southwest: { latitude: 39.4, longitude: -105.3 },
        },
      },
      "colorado-springs": {
        id: "colorado-springs",
        name: "Colorado Springs Region",
        size: "187 MB",
        sizeInMB: 187,
        downloaded: true,
        downloading: false,
        coverage: "Colorado Springs, Manitou Springs, Fountain",
        bounds: {
          northeast: { latitude: 39.0, longitude: -104.6 },
          southwest: { latitude: 38.7, longitude: -105.2 },
        },
      },
      "rocky-mountains": {
        id: "rocky-mountains",
        name: "Rocky Mountain National Park",
        size: "156 MB",
        sizeInMB: 156,
        downloaded: false,
        downloading: false,
        coverage: "Estes Park, Grand Lake, Trail Ridge Road",
        bounds: {
          northeast: { latitude: 40.6, longitude: -105.4 },
          southwest: { latitude: 40.1, longitude: -106.0 },
        },
      },
      "western-colorado": {
        id: "western-colorado",
        name: "Western Colorado",
        size: "298 MB",
        sizeInMB: 298,
        downloaded: false,
        downloading: false,
        coverage: "Grand Junction, Aspen, Vail, Durango",
        bounds: {
          northeast: { latitude: 40.8, longitude: -106.0 },
          southwest: { latitude: 37.0, longitude: -109.0 },
        },
      },
      "central-colorado": {
        id: "central-colorado",
        name: "Central Colorado",
        size: "220 MB",
        sizeInMB: 220,
        downloaded: false,
        downloading: false,
        coverage: "Mesa Verde, Great Sand Dunes, Black Canyon",
        bounds: {
          northeast: { latitude: 38.5, longitude: -105.0 },
          southwest: { latitude: 37.0, longitude: -109.0 },
        },
      },
    };

    // Combine region definitions with their locations
    return Object.keys(regionDefinitions)
      .map((regionId) => ({
        ...regionDefinitions[regionId],
        locations: regionGroups[regionId] || [],
      }))
      .filter((region) => region.locations.length > 0);
  };

  const handleDownload = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId);
    if (!region) return;

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
        `${regionName} is now available offline with ${region.locations.length} locations!`
      );
    }, 3000);
  };

  const handleDelete = (regionId: string) => {
    const region = regions.find((r) => r.id === regionId);
    if (!region) return;

    Alert.alert(
      "Delete Offline Map",
      `Are you sure you want to delete the offline map for ${region.name}? This will remove ${region.locations.length} locations from offline access.`,
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

  const renderRegion = ({ item }: { item: OfflineRegion }) => {
    const isDownloading = downloadingRegions.includes(item.id);

    return (
      <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
        <View className="flex-row items-start justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-black mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-2">{item.coverage}</Text>
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-green-600 font-medium">
                {item.size}
              </Text>
              <View className="flex-row items-center">
                <MapPin size={12} color="#22c55e" />
                <Text className="text-xs text-gray-500 ml-1">
                  {item.locations.length} locations
                </Text>
              </View>
            </View>
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

        {/* Show some locations in this region */}
        {item.locations.length > 0 && (
          <View className="mt-3 p-3 bg-gray-50 rounded-lg">
            <Text className="text-xs text-gray-600 mb-2">
              <TranslatedText>Includes locations:</TranslatedText>
            </Text>
            <Text className="text-xs text-gray-800" numberOfLines={2}>
              {item.locations
                .slice(0, 3)
                .map((loc) => loc.name || loc.title)
                .join(", ")}
              {item.locations.length > 3 &&
                ` and ${item.locations.length - 3} more...`}
            </Text>
          </View>
        )}

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
    .reduce((acc, region) => acc + region.sizeInMB, 0);

  const totalLocations = regions
    .filter((r) => r.downloaded)
    .reduce((acc, region) => acc + region.locations.length, 0);

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={["top"]}>
      <StatusBar barStyle="light-content" backgroundColor="#4DBA28" />

      {/* Header */}
      <View className="bg-green-500 pt-4 pb-6 px-4">
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
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
            <View>
              <Text className="text-white/80 text-sm">
                <TranslatedText>Locations</TranslatedText>
              </Text>
              <Text className="text-white text-xl font-bold">
                {totalLocations}
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
          ListEmptyComponent={
            <View className="p-4 bg-white rounded-xl">
              <Text className="text-gray-500 text-center">
                <TranslatedText>No offline regions available</TranslatedText>
              </Text>
            </View>
          }
          ListFooterComponent={
            <View className="mt-4 p-4 bg-blue-50 rounded-xl">
              <Text className="text-blue-800 text-sm text-center">
                <TranslatedText>
                  Offline maps allow you to navigate without internet
                  connection. Download regions before traveling to remote areas.
                  All locations from the unified data are included.
                </TranslatedText>
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}
