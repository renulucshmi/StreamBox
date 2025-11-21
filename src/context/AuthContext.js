/**
 * Authentication Context
 * Refactored to use authService and storageService
 * Separation of concerns: UI state management separated from API calls
 */

import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getUser, removeUser, saveUser } from "../services/storageService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from storage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await getUser();
      if (storedUser) {
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to load user from storage:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    try {
      const userData = await loginUser({ email, password });
      setUser(userData);
      await saveUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async ({ username, email, password }) => {
    try {
      const userData = await registerUser({ username, email, password });
      setUser(userData);
      await saveUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeUser();
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
