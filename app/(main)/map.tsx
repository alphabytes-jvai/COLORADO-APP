// app/(main)/map.tsx
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { PremiumModal } from "@/components/ui/PremiumModal";
import { usePremium, PREMIUM_FEATURES } from "@/hooks/usePremium";
import { Navigation, MapPin, ChevronRight } from "lucide-react-native";

export default function MapScreen() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { canUseFeature, consumeFeature, isPremium } = usePremium();

  const handleMapOptionPress = async (route: string) => {
    if (isPremium) {
      router.push(route as any);
      return;
    }
    const canUse = canUseFeature(PREMIUM_FEATURES.NAVIGATION.id);

    if (canUse) {
      const featureUsed = await consumeFeature(PREMIUM_FEATURES.NAVIGATION.id);
      if (featureUsed) {
        router.push(route as any);
      } else {
        setShowPremiumModal(true);
      }
    } else {
      // Cannot use feature, show premium modal
      setShowPremiumModal(true);
    }
  };

  const handleSubscribe = (plan: "monthly" | "yearly") => {
    console.log("Subscribe to:", plan);
    setShowPremiumModal(false);
  };

  const handlePremiumModalClose = () => {
    setShowPremiumModal(false);
  };

  const mapOptions = [
    {
      id: "explore-navigate",
      title: "Explore & Navigate",
      subtitle: "Interactive map with navigation",
      icon: Navigation,
      color: "#4DBA28",
      route: "/explore-navigate",
      onPress: () => handleMapOptionPress("/explore-navigate"),
    },
    {
      id: "offline-map",
      title: "Offline Map",
      subtitle: "Download maps for offline use",
      icon: MapPin,
      color: "#4DBA28",
      route: "/offline-maps",
      onPress: () => handleMapOptionPress("/offline-maps"),
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

      {/* Premium Modal */}
      <PremiumModal
        visible={showPremiumModal}
        onClose={handlePremiumModalClose}
        onSubscribe={handleSubscribe}
        feature="Navigation & Maps"
      />
    </SafeAreaView>
  );
}
