// components/shared/LanguageSelector.tsx
import type React from "react";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "@/hooks/useTranslation";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { showToast } from "@/utils/toast";
import { Check, Globe, X } from "lucide-react-native";

interface Language {
  id: string;
  code: string;
  name: string;
  flag: any; // React Native Image source
}

interface LanguageSelectorProps {
  visible: boolean;
  onClose: () => void;
  onLanguageSelect?: (language: Language) => void;
}

// Define the two supported languages
const supportedLanguages: Language[] = [
  {
    id: "1",
    code: "en",
    name: "English United States",
    flag: require("@/assets/images/us-flag.png"),
  },
  {
    id: "2",
    code: "es",
    name: "Spanish",
    flag: require("@/assets/images/spain-flag.png"),
  },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  visible,
  onClose,
  onLanguageSelect,
}) => {
  const { currentLanguage, changeLanguage, isTranslating, translateBatch } =
    useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);
  const [loading, setLoading] = useState(false);

  // Update selected language when current language changes
  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageSelect = async (language: Language) => {
    if (language.code === currentLanguage) {
      onClose();
      return;
    }

    setSelectedLanguage(language.code);
    setLoading(true);

    try {
      // Change language
      await changeLanguage(language.code);

      // Preload common translations for better UX
      if (language.code !== "en") {
        const commonTexts = [
          "Welcome",
          "Search here",
          "Categories",
          "Explore",
          "Recommended",
          "Explore Colorado",
          "Loading...",
          "Error",
          "Success",
          "Cancel",
          "Confirm",
          "Continue",
          "Back",
        ];

        try {
          await translateBatch(commonTexts);
        } catch (error) {
          console.error("Failed to preload common translations:", error);
        }
      }

      // Show success toast
      showToast(
        "success",
        "Language Changed",
        `${language.name} has been set as your preferred language.`
      );

      // Call callback if provided
      onLanguageSelect?.(language);

      // Small delay to ensure translations are processed
      setTimeout(() => {
        onClose();
      }, 100);
    } catch (error) {
      console.error("Error changing language:", error);
      showToast("error", "Language Change Failed", "Please try again.");
      setSelectedLanguage(currentLanguage); // Revert selection
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageItem = ({ item }: { item: Language }) => (
    <TouchableOpacity
      onPress={() => handleLanguageSelect(item)}
      className={`flex-row items-center justify-between p-4 mb-3 mx-4 rounded-xl border-2 ${
        selectedLanguage === item.code
          ? "border-primary bg-primary/5"
          : "border-gray-200 bg-white"
      }`}
      activeOpacity={0.7}
      disabled={loading || isTranslating}
    >
      <View className='flex-row items-center flex-1'>
        {/* Flag */}
        <View className='w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4 overflow-hidden'>
          <Image source={item.flag} className='w-6 h-6' resizeMode='contain' />
        </View>

        {/* Language Info */}
        <View className='flex-1'>
          <Text
            className={`text-base font-semibold ${
              selectedLanguage === item.code
                ? "text-primary-dark"
                : "text-black"
            }`}
          >
            <TranslatedText>{item.name}</TranslatedText>
          </Text>
          <Text className='text-sm text-gray-500 mt-1'>
            {item.code.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Selection Indicator */}
      <View
        className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
          selectedLanguage === item.code
            ? "border-primary bg-primary"
            : "border-gray-300 bg-transparent"
        }`}
      >
        {selectedLanguage === item.code && (
          <Check size={14} color='white' strokeWidth={3} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <SafeAreaView className='flex-1 bg-gray-50'>
        {/* Header */}
        <View className='flex-row items-center justify-between p-4 bg-white border-b border-gray-200'>
          <View className='flex-row items-center'>
            <Globe size={24} color='#4DBA28' />
            <Text className='text-xl font-bold text-black ml-3'>
              <TranslatedText>Select Language</TranslatedText>
            </Text>
          </View>
          <TouchableOpacity
            onPress={onClose}
            className='p-2 rounded-full'
            disabled={loading || isTranslating}
          >
            <X size={24} color='#666' />
          </TouchableOpacity>
        </View>

        {/* Language Description */}
        <View className='p-4 bg-white'>
          <Text className='text-sm text-gray-600 text-center'>
            <TranslatedText>
              Choose your preferred language for the app
            </TranslatedText>
          </Text>
        </View>

        {/* Languages List */}
        <View className='flex-1 pt-4'>
          <FlatList
            data={supportedLanguages}
            renderItem={renderLanguageItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </View>

        {/* Loading Overlay */}
        {(loading || isTranslating) && (
          <View className='absolute inset-0 bg-black/50 items-center justify-center'>
            <View className='bg-white rounded-2xl p-6 items-center min-w-[200px]'>
              <ActivityIndicator size='large' color='#4DBA28' />
              <Text className='text-gray-700 mt-3 text-base font-medium'>
                <TranslatedText>Applying language...</TranslatedText>
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};
