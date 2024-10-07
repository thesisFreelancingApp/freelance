import { AxiosInstance } from "axios";

export const fetchHello = (
    client: AxiosInstance,
): Promise<{ message: string }> => {
    return client
        .get<{ message: string }>(`http://localhost:3000/api/hello`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
};
