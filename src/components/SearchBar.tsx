/**
 * SearchBar Component
 * Reusable search input component
 * Props-based configuration for maximum reusability
 */

import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  iconName?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
  onSubmitEditing?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = "Search...",
  iconName = "search",
  iconSize = 20,
  style,
  inputStyle,
  autoFocus = false,
  onSubmitEditing,
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
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
      <TextInput
        style={[styles.input, { color: theme.colors.text }, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={autoFocus}
        onSubmitEditing={onSubmitEditing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    height: 48,
    paddingHorizontal: 16,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    includeFontPadding: false,
  },
});

export default SearchBar;
