"use client";
import Photographie from '@/assets/categoriesIcon/Photographie.webp'
import Graphisme_Design from '@/assets/categoriesIcon/Graphisme_Design.webp'
import Marketing_digital from '@/assets/categoriesIcon/Marketing_digital.webp'
import Redaction_Traduction from '@/assets/categoriesIcon/Redaction_Traduction.webp'
import Video_Animation from '@/assets/categoriesIcon/Video_Animation.webp'
import Musique_Audio from '@/assets/categoriesIcon/Musique_Audio.webp'
import Programmation_Tech from '@/assets/categoriesIcon/Programmation_Tech.webp'
import Business from '@/assets/categoriesIcon/Business.webp'
import Loisirs from '@/assets/categoriesIcon/Loisirs.webp'
import Data from '@/assets/categoriesIcon/Data.webp'
import Image from 'next/image';

const categories = [
  { name: 'Graphisme & Design', icon: Graphisme_Design },
  { name: 'Marketing digital', icon: Marketing_digital },
  { name: 'Rédaction & Traduction', icon: Redaction_Traduction },
  { name: 'Vidéo & Animation', icon: Video_Animation },
  { name: 'Musique & Audio', icon: Musique_Audio },
  { name: 'Programmation & Tech', icon: Programmation_Tech },
  { name: 'Business', icon: Business },
  { name: 'Loisirs', icon: Loisirs },
  { name: 'Data', icon: Data },
  { name: 'Photographie', icon: Photographie },
];

export default function CategoriesGrid() {
    return (
        <div className="mb-8">
            <div className="inline-block"> {/* Conteneur pour le titre et le trait */}
                <h2 className="text-xl font-semibold mb-2">Découvrez aussi</h2>
                <div className="h-px bg-gray-300 mb-6"></div> {/* Trait sous le titre */}
            </div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                {categories.map((category) => (
                    
                    <div onClick={() => handleCategory(category.id)} key={category.name} className="flex flex-col items-center group cursor-pointer">

                        <Image
                            src={category.icon}
                            alt={category.name}
                            width={48}
                            height={48}
                            className="object-contain mb-2"
                        />
                        <div className="w-12 h-px bg-gray-300 group-hover:bg-yellow-500 transition-colors duration-300 mb-2"></div>
                        <span className="text-center text-xs">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}