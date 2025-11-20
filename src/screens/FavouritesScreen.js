import { Feather } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromFavourites,
  selectFavourites,
} from "../store/favouritesSlice";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 columns with padding

export default function FavouritesScreen({ navigation }) {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites);

  const handleRemoveFromFavourites = (movieId) => {
    dispatch(removeFromFavourites(movieId));
  };

  const handleMoviePress = (movie) => {
    navigation.navigate("Details", { movie });
  };

  // Get status color based on status type
  const getStatusColor = (status) => {
    switch (status) {
      case "Popular":
        return "#FF6B6B";
      case "Trending":
        return "#4ECDC4";
      case "Upcoming":
        return "#FFD93D";
      case "Top Rated":
        return "#6BCB77";
      default:
        return "#95A5A6";
    }
  };

  const renderMovieCard = ({ item: movie }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleMoviePress(movie)}
        activeOpacity={0.7}
      >
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie.poster }}
            style={styles.poster}
            resizeMode="cover"
          />
          {/* Status Pill */}
          <View
            style={[
              styles.statusPill,
              { backgroundColor: getStatusColor(movie.status) },
            ]}
          >
            <Text style={styles.statusText}>{movie.status}</Text>
          </View>
          {/* Language Pill */}
          {movie.language && (
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>{movie.language}</Text>
            </View>
          )}
          {/* Remove Button */}
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveFromFavourites(movie.id)}
            activeOpacity={0.7}
          >
            <Feather name="x" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.title} numberOfLines={2}>
            {movie.title}
          </Text>
          {movie.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.rating}>{movie.rating}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color="#E5E5E5" />
      <Text style={styles.emptyTitle}>No Favourites Yet</Text>
      <Text style={styles.emptySubtitle}>
        Movies and shows you favourite will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favourites</Text>
        {favourites.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{favourites.length}</Text>
          </View>
        )}
      </View>

      {favourites.length === 0 ? (
        renderEmptyState()
      ) : (
        <FlatList
          data={favourites}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  countBadge: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 12,
  },
  countText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: cardWidth,
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    height: cardWidth * 1.5, // 3:2 aspect ratio
  },
  poster: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
  },
  statusPill: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  languagePill: {
    position: "absolute",
    top: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  languageText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  removeButton: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#FF6B6B",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 6,
    lineHeight: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
