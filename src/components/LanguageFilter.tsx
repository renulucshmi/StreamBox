/**
 * LanguageFilter Component
 * Reusable language filter dropdown component
 * Props-based configuration for flexibility
 */

import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface LanguageOption {
  label: string;
  value: string;
}

interface LanguageFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  options?: LanguageOption[];
  iconName?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  style?: ViewStyle;
}

const LanguageFilter: React.FC<LanguageFilterProps> = ({
  value,
  onValueChange,
  options,
  iconName = "globe",
  iconSize = 18,
  style,
}) => {
  const { theme } = useTheme();

  // Default language options if none provided
  const defaultOptions: LanguageOption[] = [
    { label: "All Languages", value: "all" },
    { label: "English", value: "english" },
    { label: "Korean", value: "korean" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
    { label: "German", value: "german" },
  ];

  const languageOptions = options || defaultOptions;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadowColor,
        },
        style,
      ]}
    >
      <Feather
        name={iconName}
        size={iconSize}
        color={theme.colors.textSecondary}
        style={styles.icon}
      />
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={[styles.picker, { color: theme.colors.text }]}
          dropdownIconColor={theme.colors.primary}
        >
          {languageOptions.map((option) => (
            <Picker.Item
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 50,
  },
  icon: {
    marginRight: 8,
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: -8,
  },
  picker: {
    height: 50,
    fontSize: 15,
  },
});

export default LanguageFilter;
