import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/devices';

export const getAllDevices = async () => {
  const response = await axiosAPI.get(`${API_BASE_URL}/`);
  return response.data.devices.map(device => ({
    id: device.device_id,
    name: device.device_name,
  }));
};