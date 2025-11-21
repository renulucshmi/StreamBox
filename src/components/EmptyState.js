/**
 * EmptyState Component
 * Reusable empty state component for lists
 * Props-based configuration for different empty state scenarios
 */

import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

const EmptyState = ({
  iconName = "inbox",
  iconSize = 64,
  title = "No items found",
  subtitle,
  iconColor,
  style,
}) => {
  const { theme } = useTheme();

  const emptyIconColor = iconColor || theme.colors.emptyIcon;

  return (
    <View style={[styles.container, style]}>
      <Feather name={iconName} size={iconSize} color={emptyIconColor} />
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: theme.colors.textTertiary }]}>
          {subtitle}
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
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    textAlign: "center",
  },
});

export default EmptyState;
