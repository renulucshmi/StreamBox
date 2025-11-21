/**
 * Authentication Service
 * Handles all authentication-related API calls
 * Decoupled from UI components for better testability
 */

/**
 * Login user with email and password
 * @param {Object} credentials - User credentials
 * @param {string} credentials.email - User email
 * @param {string} credentials.password - User password
 * @returns {Promise<Object>} User data with token
 */
export const loginUser = async ({ email, password }) => {
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
 * @param {Object} userData - User registration data
 * @param {string} userData.username - Username
 * @param {string} userData.email - User email
 * @param {string} userData.password - User password
 * @returns {Promise<Object>} User data with token
 */
export const registerUser = async ({ username, email, password }) => {
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
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Perform any server-side logout logic here
      resolve();
    }, 300);
  });
};

/**
 * Verify user token
 * @param {string} token - Authentication token
 * @returns {Promise<boolean>} Whether token is valid
 */
export const verifyToken = async (token) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simple token verification logic
      const isValid = token && token.startsWith("fake-token-");
      resolve(isValid);
    }, 500);
  });
};

/**
 * Refresh authentication token
 * @param {string} oldToken - Current token
 * @returns {Promise<Object>} New user data with refreshed token
 */
export const refreshToken = async (oldToken) => {
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
