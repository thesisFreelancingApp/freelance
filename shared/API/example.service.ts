import { AxiosInstance } from "axios";

export const fetchHello = (
    client: AxiosInstance,
): Promise<{ message: string }> => {
    return client
        .get<{ message: string }>(`/api/hello`)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return error;
        });
};
