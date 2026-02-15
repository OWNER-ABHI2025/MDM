import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/workflow';


export const createWorkflow = async (data) => {
  return axiosAPI.post(`${API_BASE_URL}/send-workflows`, data);
};

export const getWorkflowHistory = async () => {
  return axiosAPI.get(`${API_BASE_URL}/workflows/history`);
};

export const deleteWorkflow = async (data) => {
  return axiosAPI.delete(`${API_BASE_URL}/workflows/${data}`);
};

export const editWorkflow = async (id,data) => {
  return axiosAPI.put(`${API_BASE_URL}/workflows/${id}`,data);
};

export const getAcks = async (id) => {
  return axiosAPI.get(`${API_BASE_URL}/workflows/${id}/acks`);
};