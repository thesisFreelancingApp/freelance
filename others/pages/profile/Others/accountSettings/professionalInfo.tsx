"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

interface UserProfileFormProps {
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<{}>>;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({
  setStep,
  setFormData,
}) => {
  const [formData, setFormDataInl] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    first_name: "",
    last_name: "",
    display_name: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataInl((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {
      first_name: "",
      last_name: "",
      display_name: "",
      phone: "",
    };
    let isValid = true;

    if (!formData.first_name) {
      newErrors.first_name = "First name is required";
      isValid = false;
    }
    if (!formData.last_name) {
      newErrors.last_name = "Last name is required";
      isValid = false;
    }
    if (!formData.display_name) {
      newErrors.display_name = "Display name is required";
      isValid = false;
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setFormData((prevData: any) => ({
        ...prevData,
        ...formData,
      }));
      setStep(3); // Move to the next step
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Personal Info
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us a bit about yourself. This information will appear on your
          public profile, so that potential buyers can get to know you better.
        </p>

        {/* Full Name Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name*
          </label>
          <div className="flex">
            <div className="flex-1 mr-2">
              <Input
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className={
                  errors.first_name ? "border-red-500" : "border-gray-300"
                }
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>
              )}
            </div>

            <div className="flex-1 ml-2">
              <Input
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className={
                  errors.last_name ? "border-red-500" : "border-gray-300"
                }
              />
              {errors.last_name && (
                <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>
              )}
            </div>
          </div>
        </div>

        {/* Display Name Field */}
        <div className="mb-4">
          <label
            htmlFor="display_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Display Name*
          </label>
          <Input
            id="display_name"
            name="display_name"
            placeholder="Your Display Name"
            value={formData.display_name}
            onChange={handleChange}
            className={
              errors.display_name ? "border-red-500" : "border-gray-300"
            }
          />
          {errors.display_name && (
            <p className="text-red-500 text-sm mt-1">{errors.display_name}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number*
          </label>
          <Input
            id="phone"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "border-red-500" : "border-gray-300"}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          className="bg-[#EAB308] text-white py-2 rounded hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          Next
        </Button>
      </form>
    </div>
  );
};

export default UserProfileForm;
