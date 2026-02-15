import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.sns.mdm.studio',
  withCredentials: true,
});

export const axiosAPI = axiosInstance;