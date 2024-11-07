"use client";
import { useState, type SetStateAction } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "Pourquoi engager un freelance ?",
    answer:
      "En raison de la pénurie croissante de travailleurs qualifiés, il est actuellement de plus en plus difficile de trouver du personnel compétent à temps plein. Ce n'est pas sans raison que de plus en plus d'entreprises françaises travaillent avec des freelances qui proposent leurs services en ligne. Les sites web de freelances permettent aux entreprises de trouver les bons experts rapidement et de manière fiable, et de rester ainsi compétitives sur le marché actuel. À l'inverse, de plus en plus de freelances préfèrent trouver leur travail en ligne, car l'administration est moins lourde et l'offre de travail plus importante.",
  },
  {
    question: "Qu'est-ce qui différencie Waiahub des autres plateformes ?",
    answer:
      "Waiahub offre une grande variété de services et est particulièrement adapté pour des tâches spécifiques à des tarifs compétitifs.",
  },
  {
    question: "Combien coûte l'inscription sur Waiahub ?",
    answer:
      "L'inscription sur Waiahub est gratuite. Cependant, des frais peuvent être appliqués lors de la transaction pour certaines prestations.",
  },
  {
    question: "Comment puis-je communiquer avec mon freelance ?",
    answer:
      "Vous pouvez utiliser la messagerie intégrée de Waiahub pour discuter avec votre freelance et suivre l'avancement de votre projet.",
  },
  {
    question: "Quels sont les modes de paiement proposés par Waiahub ?",
    answer:
      "Waiahub accepte les paiements via carte de crédit, PayPal et d'autres méthodes de paiement sécurisées.",
  },
  {
    question:
      "Comment savoir si le résultat obtenu est à la hauteur du prix payé ?",
    answer:
      "Waiahub permet aux utilisateurs de noter et de laisser des commentaires après chaque service, ce qui vous aide à évaluer la qualité des freelances.",
  },
  {
    question:
      "Qui dois-je contacter si j'ai des problèmes avec une mission ou un freelance ?",
    answer:
      "Vous pouvez contacter le service client de Waiahub pour toute assistance ou pour résoudre des conflits avec des freelances.",
  },
  {
    question: "Puis-je également travailler avec des freelances francophones ?",
    answer:
      "Oui, Waiahub propose des freelances de différents pays, y compris des pays francophones.",
  },
];

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: number | SetStateAction<null>) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 mx-auto my-10 mt-20 max-w-7xl">
      <h2 className="mb-4 text-4xl font-bold">FAQs</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-300">
            <button
              className="flex items-center justify-between w-full py-4 font-medium text-left"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <span className="text-gray-400">
                {openIndex === index ? (
                  <FaChevronUp className="text-xl" />
                ) : (
                  <FaChevronDown className="text-xl" />
                )}
              </span>
            </button>
            {openIndex === index && (
              <p className="pb-4 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQComponent;
