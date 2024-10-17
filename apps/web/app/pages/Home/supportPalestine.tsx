import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import Link from 'next/link';
import palestineFlag from '@/assets/categoriesIcon/supportforpalestine.webp';

const SupportPalestine: React.FC = () => {
  return (
    <div className="bg-gray-100 p-6 flex items-center justify-between rounded-lg">
      <div>
        <h2 className="text-2xl font-bold mb-2">Nous soutenons la Palestine</h2>
        <p className="text-gray-600 mb-4">
          Nous agissons pour aider nos freelances, nos clients et le peuple palestinien — et vous pouvez le faire aussi.
        </p>
        <Link href="https://palestinecampaign.org/" target="_blank" rel="noopener noreferrer">
          <Button variant="outline" className="bg-white text-gray-800 border-gray-300 hover:bg-gray-100">
            En savoir plus
          </Button>
        </Link>
      </div>
      <div className="flex-shrink-0">
        <Image
          src={palestineFlag}
          alt="Soutien à la Palestine"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
};

export default SupportPalestine;
