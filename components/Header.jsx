"use client";

import { RiArrowRightUpLine } from "react-icons/ri";
import { Link as ScrollLink } from "react-scroll";
import Logo from "./Logo";
import NavMobile from "./NavMobile";


const links = [
  { name: "Home", path: "home" },
  { name: "Sobre", path: "about" },
  { name: "EsferaNR6", path: "services" },
  { name: "Projetos", path: "projects" },
  { name: "Condições", path: "option" },
  { name: "Contato", path: "contact" },
  { name: "Login", path: "login" },
];

const Header = () => {
  return (
    <header className="bg-primary py-4 sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Navigation - Hidden on mobile, visible on xl screens */}
          <nav className="hidden xl:flex items-center justify-between">
            {/* Menu */}
            <ul className="flex gap-2 text-white text-base font-medium">
              {links.map((link, index) => (
                <li key={index} className="text-white text-sm uppercase font-primary
                font-medium tracking-[1.2px] after:content-['/']
                after:mx-4 last:after:content-nome after:text-accent">
                  <ScrollLink
                    to={link.path}
                    smooth
                    spy
                    className="cursor-pointer hover:text-accent transition-colors"
                    activeClass="text-accent"
                  >
                    {link.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>

            {/* Botão WhatsApp */}
            <a
              href="https://wa.me/5521999417097?text=Obrigado%20pelo%20contato%20com%20a%20EsferaDataSCI%2C%20em%20breve%20vamos%20retornar%20a%20solicita%C3%A7%C3%A3o%2C%20para%20prover%20um%20or%C3%A7amento%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between bg-white text-primary font-bold uppercase text-sm tracking-widest
              px-4 py-2 rounded shadow-md hover:bg-gray-100 transition-all"
            >
              Peça um orçamento
              <div className="w-11 h-11 bg-primary ml-2 flex items-center justify-center rounded">
                <RiArrowRightUpLine className="text-white text-xl group-hover:rotate-45 transition-all duration-200" />
              </div>
            </a>
          </nav>

          {/* Mobile Navigation - Visible on mobile/tablet, hidden on xl screens */}
          <NavMobile />
        </div>
      </div>
    </header>
  );
};

export default Header;
