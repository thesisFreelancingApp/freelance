import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    // headers: {
    //     Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    // },
});

export default axiosInstance;
