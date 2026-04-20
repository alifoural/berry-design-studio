import { Reveal } from "@/components/site/Reveal";

const steps = [
  {
    number: 1,
    title: "Free Audit",
    time: "Day 0",
    description:
      "We review your current website, benchmark against 3 competitors, and send you a written report showing what's costing you enrolments.",
  },
  {
    number: 2,
    title: "Strategy Call",
    time: "Day 1–2",
    description:
      "A 45-minute call to align on your school's goals, target parent profile, and what success looks like. No obligation at this stage.",
  },
  {
    number: 3,
    title: "Design & Copy",
    time: "Week 1–2",
    description:
      "We design your website and write all the copy. You review, give feedback, and we refine. Maximum two revision rounds.",
  },
  {
    number: 4,
    title: "Development & Testing",
    time: "Week 3",
    description:
      "We build the final site, test every page on every device, and connect your domain, forms, and analytics.",
  },
  {
    number: 5,
    title: "Launch & Handover",
    time: "Week 4",
    description:
      "Your site goes live. We train your team on updating content. You receive all files and full ownership.",
  },
  {
    number: 6,
    title: "30-Day Support",
    time: "Post-launch",
    description:
      "Any issues after launch are fixed same-day for 30 days. No extra charge. You're not on your own.",
  },
];

export default function ProcessSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            How It Works
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-16 max-w-3xl">
            From First Call to{" "}
            <span className="text-gradient-berry">Live Website in 4 Weeks</span>
          </h2>
        </Reveal>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map(({ number, title, time, description }, i) => (
            <Reveal key={number} delay={0.08 * i}>
              <div className="rounded-3xl border border-border bg-card p-6 flex gap-5 hover:-translate-y-1 hover:border-purple-400 hover:shadow-glow transition-all h-full">
                {/* Number badge */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-berry flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{number}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-semibold text-base">{title}</h3>
                    <span className="border border-border rounded-full px-3 py-1 text-xs text-muted-foreground">
                      {time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
