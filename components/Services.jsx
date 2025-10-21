"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import Pretitle from "./Pretitle";
import {
  PiWrenchFill,
  PiPackageFill,
  PiShieldCheckFill,
  PiIdentificationCardFill,
  PiChartLineUpBold,
  PiShoppingCartFill,
  PiCloudArrowDownFill,
  PiBellFill,
  PiLockFill,
  PiHeartbeatFill
} from "react-icons/pi";

const serviceData = [
  {
    name: "gestao-epi",
    Icon: PiWrenchFill,
    title: "Gestão de EPI",
    description: "Cadastro completo de EPIs com CA, validade e vinculação por função/risco.",
    serviceList: [
      "Cadastro de EPIs com CA e validade",
      "Kits por função e por risco",
      "Bloqueio de EPI vencido/suspenso",
      "Histórico de uso por colaborador"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" }
    ]
  },
  {
    name: "estoque-logistica",
    Icon: PiPackageFill,
    title: "Estoque & Logística",
    description: "Controle multi-obra/empresa com visão centralizada e previsão de consumo.",
    serviceList: [
      "Multi-obra e multi-empresa",
      "Ponto de pedido e reposição",
      "Inventário e acertos",
      "Integração a estoque centralizado"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-1.jpg" },
      { url: "/assets/img/services/thumb-2.jpg" }
    ]
  },
  {
    name: "entrega-rastreio",
    Icon: PiIdentificationCardFill,
    title: "Entrega & Rastreio",
    description: "Comprovantes digitais com biometria facial e rastreabilidade total de entregas.",
    serviceList: [
      "Identificação facial (reconhecimento biométrico)",
      "Termo de responsabilidade digital",
      "Assinatura eletrônica e biometria digital",
      "Devolução e troca com registro de motivo",
      "Rastreio completo por lote/kit/colaborador"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-3.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" }
    ]
  },
  {
    name: "conformidade-nr6",
    Icon: PiShieldCheckFill,
    title: "Conformidade NR-6",
    description: "Alertas, evidências e relatórios prontos para auditorias e fiscalizações.",
    serviceList: [
      "Alertas de CA a vencer/suspenso",
      "Checklist de auditoria",
      "Evidências (fotos, documentos)",
      "Relatórios para fiscalização"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" }
    ]
  },
  {
    name: "integracao-nr7",
    Icon: PiHeartbeatFill,
    title: "Integração NR-7 (opcional)",
    description: "Conexão com ASO/PCMSO para assegurar entregas apenas a colaboradores aptos.",
    serviceList: [
      "Vínculo com ASO/PCMSO",
      "Bloqueio sem ASO válido",
      "Riscos por função",
      "Histórico ocupacional básico"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-1.jpg" },
      { url: "/assets/img/services/thumb-2.jpg" }
    ]
  },
  {
    name: "dashboards-kpis",
    Icon: PiChartLineUpBold,
    title: "Dashboards & KPIs",
    description: "Indicadores em tempo real para custo, consumo e ruptura.",
    serviceList: [
      "Consumo por obra/empresa",
      "Custo por colaborador/função",
      "Top itens e rupturas",
      "Exportação CSV/XLSX"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-3.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" }
    ]
  },
  {
    name: "compras-fornecedores",
    Icon: PiShoppingCartFill,
    title: "Compras & Fornecedores",
    description: "Catálogo por fornecedor, comparativos e pedido sugerido.",
    serviceList: [
      "Catálogo por fornecedor",
      "Comparativo de preço/lead time",
      "Pedido de compra sugerido",
      "Histórico de cotações"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" }
    ]
  },
  {
    name: "integracoes",
    Icon: PiCloudArrowDownFill,
    title: "Integrações",
    description: "Abertura para ERPs, planilhas e repositórios de documentos.",
    serviceList: [
      "Importação via planilhas",
      "API REST e webhooks",
      "Google Drive (repositório)",
      "Conectores sob demanda"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-1.jpg" },
      { url: "/assets/img/services/thumb-2.jpg" }
    ]
  },
  {
    name: "alertas-notificacoes",
    Icon: PiBellFill,
    title: "Alertas & Notificações",
    description: "Avisos automáticos para evitar multas, perdas e rupturas.",
    serviceList: [
      "Vencimento de CA/ASO",
      "Ruptura e ponto de pedido",
      "Pendências de assinatura",
      "E-mail e mensageria (opcional)"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-3.jpg" },
      { url: "/assets/img/services/thumb-4.jpg" }
    ]
  },
  {
    name: "acessos-seguranca",
    Icon: PiLockFill,
    title: "Acessos & Segurança",
    description: "Controle de perfis por papel e trilha de auditoria completa.",
    serviceList: [
      "Perfis: Incorporadora/Obra/Empresa",
      "Trilha de auditoria (logs)",
      "LGPD: princípios de mínimo acesso",
      "SSO/OAuth (opcional)"
    ],
    thumbs: [
      { url: "/assets/img/services/thumb-5.jpg" },
      { url: "/assets/img/services/thumb-6.jpg" }
    ]
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(serviceData[0]);
  const ActiveIcon = activeService.Icon;

  return (
    <section className="pt-16 xl:pt-32 bg-gray-50" id="services">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 xl:mb-16">
          <div className="flex justify-center">
            <Pretitle text="Nossas Soluções" />
          </div>
          <h2 className="h2 mb-4">
            Soluções Completas para Gerenciamento de EPIs
          </h2>
          <p className="text-secondary">
            EsferaNR6 é a plataforma mais completa para gerenciamento de EPIs,
            com conformidade total à NR-6 e integração opcional com NR-7.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-12">
          {serviceData.map((service, index) => {
            const ServiceIcon = service.Icon;
            return (
              <button
                key={index}
                onClick={() => setActiveService(service)}
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${
                  activeService.name === service.name
                    ? "bg-accent border-accent text-black"
                    : "bg-white border-border text-secondary hover:border-accent/50"
                }`}
              >
                <div className={`text-3xl mb-2 ${
                  activeService.name === service.name ? "text-black" : "text-accent"
                }`}>
                  <ServiceIcon />
                </div>
                <h4 className={`text-sm font-semibold ${
                  activeService.name === service.name ? "text-black" : "text-primary"
                }`}>
                  {service.title}
                </h4>
              </button>
            );
          })}
        </div>

        {/* Active Service Details */}
        <div className="bg-white rounded-lg shadow-custom p-8 xl:p-12">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12 items-center">
            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-5xl text-accent">
                  <ActiveIcon />
                </div>
                <div>
                  <h3 className="h3 mb-2">{activeService.title}</h3>
                  <p className="text-secondary">{activeService.description}</p>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {activeService.serviceList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0"></div>
                    <span className="text-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/5521999417097?text=Obrigado%20pelo%20contato%20com%20a%20EsferaDataSCI%2C%20em%20breve%20vamos%20retornar%20a%20solicita%C3%A7%C3%A3o%2C%20para%20prover%20um%20or%C3%A7amento%20personalizado."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button text="Saiba Mais" />
              </a>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              {activeService.thumbs && activeService.thumbs.map((thumb, idx) => (
                <div key={idx} className="relative h-[200px] xl:h-[250px] rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={thumb.url}
                    fill
                    alt={`${activeService.title} - ${idx + 1}`}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-secondary mb-6">
            Quer conhecer todas as funcionalidades em detalhes?
          </p>
          <div className="flex justify-center">
            <a
              href="https://wa.me/5521999417097?text=Obrigado%20pelo%20contato%20com%20a%20EsferaDataSCI%2C%20em%20breve%20vamos%20retornar%20a%20solicita%C3%A7%C3%A3o%2C%20para%20prover%20um%20or%C3%A7amento%20personalizado."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button text="Agendar Demonstração" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
