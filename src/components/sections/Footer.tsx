import { MapPin, Mail, Phone, Clock, Globe, Instagram } from "lucide-react";
import { TikTokIcon, TelegramIcon, WhatsAppIcon } from "../ui/icons";
import { site, whatsappUrl } from "@/data/site";

const socials = [
  { icon: WhatsAppIcon, href: whatsappUrl, label: "WhatsApp" },
  { icon: TikTokIcon, href: site.social.tiktok, label: "TikTok" },
  { icon: Instagram, href: site.social.instagram, label: "Instagram" },
  { icon: TelegramIcon, href: site.social.telegram, label: "Telegram" },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden border-t border-gold/12 bg-ink-900">
      <div className="container-page relative z-10 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img
                src="/isotipo-cl.png"
                alt=""
                className="h-12 w-auto object-contain"
              />
              <span className="font-display text-xl leading-none tracking-tight text-bone">
                Compromiso Legal
              </span>
            </div>
            <p className="mt-6 max-w-xs text-pretty leading-relaxed text-bone/50">
              {site.tagline}
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-bone/12 text-bone/55 transition-all hover:border-gold/50 hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Contacto
            </h4>
            <ul className="mt-5 flex flex-col gap-4 text-sm text-bone/55">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                {site.contact.address}
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-gold/70" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-bone">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-gold/70" />
                <a href={`tel:+${site.contact.phoneRaw}`} className="hover:text-bone">
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" />
                {site.contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-gold">
              Despacho
            </h4>
            <ul className="mt-5 flex flex-col gap-3 text-sm text-bone/55">
              <li>
                <a
                  href={site.social.web}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-bone"
                >
                  <Globe className="h-4 w-4 text-gold/70" />
                  Visita nuestra web
                </a>
              </li>
              <li>
                <a
                  href={`${site.social.web}/politica-de-privacidad`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-bone"
                >
                  Política de privacidad
                </a>
              </li>
              <li>
                <a
                  href={`${site.social.web}/aviso-legal`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-bone"
                >
                  Aviso legal
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-bone/8 pt-6 text-xs text-bone/35 sm:flex-row">
          <span>
            © {new Date().getFullYear()} Compromiso Legal. Todos los derechos
            reservados.
          </span>
          <span>Bolaños de Calatrava, Ciudad Real. Atención telemática nacional.</span>
        </div>
      </div>
    </footer>
  );
}
