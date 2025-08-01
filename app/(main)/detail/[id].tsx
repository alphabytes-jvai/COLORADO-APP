// app/(main)/detail/[id].tsx
import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Share,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Button } from "@/components/ui/Button";
import {
  ChevronLeft,
  Star,
  Calendar,
  MapPin,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Mock detailed data
const getDetailData = (id: string) => {
  const mockImages = [
    require("@/assets/images/hero1.png"),
    require("@/assets/images/hero2.png"),
    require("@/assets/images/hero3.png"),
  ];

  return {
    id,
    title: "Explore Colorado and exciting events with Manco",
    subtitle: "Best Place to be on Colorado will get",
    description: `Lorem ipsum dolor sit amet consectetur. Cursus consequat aliquam nisl commodo nunc urna donec non. Elementum dictum quis purus pretium. Sed nisl mattis commodo placerat dignissim gravida. Pellentesque lorem nunc morbi nec lectus.

Ac dolor tempus semper sed magna cursus vitae nisl. Mauris egestas id tempor morbi massa. Aliquet nulla nulla quis est amet.

Auctor amet suspendisse dui arcu sed est malesuada vel turpis. Dictum pretium mattis lorem condimentum sit nisl sapien consequat, luctus.

Amet canean massa malesuada erat faucibus dignissim a tempus mattis. Interdum vestibulum pharetra sed malesuada. Parturient justo blandit in vel ullamcorper eros. Tellus sagittis lectus hendrerit consequat vel rhoncus. Ut felis ornare ut et in turpis volutpat.

Pharetra quisque molestie nulla libero aliquam turpis eget pretium sodales.

Sit bibendum lacus lorem arcu nunc tristique lorem egestas. Sem libero facilisi eu neque nulla quam risus. Tincidunt integer ultricies leo turpis ut mattis. Sed praesent tristique mattis cursus vitae mattis posuere.

Donec sed consequat pellentesque vulputate facilisis id. Nisl quis congue lobortis curabitur ac. Morbi odio integer posuere faucibus. Eget sed elementum vulputate turpis mauris interdum.

Netus porta sit eu orci in lectus. Quam dolor vestibulum tellus neque tellus semper euismod in et. Eu mi feugiat arcu tincidunt blandit viverra. Lectus faucibus sodales`,
    images: mockImages,
    rating: 4.7,
    date: "12 Feb - 30 Mar",
    location: "Colorado, USA",
    price: 0,
    socialLinks: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
      twitter: "https://twitter.com",
      youtube: "https://youtube.com",
      linkedin: "https://linkedin.com",
    },
  };
};

export default function DetailScreen() {
  const params = useLocalSearchParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const detailData = getDetailData(params.id as string);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out ${detailData.title} - ${detailData.subtitle}`,
        title: detailData.title,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleGetDirections = () => {
    // Navigate to map screen or open external maps
    router.push("/(main)/map");
  };

  const renderImageSlider = () => (
    <View className='relative'>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x / SCREEN_WIDTH
          );
          setCurrentImageIndex(index);
        }}
      >
        {detailData.images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.4 }}
            resizeMode='cover'
          />
        ))}
      </ScrollView>

      {/* Gradient overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.3)"]}
        className='absolute bottom-0 left-0 right-0 h-20'
      />

      {/* Back button */}
      <TouchableOpacity
        onPress={() => router.back()}
        className='absolute top-12 left-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center'
      >
        <ChevronLeft size={24} color='white' />
      </TouchableOpacity>

      {/* Favorite button */}
      <TouchableOpacity
        onPress={() => setIsFavorite(!isFavorite)}
        className='absolute top-12 right-4 w-10 h-10 bg-white/20 rounded-full items-center justify-center'
      >
        <Star
          size={24}
          color={isFavorite ? "#FFD700" : "white"}
          fill={isFavorite ? "#FFD700" : "transparent"}
        />
      </TouchableOpacity>

      {/* Image indicators */}
      <View className='absolute bottom-4 left-0 right-0 flex-row justify-center'>
        {detailData.images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 rounded-full mx-1 ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </View>
    </View>
  );

  const renderSocialLinks = () => (
    <View className='mb-6'>
      <Text className='text-lg font-semibold text-black mb-3'>
        <TranslatedText>Socials</TranslatedText>
      </Text>
      <View className='flex-row justify-between px-4'>
        <TouchableOpacity
          onPress={() => handleSocialPress(detailData.socialLinks.facebook)}
          className='w-12 h-12 bg-blue-600 rounded-full items-center justify-center'
        >
          <Facebook size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSocialPress(detailData.socialLinks.instagram)}
          className='w-12 h-12 bg-pink-500 rounded-full items-center justify-center'
        >
          <Instagram size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSocialPress(detailData.socialLinks.twitter)}
          className='w-12 h-12 bg-blue-400 rounded-full items-center justify-center'
        >
          <Twitter size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSocialPress(detailData.socialLinks.youtube)}
          className='w-12 h-12 bg-red-600 rounded-full items-center justify-center'
        >
          <Youtube size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSocialPress(detailData.socialLinks.linkedin)}
          className='w-12 h-12 bg-blue-700 rounded-full items-center justify-center'
        >
          <Linkedin size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className='flex-1 bg-white'>
      <ScrollView className='flex-1' showsVerticalScrollIndicator={false}>
        {/* Image Slider */}
        {renderImageSlider()}

        {/* Content */}
        <View className='px-5 py-6'>
          {/* Title and Rating */}
          <View className='mb-4'>
            <Text className='text-2xl font-bold text-black mb-2 leading-tight'>
              <TranslatedText>{detailData.title}</TranslatedText>
            </Text>
            <Text className='text-gray-600 text-base mb-3'>
              <TranslatedText>{detailData.subtitle}</TranslatedText>
            </Text>

            {/* Meta info */}
            <View className='flex-row items-center justify-between mb-4'>
              <View className='flex-row items-center'>
                <Star size={16} color='#FFD700' fill='#FFD700' />
                <Text className='text-gray-700 ml-1 font-medium'>
                  {detailData.rating}
                </Text>
              </View>
              <TouchableOpacity onPress={handleShare}>
                <Share2 size={20} color='#666' />
              </TouchableOpacity>
            </View>
          </View>

          {/* Social Links */}
          {renderSocialLinks()}

          {/* Description */}
          <View className='mb-6'>
            <Text className='text-lg font-semibold text-black mb-3'>
              <TranslatedText>Description</TranslatedText>
            </Text>
            <Text className='text-gray-700 text-base leading-6'>
              <TranslatedText>{detailData.description}</TranslatedText>
            </Text>
          </View>

          {/* Date */}
          <View className='mb-6'>
            <View className='flex-row items-center'>
              <Calendar size={16} color='#666' />
              <Text className='text-gray-600 ml-2'>
                <TranslatedText>{detailData.date}</TranslatedText>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Button */}
      <View className='px-5 pb-6 pt-4 bg-white border-t border-gray-100'>
        <Button
          onPress={handleGetDirections}
          className='w-full bg-primary'
          size='lg'
          textClassName='!text-black font-semibold'
        >
          <MapPin size={20} color='black' />
          <Text className='ml-2 text-black font-semibold'>
            <TranslatedText>Get Direction</TranslatedText>
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
