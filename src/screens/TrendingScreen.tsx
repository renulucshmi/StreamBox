import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { FlatList, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";
import { useTheme } from "../context/ThemeContext";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { AppDispatch } from "../store/store";
import { RootStackParamList } from "../types/navigation";

interface TrendingMovie {
  id: string;
  title: string;
  poster: string;
  rating: number;
  status: string;
  language: string;
}

interface TrendingScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Trending">;
}

// Extended dummy data for trending movies and series with language filters
const TRENDING_DATA: TrendingMovie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    status: "Trending",
    language: "English",
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    rating: 8.8,
    status: "Trending",
    language: "English",
  },
  {
    id: "3",
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    rating: 8.5,
    status: "Top Rated",
    language: "Korean",
  },
  {
    id: "4",
    title: "Money Heist",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    rating: 8.2,
    status: "Popular",
    language: "Spanish",
  },
  {
    id: "5",
    title: "Amélie",
    poster: "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    rating: 8.3,
    status: "Popular",
    language: "French",
  },
  {
    id: "6",
    title: "Squid Game",
    poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    rating: 8.0,
    status: "Trending",
    language: "Korean",
  },
  {
    id: "7",
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    status: "Trending",
    language: "English",
  },
  {
    id: "8",
    title: "Narcos",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    rating: 8.8,
    status: "Popular",
    language: "Spanish",
  },
  {
    id: "9",
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    status: "Top Rated",
    language: "English",
  },
  {
    id: "10",
    title: "Dark",
    poster: "https://image.tmdb.org/t/p/w500/5J8bKRQkw5R0oRh2UWA2JmMFS2U.jpg",
    rating: 8.7,
    status: "Popular",
    language: "German",
  },
  {
    id: "11",
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    status: "Trending",
    language: "English",
  },
  {
    id: "12",
    title: "Train to Busan",
    poster: "https://image.tmdb.org/t/p/w500/5mCiMdlZjJ1CNoXKRsWPCLAzcCj.jpg",
    rating: 7.6,
    status: "Popular",
    language: "Korean",
  },
];

export default function TrendingScreen({ navigation }: TrendingScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme } = useTheme();
  const [filter, setFilter] = useState<string>("all"); // all, english, korean, spanish

  // Filter data based on selected language
  const getFilteredData = (): TrendingMovie[] => {
    if (filter === "all") {
      return TRENDING_DATA;
    }
    return TRENDING_DATA.filter(
      (item) => item.language.toLowerCase() === filter.toLowerCase()
    );
  };

  const filteredData = getFilteredData();

  const handleMoviePress = (movie: any) => {
    navigation.navigate("Details", { movie });
  };

  const handleFavouritePress = (movie: any) => {
    const isFavourite = favourites.some(
      (item) => String(item.id) === String(movie.id)
    );
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie as any));
    }
  };

  const isFavourite = (movieId: any): boolean => {
    return favourites.some((item) => String(item.id) === String(movieId));
  };

  const renderMovieItem = ({ item }: { item: TrendingMovie }) => {
    return (
      <View style={styles.gridItem}>
        <MovieCard
          movie={item}
          onPress={() => handleMoviePress(item)}
          isFavourite={isFavourite(item.id)}
          onFavouritePress={handleFavouritePress}
        />
      </View>
    );
  };

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
        <SectionHeader title="Trending Now" />
        <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
          Most popular movies this week
        </Text>
      </View>

      {/* Language Filter Dropdown */}
      <View
        style={[
          styles.filterContainer,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadowColor,
          },
        ]}
      >
        <Feather
          name="globe"
          size={18}
          color={theme.colors.textSecondary}
          style={styles.filterIcon}
        />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={filter}
            onValueChange={(itemValue) => setFilter(itemValue)}
            style={[styles.picker, { color: theme.colors.text }]}
            dropdownIconColor={theme.colors.primary}
          >
            <Picker.Item label="All Languages" value="all" />
            <Picker.Item label="English" value="english" />
            <Picker.Item label="Korean" value="korean" />
            <Picker.Item label="Spanish" value="spanish" />
            <Picker.Item label="German" value="german" />
          </Picker>
        </View>
      </View>

      {/* Movie Grid */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text
              style={[styles.emptyText, { color: theme.colors.textTertiary }]}
            >
              No {filter} available
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  headerTextContainer: {
    flex: 1,
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    minHeight: 50,
  },
  filterIcon: {
    marginRight: 8,
  },
  pickerWrapper: {
    flex: 1,
    marginLeft: -8,
  },
  picker: {
    height: 50,
    fontSize: 15,
  },
  gridContainer: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 4,
  },
  gridItem: {
    width: "48%",
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
