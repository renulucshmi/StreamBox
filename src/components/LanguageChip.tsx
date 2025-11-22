/**
 * LanguageChip - Multi-select chip component
 * Features: Toggle selection, theme-aware, smooth press feedback
 */

import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface LanguageChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const LanguageChip: React.FC<LanguageChipProps> = ({
  label,
  selected,
  onPress,
}) => {
  const { theme, themeMode } = useTheme();

  // Colors based on selection and theme
  const chipBackground = selected
    ? "#2b8eff"
    : themeMode === "dark"
    ? "#2A2A30"
    : "#F0F0F0";

  const textColor = selected
    ? "#FFFFFF"
    : themeMode === "dark"
    ? theme.colors.textSecondary
    : "#666666";

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: chipBackground,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
    >
      <Text
        style={[
          styles.chipText,
          {
            color: textColor,
            fontWeight: selected ? "700" : "600",
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
});

export default LanguageChip;
