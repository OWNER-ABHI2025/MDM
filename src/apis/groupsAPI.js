import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/divisions';

export const createGroup = async (data) => {
  return axiosAPI.post(`${API_BASE_URL}/create`, data);
};

export const getAllGroups = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/`);
  return response.data.divisions.map(division => (
    {
      id: division.division_id,
      name: division.division_name
    }
  ))
};

export const getUnassignedDevices = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/unassigned-devices`);
  return response.data.unassigned_users.map(device => (
    {
      id: device.user_id,
      name: device.user_name
    }
  ))
};
