import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/favouritesSlice";
import { addToWatchLater, removeFromWatchLater } from "../store/librarySlice";

export default function DetailsScreen({ route, navigation }) {
  const { movie } = route.params;
  const dispatch = useDispatch();

  const [showFavouriteSuccess, setShowFavouriteSuccess] = useState(false);
  const [showWatchLaterSuccess, setShowWatchLaterSuccess] = useState(false);

  // Get favourites and watchLater from Redux state
  const favourites = useSelector(selectFavourites);
  const watchLater = useSelector((state) => state.library.watchLater);

  // Check if movie is already in favourites or watch later
  const isFavourite = favourites.some((item) => item.id === movie.id);
  const isInWatchLater = watchLater.some((item) => item.id === movie.id);

  const handleAddToFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id));
    } else {
      dispatch(addToFavourites(movie));
      setShowFavouriteSuccess(true);
      setTimeout(() => setShowFavouriteSuccess(false), 2000);
    }
  };

  const handleAddToWatchLater = () => {
    if (isInWatchLater) {
      dispatch(removeFromWatchLater(movie.id));
    } else {
      dispatch(addToWatchLater(movie));
      setShowWatchLaterSuccess(true);
      setTimeout(() => setShowWatchLaterSuccess(false), 2000);
    }
  };

  // Get status color
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movie Details</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Movie Poster */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie.poster }}
            style={styles.poster}
            resizeMode="cover"
          />
          {/* Language Pill */}
          {movie.language && (
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>{movie.language}</Text>
            </View>
          )}
          {/* Status Pill */}
          <View
            style={[
              styles.statusPill,
              { backgroundColor: getStatusColor(movie.status) },
            ]}
          >
            <Text style={styles.statusText}>{movie.status}</Text>
          </View>
        </View>

        {/* Movie Info */}
        <View style={styles.infoContainer}>
          {/* Title */}
          <Text style={styles.title}>{movie.title}</Text>

          {/* Rating */}
          {movie.rating && (
            <View style={styles.ratingContainer}>
              <Feather name="star" size={20} color="#FFD93D" />
              <Text style={styles.rating}>{movie.rating}</Text>
              <Text style={styles.ratingOutOf}>/10</Text>
            </View>
          )}

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>
              {movie.overview ||
                `${
                  movie.title
                } is a ${movie.status.toLowerCase()} movie that has captivated audiences worldwide. With stunning visuals and compelling storytelling, this film delivers an unforgettable cinematic experience. The talented cast brings the characters to life in ways that will keep you engaged from start to finish.`}
            </Text>
          </View>

          {/* Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Language:</Text>
              <Text style={styles.detailValue}>{movie.language || "N/A"}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status:</Text>
              <Text
                style={[
                  styles.detailValue,
                  { color: getStatusColor(movie.status) },
                ]}
              >
                {movie.status}
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Rating:</Text>
              <Text style={styles.detailValue}>
                {movie.rating ? `${movie.rating}/10` : "N/A"}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                isFavourite && styles.actionButtonActive,
              ]}
              onPress={handleAddToFavourites}
            >
              <Feather
                name="heart"
                size={20}
                color={isFavourite ? "#FF6B6B" : "#666"}
                fill={isFavourite ? "#FF6B6B" : "transparent"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  isFavourite && styles.actionButtonTextActive,
                ]}
              >
                {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                isInWatchLater && styles.actionButtonActive,
              ]}
              onPress={handleAddToWatchLater}
            >
              <Feather
                name="bookmark"
                size={20}
                color={isInWatchLater ? "#007AFF" : "#666"}
                fill={isInWatchLater ? "#007AFF" : "transparent"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  isInWatchLater && styles.actionButtonTextActive,
                ]}
              >
                {isInWatchLater
                  ? "Remove from Watch Later"
                  : "Add to Watch Later"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Success Messages */}
          {showFavouriteSuccess && (
            <View style={styles.successMessage}>
              <Feather name="check-circle" size={16} color="#6BCB77" />
              <Text style={styles.successText}>Added to Favourites!</Text>
            </View>
          )}
          {showWatchLaterSuccess && (
            <View style={styles.successMessage}>
              <Feather name="check-circle" size={16} color="#6BCB77" />
              <Text style={styles.successText}>Added to Watch Later!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  posterContainer: {
    position: "relative",
    width: "100%",
    height: 500,
    backgroundColor: "#000",
  },
  poster: {
    width: "100%",
    height: "100%",
  },
  languagePill: {
    position: "absolute",
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  languageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  statusPill: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  rating: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginLeft: 8,
  },
  ratingOutOf: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  detailLabel: {
    fontSize: 16,
    color: "#666",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  actionButtons: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  actionButtonActive: {
    backgroundColor: "#F0F0F0",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  actionButtonTextActive: {
    color: "#000",
  },
  successMessage: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8F5E9",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  successText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6BCB77",
  },
});
