import { motion } from "framer-motion";
import { Check, Play, Heart } from "lucide-react";
import { Eyebrow, Button } from "../ui/Button";
import { TikTokIcon } from "../ui/icons";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";
import { site } from "@/data/site";

const points = [
  "Abogada en ejercicio en extranjería, laboral y Seguridad Social",
  "Atención telemática: te ayudamos estés donde estés, sin desplazamientos",
  "Lenguaje claro, sin tecnicismos. Entiendes tu caso de verdad",
];

export function AboutMiriam() {
  return (
    <section id="miriam" className="grain relative bg-bone py-24 text-ink sm:py-32">
      <div className="container-page">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Retrato (placeholder para el futuro vídeo) */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            {/* Marco estilo TikTok. Suelta la captura real en public/miriam-tiktok.jpg */}
            <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[1.9rem] border border-ink/15 shadow-[0_40px_70px_-25px_rgba(0,0,0,0.55)]">
              {/* Placeholder (visible hasta que exista la foto real) */}
              <div className="absolute inset-0 bg-gradient-to-b from-ink-600 via-ink-800 to-ink-900" />
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/isotipo-cl.png"
                  alt=""
                  className="w-24 opacity-15"
                />
              </div>

              {/* Foto/captura real (sustituir el archivo) */}
              <img
                src="/miriam-tiktok.jpg"
                alt="Miriam en TikTok"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
                className="absolute inset-0 h-full w-full object-cover"
              />

              {/* Velos para legibilidad de la UI */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/40" />

              {/* Handle arriba */}
              <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-md">
                <TikTokIcon className="h-3.5 w-3.5 text-white" />
                <span className="text-xs font-medium text-white">@compromisolegal</span>
              </div>

              {/* Play central */}
              <div className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                <Play className="h-6 w-6 translate-x-0.5 fill-white text-white" />
              </div>

              {/* Acciones laterales tipo TikTok */}
              <div className="absolute bottom-24 right-3.5 flex flex-col items-center gap-4 text-white">
                <span className="flex flex-col items-center gap-1">
                  <Heart className="h-6 w-6 fill-white" />
                  <span className="text-[11px] font-medium">12,4K</span>
                </span>
                <span className="flex flex-col items-center gap-1">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink">
                    <TikTokIcon className="h-4 w-4" />
                  </span>
                </span>
              </div>

              {/* Pie con nombre y caption */}
              <div className="absolute inset-x-4 bottom-4 text-white">
                <p className="font-display text-lg leading-tight">Miriam Ruiz Acosta</p>
                <p className="mt-0.5 text-xs text-white/75">
                  Tus derechos, explicados claro
                </p>
              </div>
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-6 lg:col-span-7"
          >
            <motion.div variants={blurReveal}>
              <Eyebrow>La cara de Compromiso Legal</Eyebrow>
            </motion.div>
            <motion.h2
              variants={blurReveal}
              className="text-balance text-4xl font-normal leading-[1.04] tracking-tightest text-ink sm:text-[3.25rem]"
            >
              Detrás de cada guía hay{" "}
              <span className="accent">una abogada de verdad</span>
            </motion.h2>
            <motion.p
              variants={blurReveal}
              className="max-w-xl text-pretty text-lg leading-relaxed text-ink/60"
            >
              Miriam es la voz que miles de personas siguen para entender sus
              derechos. Estas guías nacen de las dudas reales que recibe cada día,
              explicadas con la misma cercanía.
            </motion.p>

            <motion.ul variants={staggerContainer(0.1)} className="mt-2 flex flex-col gap-3">
              {points.map((p) => (
                <motion.li
                  key={p}
                  variants={blurReveal}
                  className="flex items-start gap-3 text-ink/75"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold/20 text-gold-deep">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={blurReveal} className="mt-3">
              <Button size="lg" onClick={() => window.open(site.social.tiktok, "_blank")}>
                <TikTokIcon className="h-4 w-4" />
                Conoce a Miriam en TikTok
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
