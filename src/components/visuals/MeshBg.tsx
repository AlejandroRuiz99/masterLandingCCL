import { cn } from "@/lib/utils";

/**
 * Fondo del hero: degradado CSS rico y ESTÁTICO (coste por frame = 0).
 *
 * Antes era un shader WebGL a pantalla completa (MeshGradient). En equipos con
 * GPU modesta ese fragment shader (distorsión + swirl + grano sobre todo el
 * viewport, cada frame) saturaba el compositor y hacía que hasta el marquee y
 * los reveals fueran a tirones. La pieza WebGL viva se mantiene solo en el
 * medallón (LiquidSeal), que es pequeña y se pausa fuera de viewport.
 */
export function MeshBg({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      {/* Base cálida con caída a negro */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 95% at 72% 8%, #3a3016 0%, #221c10 30%, #12100a 55%, #0b0a07 80%)",
        }}
      />
      {/* Halo dorado superior derecho (profundidad) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 82% 18%, rgba(201,168,76,0.30) 0%, rgba(201,168,76,0.07) 38%, transparent 64%)",
        }}
      />
      {/* Veladura inferior izquierda para contraste del texto */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 0% 100%, rgba(5,5,3,0.7) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
