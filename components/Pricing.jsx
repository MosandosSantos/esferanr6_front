"use client";
import { useState } from "react";
import Pretitle from "./Pretitle";
import { RiCheckLine, RiInformationLine } from "react-icons/ri";
import Button from "./Button";

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState("monthly");

  const plans = [
    {
      name: "Starter",
      description: "Ideal para pequenas empresas começarem",
      badge: "Mais Popular",
      employees: "Até 100 funcionários",
      logins: "3 logins simultâneos",
      monthlyPrice: 99.90,
      yearlyPrice: 999.99,
      features: [
        "Gestão de entrega de EPIs",
        "Identificação facial básica",
        "Controle biométrico digital",
        "Relatórios de conformidade NR-6",
        "Alertas de validade",
        "Suporte via email",
        "Backup automático diário",
      ],
      highlight: false,
    },
    {
      name: "Professional",
      description: "Para empresas em crescimento",
      badge: "Recomendado",
      employees: "Até 300 funcionários",
      logins: "5 logins simultâneos",
      monthlyPrice: 279.99,
      yearlyPrice: 2790.90,
      features: [
        "Tudo do plano Starter",
        "Identificação facial avançada (anti-fraude)",
        "Integração biométrica completa",
        "Previsão de estoque com IA",
        "Dashboards personalizáveis",
        "Conformidade NR-6 + NR-7",
        "Suporte prioritário (chat + email)",
        "Relatórios customizados",
        "API para integrações",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      description: "Solução completa para grandes operações",
      badge: "Máximo Poder",
      employees: "Acima de 500 funcionários",
      logins: "Logins ilimitados",
      monthlyPrice: 450.00,
      yearlyPrice: 4500.00,
      features: [
        "Tudo do plano Professional",
        "Identificação facial com IA (liveness detection)",
        "IA avançada para análise preditiva",
        "Multi-filiais e centros de custo",
        "Gestão completa de auditorias",
        "Suporte 24/7 dedicado",
        "Onboarding personalizado",
        "Treinamento da equipe incluído",
        "SLA garantido de 99.9%",
        "Customizações sob demanda",
      ],
      highlight: false,
    },
  ];

  const calculateSavings = (monthly, yearly) => {
    const yearlyMonthly = monthly * 12;
    const savings = ((yearlyMonthly - yearly) / yearlyMonthly * 100).toFixed(0);
    return savings;
  };

  return (
    <section className="py-16 xl:py-24 bg-white" id="pricing">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 xl:mb-16">
          <Pretitle text="Planos e Preços" />
          <h2 className="h2 mb-4">
            Escolha o Plano Ideal para Sua Empresa
          </h2>
          <p className="text-secondary mb-8">
            Transparência total. Sem taxas ocultas. Cancele quando quiser.
            Comece com 14 dias grátis em qualquer plano.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1 gap-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingPeriod === "monthly"
                  ? "bg-accent text-black shadow-md"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 relative ${
                billingPeriod === "yearly"
                  ? "bg-accent text-black shadow-md"
                  : "text-secondary hover:text-primary"
              }`}
            >
              Anual
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                -17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6">
          {plans.map((plan, index) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const savings = calculateSavings(plan.monthlyPrice, plan.yearlyPrice);

            return (
              <div
                key={index}
                className={`relative rounded-lg p-8 transition-all duration-300 hover:scale-105 ${
                  plan.highlight
                    ? "bg-primary text-white shadow-custom ring-2 ring-accent"
                    : "bg-white border-2 border-border hover:border-accent/50 shadow-md"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6 mt-2">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? "text-white" : "text-primary"}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.highlight ? "text-gray-300" : "text-secondary"}`}>
                    {plan.description}
                  </p>

                  {/* Employee & Login Info */}
                  <div className={`space-y-1 mb-4 text-sm ${plan.highlight ? "text-gray-300" : "text-secondary"}`}>
                    <div className="flex items-center justify-center gap-2">
                      <RiInformationLine className="text-accent" />
                      <span>{plan.employees}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <RiInformationLine className="text-accent" />
                      <span>{plan.logins}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className={`text-sm font-medium ${plan.highlight ? "text-gray-300" : "text-secondary"}`}>
                        R$
                      </span>
                      <span className={`text-5xl font-black ${plan.highlight ? "text-accent" : "text-primary"}`}>
                        {price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                    <p className={`text-sm mt-1 ${plan.highlight ? "text-gray-300" : "text-secondary"}`}>
                      por {billingPeriod === "monthly" ? "mês" : "ano"}
                    </p>
                    {billingPeriod === "yearly" && (
                      <p className="text-xs text-green-500 font-semibold mt-2">
                        Economize {savings}% no plano anual
                      </p>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`mt-0.5 p-1 rounded-full ${
                        plan.highlight ? "bg-accent/20" : "bg-accent/10"
                      }`}>
                        <RiCheckLine className={`text-sm ${
                          plan.highlight ? "text-accent" : "text-accent"
                        }`} />
                      </div>
                      <span className={`text-sm leading-relaxed ${
                        plan.highlight ? "text-gray-200" : "text-secondary"
                      }`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <div className="flex justify-center">
                  {plan.highlight ? (
                    <button className='w-full h-[54px] py-[10px] pr-[5px] flex items-center
                      justify-between group bg-accent hover:bg-accent/90 transition-all'>
                      <div className='flex-1 text-center tracking-[1.2px] font-primary font-bold
                        text-sm uppercase text-black'>Começar Agora</div>
                      <div className='w-11 h-11 bg-white flex items-center justify-center'>
                        <RiCheckLine className='text-accent text-xl' />
                      </div>
                    </button>
                  ) : (
                    <button className='w-full h-[54px] py-[10px] pr-[5px] flex items-center
                      justify-between group border-2 border-accent hover:bg-accent transition-all'>
                      <div className='flex-1 text-center tracking-[1.2px] font-primary font-bold
                        text-sm uppercase text-primary group-hover:text-black'>Começar Teste</div>
                      <div className='w-11 h-11 bg-accent group-hover:bg-primary flex items-center justify-center transition-all'>
                        <RiCheckLine className='text-black group-hover:text-accent text-xl' />
                      </div>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-secondary text-sm mb-6">
            Todos os planos incluem 14 dias de teste grátis. Não é necessário cartão de crédito.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-secondary">
            <div className="flex items-center gap-2">
              <RiCheckLine className="text-accent text-lg" />
              <span>Migração gratuita de dados</span>
            </div>
            <div className="flex items-center gap-2">
              <RiCheckLine className="text-accent text-lg" />
              <span>Cancelamento a qualquer momento</span>
            </div>
            <div className="flex items-center gap-2">
              <RiCheckLine className="text-accent text-lg" />
              <span>Suporte em português</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
