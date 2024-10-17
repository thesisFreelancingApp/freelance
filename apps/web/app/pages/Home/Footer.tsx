import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-800 uppercase">
              Categories
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Graphics & Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Writing & Translation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Video & Animation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-800 uppercase">
              About
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Press & News
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Partnerships
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-800 uppercase">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Help & Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Trust & Safety
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Selling on YourApp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Buying on YourApp
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold mb-6 text-gray-800 uppercase">
              Community
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Forum
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-600 transition-colors">
                  Podcast
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-8">
          <div className="text-2xl font-bold text-yellow-600 mb-4 md:mb-0">
            YourLogo
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-yellow-600 transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} YourApp Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
