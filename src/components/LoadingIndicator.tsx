/**
 * LoadingIndicator Component
 * Reusable loading indicator component
 * Props-based configuration for different loading scenarios
 */

import React from "react";
import { ActivityIndicator, StyleSheet, Text, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface LoadingIndicatorProps {
  size?: "small" | "large";
  color?: string;
  text?: string;
  showText?: boolean;
  style?: ViewStyle;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = "large",
  color,
  text = "Loading...",
  showText = true,
  style,
}) => {
  const { theme } = useTheme();

  const loaderColor = color || theme.colors.primary;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={loaderColor} />
      {showText && (
        <Text style={[styles.text, { color: theme.colors.textSecondary }]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  text: {
    marginTop: 16,
    fontSize: 16,
  },
});

export default LoadingIndicator;
