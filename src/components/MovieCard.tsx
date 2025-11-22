/**
 * MovieCard - Premium Design with Gradients & Animations
 * Features: LinearGradient overlay, filled star ratings, scale animation, improved badges
 */

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
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

const { width: screenWidth } = Dimensions.get("window");

// Calculate card width for 2-column grid
const CARD_WIDTH = (screenWidth - 48) / 2;
const POSTER_ASPECT_RATIO = 3 / 2;

interface MovieCardProps {
  movie: any;
  onPress: () => void;
  isFavourite?: boolean;
  onFavouritePress?: (movie: any) => void;
  index?: number;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onPress,
  isFavourite,
  onFavouritePress,
  index = 0,
}) => {
  const { theme } = useTheme();

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Fade-in animation on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  // Scale animation on press
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  // Get status badge info
  const getStatusBadge = () => {
    const status = movie.status;
    if (status === "Popular") return { text: "Popular", color: "#FF6B6B" };
    if (status === "Trending") return { text: "Trending", color: "#4DB5FF" };
    if (status === "Top Rated") return { text: "Top Rated", color: "#6BCB77" };
    if (status === "Upcoming") return { text: "Upcoming", color: "#FFD93D" };
    return null;
  };

  const badge = getStatusBadge();

  // Render filled stars based on rating
  const renderStars = () => {
    const rating = parseFloat(movie.rating) || 0;
    const fullStars = Math.floor(rating / 2); // Convert 10-point to 5-point scale
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <MaterialIcons
          key={i}
          name={i < fullStars ? "star" : "star-border"}
          size={14}
          color="#FFD700"
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadowColor,
          },
        ]}
      >
        {/* Poster Image */}
        <View style={styles.posterContainer}>
          <Image
            source={{ uri: movie.poster }}
            style={styles.poster}
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={styles.gradient}
          />

          {/* Status Badge */}
          {badge && (
            <View
              style={[styles.statusBadge, { backgroundColor: badge.color }]}
            >
              <Text style={styles.statusText}>{badge.text}</Text>
            </View>
          )}

          {/* Language Badge */}
          {movie.language && (
            <View
              style={[
                styles.languageBadge,
                { backgroundColor: theme.colors.overlay },
              ]}
            >
              <Text style={styles.languageText}>{movie.language}</Text>
            </View>
          )}

          {/* Favourite Button */}
          {onFavouritePress && (
            <Pressable
              style={styles.favouriteButton}
              onPress={(e) => {
                e.stopPropagation();
                onFavouritePress(movie);
              }}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <MaterialIcons
                name={isFavourite ? "favorite" : "favorite-border"}
                size={22}
                color={isFavourite ? "#FF6B6B" : "#FFFFFF"}
              />
            </Pressable>
          )}
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Title */}
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {movie.title}
          </Text>

          {/* Rating Row */}
          <View style={styles.ratingRow}>
            {/* Star Rating */}
            <View style={styles.ratingContainer}>
              <View style={styles.starsRow}>{renderStars()}</View>
              <Text
                style={[
                  styles.ratingText,
                  { color: theme.colors.textSecondary },
                ]}
              >
                {movie.rating || "N/A"}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  posterContainer: {
    width: "100%",
    height: CARD_WIDTH * POSTER_ASPECT_RATIO,
    position: "relative",
  },
  poster: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E5E5E5",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%",
  },
  statusBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  statusText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  languageBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
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
  favouriteButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 8,
    lineHeight: 20,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    flex: 1,
  },
  starsRow: {
    flexDirection: "row",
  },
  starIcon: {
    marginRight: -2,
  },
  ratingText: {
    fontSize: 13,
    fontWeight: "600",
    marginLeft: 2,
  },
});

export default MovieCard;
