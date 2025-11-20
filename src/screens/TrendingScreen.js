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

// Extended dummy data for trending movies and series with real TMDB posters
const TRENDING_DATA = [
  {
    id: "1",
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
    status: "Trending",
    type: "movie",
  },
  {
    id: "2",
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/ljsZTbVsrQSqZgWeep2B1QiDKuh.jpg",
    rating: 8.8,
    status: "Trending",
    type: "movie",
  },
  {
    id: "3",
    title: "Breaking Bad",
    poster: "https://image.tmdb.org/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg",
    rating: 9.5,
    status: "Top Rated",
    type: "series",
  },
  {
    id: "4",
    title: "The Matrix",
    poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    rating: 8.7,
    status: "Trending",
    type: "movie",
  },
  {
    id: "5",
    title: "Stranger Things",
    poster: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    rating: 8.7,
    status: "Popular",
    type: "series",
  },
  {
    id: "6",
    title: "Fight Club",
    poster: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    rating: 8.8,
    status: "Trending",
    type: "movie",
  },
  {
    id: "7",
    title: "Game of Thrones",
    poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
    rating: 9.2,
    status: "Popular",
    type: "series",
  },
  {
    id: "8",
    title: "The Shawshank Redemption",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    rating: 9.3,
    status: "Top Rated",
    type: "movie",
  },
  {
    id: "9",
    title: "The Last of Us",
    poster: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    rating: 8.8,
    status: "Trending",
    type: "series",
  },
  {
    id: "10",
    title: "Goodfellas",
    poster: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    rating: 8.7,
    status: "Popular",
    type: "movie",
  },
  {
    id: "11",
    title: "The Crown",
    poster: "https://image.tmdb.org/t/p/w500/1M876KPjulVwppEpldhdc8V4o68.jpg",
    rating: 8.6,
    status: "Popular",
    type: "series",
  },
  {
    id: "12",
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 8.7,
    status: "Trending",
    type: "movie",
  },
];

export default function TrendingScreen() {
  const [filter, setFilter] = useState("all"); // all, movies, series

  // Filter data based on selected filter
  const getFilteredData = () => {
    if (filter === "all") {
      return TRENDING_DATA;
    } else if (filter === "movies") {
      return TRENDING_DATA.filter((item) => item.type === "movie");
    } else if (filter === "series") {
      return TRENDING_DATA.filter((item) => item.type === "series");
    }
    return TRENDING_DATA;
  };

  const filteredData = getFilteredData();

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
        data={filteredData}
        keyExtractor={(item) => item.id}
        renderItem={renderMovieItem}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No {filter} available</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#FFFFFF",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 8,
    gap: 8,
    backgroundColor: "#FFFFFF",
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
    color: "#999",
    textAlign: "center",
  },
});
