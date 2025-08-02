// store\useAppStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Custom storage for cross-platform compatibility
const storage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      if (Platform.OS === "web") {
        // For web platform, use localStorage
        if (typeof window !== "undefined" && window.localStorage) {
          return localStorage.getItem(name);
        }
        return null;
      }
      // For native platforms, use AsyncStorage
      return await AsyncStorage.getItem(name);
    } catch (error) {
      console.error(`Error getting item ${name}:`, error);
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        // For web platform, use localStorage
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem(name, value);
        }
      } else {
        // For native platforms, use AsyncStorage
        await AsyncStorage.setItem(name, value);
      }
    } catch (error) {
      console.error(`Error setting item ${name}:`, error);
    }
  },
  removeItem: async (name: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        // For web platform, use localStorage
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.removeItem(name);
        }
      } else {
        // For native platforms, use AsyncStorage
        await AsyncStorage.removeItem(name);
      }
    } catch (error) {
      console.error(`Error removing item ${name}:`, error);
    }
  },
};

// Enhanced User interface
interface User {
  id: string;
  name: string;
  email: string;
  balance?: number;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: boolean;
  };
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
  role?: "user" | "admin" | "moderator";
}

// Enhanced Notification interface
interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "error" | "event" | "offer" | "reward" | "cask" | "money" | "portfolio";
  read: boolean;
  priority?: "low" | "medium" | "high";
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Application settings interface
interface AppSettings {
  language: string;
  currency: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    push: boolean;
    email: boolean;
    sms: boolean;
    marketing: boolean;
  };
}

// Main AppState interface
interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  // UI state
  theme: "light" | "dark" | "system";
  hasSeenOnboarding: boolean;
  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  // Favorites
  favoriteItems: string[];
  // Authentication flow
  forgotPasswordEmail: string | null;
  signUpEmail: string | null;
  otpVerified: boolean;
  otpType: "signup" | "forgot-password" | null;
  // App settings
  settings: AppSettings;
  // Error handling
  error: string | null;
  // User Actions
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
  updateUserProfile: (userData: Partial<User>) => void;
  // UI Actions
  setTheme: (theme: AppState["theme"]) => void;
  setLoading: (loading: boolean) => void;
  setHasSeenOnboarding: (value: boolean) => void;
  setError: (error: string | null) => void;
  // Notification Actions
  addNotification: (notification: Omit<Notification, "id">) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
  // Favorite Actions
  addToFavorites: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
  toggleFavorite: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  // Authentication flow actions
  setForgotPasswordEmail: (email: string | null) => void;
  setSignUpEmail: (email: string | null) => void;
  setOtpVerified: (verified: boolean) => void;
  setOtpType: (type: "signup" | "forgot-password" | null) => void;
  // Settings actions
  updateSettings: (settings: Partial<AppSettings>) => void;
  // Utility actions
  resetStore: () => void;
}

// Default settings
const defaultSettings: AppSettings = {
  language: "en",
  currency: "USD",
  timezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  notifications: {
    push: true,
    email: true,
    sms: false,
    marketing: false,
  },
};

