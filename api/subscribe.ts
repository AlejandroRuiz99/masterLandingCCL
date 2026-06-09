import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

interface LeadBody {
  nombre?: string;
  apellidos?: string;
  email?: string;
  telefono?: string;
  tematica?: string;
  recurso?: string;
  consent?: boolean;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase env vars no configuradas");
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

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from("leads").insert({
    nombre,
    apellidos,
    email,
    telefono,
    tematica,
    recurso,
    consent,
    fuente: "LandingPage",
  });

  if (error) {
    console.error("Supabase insert error", error);
    return res.status(502).json({ error: "No se pudo guardar el lead" });
  }

  return res.status(200).json({ ok: true });
}
