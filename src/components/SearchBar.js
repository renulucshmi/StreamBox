/**
 * SearchBar Component
 * Reusable search input component
 * Props-based configuration for maximum reusability
 */

import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const SearchBar = ({
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
      <TextInput
        style={[styles.input, { color: theme.colors.text }, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.searchPlaceholder}
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
  },
});

export default SearchBar;
