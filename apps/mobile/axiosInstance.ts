import axios from "axios";
import apiConfig from "../../shared/config/apiConfig";

const axiosInstance = axios.create({
    baseURL: "http://10.0.2.2:3000/api/hello",
    headers: {
        Authorization: `Bearer ${apiConfig.apiKey}`,
    },
});

export default axiosInstance;
