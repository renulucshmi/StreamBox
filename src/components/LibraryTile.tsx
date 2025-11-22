import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LibraryTileProps {
  icon: keyof typeof Feather.glyphMap;
  label: string;
  onPress: () => void;
}

const LibraryTile: React.FC<LibraryTileProps> = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.tile} onPress={onPress}>
      <Feather name={icon} size={32} color="#000" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
});

export default LibraryTile;
