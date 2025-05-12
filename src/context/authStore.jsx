import { create } from 'zustand';
import agent from '../api/agent'; // Import the API agent

const useAuthStore = create((set) => ({
  // State
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  error: null,

  // Actions
  signIn: async (credentials) => {
    try {
      const response = await agent.Auth.signIn(credentials);
      const { accessToken } = response;

      // Store token in localStorage
      localStorage.setItem('accessToken', accessToken);

      // Update state
      set({
        accessToken,
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

  createUser: async (userData) => {
    try {
      const response = await agent.Users.createUser(userData);
      set({ error: null });
      return response;
    } catch (error) {
      set({ error: error.response?.data?.message || 'User creation failed' });
      throw error;
    }
  },

  deleteUser: async (userId) => {
    try {
      await agent.Users.deleteUser(userId);
      set({ error: null });
    } catch (error) {
      set({ error: error.response?.data?.message || 'User deletion failed' });
      throw error;
    }
  },

  logout: () => {
    // Clear localStorage
    localStorage.removeItem('accessToken');

    // Reset state
    set({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;