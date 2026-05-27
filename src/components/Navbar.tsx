import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Button } from "./ui/Button";
import { whatsappUrl } from "@/data/site";
import { scrollToId } from "@/lib/lenis";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={cn(
          "mx-auto flex max-w-[78rem] items-center justify-between px-6 transition-all duration-500 sm:px-10",
          scrolled
            ? "my-3 rounded-full border border-gold/15 bg-ink-900/95 py-2.5 backdrop-blur-md sm:px-6"
            : "my-5 border border-transparent py-2"
        )}
      >
        <a href="#top" className="flex items-center gap-3" aria-label="Compromiso Legal">
          <img
            src="/isotipo-cl.png"
            alt=""
            className="h-9 w-auto object-contain"
          />
          <span className="hidden font-display text-lg leading-none tracking-tight text-bone sm:block">
            Compromiso Legal
          </span>
        </a>

        <nav className="flex items-center gap-1.5">
          <button
            onClick={() => scrollToId("recursos")}
            className="hidden rounded-full px-4 py-2 text-sm text-bone/55 transition-colors hover:text-bone sm:block"
          >
            Recursos
          </button>
          <button
            onClick={() => scrollToId("comunidad")}
            className="hidden rounded-full px-4 py-2 text-sm text-bone/55 transition-colors hover:text-bone sm:block"
          >
            Comunidad
          </button>
          <Button size="md" onClick={() => window.open(whatsappUrl, "_blank")}>
            Escríbenos
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}
