"use client";

const PaymentSuccess = ({ onReturn }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-10 ">
      <div className="p-8 text-center border border-gray-200 rounded-lg ">
        <img
          src="https://hlxsztkqfvxjbrwmmfww.supabase.co/storage/v1/object/public/images/assets/Vector.svg"
          alt=""
          className="mb-10 h-80"
        />
        <h2 className="mb-2 text-2xl font-semibold text-gray-800">
          Paiement réussi !
        </h2>
        <p className="mb-6 text-gray-600">
          Merci pour votre achat. Votre paiement a été traité avec succès.
        </p>
        <button
          onClick={onReturn}
          className="px-6 py-3 text-black rounded-lg shadow-md bg-primary focus:outline-none focus:ring-2 "
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
