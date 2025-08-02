"use client";

import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { LanguageSelector } from "@/components/shared/LanguageSelector";
import { useTranslation } from "@/hooks/useTranslation";
import { useAppStore } from "@/store/useAppStore";
import {
  Bell,
  Globe,
  DollarSign,
  Map,
  Lock,
  FileText,
  LogOut,
  ChevronRight,
  User,
} from "lucide-react-native";
import { router } from "expo-router";
import { Image } from "expo-image";

export default function SettingsScreen() {
  const { currentLanguage } = useTranslation();
  const { user, logout, setHasSeenOnboarding } = useAppStore();
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const getCurrentLanguageName = () => {
    const languageNames: { [key: string]: string } = {
      en: "English",
      es: "Spanish",
      fr: "French",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      ru: "Russian",
      ja: "Japanese",
      ko: "Korean",
      zh: "Chinese",
    };
    return languageNames[currentLanguage] || "English";
  };

  const settingsItems = [
    {
      id: "notifications",
      title: "Notifications",
      icon: <Bell size={24} color="#4DBA28" />,
      onPress: () => router.push("/(screen)/notifications"),
    },
    {
      id: "language",
      title: "Language",
      icon: <Globe size={24} color="#4DBA28" />,
      onPress: () => setShowLanguageSelector(true),
    },
    {
      id: "plans",
      title: "My Plans",
      icon: <DollarSign size={24} color="#4DBA28" />,
      onPress: () => console.log("My Plans"),
    },
    {
      id: "offline-map",
      title: "Offline Map",
      icon: <Map size={24} color="#4DBA28" />,
      onPress: () => router.push("/(main)/map"),
    },
    {
      id: "change-password",
      title: "Change Password",
      icon: <Lock size={24} color="#4DBA28" />,
      onPress: () => console.log("Change Password"),
    },
    {
      id: "terms",
      title: "Terms & Policies",
      icon: <FileText size={24} color="#4DBA28" />,
      onPress: () => router.push("/(screen)/privacy-policy"),
    },
  ];

  const handleLogout = () => {
     logout();
     setHasSeenOnboarding(false);
     router.replace("/");
  };

  return (
    <SafeAreaView className="flex-1 bg-surface">
      {/* Header */}
      <View className="px-5 py-4">
        <Text className="text-2xl font-bold text-black text-center">
          <TranslatedText>Settings</TranslatedText>
        </Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* User Info */}
        {user && (
          <View className="bg-green-50 p-4 rounded-2xl mb-6 flex-row items-center">
            <View className="w-16 h-16 bg-gray-200 rounded-full items-center justify-center mr-4">
              <Image
                source={{ uri: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" }}
                className="w-16 h-16 rounded-full"
                contentFit="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-xl font-bold text-black">
                Daniel Smeeth
              </Text>
              <Text className="text-gray-600 mt-1">
                danial123@gmail.com
              </Text>
            </View>
            <ChevronRight size={20} color="#4DBA28" />
          </View>
        )}

        {/* Settings Items */}
        <View className="space-y-4">
          {settingsItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className="bg-white p-4 rounded-2xl flex-row items-center justify-between shadow-sm"
              activeOpacity={0.7}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-10 h-10 items-center justify-center mr-4">
                  {item.icon}
                </View>
                <Text className="text-base font-medium text-black flex-1">
                  <TranslatedText>{item.title}</TranslatedText>
                </Text>
              </View>
              <ChevronRight size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-white p-4 rounded-2xl flex-row items-center justify-between shadow-sm mt-6 mb-8"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center flex-1">
            <View className="w-10 h-10 items-center justify-center mr-4">
              <LogOut size={24} color="#EF4444" />
            </View>
            <Text className="text-base font-medium text-red-600 flex-1">
              <TranslatedText>Logout</TranslatedText>
            </Text>
          </View>
          <ChevronRight size={20} color="#EF4444" />
        </TouchableOpacity>
      </ScrollView>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
        onLanguageSelect={(language) => {
          console.log("Language selected:", language);
        }}
      />
    </SafeAreaView>
  );
}
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-primary/10 rounded-full items-center justify-center">
                <User size={32} color="#4DBA28" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold text-black">
                  {user.name}
                </Text>
                <Text className="text-gray-600 mt-1">{user.email}</Text>
                <Text className="text-sm text-primary-dark mt-1">
                  <TranslatedText>
                    {user.isVerified
                      ? "Verified Account"
                      : "Unverified Account"}
                  </TranslatedText>
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Settings Items */}
        <View className="bg-white mx-5 mt-5 rounded-lg border border-gray-200 overflow-hidden">
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className={`flex-row items-center p-4 ${
                index !== settingsItems.length - 1
                  ? "border-b border-gray-100"
                  : ""
              }`}
              activeOpacity={0.7}
            >
              <View className="w-10 h-10 items-center justify-center">
                {item.icon}
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-base font-medium text-black">
                  <TranslatedText>{item.title}</TranslatedText>
                </Text>
                <Text className="text-sm text-gray-600 mt-1">
                  <TranslatedText>{item.subtitle}</TranslatedText>
                </Text>
              </View>
              <ChevronRight size={20} color="#ccc" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-50 mx-5 mt-5 p-4 rounded-lg border border-red-200 flex-row items-center justify-center"
          activeOpacity={0.7}
        >
          <LogOut size={20} color="#dc2626" />
          <Text className="text-red-600 font-medium ml-2">
            <TranslatedText>Logout</TranslatedText>
          </Text>
        </TouchableOpacity>

        {/* App Info */}
        <View className="items-center py-8">
          <Text className="text-gray-500 text-sm">
            <TranslatedText>DESCUBRELO COLORADO</TranslatedText>
          </Text>
          <Text className="text-gray-400 text-xs mt-1">
            <TranslatedText>Version 1.0.0</TranslatedText>
          </Text>
        </View>
      </ScrollView>

      {/* Language Selector Modal */}
      <LanguageSelector
        visible={showLanguageSelector}
        onClose={() => setShowLanguageSelector(false)}
        onLanguageSelect={(language) => {
          console.log("Language selected:", language);
        }}
      />
    </SafeAreaView>
  );
}
