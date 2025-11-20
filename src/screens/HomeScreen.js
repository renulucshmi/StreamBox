import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.nowShowing}>Now Showing</Text>
          <Text style={styles.welcome}>
            Welcome, {user?.username || "Guest"}
          </Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.placeholder}>
          Movie list will appear here later.
        </Text>
      </View>
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
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  headerLeft: {
    flex: 1,
  },
  nowShowing: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111111",
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: "#666666",
    fontWeight: "400",
  },
  logoutButton: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginLeft: 12,
  },
  logoutText: {
    color: "#5B3FFF",
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  placeholder: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
});
