import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username: email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Signup failed";
  }
};
