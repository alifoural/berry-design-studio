import { Reveal } from "@/components/site/Reveal";
import {
  FileText,
  Lightbulb,
  Monitor,
  Search,
  Settings,
  Smartphone,
} from "lucide-react";

const services = [
  {
    icon: Lightbulb,
    title: "Strategy & Positioning",
    description:
      "Before we design anything, we define how your school is positioned and what Qatar parents in your area actually look for.",
    bullets: [
      "Market positioning",
      "Competitor analysis",
      "Parent persona mapping",
      "Key messaging",
    ],
  },
  {
    icon: Monitor,
    title: "Website Design & Development",
    description:
      "A fully custom website built in Next.js. Fast to load, built for SEO, and designed to convert. Not a WordPress theme.",
    bullets: [
      "Custom design — no templates",
      "Next.js / React",
      "Fast load time",
      "SEO-ready structure",
    ],
  },
  {
    icon: FileText,
    title: "Full Copywriting",
    description:
      "We write every word on your website. Headlines, program pages, CTAs — written to speak directly to Qatar parents.",
    bullets: [
      "All pages written for you",
      "Arabic homepage option",
      "Admissions copy",
      "Program descriptions",
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile Optimisation",
    description:
      "Your site is tested on every major device before launch. No broken menus. No tiny text. No frustrated parents.",
    bullets: [
      "All devices tested",
      "Mobile-first design",
      "Fast on 4G",
      "Touch-friendly",
    ],
  },
  {
    icon: Search,
    title: "SEO Foundation",
    description:
      "Every page is built so Google can find your school for searches like 'best nursery in Doha' or 'British curriculum school Qatar.'",
    bullets: [
      "Keyword targeting",
      "Meta & schema setup",
      "Google Search Console",
      "Sitemap submission",
    ],
  },
  {
    icon: Settings,
    title: "CMS + Training",
    description:
      "After launch, your team can update fees, photos, and news without calling us. We train you before handover.",
    bullets: [
      "Easy content editor",
      "1-hour staff training",
      "Update anything yourself",
      "No technical skills needed",
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            What We Build
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.1}>
          <h2 className="font-display text-center text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl mb-16">
            Everything Your School Website Needs.{" "}
            <span className="text-gradient-berry">Nothing It Doesn&apos;t.</span>
          </h2>
        </Reveal>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={0.1 + i * 0.07}>
                <div className="rounded-3xl border border-border bg-card p-6 h-full">
                  {/* Icon */}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-berry text-white mb-4">
                    <Icon className="h-5 w-5" />
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold mb-2">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Bullet list */}
                  <ul className="space-y-2">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center gap-2.5">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-berry" />
                        <span className="text-sm text-muted-foreground">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
