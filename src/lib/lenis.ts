import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

/** Scroll suave a una sección, respetando la inercia de Lenis si está activa. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset: -16 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
