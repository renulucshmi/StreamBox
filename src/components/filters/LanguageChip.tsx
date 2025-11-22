/**
 * LanguageChip - Multi-select language filter chip
 * Features: Scale animation, theme-aware styling
 */

import { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../../context/ThemeContext";

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
  const { themeMode } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const chipBackground = selected
    ? "#2b8eff"
    : themeMode === "dark"
    ? "#1c1d22"
    : "#e9ecf1";

  const textColor = selected ? "#FFFFFF" : "#444444";

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.chip, { backgroundColor: chipBackground }]}
      >
        <Text
          style={[
            styles.chipText,
            { color: textColor, fontWeight: selected ? "700" : "600" },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chip: {
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    letterSpacing: 0.2,
  },
});

export default LanguageChip;
