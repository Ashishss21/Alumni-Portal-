// src/utils/axiosConfig.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Ensure this matches your backend server URL
});

export default axiosInstance;
