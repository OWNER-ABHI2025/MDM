import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/auth';

export const login = async (username, password, captchaValue) => {
  try {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('g-recaptcha-response', captchaValue);

    const response = await axiosAPI.post(`${API_BASE_URL}/login/token`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axiosAPI.post(`${API_BASE_URL}/login/`);
    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};

export const validateToken = async () => {
  try {
    const response = await axiosAPI.get(`${API_BASE_URL}/validate`);
    return response;
  } catch (error) {
    console.error('Error validating token:', error.response.data.detail);
    throw error;
  }
};

// password change not needed for now
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const data = {
      old_password: oldPassword,
      new_password: newPassword,
    };

    const response = await axiosAPI.post(`${API_BASE_URL}/pass/change-password`, data);
    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}

export const updatePassword = async (newPassword) => {
  try {
    const data = {
      newPassword
    }
    const response = await axiosAPI.post(`${API_BASE_URL}/pass/update-password`, data);
    return response;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}