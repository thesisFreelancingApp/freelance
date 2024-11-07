import {
  FaDiscord,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

const sections = [
  {
    title: "Produit",
    links: [
      { name: "Aperçu", href: "#" },
      { name: "Tarifs", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Fonctionnalités", href: "#" },
      { name: "Intégrations", href: "#" },
    ],
  },
  {
    title: "Entreprise",
    links: [
      { name: "À propos", href: "#" },
      { name: "Équipe", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Carrières", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Confidentialité", href: "#" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { name: "Aide", href: "#" },
      { name: "Ventes", href: "#" },
      { name: "Publicité", href: "#" },
    ],
  },
];

const FooterLink = ({ href, children }) => (
  <li className="font-medium hover:text-primary">
    <a href={href}>{children}</a>
  </li>
);

const Footer = () => {
  return (
    <footer className="py-10 text-gray-600 bg-gray-50">
      <div className="max-w-screen-xl px-6 mx-auto">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Sections */}
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 text-lg font-bold">{section.title}</h3>
              <ul className="space-y-3 text-gray-400">
                {section.links.map((link, linkIdx) => (
                  <FooterLink key={linkIdx} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}

          {/* Legal and Social Section */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Légal</h3>
            <ul className="space-y-3 text-gray-400">
              <FooterLink href="#">Conditions d'utilisation</FooterLink>
              <FooterLink href="#">Politique de confidentialité</FooterLink>
            </ul>
            <h3 className="mt-8 mb-4 text-lg font-bold">Suivez-nous</h3>
            <ul className="flex space-x-6 text-gray-400">
              <li className="hover:text-primary">
                <a href="#">
                  <FaDiscord className="text-2xl" />
                </a>
              </li>
              <li className="hover:text-primary">
                <a href="#">
                  <FaRedditAlien className="text-2xl" />
                </a>
              </li>
              <li className="hover:text-primary">
                <a href="#">
                  <FaTwitter className="text-2xl" />
                </a>
              </li>
              <li className="hover:text-primary">
                <a href="#">
                  <FaTelegramPlane className="text-2xl" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-6 mt-10 text-center text-gray-400 border-t border-gray-200">
          <p>© 2024 WaiaHive. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
