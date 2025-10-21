import Pretitle from "./Pretitle";
import Image from "next/image";
import Button from "./Button";

const About = () => {
  return (
    <div className="pt-16 xl:pt-32" id="about">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="max-w-[500px]">
              <Pretitle text="Sobre Nós" />
              <h2 className="h2 mb-6">
                Focados em Inovação Disruptiva e Resultados Reais.
              </h2>
              <p className="mb-11">
                Combinamos dados, ciência e tecnologia para impulsionar decisões inteligentes e
                transformar desafios complexos em oportunidades mensuráveis. Somos movidos pela
                busca constante da melhoria e da eficiência.
              </p>
              {/* Assinatura e texto do CEO */}
              <div className="mb-8">
                <Image
                  src="/assets/img/about/signature.png"
                  width={154}
                  height={38}
                  alt="Assinatura"
                />
                <p className="mt-2 text-sm text-secondary">CEO - EsferaDataSci</p>
              </div>
                <a
          href="https://wa.me/5521999417097?text=Obrigado%20pelo%20contato%20com%20a%20EsferaDataSCI%2C%20em%20breve%20vamos%20retornar%20a%20solicita%C3%A7%C3%A3o%2C%20para%20prover%20um%20or%C3%A7amento%20personalizado."
          target="_blank"
          rel="noopener noreferrer"
        >
              <Button text="Contate-nos" />
              </a>
            </div>
          </div>
          {/* Imagem do About */}
          <div className="flex-1 xl:flex xl:justify-center">
            <div className="hidden xl:block w-[444px] h-[493px] bg-accent relative">
              <Image
                src="/assets/img/about/img.jpg"
                fill
                alt="Sobre"
                className="object-cover"
              />
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;