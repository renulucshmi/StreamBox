import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: movie.poster }}
        style={styles.poster}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={2}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 140,
    marginRight: 12,
  },
  poster: {
    width: 140,
    height: 200,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
  title: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
  },
});

export default MovieCard;
