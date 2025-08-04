import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Crown, Check } from "lucide-react-native";
import { TranslatedText } from "./TranslatedText";
import { Button } from "./Button";

interface PremiumModalProps {
  visible: boolean;
  onClose: () => void;
  onSubscribe: (plan: "monthly" | "yearly") => void;
  feature?: string;
}

export function PremiumModal({
  visible,
  onClose,
  onSubscribe,
  feature = "premium features",
}: PremiumModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">(
    "yearly"
  );
  const [freeTrialEnabled, setFreeTrialEnabled] = useState(true);

  const features = [
    "Offline Map Access",
    "AI Assistant Guide",
    "Seamless experience",
  ];

  const handleSubscribe = () => {
    onSubscribe(selectedPlan);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4">
          <TouchableOpacity onPress={onClose} className="p-2">
            <X size={24} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View className="flex-1 px-6">
          {/* Crown Icon */}
          <View className="items-center mb-6">
            <View className="w-20 h-20 items-center justify-center">
              <Crown size={60} color="#FFD700" fill="#FFD700" />
            </View>
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-black text-center mb-2">
            <TranslatedText>Unlock Premium</TranslatedText>
          </Text>
          <Text className="text-gray-600 text-center mb-8 text-base">
            <TranslatedText>
              Enjoy the benefit when you upgrade to the premium plan
            </TranslatedText>
          </Text>

          {/* Features */}
          <View className="mb-8">
            {features.map((feature, index) => (
              <View key={index} className="flex-row items-center mb-4">
                <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-4">
                  <Check size={16} color="white" strokeWidth={3} />
                </View>
                <Text className="text-gray-800 text-base font-medium">
                  <TranslatedText>{feature}</TranslatedText>
                </Text>
              </View>
            ))}
          </View>

          {/* Free Trial Toggle */}
          <View className="flex-row items-center justify-between mb-6 bg-gray-50 p-4 rounded-xl">
            <Text className="text-gray-800 font-semibold text-base">
              <TranslatedText>7-Days Free trial</TranslatedText>
            </Text>
            <Switch
              value={freeTrialEnabled}
              onValueChange={setFreeTrialEnabled}
              trackColor={{ false: "#E5E7EB", true: "#94E474" }}
              thumbColor={freeTrialEnabled ? "#FFFFFF" : "#F3F4F6"}
            />
          </View>

          {/* Pricing Plans */}
          <View className="mb-8">
            {/* Yearly Plan */}
            <TouchableOpacity
              onPress={() => setSelectedPlan("yearly")}
              className={`border-2 rounded-xl p-4 mb-4 ${
                selectedPlan === "yearly"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      selectedPlan === "yearly"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPlan === "yearly" && (
                      <Check size={14} color="white" strokeWidth={3} />
                    )}
                  </View>
                  <View>
                    <Text className="text-gray-800 font-semibold text-base">
                      <TranslatedText>Yearly</TranslatedText>
                    </Text>
                    <View className="flex-row items-center">
                      <View className="bg-green-500 px-2 py-1 rounded-md mr-2">
                        <Text className="text-white text-xs font-bold">
                          <TranslatedText>-50%</TranslatedText>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View className="items-end">
                  <Text className="text-gray-800 font-bold text-lg">
                    $69.99<Text className="text-gray-500 text-sm">/yearly</Text>
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Monthly Plan */}
            <TouchableOpacity
              onPress={() => setSelectedPlan("monthly")}
              className={`border-2 rounded-xl p-4 ${
                selectedPlan === "monthly"
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View
                    className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-3 ${
                      selectedPlan === "monthly"
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {selectedPlan === "monthly" && (
                      <Check size={14} color="white" strokeWidth={3} />
                    )}
                  </View>
                  <Text className="text-gray-800 font-semibold text-base">
                    <TranslatedText>Monthly</TranslatedText>
                  </Text>
                </View>
                <Text className="text-gray-800 font-bold text-lg">
                  $5.99<Text className="text-gray-500 text-sm">/monthly</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Actions */}
        <View className="px-6 pb-6">
          <Button
            onPress={handleSubscribe}
            className="w-full bg-green-500 mb-4"
            size="lg"
            textClassName="!text-white font-semibold"
          >
            <TranslatedText>Try For Free!</TranslatedText>
          </Button>
          <Text className="text-gray-500 text-center text-sm">
            <TranslatedText>No charges yet, cancel any time</TranslatedText>
          </Text>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
