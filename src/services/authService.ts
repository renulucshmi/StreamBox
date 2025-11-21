/**
 * Authentication Service (TypeScript)
 * Handles all authentication-related API calls
 * Decoupled from UI components for better testability
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

/**
 * Login user with email and password
 */
export const loginUser = async ({
  email,
  password,
}: LoginCredentials): Promise<UserWithToken> => {
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

/**
 * Register a new user
 */
export const registerUser = async ({
  username,
  email,
  password,
}: RegisterData): Promise<UserWithToken> => {
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

/**
 * Logout user (perform any server-side logout if needed)
 */
export const logoutUser = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Perform any server-side logout logic here
      resolve();
    }, 300);
  });
};

/**
 * Verify user token
 */
export const verifyToken = async (token: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple token verification logic
      const isValid = Boolean(token && token.startsWith("fake-token-"));
      resolve(isValid);
    }, 500);
  });
};

/**
 * Refresh authentication token
 */
export const refreshToken = async (
  oldToken: string
): Promise<{ token: string }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (oldToken && oldToken.startsWith("fake-token-")) {
        resolve({
          token: "fake-token-" + Date.now(),
        });
      } else {
        reject(new Error("Invalid token"));
      }
    }, 500);
  });
};
