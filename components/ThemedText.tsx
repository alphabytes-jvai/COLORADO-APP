import { Text, type TextProps, StyleSheet } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color, fontFamily: "Poppins-Regular" },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins-Regular",
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Poppins-SemiBold",
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    fontSize: 20,
    lineHeight: 28,
    fontFamily: "Poppins-SemiBold",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: "#94E474",
    fontFamily: "Poppins-Medium",
  },
});
