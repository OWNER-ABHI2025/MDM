import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/dashboard';

export const getDashboardData = async () => {
  return axiosAPI.get(`${API_BASE_URL}/stats`);
};

export const getDashboardStats = async (section) => {
  const response = await axiosAPI.get(`${API_BASE_URL}/stats/view`, {
    params: { section },
  });
  return response.data  
}