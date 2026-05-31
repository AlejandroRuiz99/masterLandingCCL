import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { SectionHeading } from "../ui/SectionHeading";
import { Modal } from "../ui/Modal";
import { LeadForm } from "../LeadForm";
import { resources, type Resource } from "@/data/resources";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Layout bento: el modelo descargable ocupa toda la fila y las dos herramientas debajo.
const spans = ["lg:col-span-6", "lg:col-span-3", "lg:col-span-3"];

export function Resources() {
  const [selected, setSelected] = useState<Resource | null>(null);

  return (
    <section id="recursos" className="relative bg-ink py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Biblioteca gratuita"
          title={
            <>
              Guías que resuelven <span className="accent">dudas reales</span>
            </>
          }
          subtitle="Escritas por abogados en lenguaje claro. Elige la tuya y la recibes gratis en tu correo."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-6"
        >
          {resources.map((r, i) => {
            const wide = !spans[i]?.includes("span-2");
            return (
              <motion.button
                key={r.id}
                variants={blurReveal}
                onClick={() => setSelected(r)}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                className={cn(
                  "grain group relative flex flex-col overflow-hidden rounded-2xl border border-gold/12 bg-ink-800 p-7 text-left transition-colors duration-500 hover:border-gold/40",
                  spans[i]
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <r.icon className="h-7 w-7 text-gold" strokeWidth={1.5} />
                  <span className="text-[11px] uppercase tracking-wider text-bone/35">
                    {r.format}
                  </span>
                </div>

                <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-gold/80">
                  {r.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-normal leading-snug text-bone transition-colors group-hover:text-gold-pale">
                  {r.title}
                </h3>
                <p className="mt-3 max-w-md text-pretty text-sm leading-relaxed text-bone/50">
                  {r.description}
                </p>

                {wide && (
                  <ul className="mt-5 flex flex-col gap-2">
                    {r.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 text-sm text-bone/45"
                      >
                        <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-gold" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                <span className="mt-auto flex items-center gap-2 pt-7 text-sm font-medium text-gold">
                  {r.kind === "tool" ? "Acceder gratis" : "Descargar gratis"}
                  {r.kind === "download" ? (
                    <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  )}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)}>
        {selected && <LeadForm resource={selected} onDone={() => setSelected(null)} />}
      </Modal>
    </section>
  );
}
