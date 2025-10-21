"use client";
// ...existing code...
import Pretitle from "./Pretitle";
import { motion } from "framer-motion";
import { fadeIn } from "../public/assets/variants";
import FaqItem from './FaqItem';
// ...existing code...
const faqItemsData = [
  {
    title: "O que é o EsferaEPI e para quem ele foi feito?",
    description: "O EsferaEPI é um sistema de gestão de EPIs pensado para incorporadoras, obras e empreiteiras. Ele centraliza o controle de estoques, a entrega de EPIs aos colaboradores, a validade de CA, documentos e evidências de conformidade (NR6 e conexões com NR7), gerando relatórios para auditorias internas e fiscalizações.",
  },
  {
    title: "A instalação é demorada?",
    description: "Não. Instalação imediata. Criamos o ambiente, cadastramos sua organização e, em minutos, você já pode importar colaboradores, empresas e obras para começar a operar.",
  },
  {
    title: "Como o sistema controla o CA (Certificado de Aprovação)?",
    description: "Cada EPI cadastrado tem seu CA e data de validade. O sistema alerta com antecedência quando o CA está para vencer, bloqueia novas entregas de EPIs vencidos (se você desejar) e registra toda a rastreabilidade por lote/fornecedor, evitando uso de itens fora de conformidade.",
  },
  {
    title: "De que forma o EsferaEPI ajuda na NR6?",
    description: "A NR6 exige entrega, controle e substituição de EPIs com evidências. O sistema gera Termos de Responsabilidade (com assinatura eletrônica/biométrica opcional), mantém histórico de entregas por colaborador, controla vida útil e troca preventiva, e fornece relatórios que sustentam auditorias e inspeções.",
  },
  {
    title: "E a NR7 (PCMSO) — qual a relação com o EsferaEPI?",
    description: "A NR7 trata de saúde ocupacional (PCMSO). O EsferaEPI concentra evidências complementares: vincula treinamentos, ASOs e documentos ao colaborador e ao posto de trabalho, facilitando a conferência entre aptidão médica e EPIs exigidos para a função. (Observação: o sistema não substitui seu software médico/PCMSO; ele integra evidências para auditorias).",
  },
  {
    title: "Como o EsferaEPI ajuda a evitar multas?",
    description: "Com alertas de validade de CA, bloqueio opcional de entrega de EPI irregular, histórico completo de entregas, relatórios de conformidade por obra/empresa e rastreabilidade por colaborador e por item, você reduz falhas operacionais e mitiga riscos de autuação por descumprimento da NR6 e uso de EPIs inadequados.",
  },
  {
    title: "Incorporadoras podem auditar as empreiteiras? E as obras?",
    description: "Sim. A arquitetura é multi-nível - Incorporadoras: acompanham todas as obras e todas as empreiteiras vinculadas (visão 360 e relatórios comparativos). - Obras: fiscalizam colaboradores de várias empreiteiras na obra, com filtros por frente de serviço/função. Empreiteiras: visualizam somente seus colaboradores e entregas. Os perfis de acesso garantem que cada papel veja apenas o que deve.",
  },
  {
    title: "Como é a cobrança do sistema?",
    description: "O valor é por quantidade de funcionários ativos (pay-as-you-grow). Você pode começar pequeno e escalar conforme a operação cresce. Obras e empreiteiras entram no mesmo ecossistema, sem surpresas de custo por obra.",
  },
  {
    title: "Quais são os principais benefícios práticos no dia a dia?",
    description: "Rastreabilidade total: quem recebeu o quê, quando, de qual lote/CA. Prevenção: alertas de CA e trocas programadas. Produtividade: check-out de EPIs rápido (com assinatura eletrônica/biometria facial, opcional). Visão executiva: dashboards por obra/empresa/função. Evidência para auditoria: documentos e logs organizados em segundos.",
  },
  {
    title: "O EsferaEPI integra com outros sistemas e facilita a migração?",
    description: "Sim. Você pode importar planilhas (Excel/CSV) de colaboradores, funções e EPIs, e integrar via API com RH, compras e ERPs (para consumo/estoque). Também é possível anexar documentos comprobatórios (certificados, ASOs, manuais) por colaborador e por EPI.",
  },
  {
    title: "O sistema é seguro e está em conformidade com a LGPD?",
    description: "Sim. Contamos com perfis de acesso, criptografia em trânsito, logs de auditoria, segregação de dados entre empresas/obras e políticas de retenção. As informações pessoais são tratadas segundo boas práticas de LGPD. Há backup e planos de contingência para garantir disponibilidade.",
  },
  {
    title: "Como começar e quais são os prazos de onboarding?",
    description: "Basta criar sua conta e enviar a base mínima (obras, empresas, colaboradores e EPIs). Em poucas horas, sua operação já está registrando entregas e gerando evidências. Oferecemos suporte, materiais de treinamento rápido e templates de importação para acelerar.",
  },
];

const faqItemVaiants  =  {
  hidden: { opacity: 0, y: 30 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {delay: index * 0.1, duration: 0.3},
  }), 

};
const Faq = () => {
  return (
    <section className="pt-16 xl:pt-32">
      <div className="container mx-auto">
      <div className="text-center max-w-[540px] mx-auto xl:mb-20">
        <Pretitle text="Faq" center />
        <h2 className="h2 mb-3">Tem dúvidas? A gente te ajuda.</h2>
        <p className="mb-11 max-w-[480px] mx-auto">
          Dúvidas práticas do EsferaNR6: setup, usuários e permissões, check-out de EPIs, CA/alertas, dashboards, API e cobrança.
        </p>
        </div>
        {/* faq itens */}
        <ul>
            {faqItemsData.map((item, index) => {
                return <li key={index}>
                  <FaqItem title={item.title} description={item.description} />
                </li>

            })}

        </ul>

     </div>
    </section>
  );
}

export default Faq