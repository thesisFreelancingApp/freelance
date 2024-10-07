"use client";

import { isAxiosError } from "axios"; // Import isAxiosError directly from axios
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import axiosInstance from "~/axiosInstance";
import { fetchHello } from "../../../shared/API/example.service";

const GetTestPage = () => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleGetTest = async () => {
        console.log("handleGetTest: Fetch operation started");

        try {
            console.log("handleGetTest: Calling fetchHello with axiosInstance");
            const response = await fetchHello(axiosInstance);
            console.log(
                "handleGetTest: fetchHello response received",
                response,
            );

            setData(response);
            console.log("handleGetTest: Data state updated");
        } catch (err: unknown) {
            // Explicitly type err as unknown
            console.error(
                "handleGetTest: An error occurred during fetchHello",
                err,
            );

            if (isAxiosError(err)) {
                // Use the imported isAxiosError for type guarding
                console.error("handleGetTest: Axios error details", {
                    message: err.message,
                    code: err.code,
                    response: err.response,
                    config: err.config,
                });
                setError(err.response?.data?.message || err.message);
            } else {
                console.error("handleGetTest: Non-Axios error", err);
                setError("An unexpected error occurred");
            }
        } finally {
            console.log("handleGetTest: Fetch operation completed");
        }
    };

    useEffect(() => {
        console.log("useEffect: Component mounted, triggering handleGetTest");
        handleGetTest();
        return () => {
            console.log("useEffect: Component unmounted");
        };
    }, []);

    console.log(
        "GetTestPage: Rendering component with data:",
        data,
        "and error:",
        error,
    );

    // Move console.log statements out of JSX to prevent ReactNode errors
    if (error) {
        console.log("GetTestPage: Rendering error message");
    } else if (data) {
        console.log("GetTestPage: Rendering fetched data");
    } else {
        console.log("GetTestPage: Rendering ActivityIndicator");
    }

    return (
        <View className="flex-1 p-5 bg-white">
            <Text className="mb-5 text-2xl font-bold">Data Fetch Example</Text>
            {error ? (
                <Text className="text-red-500">Error: {error}</Text>
            ) : data ? (
                <ScrollView className="mt-2.5">
                    <Text>{JSON.stringify(data, null, 2)}</Text>
                </ScrollView>
            ) : (
                <ActivityIndicator
                    size="large"
                    color="#0000ff"
                />
            )}
        </View>
    );
};

export default GetTestPage;
