import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { TikTokIcon, TelegramIcon } from "../ui/icons";
import { useCountUp } from "@/hooks/useCountUp";
import { site } from "@/data/site";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";

function Count({ value, suffix }: { value: number; suffix: string }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <span ref={ref} className="font-display text-5xl font-light text-bone">
      {animated.toLocaleString("es-ES")}
      <span className="text-gold">{suffix}</span>
    </span>
  );
}

export function Community() {
  return (
    <section id="comunidad" className="relative bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Únete a la comunidad"
          title={
            <>
              Cada semana, algo que <span className="accent">deberías saber</span>
            </>
          }
          subtitle="Novedades legales, cambios de normativa y consejos prácticos. Gratis, en el canal que prefieras."
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          <motion.a
            variants={blurReveal}
            href={site.social.tiktok}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-gold/12 bg-ink-800 p-8 transition-colors hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-bone p-3 text-ink">
                <TikTokIcon className="h-full w-full" />
              </div>
              <ArrowUpRight className="h-6 w-6 text-bone/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <div>
              <Count value={100} suffix="K" />
              <p className="mt-2 text-sm text-bone/45">Seguidores en TikTok</p>
              <p className="mt-5 max-w-sm text-pretty leading-relaxed text-bone/60">
                Casos reales explicados en un minuto. La forma más rápida de saber
                si tu situación tiene salida.
              </p>
            </div>
          </motion.a>

          <motion.a
            variants={blurReveal}
            href={site.social.telegram}
            target="_blank"
            rel="noreferrer"
            className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-2xl border border-gold/12 bg-ink-800 p-8 transition-colors hover:border-gold/40"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-[#229ED9] p-3 text-bone">
                <TelegramIcon className="h-full w-full" />
              </div>
              <ArrowUpRight className="h-6 w-6 text-bone/30 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
            </div>
            <div>
              <Count value={500} suffix="" />
              <p className="mt-2 text-sm text-bone/45">El círculo más cercano</p>
              <p className="mt-5 max-w-sm text-pretty leading-relaxed text-bone/60">
                Un grupo reducido donde Miriam avisa de cambios de normativa, plazos
                clave y responde de tú a tú. Trato directo, no un canal más.
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
