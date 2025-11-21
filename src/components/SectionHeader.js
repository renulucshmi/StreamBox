import { StyleSheet, Text } from "react-native";
import { useTheme } from "../context/ThemeContext";

const SectionHeader = ({ title }) => {
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
