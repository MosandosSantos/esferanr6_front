// components
import Button from  "./Button"
const Hero = () => {
  return (
    <section className="h-[70vh] bg-hero bg-no-reapeat bg-cover bg-center relative">
      <div className="absolute inset-0 bg-gradient-to-l from-black/0 via-black/50
      to-black/70 z-10"> </div>
      <div className="container mx-auto h-full flex items-center">
        <div className="z-20 text-white text-center xl:text-left mx-auto xl:mx-0 flex 
        flex-col items-center xl:items-start max-w-[608px]">
          <h1 className="h1 text-white mb-4">
            <span className="text-accent">A Revolução </span>
            digital na gestão de EPI chegou.
        </h1>
        <p className="mb-9">
Planilhas, fichas de papel e controles manuais ficaram no passado.
O EsferaNR6 é um sistema inteligente que centraliza a entrega de EPIs com identificação facial e biometria, prevê necessidades de estoque com IA e garante total conformidade com a NR-6 e indiretamente com a NR-7.
Reduza custos, elimine falhas humanas e tenha uma gestão de segurança moderna, eficiente e à prova de auditorias.
</p>
     <div>
        <a
          href="https://wa.me/5521999417097?text=Obrigado%20pelo%20contato%20com%20a%20EsferaDataSCI%2C%20em%20breve%20vamos%20retornar%20a%20solicita%C3%A7%C3%A3o%2C%20para%20prover%20um%20or%C3%A7amento%20personalizado."
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button text="Solicite nosso orçamento" />
        </a>
     </div>
      </div>
      </div>

    </section>
  );
};

export default Hero