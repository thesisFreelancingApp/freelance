"use client";
import { useState } from "react";

const ServicePurchase = () => {
  const [step, setStep] = useState("select"); // Step can be "select", "confirm", or "activated"
  const [service, setService] = useState(null);

  const handleServiceSelect = (selectedService) => {
    setService(selectedService);
    setStep("confirm");
  };

  const handlePurchaseConfirm = () => {
    setStep("activated");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-8 text-center bg-white border border-gray-200 rounded-lg shadow-md w-80">
        {step === "select" && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Sélectionnez un service
            </h2>
            <button
              onClick={() => handleServiceSelect("Service A")}
              className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Service A - 10€
            </button>
            <button
              onClick={() => handleServiceSelect("Service B")}
              className="w-full px-4 py-2 mb-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Service B - 20€
            </button>
          </>
        )}

        {step === "confirm" && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Confirmer l'achat
            </h2>
            <p className="mb-6 text-gray-600">
              Vous avez sélectionné <strong>{service}</strong> pour{" "}
              {service === "Service A" ? "10€" : "20€"}. Voulez-vous confirmer
              l'achat ?
            </p>
            <button
              onClick={handlePurchaseConfirm}
              className="w-full px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
            >
              Confirmer l'achat
            </button>
            <button
              onClick={() => setStep("select")}
              className="w-full px-4 py-2 mt-2 text-gray-800 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              Retour
            </button>
          </>
        )}

        {step === "activated" && (
          <>
            <h2 className="mb-4 text-xl font-semibold text-green-600">
              Service Activé !
            </h2>
            <p className="mb-6 text-gray-600">
              Votre achat pour <strong>{service}</strong> a été activé avec
              succès. Merci pour votre achat !
            </p>
            <button
              onClick={() => setStep("select")}
              className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Acheter un autre service
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ServicePurchase;
