import { axiosAPI } from "./axiosInstance";

const API_BASE_URL = '/api/faqs';

export const getAllFaqs = async () => {
    const response = await axiosAPI.get(`${API_BASE_URL}/`)
    return response.data.faqs;
}

export const getFaq = async (faq_id) => {
    const response = await axiosAPI.get(`${API_BASE_URL}/${faq_id}`)
    return response.data
}

export const searchFaq = async (query) => {
    const response = await axiosAPI.post(`${API_BASE_URL}/search`, {query})
    return response.data.results
}

export const submitFaq = async (question) => {
    await axiosAPI.post(`${API_BASE_URL}/submit`, {question})
}