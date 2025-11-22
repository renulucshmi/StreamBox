import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeContext";
import {
  removeFromFavourites,
  selectFavourites,
} from "../store/slices/favouritesSlice";
import { AppDispatch } from "../store/store";
import { RootStackParamList } from "../types/navigation";

const { width } = Dimensions.get("window");
const cardWidth = (width - 48) / 2; // 2 columns with padding

interface FavouriteMovie {
  id: any;
  title: string;
  poster: string;
  rating?: number;
  status: string;
  language?: string;
}

interface FavouritesScreenProps {
  navigation: NativeStackNavigationProp<RootStackParamList, "Favourites">;
}

export default function FavouritesScreen({
  navigation,
}: FavouritesScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector(selectFavourites);
  const { theme, themeMode, toggleTheme } = useTheme();

  const handleRemoveFromFavourites = (movieId: any) => {
    dispatch(removeFromFavourites(movieId));
  };

  const handleMoviePress = (movie: any) => {
    navigation.navigate("Details", { movie });
  };

  // Get status color based on status type
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Popular":
        return "#FF6B6B";
      case "Trending":
        return "#4DB5FF";
      case "Upcoming":
        return "#FFD93D";
      case "Top Rated":
        return "#6BCB77";
      default:
        return "#95A5A6";
    }
  };

  const renderMovieCard = ({ item: movie }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.card,
            shadowColor: theme.colors.shadowColor,
          },
        ]}
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
            <View
              style={[
                styles.languagePill,
                { backgroundColor: theme.colors.overlay },
              ]}
            >
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
          <Text
            style={[styles.title, { color: theme.colors.text }]}
            numberOfLines={2}
          >
            {movie.title}
          </Text>
          {movie.rating && (
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingIcon}>⭐</Text>
              <Text
                style={[styles.rating, { color: theme.colors.textSecondary }]}
              >
                {movie.rating}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={theme.colors.emptyIcon} />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No Favourites Yet
      </Text>
      <Text
        style={[styles.emptySubtitle, { color: theme.colors.textSecondary }]}
      >
        Movies and shows you favourite will appear here
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.surface }]}
    >
      <StatusBar
        barStyle={theme.colors.statusBar}
        backgroundColor={theme.colors.surface}
      />

      <View
        style={[styles.header, { borderBottomColor: theme.colors.borderLight }]}
      >
        <View style={styles.headerLeft}>
          <Text style={[styles.headerTitle, { color: theme.colors.text }]}>
            My Favourites
          </Text>
          {favourites.length > 0 && (
            <View
              style={[
                styles.countBadge,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text style={styles.countText}>{favourites.length}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.themeToggleButton}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Feather
            name={themeMode === "dark" ? "sun" : "moon"}
            size={22}
            color={theme.colors.text}
          />
        </TouchableOpacity>
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
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  themeToggleButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  countBadge: {
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
    borderRadius: 16,
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
