"use client"; // Ensure this runs as a client component

import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface UsernameFormProps {
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<{}>>;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
  setStep,
  setFormData,
}) => {
  const methods = useForm<{ username: string }>();
  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;
  const username = watch("username");

  // State to track availability and loading state
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username) {
        setLoading(true);
        try {
          const response = await axios.get(
            `/api/check-username?username=${username}`
          );
          setIsAvailable(response.data.isAvailable);
        } catch (error) {
          console.error("Error checking username availability", error);
        } finally {
          setLoading(false);
        }
      } else {
        setIsAvailable(null); // Reset availability if username is empty
      }
    };

    const timer = setTimeout(() => {
      checkUsernameAvailability();
    }, 2000); // Check availability every 2 seconds

    return () => clearTimeout(timer); // Cleanup timer
  }, [username]);

  const onSubmit = async (data: { username: string }) => {
    if (isAvailable) {
      setFormData((prevData: any) => ({
        ...prevData,
        username: username,
      }));
      console.log("Username:", data.username);
      setStep(2); // Move to the next step
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-96 p-8 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          <FormItem className="mb-6">
            <FormLabel
              htmlFor="username"
              className="block text-xl font-semibold mb-2"
            >
              Username
            </FormLabel>
            <FormControl>
              <Input
                id="username"
                className="w-full p-3 text-lg border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#EAB308] transition duration-200 ease-in-out"
                {...methods.register("username", {
                  required: "Username is required",
                })}
              />
            </FormControl>
            {errors.username && (
              <FormMessage className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </FormMessage>
            )}
            {isAvailable === false && username && (
              <span className="text-red-500 mt-2">
                Username is already taken
              </span>
            )}
            {loading && (
              <span className="text-gray-500 mt-2">
                Checking availability...
              </span>
            )}
          </FormItem>

          <FormDescription className="text-gray-600 text-sm mb-4">
            Enter your desired username.
          </FormDescription>

          <Button
            type="submit"
            className="w-full bg-[#EAB308] text-white font-semibold py-3 rounded hover:bg-yellow-500 transition duration-200 ease-in-out"
            disabled={!isAvailable} // Disable button if username is not available
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default UsernameForm;
