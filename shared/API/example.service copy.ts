// apiClient.ts
import axios, { AxiosInstance } from "axios";

// Vous pouvez utiliser des variables d'environnement pour plus de flexibilité
const API_BASE_URL = "http://localhost:3000";

const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    // Vous pouvez ajouter d'autres configurations ici (headers, timeout, etc.)
});

export default apiClient;
