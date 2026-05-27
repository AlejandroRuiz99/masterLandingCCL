import { useEffect, useRef, useState } from "react";

/**
 * Cursor editorial sin lag.
 * - El PUNTO escribe su transform directamente en el handler de mousemove
 *   (una vez por frame de input), así nunca se retrasa respecto al ratón real,
 *   aunque el hilo principal esté ocupado con los shaders WebGL.
 * - El ANILLO sigue con retardo suave mediante un lerp en requestAnimationFrame.
 * Sin framer-motion para la posición: cero coste de reconciliación por frame.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let active = false;
    let visible = false;
    let raf = 0;

    const paintDot = () => {
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${active ? 0 : 1})`;
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      paintDot(); // posición exacta e inmediata
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = active ? "0.9" : "0.5";
      }
      const target = e.target as HTMLElement | null;
      const nowActive = !!target?.closest("a, button, [data-cursor]");
      if (nowActive !== active) {
        active = nowActive;
        ring.style.width = active ? "56px" : "30px";
        ring.style.height = active ? "56px" : "30px";
        ring.style.opacity = active ? "0.9" : "0.5";
        paintDot();
      }
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[200]"
      style={{ mixBlendMode: "difference" }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-bone will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-bone will-change-transform"
        style={{
          width: 30,
          height: 30,
          opacity: 0,
          transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
        }}
      />
    </div>
  );
}
