import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";

// Extended dummy data for trending movies
const TRENDING_MOVIES = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/140x200/1a1a1a/ffffff?text=Movie+1",
    rating: 9.0,
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://via.placeholder.com/140x200/2a2a2a/ffffff?text=Movie+2",
    rating: 8.8,
  },
  {
    id: "3",
    title: "Interstellar",
    poster: "https://via.placeholder.com/140x200/3a3a3a/ffffff?text=Movie+3",
    rating: 8.7,
  },
  {
    id: "4",
    title: "The Matrix",
    poster: "https://via.placeholder.com/140x200/4a4a4a/ffffff?text=Movie+4",
    rating: 8.7,
  },
  {
    id: "5",
    title: "Pulp Fiction",
    poster: "https://via.placeholder.com/140x200/5a5a5a/ffffff?text=Movie+5",
    rating: 8.9,
  },
  {
    id: "6",
    title: "Fight Club",
    poster: "https://via.placeholder.com/140x200/6a6a6a/ffffff?text=Movie+6",
    rating: 8.8,
  },
  {
    id: "7",
    title: "Forrest Gump",
    poster: "https://via.placeholder.com/140x200/7a7a7a/ffffff?text=Movie+7",
    rating: 8.8,
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    poster: "https://via.placeholder.com/140x200/8a8a8a/ffffff?text=Movie+8",
    rating: 9.3,
  },
  {
    id: "9",
    title: "The Godfather",
    poster: "https://via.placeholder.com/140x200/9a9a9a/ffffff?text=Movie+9",
    rating: 9.2,
  },
  {
    id: "10",
    title: "Goodfellas",
    poster: "https://via.placeholder.com/140x200/aaaaaa/ffffff?text=Movie+10",
    rating: 8.7,
  },
];

export default function TrendingScreen() {
  const [filter, setFilter] = useState("all"); // all, movies, series

  const handleMoviePress = (movie) => {
    console.log("Movie pressed:", movie.title);
  };

  const renderMovieItem = ({ item, index }) => {
    return (
      <View style={styles.gridItem}>
        <MovieCard movie={item} onPress={() => handleMoviePress(item)} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <SectionHeader title="Trending Now" />
        <Text style={styles.subtitle}>Most popular movies this week</Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "all" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "all" && styles.filterTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "movies" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("movies")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "movies" && styles.filterTextActive,
            ]}
          >
            Movies
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === "series" && styles.filterButtonActive,
          ]}
          onPress={() => setFilter("series")}
        >
          <Text
            style={[
              styles.filterText,
              filter === "series" && styles.filterTextActive,
            ]}
          >
            Series
          </Text>
        </TouchableOpacity>
      </View>

      {/* Movie Grid */}
      <FlatList
        data={TRENDING_MOVIES}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  filterTextActive: {
    color: "#fff",
  },
  gridContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 20,
  },
  gridItem: {
    width: "48%",
  },
});
