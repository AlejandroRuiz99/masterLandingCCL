import { LiquidMetal } from "@paper-design/shaders-react";
import type { PaperShaderElement } from "@paper-design/shaders";
import { cn } from "@/lib/utils";
import { useInViewShader } from "@/lib/usePauseOffscreen";

/**
 * Orbe de oro líquido (WebGL), sin aros ni biseles. El emblema CL emerge sobre
 * un centro oscurecido de forma suave, integrado de manera orgánica.
 * Resolución capada y pausado cuando sale de viewport.
 */
export function LiquidSeal({ className }: { className?: string }) {
  const { ref, inView } = useInViewShader<PaperShaderElement>();

  return (
    <div
      className={cn("relative aspect-square", className)}
      style={{
        WebkitMaskImage:
          "radial-gradient(circle, #000 calc(50% - 2px), transparent 50%)",
        maskImage: "radial-gradient(circle, #000 calc(50% - 2px), transparent 50%)",
      }}
    >
      {/* Fallback si WebGL no carga */}
      <div
        className="absolute inset-0 rounded-full"
        style={{ background: "radial-gradient(circle at 38% 30%, #d8c184, #806329 75%)" }}
      />

      {/* Oro líquido calmado */}
      <LiquidMetal
        ref={ref}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        shape="circle"
        colorBack="rgba(11,10,7,0)"
        colorTint="#c9a84c"
        repetition={2.5}
        softness={0.7}
        shiftRed={0.04}
        shiftBlue={0.04}
        distortion={0.05}
        contour={1}
        speed={inView ? 0.32 : 0}
        scale={0.94}
        minPixelRatio={1}
        maxPixelCount={360_000}
      />

      {/* Centro oscurecido suave para que el emblema lea, sin aro duro */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(9,8,5,0.92) 18%, rgba(9,8,5,0.5) 34%, transparent 50%)",
        }}
      />

      {/* Emblema CL nítido emergiendo del centro */}
      <img
        src="/isotipo-cl.png"
        alt="Compromiso Legal"
        className="absolute left-1/2 top-1/2 w-[44%] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1px_5px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}
