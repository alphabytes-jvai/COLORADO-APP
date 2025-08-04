// app/(screen)/offline-maps.tsx
import React, { useState } from "react";
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
import {
  ArrowLeft,
  Download,
  CircleCheck as CheckCircle2,
} from "lucide-react-native";

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

export default function OfflineMapsScreen() {
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
    </SafeAreaView>
  );
}
