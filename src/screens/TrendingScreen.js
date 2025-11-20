import { Feather } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import SectionHeader from "../components/SectionHeader";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/favouritesSlice";

// Extended dummy data for trending movies and series with language filters
const TRENDING_DATA = [
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

export default function TrendingScreen({ navigation }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);
  const [filter, setFilter] = useState("all"); // all, english, korean, spanish

  // Filter data based on selected language
  const getFilteredData = () => {
    if (filter === "all") {
      return TRENDING_DATA;
    }
    return TRENDING_DATA.filter(
      (item) => item.language.toLowerCase() === filter.toLowerCase()
    );
  };

  const filteredData = getFilteredData();

  const handleMoviePress = (movie) => {
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

  const renderMovieItem = ({ item, index }) => {
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <SectionHeader title="Trending Now" />
        <Text style={styles.subtitle}>Most popular movies this week</Text>
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
            selectedValue={filter}
            onValueChange={(itemValue) => setFilter(itemValue)}
            style={styles.picker}
            dropdownIconColor="#007AFF"
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
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 12,
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
