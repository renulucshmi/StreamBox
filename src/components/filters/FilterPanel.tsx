/**
 * FilterPanel - Collapsible filter component for language and genre
 * Features: Expandable/collapsible with animation, active filter count
 */

import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
  View,
} from "react-native";
import { useTheme } from "../../context/ThemeContext";
import GenreChip from "./GenreChip";
import LanguageChip from "./LanguageChip";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type FilterPanelProps = {
  selectedLanguages: string[];
  onToggleLanguage: (lang: string) => void;
  availableLanguages: string[];
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
  availableGenres: string[];
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedLanguages,
  onToggleLanguage,
  availableLanguages,
  selectedGenres,
  onToggleGenre,
  availableGenres,
}) => {
  const { theme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));

  const activeFilterCount = selectedLanguages.length + selectedGenres.length;

  const toggleExpanded = () => {
    // Animate layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Animate caret rotation
    Animated.timing(rotateAnim, {
      toValue: expanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    setExpanded(!expanded);
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <View style={styles.container}>
      {/* Header Row - Always Visible */}
      <Pressable
        onPress={toggleExpanded}
        style={[
          styles.headerRow,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.text,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.headerText, { color: theme.colors.text }]}>
            Filters
          </Text>
          {activeFilterCount > 0 && (
            <View style={styles.activeIndicator}>
              <Text style={styles.activeText}>
                • {activeFilterCount} applied
              </Text>
            </View>
          )}
        </View>
        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }],
          }}
        >
          <Feather
            name="chevron-down"
            size={20}
            color={theme.colors.textSecondary}
          />
        </Animated.View>
      </Pressable>

      {/* Expandable Content */}
      {expanded && (
        <View style={styles.expandedContent}>
          {/* Languages Section */}
          {availableLanguages.length > 0 && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                LANGUAGES
              </Text>
              <View style={styles.chipsContainer}>
                {availableLanguages.map((language) => (
                  <LanguageChip
                    key={language}
                    label={language}
                    selected={selectedLanguages.includes(language)}
                    onPress={() => onToggleLanguage(language)}
                  />
                ))}
              </View>
            </View>
          )}

          {/* Genres Section */}
          {availableGenres.length > 0 && (
            <View style={styles.section}>
              <Text
                style={[
                  styles.sectionLabel,
                  { color: theme.colors.textSecondary },
                ]}
              >
                GENRES
              </Text>
              <View style={styles.chipsContainer}>
                {availableGenres.map((genre) => (
                  <GenreChip
                    key={genre}
                    label={genre}
                    selected={selectedGenres.includes(genre)}
                    onPress={() => onToggleGenre(genre)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  activeIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  activeText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2b8eff",
  },
  expandedContent: {
    marginTop: 12,
    paddingHorizontal: 4,
  },
  section: {
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
});

export default FilterPanel;
