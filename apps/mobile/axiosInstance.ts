import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        process.env.EXPO_PUBLIC_API_URL_ANDROID ||
        process.env.EXPO_PUBLIC_API_URL,
    // headers: {
    //     Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
    // },
});

export default axiosInstance;
