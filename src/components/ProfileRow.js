/**
 * ProfileRow Component
 * Reusable row component for profile settings and options
 */

import { Feather } from "@expo/vector-icons";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

export default function ProfileRow({
  icon,
  label,
  onPress,
  showArrow = true,
  showSwitch = false,
  switchValue = false,
  onSwitchChange,
  iconColor,
}) {
  const { theme } = useTheme();

  const content = (
    <View
      style={[
        styles.row,
        {
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.borderLight,
        },
      ]}
    >
      <View style={styles.leftSection}>
        <Feather
          name={icon}
          size={22}
          color={iconColor || theme.colors.text}
          style={styles.icon}
        />
        <Text style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </Text>
      </View>

      <View style={styles.rightSection}>
        {showSwitch && (
          <Switch
            value={switchValue}
            onValueChange={onSwitchChange}
            trackColor={{
              false: "#D1D1D6",
              true: theme.colors.primary,
            }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#D1D1D6"
          />
        )}
        {showArrow && !showSwitch && (
          <Feather
            name="chevron-right"
            size={20}
            color={theme.colors.textTertiary}
          />
        )}
      </View>
    </View>
  );

  if (showSwitch || !onPress) {
    return content;
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 1,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  icon: {
    marginRight: 14,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
});
