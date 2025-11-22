/**
 * FavouritesScreen - Unified Design with Genre + Language Filtering
 * Features: FilterBar component, clean card design, no status tags
 */

import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import FilterBar from "../components/filters/FilterBar";
import MovieCard from "../components/MovieCard";
import { useTheme } from "../context/ThemeContext";
import {
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { AppDispatch } from "../store/store";
import { Movie } from "../types/movie";
import { RootStackParamList } from "../types/navigation";
import {
  filterMovies,
  getUniqueGenres,
  getUniqueLanguages,
} from "../utils/movieFilters";

interface FavouritesScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Favourites">;
}

export default function FavouritesScreen({
  navigation,
}: FavouritesScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state for filtering
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Convert favourites to Movie type
  const favouriteMovies: Movie[] = favourites.map((fav: any) => ({
    id: String(fav.id),
    title: fav.title || "Untitled",
    language: fav.language || "Unknown",
    genres: fav.genres || [],
    rating: fav.rating || 0,
    posterUrl: fav.posterUrl || "",
    isTrending: false,
  }));

  // Derive available languages and genres
  const availableLanguages = getUniqueLanguages(favouriteMovies);
  const availableGenres = getUniqueGenres(favouriteMovies);

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  // Toggle genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // Filter favourites
  const filteredMovies = filterMovies(
    favouriteMovies,
    selectedLanguages,
    selectedGenres
  );

  const handleRemoveFromFavourites = (movieId: string) => {
    dispatch(removeFromFavourites(movieId as any));
  };

  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("Details", { movie });
  };

  const isFavourite = (movieId: string): boolean =>
    favourites.some((item) => String(item.id) === movieId);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            My Favourites
          </Text>
          {favourites.length > 0 && (
            <View
              style={[
                styles.countBadge,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.countText}>{favourites.length}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.themeToggleButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Feather
            name={themeMode === "dark" ? "sun" : "moon"}
            size={22}
            color={theme.colors.text}
          />
        </TouchableOpacity>
      </View>

      {favourites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <EmptyState
            iconName="heart"
            title="No Favourites Yet"
            subtitle="Movies you favourite will appear here"
          />
        </View>
      ) : (
        <>
          {/* Filter Bar */}
          {favouriteMovies.length > 0 && (
            <FilterBar
              availableLanguages={availableLanguages}
              selectedLanguages={selectedLanguages}
              onToggleLanguage={toggleLanguage}
              availableGenres={availableGenres}
              selectedGenres={selectedGenres}
              onToggleGenre={toggleGenre}
            />
          )}

          {/* Results Count */}
          <View style={styles.resultsHeader}>
            <Text
              style={[
                styles.resultsText,
                { color: theme.colors.textSecondary },
              ]}
            >
              {filteredMovies.length}{" "}
              {filteredMovies.length === 1 ? "movie" : "movies"}
            </Text>
          </View>

          {/* Movie Grid */}
          <FlatList
            data={filteredMovies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() => handleMoviePress(item)}
                isFavourite={isFavourite(item.id)}
                onToggleFavourite={() => handleRemoveFromFavourites(item.id)}
                showTrendingTag={false}
              />
            )}
            numColumns={2}
            contentContainerStyle={styles.movieGrid}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <EmptyState
                iconName="filter"
                title="No matches found"
                subtitle="Try adjusting your filters"
              />
            }
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    fontWeight: "500",
  },
  movieGrid: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
});
