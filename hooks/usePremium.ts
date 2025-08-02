// hooks/usePremium.ts
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/useAppStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PremiumFeature {
  id: string;
  name: string;
  usageCount: number;
  maxFreeUsage: number;
  lastUsed: string;
}

interface UsePremiumReturn {
  isPremium: boolean;
  canUseFeature: (featureId: string) => boolean;
  useFeature: (featureId: string) => Promise<boolean>;
  getFeatureUsage: (featureId: string) => Promise<PremiumFeature | null>;
  resetFeatureUsage: (featureId: string) => Promise<void>;
  subscriptionStatus: "free" | "trial" | "premium";
  trialDaysLeft: number;
}

const PREMIUM_FEATURES = {
  AI_CHAT: { id: "ai_chat", name: "AI Chat", maxFreeUsage: 5 },
  OFFLINE_MAPS: { id: "offline_maps", name: "Offline Maps", maxFreeUsage: 3 },
  NAVIGATION: { id: "navigation", name: "Navigation", maxFreeUsage: 5 },
};

const STORAGE_KEYS = {
  PREMIUM_STATUS: "premium_status",
  FEATURE_USAGE: "feature_usage",
  TRIAL_START: "trial_start_date",
  SUBSCRIPTION_TYPE: "subscription_type",
};

export const usePremium = (): UsePremiumReturn => {
  const { user } = useAppStore();
  const [isPremium, setIsPremium] = useState(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<
    "free" | "trial" | "premium"
  >("trial");
  const [trialDaysLeft, setTrialDaysLeft] = useState(0);
  const [featureUsage, setFeatureUsage] = useState<Record<string, PremiumFeature>>({});

  useEffect(() => {
    loadPremiumStatus();
    loadFeatureUsage();
  }, [user]);

  const loadPremiumStatus = async () => {
    try {
      const premiumStatus = await AsyncStorage.getItem(STORAGE_KEYS.PREMIUM_STATUS);
      const trialStart = await AsyncStorage.getItem(STORAGE_KEYS.TRIAL_START);
      const subscriptionType = await AsyncStorage.getItem(STORAGE_KEYS.SUBSCRIPTION_TYPE);

      if (subscriptionType === "premium") {
        setIsPremium(true);
        setSubscriptionStatus("premium");
      } else if (trialStart) {
        const trialStartDate = new Date(trialStart);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - trialStartDate.getTime()) / (1000 * 60 * 60 * 24));
        const daysLeft = Math.max(0, 7 - daysDiff);

        if (daysLeft > 0) {
          setIsPremium(true);
          setSubscriptionStatus("trial");
          setTrialDaysLeft(daysLeft);
        } else {
          setIsPremium(false);
          setSubscriptionStatus("free");
          setTrialDaysLeft(0);
        }
      } else {
        setIsPremium(false);
        setSubscriptionStatus("free");
      }
    } catch (error) {
      console.error("Error loading premium status:", error);
    }
  };

  const loadFeatureUsage = async () => {
    try {
      const usage = await AsyncStorage.getItem(STORAGE_KEYS.FEATURE_USAGE);
      if (usage) {
        setFeatureUsage(JSON.parse(usage));
      }
    } catch (error) {
      console.error("Error loading feature usage:", error);
    }
  };

  const saveFeatureUsage = async (usage: Record<string, PremiumFeature>) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.FEATURE_USAGE, JSON.stringify(usage));
      setFeatureUsage(usage);
    } catch (error) {
      console.error("Error saving feature usage:", error);
    }
  };

  const canUseFeature = (featureId: string): boolean => {
    if (isPremium) return true;

    const feature = Object.values(PREMIUM_FEATURES).find(f => f.id === featureId);
    if (!feature) return false;

    const usage = featureUsage[featureId];
    if (!usage) return true;

    // Reset daily usage
    const today = new Date().toDateString();
    const lastUsedDate = new Date(usage.lastUsed).toDateString();
    
    if (today !== lastUsedDate) {
      return true;
    }

    return usage.usageCount < feature.maxFreeUsage;
  };

  const useFeature = async (featureId: string): Promise<boolean> => {
    if (isPremium) return true;

    const feature = Object.values(PREMIUM_FEATURES).find(f => f.id === featureId);
    if (!feature) return false;

    const today = new Date().toISOString();
    const todayString = new Date().toDateString();
    
    let currentUsage = featureUsage[featureId];
    
    if (!currentUsage) {
      currentUsage = {
        id: featureId,
        name: feature.name,
        usageCount: 0,
        maxFreeUsage: feature.maxFreeUsage,
        lastUsed: today,
      };
    }

    // Reset daily usage
    const lastUsedDate = new Date(currentUsage.lastUsed).toDateString();
    if (todayString !== lastUsedDate) {
      currentUsage.usageCount = 0;
    }

    if (currentUsage.usageCount >= feature.maxFreeUsage) {
      return false;
    }

    currentUsage.usageCount += 1;
    currentUsage.lastUsed = today;

    const updatedUsage = {
      ...featureUsage,
      [featureId]: currentUsage,
    };

    await saveFeatureUsage(updatedUsage);
    return true;
  };

  const getFeatureUsage = async (featureId: string): Promise<PremiumFeature | null> => {
    return featureUsage[featureId] || null;
  };

  const resetFeatureUsage = async (featureId: string): Promise<void> => {
    const updatedUsage = { ...featureUsage };
    delete updatedUsage[featureId];
    await saveFeatureUsage(updatedUsage);
  };

  return {
    isPremium,
    canUseFeature,
    useFeature,
    getFeatureUsage,
    resetFeatureUsage,
    subscriptionStatus,
    trialDaysLeft,
  };
};

export { PREMIUM_FEATURES };