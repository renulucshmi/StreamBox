import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/favouritesSlice";

// Dummy TMDB-style movie data with language filters
const DUMMY_MOVIES_DATA = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    status: "Popular",
    rating: 9.0,
    language: "English",
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    status: "Trending",
    rating: 8.8,
    language: "English",
  },
  {
    id: "3",
    title: "Parasite",
    poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    status: "Top Rated",
    rating: 8.5,
    language: "Korean",
  },
  {
    id: "4",
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    status: "Popular",
    rating: 8.7,
    language: "English",
  },
  {
    id: "5",
    title: "Amélie",
    poster: "https://image.tmdb.org/t/p/w500/nSxDa3M9aMvGVLoItzWTepQ5h5d.jpg",
    status: "Popular",
    rating: 8.3,
    language: "French",
  },
  {
    id: "6",
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    status: "Trending",
    rating: 8.8,
    language: "English",
  },
  {
    id: "7",
    title: "Money Heist (La Casa de Papel)",
    poster: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    status: "Popular",
    rating: 8.2,
    language: "Spanish",
  },
  {
    id: "8",
    title: "The Godfather",
    poster: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    status: "Top Rated",
    rating: 9.2,
    language: "English",
  },
  {
    id: "9",
    title: "Oldboy",
    poster: "https://image.tmdb.org/t/p/w500/pWDtjs568ZfOTMbURQBYuT4Qqu8.jpg",
    status: "Top Rated",
    rating: 8.4,
    language: "Korean",
  },
  {
    id: "10",
    title: "Squid Game",
    poster: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg",
    status: "Trending",
    rating: 8.0,
    language: "Korean",
  },
  {
    id: "11",
    title: "Avengers: Endgame",
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    status: "Popular",
    rating: 8.4,
    language: "English",
  },
  {
    id: "12",
    title: "Dark",
    poster: "https://image.tmdb.org/t/p/w500/5J8bKRQkw5R0oRh2UWA2JmMFS2U.jpg",
    status: "Trending",
    rating: 8.7,
    language: "German",
  },
  {
    id: "13",
    title: "Narcos",
    poster: "https://image.tmdb.org/t/p/w500/rTmal9fDbwh5F0waol2hq35U4ah.jpg",
    status: "Popular",
    rating: 8.8,
    language: "Spanish",
  },
  {
    id: "14",
    title: "Oppenheimer",
    poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    status: "Trending",
    rating: 8.6,
    language: "English",
  },
  {
    id: "15",
    title: "Intouchables",
    poster: "https://image.tmdb.org/t/p/w500/4mFsNQwbD0F237Tx7gAPotd0nbJ.jpg",
    status: "Popular",
    rating: 8.5,
    language: "French",
  },
  {
    id: "16",
    title: "Train to Busan",
    poster: "https://image.tmdb.org/t/p/w500/5mCiMdlZjJ1CNoXKRsWPCLAzcCj.jpg",
    status: "Trending",
    rating: 7.6,
    language: "Korean",
  },
];

// Function to fetch movies (simulated API call)
const fetchMovies = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(DUMMY_MOVIES_DATA);
    }, 1000);
  });
};

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [languageFilter, setLanguageFilter] = useState("all");

  // Fetch movies on component mount
  useEffect(() => {
    loadMovies();
  }, []);

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

  // Filter movies based on search query and language
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLanguage =
      languageFilter === "all" ||
      movie.language.toLowerCase() === languageFilter.toLowerCase();
    return matchesSearch && matchesLanguage;
  });

  const handleMoviePress = (movie) => {
    // Navigate to Details screen with movie data
    navigation.navigate("Details", { movie });
  };

  const handleFavouritePress = (movie) => {
    const isFavourite = favourites.some((item) => item.id === movie.id);
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie));
    }
  };

  const isFavourite = (movieId) => {
    return favourites.some((item) => item.id === movieId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>StreamBox</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies…"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Language Filter Dropdown */}
      <View style={styles.filterContainer}>
        <Feather
          name="globe"
          size={18}
          color="#666"
          style={styles.filterIcon}
        />
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={languageFilter}
            onValueChange={(itemValue) => setLanguageFilter(itemValue)}
            style={styles.picker}
            dropdownIconColor="#007AFF"
          >
            <Picker.Item label="All Languages" value="all" />
            <Picker.Item label="English" value="english" />
            <Picker.Item label="Korean" value="korean" />
            <Picker.Item label="Spanish" value="spanish" />
            <Picker.Item label="French" value="french" />
            <Picker.Item label="German" value="german" />
          </Picker>
        </View>
      </View>

      {/* Section Heading */}
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionTitle}>
          {searchQuery
            ? "Search Results"
            : languageFilter === "all"
            ? "All Movies"
            : `${
                languageFilter.charAt(0).toUpperCase() + languageFilter.slice(1)
              } Movies`}
        </Text>
        <Text style={styles.sectionSubtitle}>
          {filteredMovies.length}{" "}
          {filteredMovies.length === 1 ? "movie" : "movies"}
        </Text>
      </View>

      {/* Movie List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
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
            <View style={styles.emptyContainer}>
              <Feather name="film" size={64} color="#ccc" />
              <Text style={styles.emptyText}>
                {searchQuery ? "No movies found" : "No movies available"}
              </Text>
              <Text style={styles.emptySubtext}>
                {searchQuery
                  ? "Try a different search term"
                  : "Check back later"}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    height: 48,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
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
    color: "#000",
    fontSize: 15,
  },
  sectionHeaderContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#666",
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: "#999",
  },
});
