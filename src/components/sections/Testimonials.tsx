import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";

// NOTA: testimonios de ejemplo. Sustituir por reseñas reales antes de publicar.
const featured = {
  quote:
    "Tenía un lío enorme con el arraigo y la guía me aclaró en diez minutos lo que llevaba meses sin entender. Acabé poniendo mi caso en sus manos.",
  name: "Lucía M.",
  context: "Trámite de extranjería",
};

const others = [
  {
    quote:
      "Me despidieron y no sabía por dónde empezar. Vi que tenía caso y me ayudaron enseguida. Muy cercanos.",
    name: "Andrés R.",
    context: "Despido improcedente",
  },
  {
    quote:
      "Explican en cristiano, sin tecnicismos. Por fin entendí cómo se calculaba mi pensión.",
    name: "Carmen V.",
    context: "Jubilación",
  },
];

export function Testimonials() {
  return (
    <section className="relative bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Confían en nosotros"
          title="Empezaron con una duda gratis"
          subtitle="Y acabaron con su problema resuelto."
        />

        <motion.div
          variants={staggerContainer(0.14)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-12"
        >
          {/* Cita destacada */}
          <motion.figure
            variants={blurReveal}
            className="grain relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gold/15 bg-ink-800 p-9 lg:col-span-7"
          >
            <blockquote className="font-display text-2xl font-light italic leading-snug text-bone sm:text-[1.9rem]">
              “{featured.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-gold/15 font-display text-lg text-gold">
                {featured.name.charAt(0)}
              </span>
              <span>
                <span className="block font-medium text-bone">{featured.name}</span>
                <span className="block text-sm text-bone/45">{featured.context}</span>
              </span>
            </figcaption>
          </motion.figure>

          {/* Secundarias */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            {others.map((t) => (
              <motion.figure
                key={t.name}
                variants={blurReveal}
                className="flex flex-1 flex-col justify-between rounded-2xl border border-bone/10 bg-ink-800/60 p-7"
              >
                <blockquote className="text-pretty leading-relaxed text-bone/75">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5">
                  <span className="font-medium text-bone">{t.name}</span>
                  <span className="ml-2 text-sm text-bone/40">· {t.context}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
