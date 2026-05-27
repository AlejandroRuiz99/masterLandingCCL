import { forwardRef, useRef, type ButtonHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-ink font-semibold hover:bg-gold-pale shadow-[0_8px_30px_-12px_rgba(201,168,76,0.6)]",
  secondary:
    "border border-bone/25 text-bone hover:border-gold hover:text-gold",
  ghost: "text-bone/60 hover:text-bone",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-[3.4rem] px-8 text-[0.95rem]",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", magnetic = false, children, ...props },
    ref
  ) => {
    const localRef = useRef<HTMLButtonElement | null>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 250, damping: 18 });
    const sy = useSpring(y, { stiffness: 250, damping: 18 });

    function handleMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (!magnetic) return;
      const el = localRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      x.set(relX * 0.25);
      y.set(relY * 0.35);
    }

    function reset() {
      x.set(0);
      y.set(0);
    }

    return (
      <motion.button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }}
        style={magnetic ? { x: sx, y: sy } : undefined}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-full transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold/60 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

/** Etiqueta de sección dorada con punto pulsante. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-gold">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
      </span>
      {children}
    </span>
  );
}
