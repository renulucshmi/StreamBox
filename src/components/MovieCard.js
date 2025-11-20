import { MaterialIcons } from "@expo/vector-icons";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 columns with padding

const MovieCard = ({ movie, onPress, isFavourite, onFavouritePress }) => {
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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
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
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <View style={styles.bottomRow}>
          {movie.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text style={styles.rating}>{movie.rating}</Text>
            </View>
          )}
          {onFavouritePress && (
            <TouchableOpacity
              style={styles.favouriteButton}
              onPress={(e) => {
                e.stopPropagation();
                onFavouritePress(movie);
              }}
              activeOpacity={0.7}
            >
              <MaterialIcons
                name={isFavourite ? "favorite" : "favorite-border"}
                size={20}
                color={isFavourite ? "#FF6B6B" : "#999"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    marginBottom: 16,
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
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  favouriteButton: {
    padding: 4,
  },
});

export default MovieCard;
