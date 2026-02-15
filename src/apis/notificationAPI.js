import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/workflow';

export const createNotification = async (data) => {
  return axiosAPI.post(`${API_BASE_URL}/send-workflows`, data);
};

export const getNotificationHistory = async () => {
  return axiosAPI.get(`${API_BASE_URL}/workflows/history`);
};

export const deleteNotification = async (workflowId) => {
  return axiosAPI.delete(`${API_BASE_URL}/workflows/${workflowId}`);
};
