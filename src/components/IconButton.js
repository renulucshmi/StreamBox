/**
 * IconButton Component
 * Reusable icon button component
 * Props-based configuration for maximum flexibility
 */

import { Feather } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../context/ThemeContext";

const IconButton = ({
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
