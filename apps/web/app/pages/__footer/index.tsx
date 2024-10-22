import MainPart from "@/app/pages/__footer/MainPart";
import CopyrightPart from "./CopyrightPart";
const Footer = ({}) => {
  return (
    <footer className="flex flex-col justify-center text-xs text-center md:text-sm">
      <MainPart />
      <CopyrightPart />
    </footer>
  );
};

export default Footer;
