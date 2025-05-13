import { create } from 'zustand';
import agent from '../api/agent'; // Import the API agent
import { jwtDecode } from "jwt-decode";
// Utility to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    return decoded.exp < currentTime; // Token is expired if exp is in the past
  } catch (error) {
    console.error('Error decoding token:', error);
    return true; // Treat as expired if decoding fails
  }
};

// Utility to get token expiration time
const getTokenExpiration = (token) => {
  if (!token) return 0;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000; // Convert to milliseconds
  } catch (error) {
    console.error('Error decoding token:', error);
    return 0;
  }
};

const useAuthStore = create((set,get) => ({
  // State
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
 isAuthenticated: !!localStorage.getItem('accessToken') && !isTokenExpired(localStorage.getItem('accessToken')),
  error: null,

  // Actions
  signIn: async (credentials) => {
    try {
      const response = await agent.Auth.signIn(credentials);
      const { accessToken,refreshToken } = response;

      // Store token in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Update state
      set({
        accessToken,
        refreshToken,
        isAuthenticated: true,
        error: null,
      });

      // Optionally fetch user data after login
      // const user = await agent.Users.getUser(userId); // Adjust based on your API
      // set({ user });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed' });
      throw error;
    }
  },

  refreshAccessToken: async () => {
    try {
      const { refreshToken } = get();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await agent.Auth.refreshToken(refreshToken);
      const { accessToken, refreshToken: newRefreshToken } = response;

      // Store new tokens in localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      // Update state
      set({
        accessToken,
        refreshToken: newRefreshToken,
        isAuthenticated: true,
        error: null,
      });

      return accessToken;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to refresh token',
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        user: null,
      });
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw error;
    }
  },

  logout: () => {
    // Clear localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    // Reset state
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },

   initialize: () => {
    const { accessToken, refreshToken } = get();
    if (accessToken && isTokenExpired(accessToken) && refreshToken) {
      get().refreshAccessToken();
    }

    const checkTokenExpiration = setInterval(() => {
      const currentAccessToken = get().accessToken;
      if (currentAccessToken) {
        const expirationTime = getTokenExpiration(currentAccessToken); // Use getTokenExpiration
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime;
        const bufferTime = 5 * 60 * 1000; // 5 minutes in milliseconds

        if (timeUntilExpiration < bufferTime) {
          get().refreshAccessToken(); // Refresh if within 5 minutes of expiration
        }
      }
    }, 30 * 1000); // Check every 30 seconds for more responsiveness

    return () => clearInterval(checkTokenExpiration);
  },

}));

// Call initialize on store creation
useAuthStore.getState().initialize();
console.log('Auth store initialized');
export default useAuthStore;