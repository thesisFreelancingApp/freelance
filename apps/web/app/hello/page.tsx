"use client";

import { getUserDB } from "@/server.actions/user.actions";
import { useEffect, useState } from "react";
const GetTestPage = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleGetTest = async () => {
      try {
        const userData = await getUserDB();
        // console.log(userData);
        setData(userData);
      } catch (error: any) {
        setError(error.message || "Get Data Error");
      }
    };

    handleGetTest(); // Trigger the fetch when the component mounts
  }, []);

  return (
    <div>
      <h1>Data Fetch Example</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default GetTestPage;
