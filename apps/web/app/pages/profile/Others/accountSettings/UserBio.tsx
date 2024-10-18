// UserBioPage.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface UserBioPageProps {
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<{}>>;
}

const UserBioPage: React.FC<UserBioPageProps> = ({ setStep, setFormData }) => {
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
    setError(""); // Clear error on change
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!bio) {
      setError("Bio is required");
      return;
    }
    setFormData((prevData: any) => ({ ...prevData, bio }));
    // Here you can handle the bio submission, e.g., send it to an API
    // console.log("Bio Submitted:", bio);
    // Redirect or navigate to the next page
    setStep(4);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">
          Tell Us About Yourself
        </h2>
        <p className="mb-6 text-gray-600">
          Your bio is your chance to make a great first impression! Share your
          interests, experiences, or anything else that represents you. This
          will help potential buyers get to know you better.
        </p>

        <textarea
          id="bio"
          name="bio"
          placeholder="Tell us about yourself"
          value={bio}
          onChange={handleChange}
          className={`border-gray-300 rounded-md shadow-sm w-full h-24 p-2 resize-none ${
            error ? "border-red-500" : ""
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}

        <Button
          type="submit"
          className="bg-[#EAB308] text-white py-2 rounded hover:bg-yellow-500 transition duration-200 ease-in-out"
        >
          Save Bio
        </Button>
      </form>
    </div>
  );
};

export default UserBioPage;
