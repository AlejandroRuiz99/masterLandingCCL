const items = [
  "Extranjería",
  "Nacionalidad",
  "Jubilaciones",
  "Pensiones",
  "Despidos",
  "Derecho Laboral",
  "Incapacidad",
  "Seguridad Social",
];

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-gold/12 bg-ink-800/60 py-5">
      <div className="flex shrink-0 animate-marquee items-center">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-7 font-display text-lg italic text-bone/45">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </div>
      <div
        className="flex shrink-0 animate-marquee items-center"
        aria-hidden
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="px-7 font-display text-lg italic text-bone/45">
              {item}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
