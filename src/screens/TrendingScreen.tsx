/**
 * TrendingScreen - Unified Design with Genre + Language Filtering
 * Features: FilterBar component, TRENDING tag only, clean card design
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../components/EmptyState";
import FilterPanel from "../components/filters/FilterPanel";
import MovieCard from "../components/MovieCard";
import { useTheme } from "../context/ThemeContext";
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

interface TrendingScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trending">;
}

// Trending movies data with isTrending flag
const TRENDING_DATA: Movie[] = [
  {
    id: "t1",
    title: "The Dark Knight",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    language: "English",
    genres: ["Action", "Crime"],
    isTrending: true,
  },
  {
    id: "t2",
    title: "Inception",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    rating: 8.8,
    language: "English",
    genres: ["Sci-Fi", "Thriller"],
    isTrending: true,
  },
  {
    id: "t3",
    title: "Parasite",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    language: "Korean",
    genres: ["Thriller", "Drama"],
    isTrending: true,
  },
  {
    id: "t4",
    title: "Money Heist",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    rating: 8.2,
    language: "Spanish",
    genres: ["Crime", "Action"],
    isTrending: false,
  },
  {
    id: "t5",
    title: "Amélie",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    rating: 8.3,
    language: "French",
    genres: ["Romance", "Comedy"],
    isTrending: false,
  },
  {
    id: "t6",
    title: "Squid Game",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rating: 8.0,
    language: "Korean",
    genres: ["Drama", "Thriller"],
    isTrending: true,
  },
  {
    id: "t7",
    title: "Fight Club",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    language: "English",
    genres: ["Drama", "Thriller"],
    isTrending: false,
  },
  {
    id: "t8",
    title: "Narcos",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    rating: 8.8,
    language: "Spanish",
    genres: ["Crime", "Drama"],
    isTrending: true,
  },
  {
    id: "t9",
    title: "The Shawshank Redemption",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    language: "English",
    genres: ["Drama"],
    isTrending: true,
  },
  {
    id: "t10",
    title: "Your Name",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    rating: 8.4,
    language: "Japanese",
    genres: ["Animation", "Romance"],
    isTrending: false,
  },
  {
    id: "t11",
    title: "Spirited Away",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    rating: 8.6,
    language: "Japanese",
    genres: ["Animation", "Fantasy"],
    isTrending: true,
  },
  {
    id: "t12",
    title: "Elite",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3SWXeXvFW0KNXcriTlx0YQT0C1S.jpg",
    rating: 7.5,
    language: "Spanish",
    genres: ["Drama", "Thriller"],
    isTrending: false,
  },
];

export default function TrendingScreen({ navigation }: TrendingScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme } = useTheme();

  // Local state
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  // Derive available languages and genres from trending data
  const availableLanguages = getUniqueLanguages(TRENDING_DATA);
  const availableGenres = getUniqueGenres(TRENDING_DATA);

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

  // Filter movies based on language and genre
  const filteredMovies = filterMovies(
    TRENDING_DATA,
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Trending Now
          </Text>
          <Text
            style={[styles.subtitle, { color: theme.colors.textSecondary }]}
          >
            Most popular movies this week
          </Text>
        </View>
      </View>

      {/* Filter Panel */}
      <FilterPanel
        availableLanguages={availableLanguages}
        selectedLanguages={selectedLanguages}
        onToggleLanguage={toggleLanguage}
        availableGenres={availableGenres}
        selectedGenres={selectedGenres}
        onToggleGenre={toggleGenre}
      />

      {/* Results Count */}
      <View style={styles.resultsHeader}>
        <Text
          style={[styles.resultsText, { color: theme.colors.textSecondary }]}
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
            onToggleFavourite={() => handleToggleFavourite(item)}
            showTrendingTag={true}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.movieGrid}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <EmptyState
            iconName="trending-up"
            title="No trending movies"
            subtitle="Try adjusting your filters"
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
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
