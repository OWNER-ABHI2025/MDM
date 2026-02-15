import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/screenshots';

export const caputureScreenshots = async (payload) => {
  const response = await axiosAPI.post(`${API_BASE_URL}/screenshot`, payload);
  return response.data;
};

export const getScreenshotHistory = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/screenshots`);
  return response.data;
};

export const startTimer = async (payload) => {
  const response = await axiosAPI.post(`${API_BASE_URL}/start-timer`, payload);
  return response.data;
};

export const stopTimer = async (payload) => {
  const response = await axiosAPI.post(`${API_BASE_URL}/stop-timer`, payload);
  return response.data;
};

export const getAllScreenShots = async (id) => {
  const response = await axiosAPI.post(`${API_BASE_URL}/screenshot/all`);
  return response.data;
};