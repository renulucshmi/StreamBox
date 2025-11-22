/**
 * TrendingScreen - Modern & Premium Design
 * Features: Multi-select language chips, polished movie cards, dark mode support
 */

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import LanguageChip from "../components/LanguageChip";
import TrendingMovieCard, {
  TrendingMovieType,
} from "../components/TrendingMovieCard";
import { useTheme } from "../context/ThemeContext";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { AppDispatch } from "../store/store";
import { RootStackParamList } from "../types/navigation";

interface TrendingScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trending">;
}

// Extended trending data with genre and isPopular
const TRENDING_DATA: TrendingMovieType[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    language: "English",
    genre: "Action",
    isPopular: true,
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    rating: 8.8,
    language: "English",
    genre: "Sci-Fi",
    isPopular: true,
  },
  {
    id: "3",
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    language: "Korean",
    genre: "Thriller",
    isPopular: false,
  },
  {
    id: "4",
    title: "Money Heist",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    rating: 8.2,
    language: "Spanish",
    genre: "Crime",
    isPopular: true,
  },
  {
    id: "5",
    title: "Amélie",
    poster: "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    rating: 8.3,
    language: "French",
    genre: "Romance",
    isPopular: false,
  },
  {
    id: "6",
    title: "Squid Game",
    poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rating: 8.0,
    language: "Korean",
    genre: "Drama",
    isPopular: true,
  },
  {
    id: "7",
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    language: "English",
    genre: "Drama",
    isPopular: false,
  },
  {
    id: "8",
    title: "Narcos",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    rating: 8.8,
    language: "Spanish",
    genre: "Crime",
    isPopular: true,
  },
  {
    id: "9",
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    language: "English",
    genre: "Drama",
    isPopular: true,
  },
  {
    id: "10",
    title: "Dark",
    poster: "https://image.tmdb.org/t/p/w500/5J8bKRQkw5R0oRh2UWA2JmMFS2U.jpg",
    rating: 8.7,
    language: "German",
    genre: "Sci-Fi",
    isPopular: false,
  },
  {
    id: "11",
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    language: "English",
    genre: "Sci-Fi",
    isPopular: true,
  },
  {
    id: "12",
    title: "Train to Busan",
    poster: "https://image.tmdb.org/t/p/w500/5mCiMdlZjJ1CNoXKRsWPCLAzcCj.jpg",
    rating: 7.6,
    language: "Korean",
    genre: "Horror",
    isPopular: false,
  },
  {
    id: "13",
    title: "Your Name",
    poster: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
    rating: 8.4,
    language: "Japanese",
    genre: "Animation",
    isPopular: true,
  },
  {
    id: "14",
    title: "Spirited Away",
    poster: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    rating: 8.6,
    language: "Japanese",
    genre: "Animation",
    isPopular: true,
  },
];

export default function TrendingScreen({ navigation }: TrendingScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme } = useTheme();
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Available languages
  const availableLanguages = [
    "English",
    "Korean",
    "Spanish",
    "French",
    "German",
    "Japanese",
  ];

  // Toggle language selection
  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language]
    );
  };

  // Filter data based on selected languages
  const filteredMovies =
    selectedLanguages.length === 0
      ? TRENDING_DATA
      : TRENDING_DATA.filter((movie) =>
          selectedLanguages.includes(movie.language)
        );

  // Navigation handler
  const handleMoviePress = (movie: TrendingMovieType) => {
    navigation.navigate("Details", { movie });
  };

  // Favourite toggle handler
  const handleToggleFavourite = (movie: TrendingMovieType) => {
    const isFav = favourites.some(
      (item) => String(item.id) === String(movie.id)
    );
    if (isFav) {
      dispatch(removeFromFavourites(movie.id as any));
    } else {
      dispatch(addToFavourites(movie as any));
    }
  };

  // Check if movie is favourite
  const isFavourite = (movieId: string): boolean =>
    favourites.some((item) => String(item.id) === String(movieId));

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Trending Now
        </Text>
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Most popular movies this week
        </Text>
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

      {/* Movie Grid */}
      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrendingMovieCard
            movie={item}
            onPress={() => handleMoviePress(item)}
            isFavourite={isFavourite(item.id)}
            onToggleFavourite={() => handleToggleFavourite(item)}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[styles.emptyText, { color: theme.colors.textTertiary }]}
            >
              No movies found
            </Text>
          </View>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  chipsSection: {
    paddingTop: 16,
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
  },
  gridContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
});
