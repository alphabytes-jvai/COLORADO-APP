// app/(main)/map.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Navigation, MapPin, ChevronRight } from "lucide-react-native";

const mapOptions = [
  {
    id: "explore-navigate",
    title: "Explore & Navigate",
    subtitle: "Interactive map with navigation",
    icon: Navigation,
    color: "#4DBA28",
    onPress: () => {
      // In a real app, this would open an interactive map
      console.log("Opening interactive map...");
    },
  },
  {
    id: "offline-map",
    title: "Offline Map",
    subtitle: "Download maps for offline use",
    icon: MapPin,
    color: "#4DBA28",
    onPress: () => {
      // In a real app, this would show offline map options
      console.log("Opening offline maps...");
    },
  },
];

export default function MapScreen() {
  const renderMapOption = (option: (typeof mapOptions)[0]) => {
    const IconComponent = option.icon;

    return (
      <TouchableOpacity
        key={option.id}
        onPress={option.onPress}
        className='bg-green-50 rounded-2xl p-4 mb-4 flex-row items-center justify-between'
        activeOpacity={0.7}
      >
        <View className='flex-row items-center flex-1'>
          <View className='w-12 h-12 bg-white rounded-full items-center justify-center mr-4'>
            <IconComponent size={24} color={option.color} />
          </View>
          <View className='flex-1'>
            <Text className='text-lg font-semibold text-black mb-1'>
              <TranslatedText>{option.title}</TranslatedText>
            </Text>
            <Text className='text-gray-600 text-sm'>
              <TranslatedText>{option.subtitle}</TranslatedText>
            </Text>
          </View>
        </View>
        <ChevronRight size={20} color='#666' />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className='flex-1 bg-surface'>
      <View className='flex-1 px-5 py-6'>
        {/* Header */}
        <Text className='text-2xl font-bold text-black mb-8'>
          <TranslatedText>Map & Navigate</TranslatedText>
        </Text>

        {/* Map Options */}
        <View>{mapOptions.map(renderMapOption)}</View>

        {/* Info Text */}
        <View className='mt-8 p-4 bg-blue-50 rounded-xl'>
          <Text className='text-blue-800 text-sm text-center'>
            <TranslatedText>
              Access detailed maps and navigation features to explore
              Colorado&apos;s best destinations.
            </TranslatedText>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
