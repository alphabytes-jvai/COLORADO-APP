// components/shared/NotificationCard.tsx
import { View, Text } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { getCardShadow } from "@/utils/shadows";

interface NotificationCardProps {
  icon?: LucideIcon | null;
  iconColor: string;
  iconBgColor: string;
  title: string;
  message: string;
  time: string;
  isRead?: boolean;
  onPress?: () => void;
  onMarkAsRead?: () => void;
  isFontAwesome?: boolean;
  fontAwesomeName?: string;
}

export function NotificationCard({
  icon: Icon,
  iconColor,
  iconBgColor,
  title,
  message,
  time,
  isRead = false,
  onPress,
  onMarkAsRead,
  isFontAwesome = false,
  fontAwesomeName,
}: NotificationCardProps) {
  const handlePress = () => {
    if (!isRead && onMarkAsRead) {
      onMarkAsRead();
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-white rounded-md p-4 mb-3 border border-gray-100 ${
        !isRead ? "bg-blue-50 border-blue-200" : ""
      }`}
      style={getCardShadow("sm")}
      activeOpacity={0.7}
    >
      <View className="flex-row">
        {/* Unread Indicator */}
        {!isRead && (
          <View className="w-2 h-2 bg-blue-500 rounded-full absolute top-2 right-2" />
        )}
        
        <View
          className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${iconBgColor}`}
        >
          {isFontAwesome && fontAwesomeName ? (
            <FontAwesome5
              name={fontAwesomeName as any}
              size={20}
              color={iconColor}
            />
          ) : (
            Icon && <Icon size={20} color={iconColor} />
          )}
        </View>
        <View className="flex-1">
          <Text className={`text-base font-semibold mb-1 ${
            !isRead ? "text-gray-900" : "text-gray-800"
          }`}>
            {title}
          </Text>
          <Text className={`text-sm mb-2 leading-5 ${
            !isRead ? "text-gray-700" : "text-gray-600"
          }`}>
            {message}
          </Text>
          <Text className={`text-xs ${
            !isRead ? "text-gray-500" : "text-gray-400"
          }`}>
            {time}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
