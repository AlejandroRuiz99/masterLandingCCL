/** Datos de negocio reales — extraídos de compromisolegal.es */
export const site = {
  name: "Compromiso Legal",
  tagline: "Tu despacho de confianza, cerca de ti estés donde estés.",
  contact: {
    address: "C/ Manzanares 35, A. Bolaños de Calatrava, Ciudad Real 13260",
    email: "info@compromisolegal.es",
    phone: "+34 640 664 875",
    phoneRaw: "34640664875",
    hours: "L–J 9:00–14:00 / 16:30–18:30 · V 9:00–14:00",
  },
  social: {
    web: "https://compromisolegal.es",
    whatsapp: "https://wa.me/34640664875",
    tiktok: "https://www.tiktok.com/@compromisolegal",
    instagram: "https://www.instagram.com/compromiso_legal",
    telegram: "https://t.me/compromisolegal",
  },
} as const;

export const whatsappMessage =
  "¡Hola! Vengo desde vuestra página de recursos y me gustaría que me ayudaseis con una consulta.";

export const whatsappUrl = `${site.social.whatsapp}?text=${encodeURIComponent(
  whatsappMessage
)}`;
