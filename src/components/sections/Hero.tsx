import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "../ui/Button";
import { WhatsAppIcon } from "../ui/icons";
import { MeshBg } from "../visuals/MeshBg";
import { LiquidSeal } from "../visuals/LiquidSeal";
import { staggerContainer, wordReveal } from "@/lib/animations";
import { scrollToId } from "@/lib/lenis";
import { whatsappUrl } from "@/data/site";

const line1 = ["Saber", "es", "tu"];
const line2 = ["mejor", "defensa."];

function Word({ children, accent }: { children: string; accent?: boolean }) {
  return (
    <span className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span
        variants={wordReveal}
        className={accent ? "accent inline-block" : "inline-block"}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32"
    >
      <MeshBg />
      {/* Desvanecido inferior hacia el negro para continuidad con la siguiente sección */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="container-page relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Columna de texto */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.1 }}
              className="mb-8 flex items-center gap-4"
            >
              <span className="h-px w-12 bg-gold/60" />
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-bone/55">
                Compromiso Legal · Recursos
              </span>
            </motion.div>

            <motion.h1
              variants={staggerContainer(0.08, 0.25)}
              initial="hidden"
              animate="visible"
              className="text-[3.4rem] font-light leading-[0.95] tracking-tightest text-bone sm:text-7xl lg:text-[5.4rem]"
            >
              <span className="block">
                {line1.map((w) => (
                  <Word key={w}>{w}</Word>
                ))}
              </span>
              <span className="block">
                {line2.map((w) => (
                  <Word key={w} accent>
                    {w}
                  </Word>
                ))}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 max-w-md text-pretty text-lg leading-relaxed text-bone/60"
            >
              Recursos gratuitos sobre extranjería, pensiones, trabajo y Seguridad
              Social: guías, calculadoras y respuestas claras. Sin letra pequeña.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button size="lg" magnetic onClick={() => scrollToId("recursos")}>
                Ver los recursos
                <ArrowDown className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                onClick={() => window.open(whatsappUrl, "_blank")}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Hablar por WhatsApp
              </Button>
            </motion.div>
          </div>

          {/* Medallón de oro líquido */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-[68%] max-w-xs lg:col-span-5 lg:w-full lg:max-w-none"
          >
            <LiquidSeal />
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Desliza
        </span>
        <motion.span
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-gold/70 to-transparent"
        />
      </motion.div>
    </section>
  );
}
