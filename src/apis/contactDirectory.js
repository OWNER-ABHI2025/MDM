import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/contacts';

export const getContactDirectory = async () => {
  return axiosAPI.get(`${API_BASE_URL}/all`);
};
export const DeleteContactDirectory = async (username) => {
  return axiosAPI.delete(`${API_BASE_URL}/delete-contact/${username}`);
};

