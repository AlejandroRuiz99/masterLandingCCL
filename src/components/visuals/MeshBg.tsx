import { MeshGradient } from "@paper-design/shaders-react";
import type { PaperShaderElement } from "@paper-design/shaders";
import { cn } from "@/lib/utils";
import { useInViewShader } from "@/lib/usePauseOffscreen";

/**
 * Fondo metálico vivo (WebGL). Negro cálido con vetas doradas en movimiento muy lento.
 * - Lleva un degradado CSS detrás como fallback si WebGL no está disponible.
 * - maxPixelCount limita la resolución del buffer (un degradado suave no se nota
 *   a menor resolución, pero en retina ahorra hasta 4× de píxeles).
 * - Se pausa cuando el hero sale de viewport.
 */
export function MeshBg({ className }: { className?: string }) {
  const { ref, inView } = useInViewShader<PaperShaderElement>();

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 70% 0%, #2a251a 0%, #121009 38%, #0b0a07 72%)",
        }}
      />
      <MeshGradient
        ref={ref}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        colors={["#0b0a07", "#1c1810", "#6b551f", "#c9a84c", "#0b0a07"]}
        distortion={0.85}
        swirl={0.32}
        speed={inView ? 0.28 : 0}
        grainOverlay={0.14}
        grainMixer={0.2}
        scale={1.1}
        minPixelRatio={1}
        maxPixelCount={1_500_000}
      />
    </div>
  );
}
