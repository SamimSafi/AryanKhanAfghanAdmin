// src/api/agent.js
import axios from 'axios';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import useAuthStore from '../context/authStore';

// Simulate server latency for all API calls
const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, 500));


// Base URL for your API
const API_BASE_URL = 'http://localhost:3000'; // Replace with your actual API base URL

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Axios interceptor for handling 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loop

      try {
        const newAccessToken = await useAuthStore.getState().refreshAccessToken();
        // Update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        // Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log out the user
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Client-related API endpoints

// Auth API calls
const AuthAPI = {
  signIn: async (credentials) => {
    const response = await axiosInstance.post('/auth/signIn', credentials);
    return response.data; // Returns { accessToken: "..." }
  },
   refreshToken: async (refreshToken) => {
    const response = await axiosInstance.post(`/auth/refresh-token/${refreshToken}`);
    return response.data; // Expecting { accessToken, refreshToken }
  },
};

// User API calls
const UserAPI = {
    fetchUsers: async ({ pageSize, pageIndex, search }) => {
    const response = await axiosInstance.post('/user/findAll', {
      pageSize,
      pageIndex,
      search,
    });
    return response.data;
  },
  createUser: async (userData) => {
    const response = await axiosInstance.post('/user', userData);
    return response.data;
  },
   updateUser: async (id, userData) => {
    const response = await axiosInstance.patch(`/user/${id}`, userData);
    return response.data;
  },
  deleteUser: async (userId) => {
    const response = await axiosInstance.delete(`/user/${userId}`);
    return response.data;
  },
  getUser: async (userId) => {
    const response = await axiosInstance.get(`/user/${userId}`);
    return response.data;
  },
};

const ClientAPI = {
  fetchClients: async () => {
    try {
      const response = await fetch('/clients.json');
      if (!response.ok) throw new Error('Failed to fetch clients');
      const data = await response.json();
      return data;
    } catch (error) {
      toast.error('Failed to load clients.');
      throw error;
    }
  },

  createClient: async (clientData) => {
    await simulateLatency();
    const newClient = { ...clientData, id: uuidv4() };
    toast.success('Client created successfully!');
    return newClient;
  },

  updateClient: async (id, updatedData) => {
    await simulateLatency();
    const updatedClient = { id, ...updatedData };
    toast.success('Client updated successfully!');
    return updatedClient;
  },

  deleteClient: async (id) => {
    await simulateLatency();
    toast.success('Client deleted successfully!');
    return id;
  },

  bulkDeleteClients: async (ids) => {
    await simulateLatency();
    toast.success('Selected clients deleted successfully!');
    return ids;
  },
};

// Centralized agent exporting all resource APIs
const agent = {
  Clients: ClientAPI,
  Auth:AuthAPI,
  // Add other resource APIs here (e.g., Products, Users)
  // Products: ProductAPI,
  Users: UserAPI,
};

export default agent;