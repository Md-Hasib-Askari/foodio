import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5555/api/v1/";

const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default axiosInstance;