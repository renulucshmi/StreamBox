import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";

// Dummy data for trending movies
const TRENDING_MOVIES = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/140x200/1a1a1a/ffffff?text=Movie+1",
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://via.placeholder.com/140x200/2a2a2a/ffffff?text=Movie+2",
  },
  {
    id: "3",
    title: "Interstellar",
    poster: "https://via.placeholder.com/140x200/3a3a3a/ffffff?text=Movie+3",
  },
  {
    id: "4",
    title: "The Matrix",
    poster: "https://via.placeholder.com/140x200/4a4a4a/ffffff?text=Movie+4",
  },
  {
    id: "5",
    title: "Pulp Fiction",
    poster: "https://via.placeholder.com/140x200/5a5a5a/ffffff?text=Movie+5",
  },
  {
    id: "6",
    title: "Fight Club",
    poster: "https://via.placeholder.com/140x200/6a6a6a/ffffff?text=Movie+6",
  },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter trending movies based on search query
  const filteredMovies = TRENDING_MOVIES.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoviePress = (movie) => {
    // Handle movie press - could navigate to detail screen
    console.log("Movie pressed:", movie.title);
  };

  const handleFavouritesPress = () => {
    navigation.navigate("Favourites");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appName}>StreamBox</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
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

        {/* Trending Section */}
        <View style={styles.section}>
          <SectionHeader title="Trending" />
          <FlatList
            horizontal
            data={filteredMovies}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
            )}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.trendingList}
          />
        </View>

        {/* My Library Section */}
        <View style={styles.section}>
          <SectionHeader title="My Library" />
          <TouchableOpacity
            style={styles.libraryCard}
            onPress={handleFavouritesPress}
          >
            <Feather name="heart" size={32} color="#007AFF" />
            <Text style={styles.libraryTitle}>Favourites</Text>
            <Text style={styles.librarySubtitle}>
              Your favourite movies & shows
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  scrollView: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    height: 48,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  trendingList: {
    paddingRight: 8,
  },
  libraryCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  libraryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 12,
  },
  librarySubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
