/**
 * Details Screen - Modern & Clean Refactor
 * Features:
 * - Heart icon on poster for favourite toggle
 * - Gradient overlay on poster for better readability
 * - Removed Watch Later button
 * - Clean info card layout for details
 * - Toast notification for favourite changes
 */

import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import IconButton from "../components/IconButton";
import { useTheme } from "../context/ThemeContext";
import {
  addToFavourites,
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { AppDispatch } from "../store/store";
import { Movie } from "../types/movie";

export default function DetailsScreen({ route, navigation }: any) {
  const { movie }: { movie: Movie } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state for toast message
  const [toastMessage, setToastMessage] = useState<string>("");

  // Get data from Redux using selectors
  const favourites = useSelector(selectFavourites);

  // Check if movie is favourite
  const isFavourite = favourites.some((item) => String(item.id) === movie.id);

  // Handler function for favourite toggle
  const handleToggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id));
      setToastMessage("Removed from favourites");
    } else {
      dispatch(addToFavourites(movie as any));
      setToastMessage("Added to favourites");
    }
    // Hide toast after 2 seconds
    setTimeout(() => setToastMessage(""), 2000);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.background}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            borderBottomColor: theme.colors.border,
          },
        ]}
      >
        <IconButton
          iconName="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
          Movie Details
        </Text>
        <IconButton
          iconName={themeMode === "dark" ? "sun" : "moon"}
          size={22}
          onPress={toggleTheme}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Movie Poster with Hero Section */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie.posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.45)"]}
            style={styles.posterGradient}
          />

          {/* Language Pill */}
          {movie.language && (
            <View style={styles.languagePill}>
              <Text style={styles.languageText}>{movie.language}</Text>
            </View>
          )}

          {/* Trending Pill */}
          {movie.isTrending && (
            <View style={styles.trendingPill}>
              <Text style={styles.trendingText}>TRENDING</Text>
            </View>
          )}

          {/* Favourite Heart Icon */}
          <TouchableOpacity
            style={styles.favouriteIcon}
            onPress={handleToggleFavourite}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={isFavourite ? "heart" : "heart-outline"}
              size={26}
              color={isFavourite ? "#ff5252" : "#FFFFFF"}
            />
          </TouchableOpacity>
        </View>

        {/* Movie Info */}
        <View
          style={[
            styles.infoContainer,
            { backgroundColor: theme.colors.background },
          ]}
        >
          {/* Title */}
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {movie.title}
          </Text>

          {/* Rating */}
          {movie.rating && (
            <View style={styles.ratingContainer}>
              <Feather name="star" size={22} color="#f3a000" fill="#f3a000" />
              <Text style={[styles.rating, { color: theme.colors.text }]}>
                {movie.rating}
              </Text>
              <Text
                style={[
                  styles.ratingOutOf,
                  { color: theme.colors.textSecondary },
                ]}
              >
                /10
              </Text>
            </View>
          )}

          {/* Overview */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Overview
            </Text>
            <Text
              style={[styles.overview, { color: theme.colors.textSecondary }]}
            >
              {`${movie.title} is a captivating ${
                movie.genres[0] || "movie"
              } that has captivated audiences worldwide. With stunning visuals and compelling storytelling, this film delivers an unforgettable cinematic experience. The talented cast brings the characters to life in ways that will keep you engaged from start to finish.`}
            </Text>
          </View>

          {/* Details Card */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Details
            </Text>
            <View
              style={[
                styles.detailsCard,
                { backgroundColor: theme.colors.card },
              ]}
            >
              <View
                style={[
                  styles.detailRow,
                  { borderBottomColor: theme.colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Language
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {movie.language || "N/A"}
                </Text>
              </View>
              <View
                style={[
                  styles.detailRow,
                  { borderBottomColor: theme.colors.border },
                ]}
              >
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Genres
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {movie.genres.join(", ") || "N/A"}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text
                  style={[
                    styles.detailLabel,
                    { color: theme.colors.textSecondary },
                  ]}
                >
                  Rating
                </Text>
                <Text
                  style={[styles.detailValue, { color: theme.colors.text }]}
                >
                  {movie.rating ? `${movie.rating.toFixed(1)}/10` : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Toast Message */}
        {toastMessage !== "" && (
          <View style={styles.toast}>
            <Feather name="check-circle" size={18} color="#FFFFFF" />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
  posterGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
  },
  languagePill: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  trendingPill: {
    position: "absolute",
    top: 60,
    left: 16,
    backgroundColor: "#ff5252",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  trendingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  favouriteIcon: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    lineHeight: 36,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  rating: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 8,
  },
  ratingOutOf: {
    fontSize: 18,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    marginTop: 4,
  },
  overview: {
    fontSize: 16,
    lineHeight: 26,
  },
  detailsCard: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "400",
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
  toast: {
    position: "absolute",
    bottom: 100,
    left: "10%",
    right: "10%",
    backgroundColor: "rgba(0,0,0,0.85)",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
  },
  toastText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
