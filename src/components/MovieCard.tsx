/**
 * MovieCard - Unified movie card design for all screens
 * Features: TRENDING tag only, language/genre pills, rating badge, heart icon
 */

import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "../context/ThemeContext";
import { Movie } from "../types/movie";

const { width: screenWidth } = Dimensions.get("window");
const CARD_WIDTH = (screenWidth - 48) / 2; // 2 columns with padding

interface MovieCardProps {
  movie: Movie;
  isFavourite: boolean;
  onPress: () => void;
  onToggleFavourite: () => void;
  showTrendingTag?: boolean; // Only show on Trending screen
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isFavourite,
  onPress,
  onToggleFavourite,
  showTrendingTag = false,
}) => {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const heartScaleAnim = useRef(new Animated.Value(1)).current;
  const [imageError, setImageError] = useState(false);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  const handleHeartPress = () => {
    Animated.sequence([
      Animated.spring(heartScaleAnim, {
        toValue: 1.3,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.spring(heartScaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
    ]).start();
    onToggleFavourite();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.text,
          },
        ]}
      >
        {/* Poster Container */}
        <View style={styles.posterContainer}>
          {/* Poster Image with Error Handling */}
          {!imageError ? (
            <Image
              source={{ uri: movie.posterUrl }}
              style={styles.poster}
              onError={() => setImageError(true)}
            />
          ) : (
            <View
              style={[
                styles.poster,
                styles.placeholderContainer,
                { backgroundColor: theme.colors.background },
              ]}
            >
              <FontAwesome
                name="film"
                size={48}
                color={theme.colors.textSecondary}
              />
              <Text
                style={[
                  styles.placeholderText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                No Image
              </Text>
            </View>
          )}

          {/* Top Pills and Tags */}
          <View style={styles.topRow}>
            <View style={styles.leftPills}>
              {/* Language Pill */}
              <View
                style={[
                  styles.pill,
                  { backgroundColor: theme.colors.background + "DD" },
                ]}
              >
                <Text style={[styles.pillText, { color: theme.colors.text }]}>
                  {movie.language}
                </Text>
              </View>

              {/* First Genre Pill */}
              {movie.genres.length > 0 && (
                <View
                  style={[
                    styles.pill,
                    { backgroundColor: theme.colors.background + "DD" },
                  ]}
                >
                  <Text style={[styles.pillText, { color: theme.colors.text }]}>
                    {movie.genres[0]}
                  </Text>
                </View>
              )}
            </View>

            {/* TRENDING Tag - Only if enabled and movie is trending */}
            {showTrendingTag && movie.isTrending && (
              <View style={styles.trendingTag}>
                <Text style={styles.trendingText}>TRENDING</Text>
              </View>
            )}
          </View>

          {/* Heart Icon */}
          <Animated.View
            style={[
              styles.heartContainer,
              { transform: [{ scale: heartScaleAnim }] },
            ]}
          >
            <Pressable onPress={handleHeartPress} hitSlop={8}>
              <FontAwesome
                name={isFavourite ? "heart" : "heart-o"}
                size={20}
                color={isFavourite ? "#ff5252" : "#ffffff"}
              />
            </Pressable>
          </Animated.View>
        </View>

        {/* Bottom Info Section */}
        <View style={styles.infoSection}>
          {/* Title */}
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {movie.title}
          </Text>

          {/* Rating Row */}
          <View style={styles.ratingRow}>
            <FontAwesome name="star" size={14} color="#f3a000" />
            <Text style={[styles.ratingText, { color: theme.colors.text }]}>
              {movie.rating.toFixed(1)}
            </Text>
            <Text
              style={[styles.genreText, { color: theme.colors.textSecondary }]}
            >
              {movie.genres[0] || "Movie"}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  posterContainer: {
    width: "100%",
    position: "relative",
  },
  poster: {
    width: "100%",
    height: CARD_WIDTH * 1.5, // 3:2 aspect ratio
    resizeMode: "cover",
  },
  placeholderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
  },
  topRow: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leftPills: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    flex: 1,
  },
  pill: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: "600",
  },
  trendingTag: {
    backgroundColor: "#ff5252",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  trendingText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  heartContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  infoSection: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.2,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  genreText: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
  },
});

export default MovieCard;
