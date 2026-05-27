import type { Variants, Transition } from "framer-motion";

/** Spring suave y natural, reutilizable en toda la landing. */
export const softSpring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.8,
};

/** Reveal con desenfoque — NO el típico fade. Entra desde abajo desenfocado. */
export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

/** Contenedor que escalona la entrada de sus hijos. */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Palabra del headline: sube desde abajo rotando en X (efecto 3D editorial). */
export const wordReveal: Variants = {
  hidden: { y: "110%", opacity: 0, rotateX: -40 },
  visible: {
    y: "0%",
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

/** Aparición simple con desplazamiento vertical. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const viewportOnce = { once: true, margin: "-80px" } as const;
