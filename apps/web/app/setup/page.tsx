"use client"; // This directive is necessary for client-side code.

import { useState } from "react";
import UsernameForm from "@/app/pages/profile/Username";
import UserProfileForm from "@/app/pages/profile/professionalInfo";
import UserBioPage from "@/app/pages/profile/UserBio";
import SellerBuyerCards from "@/app/pages/profile/Cards";
import { useRouter } from 'next/navigation'

const SetupPage = () => {
  const [formData, setFormData] = useState({});
  const [step, setStep] = useState<number>(1);
  const router = useRouter();

  return step === 1 ? (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl mb-6">Enter your Username</h1>
      <UsernameForm setStep={setStep} setFormData={setFormData} />
    </div>
  ) : step === 2 ? (
    <div>
      <UserProfileForm setStep={setStep} setFormData={setFormData} />
    </div>
  ) : step === 3 ? (
    <div>
      <UserBioPage setStep={setStep} setFormData={setFormData} />
    </div>
  ) : (
    <div>
      <SellerBuyerCards
        setStep={setStep}
        setFormData={setFormData}
        formData={formData}
        router={router}
      />
    </div>
  );
};

export default SetupPage;
