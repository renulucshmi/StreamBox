/**
 * FilterBar - Unified filter component for language and genre selection
 * Features: Multi-select chips, horizontal wrapping layout
 */

import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import GenreChip from "./GenreChip";
import LanguageChip from "./LanguageChip";

interface FilterBarProps {
  availableLanguages: string[];
  selectedLanguages: string[];
  onToggleLanguage: (lang: string) => void;
  availableGenres: string[];
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  availableLanguages,
  selectedLanguages,
  onToggleLanguage,
  availableGenres,
  selectedGenres,
  onToggleGenre,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Languages Section */}
      {availableLanguages.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
            LANGUAGES
          </Text>
          <View style={styles.chipsRow}>
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
          <Text style={[styles.label, { color: theme.colors.textSecondary }]}>
            GENRES
          </Text>
          <View style={styles.chipsRow}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  section: {
    marginBottom: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 20,
    letterSpacing: 0.5,
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
  },
});

export default FilterBar;
