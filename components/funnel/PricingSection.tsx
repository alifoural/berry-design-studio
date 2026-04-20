import { Reveal } from "@/components/site/Reveal";
import { Check } from "lucide-react";

const packages = [
  {
    name: "Essentials",
    price: "QAR 1,000",
    badge: "For Nurseries & Small Centres",
    description:
      "A professional, credible online presence that puts you ahead of 90% of nurseries in Qatar.",
    includes: [
      "Up to 5 pages",
      "Mobile-optimised design",
      "Basic SEO setup",
      "All copywriting",
      "Inquiry form + WhatsApp",
      "CMS setup",
      "14-day support",
    ],
    tag: "Best for: Nurseries under 100 students",
    highlight: false,
    ctaVariant: "outline" as const,
  },
  {
    name: "Growth",
    price: "QAR 1,700",
    badge: "Most Popular",
    description:
      "Built to rank on Google and convert parent visits into booked tours.",
    includes: [
      "Up to 10 pages",
      "Bilingual homepage (EN + AR)",
      "Advanced SEO + keyword targeting",
      "Conversion tracking",
      "Faculty & gallery pages",
      "Social media setup (2 platforms)",
      "30-day support",
      "Bonuses included",
    ],
    tag: "Best for: Schools with 100–400 students",
    highlight: true,
    ctaVariant: "filled" as const,
  },
  {
    name: "Authority",
    price: "QAR 2,500",
    badge: "Premium",
    description:
      "Your website becomes an institutional asset that signals you belong with Qatar's top schools.",
    includes: [
      "Unlimited pages",
      "Full bilingual site (EN + AR)",
      "Online application form",
      "Events calendar",
      "Advanced SEO strategy + 3-month content plan",
      "Priority 90-day support",
      "Quarterly review for 12 months",
    ],
    tag: "Best for: Premium schools 400+ students",
    highlight: false,
    ctaVariant: "outline" as const,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Pricing
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl mb-4">
            Three Packages.{" "}
            <span className="text-gradient-berry">One Right Fit</span> for Your
            School.
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.15}>
          <p className="text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-16">
            All packages include full copywriting, mobile optimisation, and CMS
            setup. No monthly fees. You own the site.
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={0.1 + i * 0.08}>
              <div
                className={`relative rounded-3xl border p-6 h-full flex flex-col ${
                  pkg.highlight
                    ? "border-2 border-violet-500 bg-card shadow-glow scale-105 z-10"
                    : "border-border bg-card"
                }`}
              >
                {/* Most Popular badge */}
                {pkg.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-block rounded-full bg-gradient-berry px-4 py-1.5 text-xs font-bold text-white shadow-glow whitespace-nowrap">
                      ⭐ Most Popular
                    </span>
                  </div>
                )}

                {/* Badge */}
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3 mt-2">
                  {pkg.badge}
                </p>

                {/* Name */}
                <h3 className="font-display text-2xl font-bold mb-1">
                  {pkg.name}
                </h3>

                {/* Price */}
                <p
                  className={`text-3xl font-bold mb-4 ${
                    pkg.highlight ? "text-gradient-berry" : ""
                  }`}
                >
                  {pkg.price}
                </p>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {pkg.description}
                </p>

                {/* Includes list */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-violet-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#audit-form"
                  className={`w-full text-center rounded-full py-3 px-6 font-semibold text-sm transition-all duration-200 ${
                    pkg.ctaVariant === "filled"
                      ? "bg-gradient-berry text-white shadow-glow hover:opacity-90 hover:scale-105"
                      : "border border-border text-foreground hover:bg-card hover:border-violet-500"
                  }`}
                >
                  Get Started
                </a>

                {/* Tag */}
                <p className="text-center text-xs text-muted-foreground mt-3">
                  {pkg.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Launch offer callout */}
        <Reveal delay={0.4}>
          <div className="mt-12 rounded-3xl bg-gradient-to-r from-violet-600 to-fuchsia-600 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left */}
              <div>
                <p className="font-display text-2xl md:text-3xl font-bold mb-1">
                  🔥 Launch Offer: Get the Growth Package for{" "}
                  <span className="underline decoration-white/50">QAR 799</span>{" "}
                  <span className="text-white/60 line-through text-xl font-normal">QAR 1,700</span>
                </p>
                <p className="text-white/70 text-base">
                  First 10 schools only. 8 spots remaining.
                </p>
              </div>

              {/* Right — CTA */}
              <a
                href="#audit-form"
                className="flex-shrink-0 inline-block rounded-full bg-white px-8 py-4 text-purple-900 font-bold text-base shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 whitespace-nowrap"
              >
                Claim QAR 799 Offer
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
