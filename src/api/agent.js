import axiosInstance from './axios';

// Client-related API endpoints

// Auth API calls
const AuthAPI = {
  signIn: async (credentials) => {
    const response = await axiosInstance.post('/auth/signIn', credentials);
    return response.data; // Returns { accessToken: "..." }
  },
  refreshToken: async (refreshToken) => {
    try {
      const response = await axiosInstance.post(`/auth/refresh-token/${ refreshToken }`);
      return response.data; // Expect { accessToken, refreshToken }
    } catch (error) {
      console.error('agent.Auth.refreshToken error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
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

// History API calls
const HistoryAPI = {
    fetchHistorys: async () => {
    const response = await axiosInstance.get('/history');
    return response.data;
  },
  createHistory: async (HistoryData) => {
    const response = await axiosInstance.post('/history', HistoryData);
    return response.data;
  },
   updateHistory: async (id, HistoryData) => {
    const response = await axiosInstance.put(`/history/${id}`, HistoryData);
    return response.data;
  },
  deleteHistory: async (HistoryId) => {
    const response = await axiosInstance.delete(`/history/${HistoryId}`);
    return response.data;
  },
  getHistory: async (HistoryId) => {
    const response = await axiosInstance.get(`/history/${HistoryId}`);
    return response.data;
  },
   activateHistory: async (id) => {
    const response = await axiosInstance.post(`/history/${id}/activate`);
    return response.data;
  },
  deactivateHistory: async (id) => {
    const response = await axiosInstance.post(`/history/${id}/deactivate`);
    return response.data;
  },
  
};

// LeaderShip API calls
const LeadershipAPI = {
    fetchLeadership: async () => {
    const response = await axiosInstance.get('/leadership');
    return response.data;
  },
  createLeadership: async (LeadershipData) => {
   const response = await axiosInstance.post('/leadership', LeadershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateLeadership: async (id, LeadershipData) => {
    const response = await axiosInstance.put(`/leadership/${id}`, LeadershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteLeadership: async (LeadershipId) => {
    const response = await axiosInstance.delete(`/leadership/${LeadershipId}`);
    return response.data;
  },
  getLeadership: async (LeadershipId) => {
    const response = await axiosInstance.get(`/leadership/${LeadershipId}`);
    return response.data;
  },
   activateLeadership: async (id) => {
    const response = await axiosInstance.post(`/leadership/${id}/activate`);
    return response.data;
  },
  deactivateLeadership: async (id) => {
    const response = await axiosInstance.post(`/leadership/${id}/deactivate`);
    return response.data;
  },
  
};

// Mission API calls
const MissionAPI = {
    fetchMission: async () => {
    const response = await axiosInstance.get('/mission');
    return response.data;
  },
  createMission: async (MissionData) => {
    const response = await axiosInstance.post('/mission', MissionData);
    return response.data;
  },
   updateMission: async (id, MissionData) => {
    const response = await axiosInstance.put(`/mission/${id}`, MissionData);
    return response.data;
  },
  deleteMission: async (MissionId) => {
    const response = await axiosInstance.delete(`/mission/${MissionId}`);
    return response.data;
  },
  getMission: async (MissionId) => {
    const response = await axiosInstance.get(`/mission/${MissionId}`);
    return response.data;
  },
   activateMission: async (id) => {
    const response = await axiosInstance.post(`/mission/${id}/activate`);
    return response.data;
  },
  deactivateMission: async (id) => {
    const response = await axiosInstance.post(`/mission/${id}/deactivate`);
    return response.data;
  },
  
};

const PartnershipAPI = {
    fetchPartnership: async () => {
    const response = await axiosInstance.get('/partnership');
    return response.data;
  },
  createPartnership: async (PartnershipData) => {
   const response = await axiosInstance.post('/partnership', PartnershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updatePartnership: async (id, PartnershipData) => {
    const response = await axiosInstance.put(`/partnership/${id}`, PartnershipData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deletePartnership: async (PartnershipId) => {
    const response = await axiosInstance.delete(`/partnership/${PartnershipId}`);
    return response.data;
  },
  getPartnership: async (PartnershipId) => {
    const response = await axiosInstance.get(`/partnership/${PartnershipId}`);
    return response.data;
  },
   activatePartnership: async (id) => {
    const response = await axiosInstance.post(`/partnership/${id}/activate`);
    return response.data;
  },
  deactivatePartnership: async (id) => {
    const response = await axiosInstance.post(`/partnership/${id}/deactivate`);
    return response.data;
  },
  
};

// Services API calls
const ServicesAPI = {
    fetchServices: async () => {
    const response = await axiosInstance.get('/services');
    return response.data;
  },
  createServices: async (ServicesData) => {
   const response = await axiosInstance.post('/services', ServicesData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateServices: async (id, ServicesData) => {
    const response = await axiosInstance.put(`/services/${id}`, ServicesData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteServices: async (ServicesId) => {
    const response = await axiosInstance.delete(`/services/${ServicesId}`);
    return response.data;
  },
  getServices: async (ServicesId) => {
    const response = await axiosInstance.get(`/services/${ServicesId}`);
    return response.data;
  },
   activateServices: async (id) => {
    const response = await axiosInstance.post(`/services/${id}/activate`);
    return response.data;
  },
  deactivateServices: async (id) => {
    const response = await axiosInstance.post(`/services/${id}/deactivate`);
    return response.data;
  },
  
};

// Sliders API calls
const SlidersAPI = {
    fetchSliders: async () => {
    const response = await axiosInstance.get('/sliders');
    return response.data;
  },
  createSliders: async (SlidersData) => {
   const response = await axiosInstance.post('/sliders', SlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
   updateSliders: async (id, SlidersData) => {
    const response = await axiosInstance.put(`/sliders/${id}`, SlidersData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  deleteSliders: async (SlidersId) => {
    const response = await axiosInstance.delete(`/sliders/${SlidersId}`);
    return response.data;
  },
  getSliders: async (SlidersId) => {
    const response = await axiosInstance.get(`/sliders/${SlidersId}`);
    return response.data;
  },
   activateSliders: async (id) => {
    const response = await axiosInstance.post(`/sliders/${id}/activate`);
    return response.data;
  },
  deactivateSliders: async (id) => {
    const response = await axiosInstance.post(`/sliders/${id}/deactivate`);
    return response.data;
  },
  
};


// SuccessSnapshots API calls
const SuccessSnapshotsAPI = {
    fetchSuccessSnapshots: async () => {
    const response = await axiosInstance.get('/success-snapshots');
    return response.data;
  },
  createSuccessSnapshots: async (SuccessSnapshotsData) => {
    const response = await axiosInstance.post('/success-snapshots', SuccessSnapshotsData);
    return response.data;
  },
   updateSuccessSnapshots: async (id, SuccessSnapshotsData) => {
    const response = await axiosInstance.put(`/success-snapshots/${id}`, SuccessSnapshotsData);
    return response.data;
  },
  deleteSuccessSnapshots: async (SuccessSnapshotsId) => {
    const response = await axiosInstance.delete(`/success-snapshots/${SuccessSnapshotsId}`);
    return response.data;
  },
  getSuccessSnapshots: async (SuccessSnapshotsId) => {
    const response = await axiosInstance.get(`/success-snapshots/${SuccessSnapshotsId}`);
    return response.data;
  },
   activateSuccessSnapshots: async (id) => {
    const response = await axiosInstance.post(`/success-snapshots/${id}/activate`);
    return response.data;
  },
  deactivateSuccessSnapshots: async (id) => {
    const response = await axiosInstance.post(`/success-snapshots/${id}/deactivate`);
    return response.data;
  },
  
};
// Centralized agent exporting all resource APIs
const agent = {
  Auth:AuthAPI,
  // Add other resource APIs here (e.g., Products, Users)
  // Products: ProductAPI,
  Users: UserAPI,
  History: HistoryAPI,
  Leadership: LeadershipAPI,
  Partnership: PartnershipAPI,
  Mission: MissionAPI,
  Services: ServicesAPI,
  Sliders: SlidersAPI,
  SuccessSnapshots: SuccessSnapshotsAPI,
};

export default agent;