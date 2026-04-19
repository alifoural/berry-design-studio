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
    <div className="relative overflow-hidden border-y border-border bg-background/50 py-6">
      <div className="flex w-max gap-12 marquee">
        {[...tags, ...tags].map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-3xl font-semibold"
          >
            <span className="text-foreground/70">{t}</span>
            <span className="h-2 w-2 rounded-full bg-gradient-berry" />
          </div>
        ))}
      </div>
    </div>
  );
}
