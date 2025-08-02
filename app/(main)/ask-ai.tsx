// app/(main)/ask-ai.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TranslatedText } from "@/components/ui/TranslatedText";
import { Button } from "@/components/ui/Button";
import { Send, Bot, User } from "lucide-react-native";
import { PremiumModal } from "@/components/ui/PremiumModal";
import { usePremium, PREMIUM_FEATURES } from "@/hooks/usePremium";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const suggestedQuestions = [
  "What are the best hiking trails in Colorado?",
  "Where can I find good restaurants in Denver?",
  "What events are happening this weekend?",
  "Best places to visit in winter?",
];

export default function AskAIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi! I'm your Colorado exploration assistant. Ask me anything about places to visit, activities, restaurants, or events in Colorado!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const { canUseFeature, useFeature, isPremium } = usePremium();

  const generateAIResponse = (question: string): string => {
    // Mock AI responses based on question content
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes("hiking") || lowerQuestion.includes("trail")) {
      return "Colorado offers amazing hiking opportunities! Some top trails include:\n\n• Rocky Mountain National Park - Bear Lake Trail\n• Garden of the Gods - Perkins Central Garden Trail\n• Maroon Bells - Crater Lake Trail\n• Mount Elbert - Colorado's highest peak\n\nWould you like specific details about any of these trails?";
    }
    
    if (lowerQuestion.includes("restaurant") || lowerQuestion.includes("food") || lowerQuestion.includes("eat")) {
      return "Colorado has fantastic dining options! Here are some recommendations:\n\n• Denver: Root Down, Mercantile Dining & Provision\n• Boulder: The Kitchen, Frasca Food and Wine\n• Aspen: The Little Nell, Element 47\n• Colorado Springs: The Rabbit Hole, Four by Brother Luck\n\nWhat type of cuisine are you interested in?";
    }
    
    if (lowerQuestion.includes("event") || lowerQuestion.includes("weekend")) {
      return "This weekend in Colorado you can enjoy:\n\n• Farmers Markets in various cities\n• Live music at Red Rocks Amphitheatre\n• Art galleries in the RiNo district\n• Outdoor festivals (seasonal)\n• Brewery tours and tastings\n\nWould you like me to find specific events in a particular city?";
    }
    
    if (lowerQuestion.includes("winter") || lowerQuestion.includes("ski")) {
      return "Colorado winters are perfect for:\n\n• Skiing: Vail, Aspen, Breckenridge, Keystone\n• Snowboarding: Copper Mountain, Winter Park\n• Ice skating in downtown Denver\n• Hot springs: Glenwood Springs, Strawberry Park\n• Winter festivals and holiday markets\n\nWhat winter activities interest you most?";
    }
    
    return "That's a great question! Colorado has so much to offer. Could you be more specific about what you're looking for? I can help with:\n\n• Outdoor activities and hiking\n• Restaurants and dining\n• Events and entertainment\n• Seasonal activities\n• Local attractions\n\nWhat interests you most?";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    // Check if user can use AI feature
    if (!isPremium && !canUseFeature(PREMIUM_FEATURES.AI_CHAT.id)) {
      setShowPremiumModal(true);
      return;
    }

    // Use the feature (increment counter for free users)
    const canUse = await useFeature(PREMIUM_FEATURES.AI_CHAT.id);
    if (!canUse) {
      setShowPremiumModal(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(userMessage.text),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputText(question);
  };

  const handleSubscribe = (plan: "monthly" | "yearly") => {
    // Handle subscription logic here
    console.log("Subscribe to:", plan);
    setShowPremiumModal(false);
    // You would integrate with your payment system here
  };

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      className={`flex-row mb-4 ${message.isUser ? "justify-end" : "justify-start"}`}
    >
      {!message.isUser && (
        <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3 mt-1">
          <Bot size={16} color="white" />
        </View>
      )}
      
      <View
        className={`max-w-[80%] p-3 rounded-2xl ${
          message.isUser
            ? "bg-primary ml-4"
            : "bg-gray-100 mr-4"
        }`}
      >
        <Text
          className={`text-base leading-5 ${
            message.isUser ? "text-black" : "text-gray-800"
          }`}
        >
          {message.text}
        </Text>
      </View>

      {message.isUser && (
        <View className="w-8 h-8 bg-gray-600 rounded-full items-center justify-center ml-3 mt-1">
          <User size={16} color="white" />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <KeyboardAvoidingView 
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header */}
        <View className="px-5 py-4 bg-white border-b border-gray-100">
          <Text className="text-2xl font-bold text-black">
            <TranslatedText>Ask AI</TranslatedText>
          </Text>
          <Text className="text-gray-600 text-sm mt-1">
            <TranslatedText>Your Colorado exploration assistant</TranslatedText>
          </Text>
        </View>

        {/* Messages */}
        <ScrollView 
          className="flex-1 px-5 py-4"
          showsVerticalScrollIndicator={false}
        >
          {messages.map(renderMessage)}
          
          {isLoading && (
            <View className="flex-row justify-start mb-4">
              <View className="w-8 h-8 bg-primary rounded-full items-center justify-center mr-3 mt-1">
                <Bot size={16} color="white" />
              </View>
              <View className="bg-gray-100 p-3 rounded-2xl">
                <Text className="text-gray-600">
                  <TranslatedText>Thinking...</TranslatedText>
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <View className="px-5 py-2">
            <Text className="text-sm font-medium text-gray-700 mb-3">
              <TranslatedText>Try asking:</TranslatedText>
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {suggestedQuestions.map((question, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleSuggestedQuestion(question)}
                  className="bg-gray-100 px-4 py-2 rounded-full mr-3"
                >
                  <Text className="text-gray-700 text-sm">
                    <TranslatedText>{question}</TranslatedText>
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Input */}
        <View className="px-5 py-4 bg-white border-t border-gray-100">
          <View className="flex-row items-center">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything about Colorado..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3 text-base"
              multiline
              maxLength={500}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              onPress={sendMessage}
              disabled={!inputText.trim() || isLoading}
              className={`w-12 h-12 rounded-full items-center justify-center ${
                inputText.trim() && !isLoading ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <Send 
                size={20} 
                color={inputText.trim() && !isLoading ? "black" : "gray"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Premium Modal */}
      <PremiumModal
        visible={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={handleSubscribe}
        feature="AI Assistant"
      />
    </SafeAreaView>
  );
}