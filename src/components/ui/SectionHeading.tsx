import { motion } from "framer-motion";
import { Eyebrow } from "./Button";
import { blurReveal, staggerContainer, viewportOnce } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={staggerContainer(0.12)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={cn(
        "flex max-w-2xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className
      )}
    >
      <motion.div variants={blurReveal}>
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>
      <motion.h2
        variants={blurReveal}
        className={cn(
          "text-balance text-4xl font-normal leading-[1.02] tracking-tightest sm:text-[3.25rem]",
          tone === "dark" ? "text-bone" : "text-ink"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={blurReveal}
          className={cn(
            "max-w-xl text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-bone/55" : "text-ink/60"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
