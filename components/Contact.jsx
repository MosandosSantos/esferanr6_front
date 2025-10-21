// app/(seu-layout)/components/Contact.jsx  (ou src/...)
// precisa do App Router. Se estiver em pages/, adapte o caminho da rota.

"use client";

import { useState } from "react";
import { RiChat1Line, RiPhoneFill } from "react-icons/ri";
import Socials from "./Socials";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // "ok" | "erro" | null
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrorMessage("");

    const formElement = e.currentTarget;
    const form = new FormData(formElement);

    // Honeypot anti-bot: se preenchido, aborta
    if (form.get("website")) {
      setLoading(false);
      return;
    }

    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("ok");
        if (formElement) formElement.reset();
      } else {
        setStatus("erro");
        setErrorMessage(data.error || "Erro desconhecido");
      }
    } catch (err) {
      setStatus("erro");
      setErrorMessage("Erro ao conectar com o servidor: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="pt-16 xl:pt-32" id="contact">
      <div className="container mx-auto">
        {/* Box principal com sombra e borda */}
        <div className="w-full xl:h-auto shadow-custom p-4 xl:p-8 xl:px-[90px] xl:py-[36px] border-t-4 border-accent">
          <div className="flex flex-col xl:flex-row h-full gap-[40px] xl:gap-[90px]">
            
            {/* COLUNA DA ESQUERDA (INFO) */}
            <div className="w-full xl:max-w-[420px] flex flex-col justify-between">
              <div>
                <h4 className="text-[26px] font-primary font-bold mb-6">Contate-nos</h4>
                <p className="text-lg mb-9">
                  Cada grande projeto começa com uma conversa. Nós cuidamos de transformá-la
                  em inovação e resultado real. Conte-nos sua ideia.
                </p>

                {/* Itens de Contato (Email e Telefone) */}
                <div className="flex flex-col gap-y-8 mb-12">
                  {/* Item Email */}
                  <div className="flex items-start gap-x-5">
                    <div className="bg-primary/10 w-[56px] h-[56px] rounded-full flex items-center justify-center">
                      <RiChat1Line className="text-2xl text-accent" />
                    </div>
                    <div>
                      <h5 className="text-xl font-semibold font-primary leading-none mb-1">
                        Envie um email
                      </h5>
                      <p className="text-gray-500 mb-1">Nosso time responderá em breve.</p>
                      <a
                        href="mailto:mosansantos@yahoo.com.br"
                        className="font-semibold text-primary break-all underline underline-offset-4"
                      >
                        mosansantos@yahoo.com.br
                      </a>
                    </div>
                  </div>

                  {/* Item Telefone */}
                  <div className="flex items-start gap-x-5">
                    <div className="bg-primary/10 w-[56px] h-[56px] rounded-full flex items-center justify-center">
                      <RiPhoneFill className="text-2xl text-accent" />
                    </div>
                    <div>
                      <h5 className="text-xl font-semibold font-primary leading-none mb-1">
                        Ligue para nós
                      </h5>
                      <p className="text-gray-500 mb-1">Disponível em horário comercial.</p>
                      <a href="tel:+5521999417097" className="font-semibold text-primary">
                        +55 (21) 99941-7097
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials */}
              <Socials containerStyles="flex gap-x-6" iconsStyles="text-2xl" />
            </div>

            {/* COLUNA DA DIREITA (FORMULÁRIO COM ENVIO) */}
            <div className="flex-1">
              <h2 className="h2 mb-3">Solicite um Orçamento</h2>
              <p className="mb-8">
                Descubra o potencial do que podemos criar juntos. Preencha o formulário abaixo.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* honeypot (oculto a humanos) */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    name="name"
                    placeholder="Seu nome"
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                  <input
                    name="email"
                    type="email"
                    placeholder="Seu e-mail"
                    className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                    required
                  />
                </div>

                <input
                  name="phone"
                  placeholder="Telefone (opcional)"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />

                <input
                  name="subject"
                  placeholder="Assunto"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                />

                <textarea
                  name="message"
                  rows={5}
                  placeholder="Mensagem"
                  className="w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center justify-center rounded-md bg-accent px-5 py-3 font-semibold text-black hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? "Enviando..." : "Enviar"}
                </button>

                {status === "ok" && (
                  <p className="text-green-600 font-semibold">✅ Mensagem enviada com sucesso!</p>
                )}
                {status === "erro" && (
                  <div className="text-red-600">
                    <p className="font-semibold">❌ Não foi possível enviar.</p>
                    {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
