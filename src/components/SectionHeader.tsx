import React from "react";
import { StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  const { theme } = useTheme();
  return (
    <Text style={[styles.header, { color: theme.colors.text }]}>{title}</Text>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
});

export default SectionHeader;
