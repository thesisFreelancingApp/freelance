"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Adjust the path according to your project structure
import { Dispatch, SetStateAction } from "react";
import axios from "axios";

interface SellerBuyerCardsProps {
  setStep: Dispatch<SetStateAction<number>>;
  setFormData: Dispatch<SetStateAction<{}>>;
  formData: {};
  router: any;
}

const SellerBuyerCards: React.FC<SellerBuyerCardsProps> = ({
  formData,
  setFormData,
  router,
}) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (role: "buyer" | "seller") => {
    const updatedFormData: {} = {
      ...formData,
      is_buyer: role === "buyer",
      is_seller: role === "seller",
      id: "b832027c-d051-4397-b77c-b37757c1a9c4", // TODO: UPDATE THIS AS SOON AS POSSIBLE TO USE UR SESSION USER ID, AND CAREFULLY CHECK IT
    };

    setFormData(updatedFormData);

    try {
      setLoading(true);
      const response = await axios.post("/api/setup-profile", {
        ...updatedFormData,
      });

      if (response.status === 200) {
        // Handle successful submission
        // console.log("Profile setup successful!");
        router.push("/");
      } else {
        // Handle error response
        // console.error("Profile setup failed.");
      }
    } catch (error) {
      console.error("An error occurred while submitting the form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center max-w-4xl mx-auto space-x-4">
      {/* Seller Card */}
      <Card className="p-6 transition-transform transform bg-white border rounded-lg shadow-lg hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Seller
          </CardTitle>
          <CardDescription className="text-gray-600">
            Create a shop and start selling your products today! Manage your
            inventory, track sales, and connect with buyers.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            disabled={loading}
            className="w-full bg-[#EAB308] text-white hover:bg-[#D9A40E]"
            onClick={() => handleSubmit("seller")}
          >
            Start Selling
          </Button>
        </CardContent>
      </Card>

      {/* Buyer Card */}
      <Card className="p-6 transition-transform transform bg-white border rounded-lg shadow-lg hover:scale-105">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Buyer
          </CardTitle>
          <CardDescription className="text-gray-600">
            Browse through a wide range of products, find amazing deals, and
            enjoy a seamless shopping experience!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            disabled={loading}
            className="w-full bg-[#EAB308] text-white hover:bg-[#D9A40E]"
            onClick={() => handleSubmit("buyer")}
          >
            Start Shopping
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerBuyerCards;
