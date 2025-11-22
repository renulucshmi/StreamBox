/**
 * Home Screen - Unified Design with Genre + Language Filtering
 * Features: FilterBar component, clean card design, no status tags
 */

import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
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
import { AppDispatch } from "../store/store";
import { Movie } from "../types/movie";
import { RootStackParamList } from "../types/navigation";
import {
  filterMovies,
  getUniqueGenres,
  getUniqueLanguages,
} from "../utils/movieFilters";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Fetch movies on component mount
  useEffect(() => {
    loadMovies();
  }, []);

  // Load movies from service (convert to Movie type)
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchMovies();
      // Convert API data to Movie type
      const convertedMovies: Movie[] = data.map((m: any) => ({
        id: String(m.id),
        title: m.title,
        language: m.language || "English",
        genres: m.genres || ["Drama"],
        rating: m.rating || 0,
        posterUrl: m.poster || "",
        isTrending: false,
      }));
      setMovies(convertedMovies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // Derive available languages and genres from movies
  const availableLanguages = getUniqueLanguages(movies);
  const availableGenres = getUniqueGenres(movies);

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

  // Filter movies based on search, language, and genre
  const filteredBySearch = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMovies = filterMovies(
    filteredBySearch,
    selectedLanguages,
    selectedGenres
  );

  // Navigation handler
  const handleMoviePress = (movie: Movie) => {
    navigation.navigate("Details", { movie });
  };

  // Favourite toggle handler
  const handleToggleFavourite = (movie: Movie) => {
    const isFav = favourites.some((item) => item.id === movie.id);
    if (isFav) {
      dispatch(removeFromFavourites(movie.id as any));
    } else {
      dispatch(addToFavourites(movie as any));
    }
  };

  // Check if movie is favourite
  const isFavourite = (movieId: string): boolean =>
    favourites.some((item) => String(item.id) === movieId);

  // Get section title
  const getSectionTitle = () => {
    if (searchQuery) {
      return "Search Results";
    }
    const filterCount = selectedLanguages.length + selectedGenres.length;
    if (filterCount > 0) {
      return "Filtered Movies";
    }
    return "All Movies";
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      {/* Top Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Image
            source={require("../../assets/images/StreamBoxLogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={[styles.appName, { color: theme.colors.primary }]}>
            StreamBox
          </Text>
        </View>
        <TouchableOpacity
          style={styles.themeButton}
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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search movies…"
          style={styles.searchBar}
        />
      </View>

      {/* Filter Bar */}
      <FilterBar
        availableLanguages={availableLanguages}
        selectedLanguages={selectedLanguages}
        onToggleLanguage={toggleLanguage}
        availableGenres={availableGenres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          {getSectionTitle()}
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

      {/* Movie Grid */}
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
              onToggleFavourite={() => handleToggleFavourite(item)}
              showTrendingTag={false}
            />
          )}
          numColumns={2}
          contentContainerStyle={styles.movieGrid}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
  },
  appName: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },
  themeButton: {
    padding: 6,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    borderRadius: 14,
    paddingVertical: 12,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
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
