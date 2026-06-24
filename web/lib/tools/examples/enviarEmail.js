// Tool de ejemplo: enviar email.
// Stub por ahora: cuando Fase 2 (Resend) esté integrada, conectar a
// lib/resend/send.js. Lo dejamos desacoplado para no depender de ese
// trabajo mientras se integra.
export const enviarEmail = {
  name: "enviar_email",
  description: "Envía un email transaccional al destinatario indicado.",
  parameters: {
    type: "object",
    properties: {
      to: { type: "string", description: "Correo del destinatario." },
      subject: { type: "string", description: "Asunto del email." },
      body: { type: "string", description: "Cuerpo del mensaje." },
    },
    required: ["to", "subject", "body"],
    additionalProperties: false,
  },
  async execute({ to, subject, body }) {
    // TODO Fase 2: conectar a lib/resend/send.js
    console.log("[enviar_email] stub:", { to, subject, body })
    return { ok: true, stub: true }
  },
}
