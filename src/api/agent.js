import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import axiosInstance from './axios';

// Simulate server latency for all API calls
const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, 500));


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