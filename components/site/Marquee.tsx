const tags = [
  "Web Design",
  "Brand Identity",
  "Next.js",
  "SEO",
  "UI / UX",
  "Motion",
  "Strategy",
  "E-commerce",
  "Case Studies",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-background/50 py-4">
      <div className="flex w-max gap-16 marquee">
        {[...tags, ...tags].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-16 font-display text-2xl font-semibold leading-none"
          >
            <span className="text-foreground/70 whitespace-nowrap">{t}</span>
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-berry" />
          </div>
        ))}
      </div>
    </div>
  );
}
