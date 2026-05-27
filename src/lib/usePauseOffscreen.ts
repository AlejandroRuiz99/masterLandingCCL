import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Observa un elemento y devuelve si está (cerca de) en viewport.
 * Se usa para poner speed={0} en los shaders de @paper-design cuando salen de
 * pantalla: con speed 0 la librería detiene el rAF por completo, así no gastan
 * GPU/CPU mientras el usuario está en otras secciones (y se reanudan al volver,
 * sin desmontar → cero "pop").
 */
export function useInViewShader<T extends Element>(): {
  ref: RefObject<T>;
  inView: boolean;
} {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "150px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, inView };
}
