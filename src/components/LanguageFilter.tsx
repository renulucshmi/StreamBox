/**
 * LanguageFilter Component
 * Reusable language filter dropdown component
 * Props-based configuration for flexibility
 */

import { Feather } from "@expo/vector-icons";
import React from "react";
import { ViewStyle } from "react-native";
import ThemedPicker, { PickerItem } from "./ThemedPicker";

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
    <ThemedPicker
      value={value}
      onValueChange={onValueChange}
      items={languageOptions as PickerItem[]}
      iconName={iconName}
      iconSize={iconSize}
      style={style}
    />
  );
};

export default LanguageFilter;
