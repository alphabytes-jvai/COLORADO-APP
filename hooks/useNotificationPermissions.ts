// hooks/useNotificationPermissions.ts
import { useState, useEffect } from "react";
import { Platform, Alert, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface NotificationPermissionState {
  hasPermission: boolean;
  isLoading: boolean;
  requestPermission: () => Promise<boolean>;
  openSettings: () => void;
}

const PERMISSION_REQUESTED_KEY = "notification_permission_requested";

export const useNotificationPermissions = (): NotificationPermissionState => {
  const [hasPermission, setHasPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    try {
      setIsLoading(true);
      
      if (Platform.OS === "web") {
        // Web notification permission
        if ("Notification" in window) {
          const permission = Notification.permission;
          setHasPermission(permission === "granted");
        } else {
          setHasPermission(false);
        }
      } else {
        // For React Native, we'll simulate permission check
        // In a real app, you'd use react-native-permissions or expo-notifications
        const hasAskedBefore = await AsyncStorage.getItem(PERMISSION_REQUESTED_KEY);
        if (hasAskedBefore) {
          // Assume granted for demo purposes
          setHasPermission(true);
        } else {
          setHasPermission(false);
        }
      }
    } catch (error) {
      console.error("Error checking notification permission:", error);
      setHasPermission(false);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermission = async (): Promise<boolean> => {
    try {
      setIsLoading(true);

      if (Platform.OS === "web") {
        if ("Notification" in window) {
          const permission = await Notification.requestPermission();
          const granted = permission === "granted";
          setHasPermission(granted);
          return granted;
        }
        return false;
      } else {
        // For React Native
        return new Promise((resolve) => {
          Alert.alert(
            "Enable Notifications",
            "Stay updated with the latest events, offers, and Colorado discoveries. Allow notifications to get personalized updates.",
            [
              {
                text: "Not Now",
                style: "cancel",
                onPress: () => {
                  setHasPermission(false);
                  resolve(false);
                },
              },
              {
                text: "Allow",
                onPress: async () => {
                  await AsyncStorage.setItem(PERMISSION_REQUESTED_KEY, "true");
                  setHasPermission(true);
                  resolve(true);
                },
              },
            ]
          );
        });
      }
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      setHasPermission(false);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const openSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else if (Platform.OS === "android") {
      Linking.openSettings();
    } else {
      // Web - show instructions
      Alert.alert(
        "Enable Notifications",
        "To enable notifications, please click on the notification icon in your browser's address bar and select 'Allow'."
      );
    }
  };

  return {
    hasPermission,
    isLoading,
    requestPermission,
    openSettings,
  };
};