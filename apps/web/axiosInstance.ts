import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    // headers: {
    //     Authorization: `Bearer ${apiConfig.apiKey}`,
    // },
});

export default axiosInstance;
