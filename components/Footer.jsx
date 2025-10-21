import Image from "next/image";
import Link from "next/link";

import {
  RiMapPin2Fill,
  RiPhoneFill,
  RiMailFill,
} from "react-icons/ri";

import Socials from "./Socials";

const Footer = () => {
  return (
    <footer className="mt-16 xl:mt-32 bg-primary text-white py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/assets/logo1.png"
                alt="EsferaNr6"
                width={150}
                height={48}
              />
            </Link>

            <p className="text-sm text-secondary max-w-xl">
              EsferaNR6: controle total de EPIs com biometria e IA — menos planilhas,
              zero multas e mais segurança para sua equipe.
            </p>

            <div className="mt-6">
              <Socials
                containerStyles="flex items-center gap-4"
                iconStyles="text-2xl text-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="h4 text-white mb-4">Contato</h4>
           
            <div className="flex items-start gap-3">
              <RiPhoneFill className="text-2xl text-accent mt-1" />
              
                <h5 className="font-semibold  text-secondary">Telefone:</h5>
                <p className="text-sm text-secondary">+55 (21) 99941-7097</p>
              
            </div>

            <div className="flex items-start gap-3">
              <RiMailFill className="text-2xl text-accent mt-1" />
             
                <h5 className="font-semibold  text-secondary">E-mail:</h5>
                <p className="text-sm text-secondary">mosansantos@yahoo.com.br</p>
              
            </div>
          </div>
        </div>

        {/* Divider + direitos */}
        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-center text-xs md:text-sm text-white/70">
            Todos os direitos reservados a Mosán dos Santos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
