// components/ui/Input.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";
import { clsx } from "clsx";

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  error?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  restrictInput?: "email" | "password" | "none"; // New prop for input restrictions
  maxLength?: number;
}

export function Input({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "sentences",
  error,
  className,
  inputClassName,
  labelClassName,
  icon,
  iconPosition = "left",
  restrictInput = "none",
  maxLength,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTextChange = (text: string) => {
    let processedText = text;

    // Apply input restrictions
    if (restrictInput === "email") {
      // Convert to lowercase and remove spaces
      processedText = text.toLowerCase().replace(/\s/g, "");
    } else if (restrictInput === "password") {
      // Remove spaces from password
      processedText = text.replace(/\s/g, "");
    }

    // Apply maxLength restriction
    if (maxLength && processedText.length > maxLength) {
      processedText = processedText.substring(0, maxLength);
    }

    onChangeText?.(processedText);
  };

  const getInputPadding = () => {
    let paddingLeft = 16;
    let paddingRight = 16;

    if (icon && iconPosition === "left") {
      paddingLeft = 40;
    }
    if (icon && iconPosition === "right") {
      paddingRight = 40;
    }

    if (secureTextEntry) {
      paddingRight = icon && iconPosition === "right" ? 80 : 48;
    }

    return { paddingLeft, paddingRight };
  };

  const inputPadding = getInputPadding();

  // Set appropriate keyboard type and auto-capitalize for email
  const finalKeyboardType =
    restrictInput === "email" ? "email-address" : keyboardType;
  const finalAutoCapitalize =
    restrictInput === "email" ? "none" : autoCapitalize;

  return (
    <View className={clsx("mb-4", className)}>
      {label && (
        <Text className={clsx("text-black font-semibold mb-2", labelClassName)}>
          {label}
        </Text>
      )}
      <View className="relative">
        <View
          className="w-full"
          style={[
            styles.inputContainer,
            {
              borderColor: error
                ? "#EF4444"
                : isFocused
                  ? "#94E474"
                  : "#D1D5DB",
            },
          ]}
        >
          {icon && iconPosition === "left" && (
            <View style={styles.leftIcon}>{icon}</View>
          )}

          <TextInput
            value={value}
            onChangeText={handleTextChange}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureTextEntry && !showPassword}
            keyboardType={finalKeyboardType}
            autoCapitalize={finalAutoCapitalize}
            autoCorrect={false}
            spellCheck={false}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            maxLength={maxLength}
            className={clsx(
              "w-full text-base text-primary-dark",
              inputClassName
            )}
            style={[
              styles.input,
              {
                paddingLeft: inputPadding.paddingLeft,
                paddingRight: inputPadding.paddingRight,
              },
            ]}
          />

          {icon && iconPosition === "right" && (
            <View style={styles.rightIcon}>{icon}</View>
          )}
        </View>

        {secureTextEntry && (
          <TouchableOpacity
            onPress={handleTogglePassword}
            style={[
              styles.passwordToggle,
              {
                right: icon && iconPosition === "right" ? 48 : 12,
              },
            ]}
          >
            {showPassword ? (
              <EyeOff size={20} color="#9CA3AF" />
            ) : (
              <Eye size={20} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row justify-between items-center mt-1">
        {error ? <Text className="text-error text-sm">{error}</Text> : <View />}
        {maxLength && value && (
          <Text className="text-xs text-gray-500">
            {value.length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 48,
  },
  input: {
    backgroundColor: "transparent",
    borderWidth: 0,
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 12 : 12,
    fontSize: 16,
    lineHeight: Platform.OS === "ios" ? 20 : undefined,
    textAlignVertical: "center",
  },
  leftIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightIcon: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  passwordToggle: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -10 }],
    zIndex: 20,
    padding: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
