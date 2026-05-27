import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Endpoint seguro de captura de leads.
 * - Crea/actualiza el contacto en Brevo (segmentado por temática)
 * - Envía un email transaccional con el recurso solicitado
 * La API key NUNCA se expone al cliente: vive en process.env.
 */

interface LeadBody {
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  tematica?: string;
  recurso?: string;
  consent?: boolean;
}

const BREVO_BASE = "https://api.brevo.com/v3";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("BREVO_API_KEY no configurada");
    return res.status(500).json({ error: "Configuración del servidor incompleta" });
  }

  const body = (req.body ?? {}) as LeadBody;
  const { nombre, apellidos, email, telefono, tematica, recurso, consent } = body;

  if (!nombre || !apellidos || !email || !telefono || !tematica || !recurso) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }
  if (!consent) {
    return res.status(400).json({ error: "Consentimiento requerido" });
  }

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
    "api-key": apiKey,
  };

  try {
    // 1) Crear o actualizar contacto (segmentado por temática)
    const listId = process.env.BREVO_LIST_ID;
    const contactRes = await fetch(`${BREVO_BASE}/contacts`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        attributes: {
          NOMBRE: nombre,
          APELLIDOS: apellidos,
          SMS: telefono,
          TEMATICA: tematica,
          ULTIMO_RECURSO: recurso,
        },
        listIds: listId ? [Number(listId)] : undefined,
        updateEnabled: true,
      }),
    });

    // 204 = creado, 400 con "Contact already exist" lo toleramos
    if (!contactRes.ok && contactRes.status !== 204) {
      const detail = await contactRes.json().catch(() => ({}));
      const code = (detail as { code?: string }).code;
      if (code !== "duplicate_parameter") {
        console.error("Brevo contact error", contactRes.status, detail);
      }
    }

    // 2) Email transaccional con el recurso
    const senderEmail = process.env.BREVO_SENDER_EMAIL ?? "info@compromisolegal.es";
    const senderName = process.env.BREVO_SENDER_NAME ?? "Compromiso Legal";

    const emailRes = await fetch(`${BREVO_BASE}/smtp/email`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email, name: `${nombre} ${apellidos}` }],
        subject: `Tu recurso: ${recurso}`,
        htmlContent: buildEmailHtml({ nombre, recurso }),
      }),
    });

    if (!emailRes.ok) {
      const detail = await emailRes.json().catch(() => ({}));
      console.error("Brevo email error", emailRes.status, detail);
      return res.status(502).json({ error: "No se pudo enviar el email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("subscribe handler error", err);
    return res.status(500).json({ error: "Error interno" });
  }
}

function buildEmailHtml({ nombre, recurso }: { nombre: string; recurso: string }) {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;background:#000;font-family:Arial,Helvetica,sans-serif;color:#fff;padding:32px;">
    <table role="presentation" width="100%" style="max-width:540px;margin:0 auto;background:#0d0d0d;border:1px solid rgba(201,168,76,0.2);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:36px 32px;">
        <p style="margin:0 0 4px;color:#C9A84C;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Compromiso Legal</p>
        <h1 style="margin:0 0 16px;font-size:24px;line-height:1.2;">Hola ${nombre}, aquí tienes tu recurso 👋</h1>
        <p style="margin:0 0 20px;color:rgba(255,255,255,0.7);font-size:15px;line-height:1.6;">
          Gracias por confiar en nosotros. Como te prometimos, aquí tienes
          <strong style="color:#C9A84C;">${recurso}</strong>.
        </p>
        <a href="https://compromisolegal.es" style="display:inline-block;background:#C9A84C;color:#000;text-decoration:none;font-weight:bold;padding:14px 28px;border-radius:999px;font-size:15px;">
          Descargar mi recurso
        </a>
        <p style="margin:28px 0 0;color:rgba(255,255,255,0.5);font-size:13px;line-height:1.6;">
          ¿Tienes dudas sobre tu caso concreto? Escríbenos por WhatsApp al
          <a href="https://wa.me/34640664875" style="color:#C9A84C;">640 664 875</a>
          y te ayudamos personalmente.
        </p>
      </td></tr>
      <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);font-size:12px;">
        Compromiso Legal · C/ Manzanares 35, A · Bolaños de Calatrava (Ciudad Real)<br/>
        Recibes este email porque solicitaste un recurso en nuestra web.
      </td></tr>
    </table>
  </body>
</html>`;
}
