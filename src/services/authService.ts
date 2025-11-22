/**
 * Authentication Service (TypeScript)
 * Handles all authentication-related API calls using DummyJSON API
 * Real API integration: https://dummyjson.com
 */

import type { User } from "../types";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface UserWithToken extends User {
  token: string;
}

// DummyJSON API base URL
const API_BASE_URL = "https://dummyjson.com";

/**
 * Login user with email and password using DummyJSON API
 * Test credentials: username: "emilys", password: "emilyspass"
 */
export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<UserWithToken> => {
  try {
    // DummyJSON uses username instead of email
    // Extract username from email or use email directly
    const username = email.includes("@") ? email.split("@")[0] : email;

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        expiresInMins: 30, // optional, defaults to 60
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();

    // Transform API response to our User type
    return {
      username: data.username || username,
      email: data.email || email,
      token: data.token,
      id: data.id,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Network error. Please check your connection.");
  }
};

/**
 * Register a new user
 * Note: DummyJSON doesn't have a real registration endpoint,
 * so we'll simulate it for the assignment
 */
export const registerUser = async ({
  username,
  email,
  password,
}: RegisterData): Promise<UserWithToken> => {
  try {
    // Simulate registration with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }

    // Return simulated user data
    // In a real app, this would call a POST /users/add endpoint
    return {
      username: username,
      email: email,
      token: "registered-token-" + Date.now(),
      id: String(Math.floor(Math.random() * 1000)),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Registration failed. Please try again.");
  }
};

/**
 * Logout user (perform any server-side logout if needed)
 */
export const logoutUser = async (): Promise<void> => {
  // DummyJSON doesn't require server-side logout
  // Just clear local storage
  return Promise.resolve();
};

/**
 * Verify user token using DummyJSON API
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Refresh authentication token using DummyJSON API
 */
export const refreshToken = async (
  oldToken: string
): Promise<{ token: string }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: oldToken,
        expiresInMins: 30,
      }),
    });

    if (!response.ok) {
      throw new Error("Token refresh failed");
    }

    const data = await response.json();
    return {
      token: data.token,
    };
  } catch (error) {
    throw new Error("Failed to refresh token");
  }
};

/**
 * Get current authenticated user using DummyJSON API
 */
export const getCurrentUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user data");
    }

    const data = await response.json();
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      token: token,
    };
  } catch (error) {
    throw new Error("Failed to fetch user data");
  }
};
