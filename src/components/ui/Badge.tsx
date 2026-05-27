import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  shimmer?: boolean;
}

export function Badge({ children, className, shimmer = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-gold/25 bg-gold/5 px-3 py-1 text-xs font-medium text-gold",
        shimmer && "shimmer-line",
        className
      )}
    >
      {children}
    </span>
  );
}
