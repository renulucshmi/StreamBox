import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const STORAGE_KEY = "streambox_user";

// Dummy API functions
const dummyLogin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        resolve({
          username: email.split("@")[0],
          email: email,
          token: "fake-token-" + Date.now(),
        });
      } else {
        reject(new Error("Email and password are required"));
      }
    }, 1000);
  });
};

const dummyRegister = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username && email && password) {
        resolve({
          username: username,
          email: email,
          token: "fake-token-" + Date.now(),
        });
      } else {
        reject(new Error("All fields are required"));
      }
    }, 1000);
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const userData = await dummyLogin({ email, password });
      setUser(userData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      const userData = await dummyRegister({ username, email, password });
      setUser(userData);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
