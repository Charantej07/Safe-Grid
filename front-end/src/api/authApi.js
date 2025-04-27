import axios from "axios";


console.log("starting");

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth`;

console.log("process", API_URL);
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const registerUser = async (username, password, role) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
    role,
  });
  return response.data;
};
