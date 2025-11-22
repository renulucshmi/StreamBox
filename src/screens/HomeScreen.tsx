/**
 * Home Screen - Modern & Premium Design
 * Features: Polished UI, improved spacing, better visual hierarchy, fade-in animations
 */

import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import LanguageChip from "../components/LanguageChip";
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
import { RootStackParamList } from "../types/navigation";

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Available languages
  const availableLanguages = ["English", "Korean", "Spanish", "French"];

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

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  // Filter movies based on search and selected languages
  const filteredMovies = movies.filter((movie) => {
    // Search filter
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Language filter - if no languages selected, show all
    const matchesLanguage =
      selectedLanguages.length === 0 ||
      selectedLanguages.includes(movie.language);

    return matchesSearch && matchesLanguage;
  });

  // Navigation handler
  const handleMoviePress = (movie: any) => {
    navigation.navigate("Details", { movie });
  };

  // Favourite toggle handler
  const handleFavouritePress = (movie: any) => {
    const isFav = favourites.some((item) => item.id === movie.id);
    if (isFav) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie));
    }
  };

  // Check if movie is favourite
  const isFavourite = (movieId: any): boolean =>
    favourites.some((item) => item.id === movieId);

  // Get section title
  const getSectionTitle = () => {
    if (searchQuery) {
      return "Search Results";
    }
    if (selectedLanguages.length > 0) {
      return selectedLanguages.length === 1
        ? `${selectedLanguages[0]} Movies`
        : "Selected Languages";
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

      {/* Language Chips */}
      <View style={styles.chipsSection}>
        <Text
          style={[styles.chipsLabel, { color: theme.colors.textSecondary }]}
        >
          LANGUAGES
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {availableLanguages.map((language) => (
            <LanguageChip
              key={language}
              label={language}
              selected={selectedLanguages.includes(language)}
              onPress={() => toggleLanguage(language)}
            />
          ))}
        </ScrollView>
      </View>

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
          renderItem={({ item, index }) => (
            <MovieCard
              movie={item}
              onPress={() => handleMoviePress(item)}
              isFavourite={isFavourite(item.id)}
              onFavouritePress={handleFavouritePress}
              index={index}
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
  chipsSection: {
    paddingTop: 12,
    paddingBottom: 8,
  },
  chipsLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 20,
    letterSpacing: 0.5,
  },
  chipsContainer: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
    marginBottom: 16,
  },
});
