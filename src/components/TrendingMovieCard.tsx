/**
 * TrendingMovieCard - Premium movie card for Trending screen
 * Features: LinearGradient, Popular badge, Genre/Language pills, Animated heart
 */

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRef } from "react";
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
const CARD_WIDTH = (screenWidth - 48) / 2;

export interface TrendingMovieType {
  id: string;
  title: string;
  poster: string;
  rating: number;
  language: string;
  genre: string;
  isPopular: boolean;
}

interface TrendingMovieCardProps {
  movie: TrendingMovieType;
  onPress: () => void;
  isFavourite: boolean;
  onToggleFavourite: () => void;
}

const TrendingMovieCard: React.FC<TrendingMovieCardProps> = ({
  movie,
  onPress,
  isFavourite,
  onToggleFavourite,
}) => {
  const { theme, themeMode } = useTheme();
  const heartScale = useRef(new Animated.Value(1)).current;

  const handleHeartPress = () => {
    // Heart bounce animation
    Animated.sequence([
      Animated.timing(heartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(heartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    onToggleFavourite();
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.colors.card,
          shadowColor: theme.colors.shadowColor,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      {/* Poster with Gradient Overlay */}
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: movie.poster }}
          style={styles.poster}
          resizeMode="cover"
        />

        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.35)"]}
          style={styles.gradient}
        />

        {/* Language Pill - Top Left */}
        <View
          style={[
            styles.languagePill,
            {
              backgroundColor: themeMode === "dark" ? "#1c1d22" : "#e8ecf2",
            },
          ]}
        >
          <Text
            style={[
              styles.languageText,
              { color: themeMode === "dark" ? "#b0b0b8" : "#444444" },
            ]}
          >
            {movie.language}
          </Text>
        </View>

        {/* Genre Pill - Top Left (next to language) */}
        <View
          style={[
            styles.genrePill,
            {
              backgroundColor: themeMode === "dark" ? "#1c1d22" : "#e8ecf2",
            },
          ]}
        >
          <Text
            style={[
              styles.genreText,
              { color: themeMode === "dark" ? "#b0b0b8" : "#444444" },
            ]}
          >
            {movie.genre}
          </Text>
        </View>

        {/* Popular Badge - Top Right */}
        {movie.isPopular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}

        {/* Favourite Heart - Bottom Right */}
        <Pressable
          onPress={handleHeartPress}
          style={styles.heartButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <MaterialIcons
              name={isFavourite ? "favorite" : "favorite-border"}
              size={24}
              color={isFavourite ? "#ff5252" : "#FFFFFF"}
            />
          </Animated.View>
        </Pressable>
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

        {/* Rating + Genre Row */}
        <View style={styles.metaRow}>
          {/* Rating Badge */}
          <View style={styles.ratingBadge}>
            <MaterialIcons name="star" size={14} color="#f3a000" />
            <Text style={styles.ratingText}>{movie.rating.toFixed(1)}</Text>
          </View>

          {/* Genre Text */}
          <Text
            style={[styles.genreInfo, { color: theme.colors.textSecondary }]}
          >
            {movie.genre}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 16,
  },
  posterContainer: {
    width: "100%",
    height: CARD_WIDTH * 1.5,
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
    height: "40%",
  },
  languagePill: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  languageText: {
    fontSize: 11,
    fontWeight: "600",
  },
  genrePill: {
    position: "absolute",
    top: 38,
    left: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  genreText: {
    fontSize: 11,
    fontWeight: "600",
  },
  popularBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#ff5252",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  heartButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
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
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff7cc",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#f3a000",
  },
  genreInfo: {
    fontSize: 12,
    fontWeight: "500",
  },
});

export default TrendingMovieCard;
