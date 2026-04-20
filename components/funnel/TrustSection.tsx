import { GraduationCap, MapPin, FileCheck, Award, Star } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

const trustPoints = [
  {
    icon: GraduationCap,
    title: "We Specialise in Schools",
    description:
      "We don't build restaurant websites or e-commerce stores. Schools and educational institutions only — that focus makes us better at it.",
  },
  {
    icon: MapPin,
    title: "We're Based in Qatar",
    description:
      "Not a remote agency guessing at local culture. We know Ramadan intake cycles, dual-language expectations, and why WhatsApp integration is non-negotiable here.",
  },
  {
    icon: FileCheck,
    title: "Fixed Contracts. No Surprises.",
    description:
      "Clear scope, fixed timeline, fixed price. What you sign is what you pay. No scope creep, no hidden fees.",
  },
  {
    icon: Award,
    title: "You Own Everything",
    description:
      "Every file, every page, every image. Delivered to you on launch day. No monthly platform fees, no ransom if you want to leave.",
  },
];

const stats = [
  { value: "4 Weeks", label: "Average Time to Launch" },
  { value: "Qatar Market", label: "Specialists Only" },
  { value: "100%", label: "Client Ownership" },
];

export default function TrustSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Why Us
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-16 max-w-3xl">
            Why Schools in Qatar{" "}
            <span className="text-gradient-berry">Work With Us</span>
          </h2>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">

          {/* Left: Trust points */}
          <div className="flex flex-col gap-8">
            {trustPoints.map(({ icon: Icon, title, description }, i) => (
              <Reveal key={title} delay={0.08 + i * 0.08}>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="bg-gradient-berry rounded-2xl w-11 h-11 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Right: Testimonial card */}
          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-border bg-card p-8 relative overflow-hidden shadow-glow">
              {/* Aurora gradient overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-3xl opacity-20"
                style={{
                  background:
                    "linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #06b6d4 100%)",
                }}
              />

              <div className="relative z-10 flex flex-col gap-6">
                {/* Quote mark */}
                <div className="text-5xl font-display text-gradient-berry leading-none select-none">
                  &ldquo;
                </div>

                <p className="text-base leading-relaxed font-medium">
                  Before the new website, most of our enrolment inquiries came through
                  parent referrals. Within 6 weeks of launch, we were getting 4–6 online
                  inquiries per week. The admissions team noticed immediately.
                </p>

                <div className="flex flex-col gap-3">
                  <p className="text-sm text-muted-foreground font-medium">
                    — School Director, Private School in Doha
                  </p>

                  {/* 5 stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400"
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Stats row */}
        <Reveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-3xl border border-border bg-card p-6 flex flex-col items-center text-center gap-2 hover:shadow-glow hover:-translate-y-0.5 transition-all"
              >
                <span className="font-display text-2xl font-bold text-gradient-berry">
                  {value}
                </span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
