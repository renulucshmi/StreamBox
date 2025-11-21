/**
 * Home Screen - Refactored
 * Following clean architecture principles:
 * - Uses movieService for API calls
 * - Uses reusable components (SearchBar, LanguageFilter, EmptyState, LoadingIndicator)
 * - Uses helper functions for filtering
 * - No business logic in JSX
 */

import { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import IconButton from "../components/IconButton";
import LanguageFilter from "../components/LanguageFilter";
import LoadingIndicator from "../components/LoadingIndicator";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useTheme } from "../context/ThemeContext";
import { fetchMovies } from "../services/movieService";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { filterMovies, isMovieInList } from "../utils/helpers";
import { getSectionTitle } from "../utils/movieHelpers";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState("all");

  // Fetch movies on component mount
  useEffect(() => {
    loadMovies();
  }, []);

  // Load movies from service
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter movies using helper function
  const filteredMovies = filterMovies(movies, searchQuery, languageFilter);

  // Navigation handler
  const handleMoviePress = (movie) => {
    navigation.navigate("Details", { movie });
  };

  // Favourite toggle handler
  const handleFavouritePress = (movie) => {
    const isFav = isMovieInList(favourites, movie.id);
    if (isFav) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie));
    }
  };

  // Check if movie is favourite
  const isFavourite = (movieId) => isMovieInList(favourites, movieId);

  // Get section title using helper
  const sectionTitle = getSectionTitle(searchQuery, languageFilter);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      {/* Top Bar */}
      <View
        style={[
          styles.topBar,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.topBarLeft} />
        <Text style={[styles.appName, { color: theme.colors.text }]}>
          StreamBox
        </Text>
        <IconButton
          iconName={themeMode === "dark" ? "sun" : "moon"}
          size={24}
          onPress={toggleTheme}
        />
      </View>

      {/* Search Bar - Using reusable component */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search movies…"
        style={styles.searchBar}
      />

      {/* Language Filter - Using reusable component */}
      <LanguageFilter
        value={languageFilter}
        onValueChange={setLanguageFilter}
        style={styles.filterContainer}
      />

      {/* Section Heading */}
      <View style={styles.sectionHeaderContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {sectionTitle}
        </Text>
        <Text
          style={[
            styles.sectionSubtitle,
            { color: theme.colors.textSecondary },
          ]}
        >
          {filteredMovies.length}{" "}
          {filteredMovies.length === 1 ? "movie" : "movies"}
        </Text>
      </View>

      {/* Movie List */}
      {loading ? (
        <LoadingIndicator text="Loading movies..." />
      ) : (
        <FlatList
          data={filteredMovies}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              onPress={() => handleMoviePress(item)}
              isFavourite={isFavourite(item.id)}
              onFavouritePress={handleFavouritePress}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.movieList}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <EmptyState
              iconName="film"
              title={searchQuery ? "No movies found" : "No movies available"}
              subtitle={
                searchQuery ? "Try a different search term" : "Check back later"
              }
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  topBarLeft: {
    width: 40,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
  },
  searchBar: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
  },
  filterContainer: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  movieList: {
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});
