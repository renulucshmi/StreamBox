/**
 * IconButton Component
 * Reusable icon button component
 * Props-based configuration for maximum flexibility
 */

import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface IconButtonProps {
  iconName: keyof typeof Feather.glyphMap;
  size?: number;
  color?: string;
  onPress: () => void;
  style?: ViewStyle;
  backgroundColor?: string;
  disabled?: boolean;
  activeOpacity?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  size = 24,
  color,
  onPress,
  style,
  backgroundColor,
  disabled = false,
  activeOpacity = 0.7,
}) => {
  const { theme } = useTheme();

  const buttonColor = color || theme.colors.text;
  const buttonBgColor = backgroundColor || "transparent";

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonBgColor }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      <Feather name={iconName} size={size} color={buttonColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});

export default IconButton;
