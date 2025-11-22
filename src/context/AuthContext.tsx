/**
 * Authentication Context (TypeScript)
 * Refactored to use authService and storageService
 * Separation of concerns: UI state management separated from API calls
 */

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../services/authService";
import { getUser, removeUser, saveUser } from "../services/storageService";
import type { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from storage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async (): Promise<void> => {
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

  const login = async (credentials: {
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const userData = await loginUser(credentials);
      setUser(userData);
      await saveUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const register = async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> => {
    try {
      const userData = await registerUser(data);
      // Don't auto-login after registration
      // User should be redirected to login page
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await removeUser();
      setUser(null);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
