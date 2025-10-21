import nodemailer from "nodemailer";

export const runtime = "nodejs";        // Nodemailer precisa do runtime Node
export const dynamic = "force-dynamic"; // garante execução server-side

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return Response.json({ error: "Preencha nome, e-mail e mensagem." }, { status: 400 });
    }

    // Verificar se as variáveis de ambiente estão configuradas
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS || process.env.SMTP_PASS === "sua_senha_de_app_do_gmail_aqui") {
      console.error("❌ ERRO: Configure SMTP_USER e SMTP_PASS no arquivo .env");
      return Response.json({ error: "Servidor de email não configurado. Configure o .env com sua senha de app do Gmail." }, { status: 500 });
    }

    console.log("📧 Configurando transporter de email...");
    console.log("Host:", process.env.SMTP_HOST);
    console.log("Port:", process.env.SMTP_PORT);
    console.log("User:", process.env.SMTP_USER);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    console.log("🔍 Verificando conexão SMTP...");
    await transporter.verify();
    console.log("✅ Conexão SMTP verificada!");

    console.log("📨 Enviando email...");
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: subject || "Novo contato pelo site",
      text: `Nome: ${name}\nEmail: ${email}\nTelefone: ${phone || "-"}\n\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>Novo contato pelo site</h2>
          <p><b>Nome:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Telefone:</b> ${phone || "-"}</p>
          <p><b>Assunto:</b> ${subject || "—"}</p>
          <hr/>
          <p>${(message || "").replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    console.log("✅ Email enviado com sucesso!", info.messageId);
    return Response.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("❌ EMAIL ERROR:", err.message);
    console.error("Detalhes completos:", err);
    return Response.json({
      error: "Falha ao enviar e-mail: " + err.message
    }, { status: 500 });
  }
}
