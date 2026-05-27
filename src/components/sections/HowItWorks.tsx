import { motion } from "framer-motion";
import { SectionHeading } from "../ui/SectionHeading";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";

const steps = [
  {
    n: "01",
    title: "Elige tu recurso",
    text: "Abre la guía que resuelve tu duda concreta, de extranjería a pensiones.",
  },
  {
    n: "02",
    title: "Déjanos tus datos",
    text: "Nombre, email y teléfono. Menos de treinta segundos, sin registros eternos.",
  },
  {
    n: "03",
    title: "Recíbelo al instante",
    text: "Te llega al correo al momento, listo para leer y aplicar a tu caso.",
  },
];

export function HowItWorks() {
  return (
    <section className="grain relative bg-bone py-24 text-ink sm:py-32">
      <div className="container-page">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Así de fácil"
              title={
                <>
                  Tu recurso, en <span className="accent">tres pasos</span>
                </>
              }
              subtitle="Sin llamadas comerciales ni trámites. Eliges, pides y lo tienes en tu correo."
            />
          </div>

          <motion.ol
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:col-span-7"
          >
            {steps.map((step, i) => (
              <motion.li
                key={step.n}
                variants={blurReveal}
                className={
                  "flex items-start gap-6 py-7 sm:gap-10" +
                  (i !== steps.length - 1 ? " border-b border-ink/10" : "")
                }
              >
                <span className="font-display text-4xl font-light leading-none text-gold-deep sm:text-5xl">
                  {step.n}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-2xl font-normal text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-pretty leading-relaxed text-ink/55">
                    {step.text}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
