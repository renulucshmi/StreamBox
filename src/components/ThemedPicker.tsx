/**
 * ThemedPicker Component
 * Custom picker component with dark mode support
 * Uses Modal for full theme control
 */

import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../context/ThemeContext";

export interface PickerItem {
  label: string;
  value: string;
}

interface ThemedPickerProps {
  value: string;
  onValueChange: (value: string) => void;
  items: PickerItem[];
  iconName?: keyof typeof Feather.glyphMap;
  iconSize?: number;
  placeholder?: string;
  style?: ViewStyle;
}

const ThemedPicker: React.FC<ThemedPickerProps> = ({
  value,
  onValueChange,
  items,
  iconName = "globe",
  iconSize = 18,
  placeholder,
  style,
}) => {
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const selectedItem = items.find((item) => item.value === value);
  const displayText = selectedItem
    ? selectedItem.label
    : placeholder || "Select";

  const handleSelect = (itemValue: string) => {
    onValueChange(itemValue);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadowColor,
          },
          style,
        ]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Feather
          name={iconName}
          size={iconSize}
          color={theme.colors.textSecondary}
          style={styles.icon}
        />
        <Text style={[styles.selectedText, { color: theme.colors.text }]}>
          {displayText}
        </Text>
        <Feather
          name="chevron-down"
          size={20}
          color={theme.colors.primary}
          style={styles.chevron}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: theme.colors.card },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View
              style={[
                styles.modalHeader,
                { borderBottomColor: theme.colors.border },
              ]}
            >
              <Text style={[styles.modalTitle, { color: theme.colors.text }]}>
                Select Language
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Feather name="x" size={24} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.optionsList}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.option,
                    {
                      backgroundColor:
                        value === item.value
                          ? theme.colors.primary + "20"
                          : "transparent",
                    },
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      {
                        color:
                          value === item.value
                            ? theme.colors.primary
                            : theme.colors.text,
                        fontWeight: value === item.value ? "600" : "400",
                      },
                    ]}
                  >
                    {item.label}
                  </Text>
                  {value === item.value && (
                    <Feather
                      name="check"
                      size={20}
                      color={theme.colors.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 50,
  },
  icon: {
    marginRight: 8,
  },
  selectedText: {
    flex: 1,
    fontSize: 15,
  },
  chevron: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "85%",
    maxHeight: "70%",
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  optionsList: {
    maxHeight: 400,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 2,
  },
  optionText: {
    fontSize: 16,
  },
});

export default ThemedPicker;