// Generate unique ID for notifications
const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      theme: "system",
      hasSeenOnboarding: false,
      notifications: [
        {
          id: "1",
          title: "New Event added",
          message: "Lorem ipsum dolor sit amet conse cat and Ridiculus vulputate pretium.",
          time: "12 Mar, 2025",
          type: "event",
          read: false,
          priority: "medium",
        },
        {
          id: "2",
          title: "New Event added",
          message: "Lorem ipsum dolor sit amet conse cat and Ridiculus vulputate pretium.",
          time: "12 Mar, 2025",
          type: "event",
          read: false,
          priority: "medium",
        },
        {
          id: "3",
          title: "New Event added",
          message: "Lorem ipsum dolor sit amet conse cat and Ridiculus vulputate pretium.",
          time: "12 Mar, 2025",
          type: "event",
          read: true,
          priority: "low",
        },
        {
          id: "4",
          title: "New Event added",
          message: "Lorem ipsum dolor sit amet conse cat and Ridiculus vulputate pretium.",
          time: "12 Mar, 2025",
          type: "event",
          read: true,
          priority: "low",
        },
        {
          id: "5",
          title: "New Event added",
          message: "Lorem ipsum dolor sit amet conse cat and Ridiculus vulputate pretium.",
          time: "12 Mar, 2025",
          type: "event",
          read: false,
          priority: "high",
        },
      ],
      unreadNotificationCount: 3,
      favoriteItems: [],
      forgotPasswordEmail: null,
      signUpEmail: null,
      otpVerified: false,
      otpType: null,
      settings: defaultSettings,
      error: null,

      // User Actions
      login: (user: User) => {
        set({
          user: {
            ...user,
            updatedAt: new Date().toISOString(),
          },
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          forgotPasswordEmail: null,
          signUpEmail: null,
          otpVerified: false,
          otpType: null,
          error: null,
          // Keep notifications and settings on logout
        });
      },

      setUser: (user: User | null) => {
        set({
          user: user
            ? {
                ...user,
                updatedAt: new Date().toISOString(),
              }
            : null,
          isAuthenticated: !!user,
        });
      },

      updateUserProfile: (userData: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            ...userData,
            updatedAt: new Date().toISOString(),
          };
          set({
            user: updatedUser,
          });
        }
      },

      // UI Actions
      setTheme: (theme: AppState["theme"]) => {
        set({ theme });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      setHasSeenOnboarding: (value) => set({ hasSeenOnboarding: value }),

      // Notification Actions
      addNotification: (notification: Omit<Notification, "id">) => {
        const newNotification: Notification = {
          ...notification,
          id: generateId(),
          read: false,
        };
        const currentNotifications = get().notifications;
        const updatedNotifications = [newNotification, ...currentNotifications];
        set({
          notifications: updatedNotifications,
          unreadNotificationCount: get().unreadNotificationCount + 1,
        });
      },

      markNotificationAsRead: (id: string) => {
        const currentNotifications = get().notifications;
        const updatedNotifications = currentNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        );
        const wasUnread = currentNotifications.find(
          (n) => n.id === id && !n.read
        );
        set({
          notifications: updatedNotifications,
          unreadNotificationCount: wasUnread
            ? Math.max(0, get().unreadNotificationCount - 1)
            : get().unreadNotificationCount,
        });
      },

      markAllNotificationsAsRead: () => {
        const updatedNotifications = get().notifications.map(
          (notification) => ({
            ...notification,
            read: true,
          })
        );
        set({
          notifications: updatedNotifications,
          unreadNotificationCount: 0,
        });
      },

      removeNotification: (id: string) => {
        const currentNotifications = get().notifications;
        const notificationToRemove = currentNotifications.find(
          (n) => n.id === id
        );
        const updatedNotifications = currentNotifications.filter(
          (notification) => notification.id !== id
        );
        set({
          notifications: updatedNotifications,
          unreadNotificationCount:
            notificationToRemove && !notificationToRemove.read
              ? Math.max(0, get().unreadNotificationCount - 1)
              : get().unreadNotificationCount,
        });
      },

      clearAllNotifications: () => {
        set({
          notifications: [],
          unreadNotificationCount: 0,
        });
      },

      // Favorite Actions
      addToFavorites: (itemId: string) => {
        const currentFavorites = get().favoriteItems;
        if (!currentFavorites.includes(itemId)) {
          set({
            favoriteItems: [...currentFavorites, itemId],
          });
        }
      },

      removeFromFavorites: (itemId: string) => {
        const currentFavorites = get().favoriteItems;
        set({
          favoriteItems: currentFavorites.filter((id) => id !== itemId),
        });
      },

      toggleFavorite: (itemId: string) => {
        const currentFavorites = get().favoriteItems;
        if (currentFavorites.includes(itemId)) {
          get().removeFromFavorites(itemId);
        } else {
          get().addToFavorites(itemId);
        }
      },

      isFavorite: (itemId: string) => {
        return get().favoriteItems.includes(itemId);
      },

      // Authentication flow actions
      setForgotPasswordEmail: (email: string | null) => {
        set({ forgotPasswordEmail: email });
      },

      setSignUpEmail: (email: string | null) => {
        set({ signUpEmail: email });
      },

      setOtpVerified: (verified: boolean) => {
        set({ otpVerified: verified });
      },

      setOtpType: (type: "signup" | "forgot-password" | null) => {
        set({ otpType: type });
      },

      // Settings actions
      updateSettings: (newSettings: Partial<AppSettings>) => {
        const currentSettings = get().settings;
        set({
          settings: {
            ...currentSettings,
            ...newSettings,
            // Deep merge notifications if provided
            notifications: newSettings.notifications
              ? {
                  ...currentSettings.notifications,
                  ...newSettings.notifications,
                }
              : currentSettings.notifications,
          },
        });
      },

      // Utility actions
      resetStore: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          theme: "system",
          notifications: [],
          unreadNotificationCount: 0,
          forgotPasswordEmail: null,
          signUpEmail: null,
          otpVerified: false,
          otpType: null,
          settings: defaultSettings,
          error: null,
        });
      },
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => storage),
      version: 3,
      // Specify what to persist
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
        notifications: state.notifications,
        unreadNotificationCount: state.unreadNotificationCount,
        favoriteItems: state.favoriteItems,
        settings: state.settings,
        hasSeenOnboarding: state.hasSeenOnboarding,
        // Don't persist loading states, errors, or temporary auth flow data
      }),
      // Handle rehydration
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("Failed to rehydrate store:", error);
        } else {
          console.log("Store rehydrated successfully:", state);
        }
      },
      // Migration function for version changes
      migrate: (persistedState: any, version: number) => {
        if (version === 1) {
          return {
            ...persistedState,
            settings: defaultSettings,
            unreadNotificationCount: 0,
            favoriteItems: [],
          };
        }
        if (version === 2) {
          return {
            ...persistedState,
            signUpEmail: null,
            otpType: null,
            favoriteItems: persistedState.favoriteItems || [],
          };
        }
        return persistedState;
      },
    }
  )
);

// Utility hooks for specific parts of the store
export const useUser = () => useAppStore((state) => state.user);
export const useAuth = () =>
  useAppStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
  }));
export const useTheme = () =>
  useAppStore((state) => ({
    theme: state.theme,
    setTheme: state.setTheme,
  }));
export const useNotifications = () =>
  useAppStore((state) => ({
    notifications: state.notifications,
    unreadCount: state.unreadNotificationCount,
    addNotification: state.addNotification,
    markAsRead: state.markNotificationAsRead,
    markAllAsRead: state.markAllNotificationsAsRead,
    removeNotification: state.removeNotification,
    clearAll: state.clearAllNotifications,
  }));
export const useSettings = () =>
  useAppStore((state) => ({
    settings: state.settings,
    updateSettings: state.updateSettings,
  }));
export const useFavoritesStore = () =>
  useAppStore((state) => ({
    favoriteItems: state.favoriteItems,
    addToFavorites: state.addToFavorites,
    removeFromFavorites: state.removeFromFavorites,
    toggleFavorite: state.toggleFavorite,
    isFavorite: state.isFavorite,
  }));

// Type exports for external use
export type { User, Notification, AppSettings, AppState };
