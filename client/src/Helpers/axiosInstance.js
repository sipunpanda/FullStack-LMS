import axios from 'axios';

// const Base_URL = "http://localhost:5000/api/v1"
const Base_URL = "https://lms-backend-vc1b.onrender.com/api/v1"  //render

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = Base_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;