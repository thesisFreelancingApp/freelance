import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://10.0.2.2:3000",
    // headers: {
    //     Authorization: `Bearer ${apiConfig.apiKey}`,
    // },
});

export default axiosInstance;
