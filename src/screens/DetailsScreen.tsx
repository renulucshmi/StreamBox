/**
 * Details Screen - Refactored
 * Following clean architecture principles:
 * - Uses utility functions for color and formatting
 * - Uses IconButton component
 * - Separated business logic from JSX
 */

import { Feather } from "@expo/vector-icons";
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
import {
  addToWatchLater,
  removeFromWatchLater,
  selectWatchLater,
} from "../store/slices/watchLaterSlice";
import { AppDispatch } from "../store/store";
import { Movie } from "../types/movie";

export default function DetailsScreen({ route, navigation }: any) {
  const { movie }: { movie: Movie } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { theme, themeMode, toggleTheme } = useTheme();

  // Local state for success messages
  const [showFavouriteSuccess, setShowFavouriteSuccess] =
    useState<boolean>(false);
  const [showWatchLaterSuccess, setShowWatchLaterSuccess] =
    useState<boolean>(false);

  // Get data from Redux using selectors
  const favourites = useSelector(selectFavourites);
  const watchLater = useSelector(selectWatchLater);

  // Check if movie is in lists
  const isFavourite = favourites.some((item) => String(item.id) === movie.id);
  const isInWatchLater = watchLater.some(
    (item) => String(item.id) === movie.id
  );

  // Handler functions
  const handleAddToFavourites = () => {
    if (isFavourite) {
      dispatch(removeFromFavourites(movie.id as any));
    } else {
      dispatch(addToFavourites(movie as any));
      setShowFavouriteSuccess(true);
      setTimeout(() => setShowFavouriteSuccess(false), 2000);
    }
  };

  const handleAddToWatchLater = () => {
    if (isInWatchLater) {
      dispatch(removeFromWatchLater(movie.id as any));
    } else {
      dispatch(addToWatchLater(movie as any));
      setShowWatchLaterSuccess(true);
      setTimeout(() => setShowWatchLaterSuccess(false), 2000);
    }
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
        {/* Movie Poster */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie.posterUrl }}
            style={styles.poster}
            resizeMode="cover"
          />
          {/* Language Pill */}
          {movie.language && (
            <View
              style={[
                styles.languagePill,
                { backgroundColor: theme.colors.overlay },
              ]}
            >
              <Text style={styles.languageText}>{movie.language}</Text>
            </View>
          )}
          {/* Trending Pill */}
          {movie.isTrending && (
            <View style={styles.trendingPill}>
              <Text style={styles.trendingText}>TRENDING</Text>
            </View>
          )}
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
              <Feather name="star" size={20} color="#FFD93D" />
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

          {/* Details */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Details
            </Text>
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
                Language:
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
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
                Genres:
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {movie.genres.join(", ") || "N/A"}
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
                Rating:
              </Text>
              <Text style={[styles.detailValue, { color: theme.colors.text }]}>
                {movie.rating ? `${movie.rating.toFixed(1)}/10` : "N/A"}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: theme.colors.card,
                  shadowColor: theme.colors.shadowColor,
                },
                isFavourite && styles.actionButtonActive,
              ]}
              onPress={handleAddToFavourites}
            >
              <Feather
                name="heart"
                size={20}
                color={isFavourite ? "#FF6B6B" : theme.colors.textSecondary}
                fill={isFavourite ? "#FF6B6B" : "transparent"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  { color: theme.colors.text },
                  isFavourite && styles.actionButtonTextActive,
                ]}
              >
                {isFavourite ? "Remove from Favourites" : "Add to Favourites"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                {
                  backgroundColor: theme.colors.card,
                  shadowColor: theme.colors.shadowColor,
                },
                isInWatchLater && styles.actionButtonActive,
              ]}
              onPress={handleAddToWatchLater}
            >
              <Feather
                name="bookmark"
                size={20}
                color={
                  isInWatchLater
                    ? theme.colors.primary
                    : theme.colors.textSecondary
                }
                fill={isInWatchLater ? theme.colors.primary : "transparent"}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  { color: theme.colors.text },
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
  languagePill: {
    position: "absolute",
    top: 16,
    left: 16,
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
    top: 16,
    right: 16,
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
  infoContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
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
    marginLeft: 8,
  },
  ratingOutOf: {
    fontSize: 16,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtons: {
    marginTop: 8,
    gap: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  actionButtonActive: {
    opacity: 0.8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  actionButtonTextActive: {
    fontWeight: "700",
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
