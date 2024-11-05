import {
  FaDiscord,
  FaRedditAlien,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";

const sections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Marketplace", href: "#" },
      { name: "Features", href: "#" },
      { name: "Integrations", href: "#" },
      { name: "Pricing", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "#" },
      { name: "Team", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
    ],
  },
];

const FooterLink = ({ href, children }) => (
  <li className="font-medium hover:text-primary">
    <a href={href}>{children}</a>
  </li>
);

const MainPart = () => {
  return (
    <footer className="items-center justify-center mb-20 border-t border-b-foreground/6">
      <div className="flex flex-col max-w-screen-xl px-4 mx-auto mt-4 md:px-12 lg:px-20">
        <div className="grid gap-10 md:grid-cols-4">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="space-y-4 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <FooterLink key={linkIdx} href={link.href}>
                    {link.name}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="mb-4 font-bold">Legal</h3>
            <ul className="space-y-4 text-muted-foreground">
              <FooterLink href="#">Term of Services</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
            <h3 className="mt-8 mb-4 font-bold">Social</h3>
            <ul className="flex items-center space-x-6 text-muted-foreground">
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaDiscord className="text-lg" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaRedditAlien className="text-lg" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaTwitter className="text-lg" />
                </a>
              </li>
              <li className="font-medium hover:text-primary">
                <a href="#">
                  <FaTelegramPlane className="text-lg" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="flex justify-center my-8 text-sm text-muted-foreground">
        © 2024 Waiahub. All rights reserved.
      </p>
    </footer>
  );
};

export default MainPart;
