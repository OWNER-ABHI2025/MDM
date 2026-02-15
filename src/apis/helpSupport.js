import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/help_support';

export const submitHelp = async (payload) => {
    await axiosAPI.post(`${API_BASE_URL}/submit`, payload)
}