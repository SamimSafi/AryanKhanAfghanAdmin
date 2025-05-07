// src/api/agent.js
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

// Simulate server latency for all API calls
const simulateLatency = () =>
  new Promise((resolve) => setTimeout(resolve, 500));

// Client-related API endpoints
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
  // Add other resource APIs here (e.g., Products, Users)
  // Products: ProductAPI,
  // Users: UserAPI,
};

export default agent;