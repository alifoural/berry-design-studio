import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Zap, Search } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, web design, Next.js development, and SEO. End-to-end services for ambitious brands.",
  openGraph: {
    title: "Services — BerryDesign",
    description: "Brand, web design, Next.js development, and SEO under one roof.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/services" },
};

const services = [
  {
    icon: Sparkles,
    title: "Brand & Identity",
    desc: "Logos, type systems, and visual languages that hold up across every touchpoint.",
    items: ["Logo & wordmark", "Type & color system", "Brand guidelines", "Launch assets"],
  },
  {
    icon: Layers,
    title: "Web Design",
    desc: "Editorial, motion-rich layouts designed in Figma and prototyped to feel.",
    items: ["UX strategy", "Wireframes", "High-fidelity design", "Design system"],
  },
  {
    icon: Zap,
    title: "Next.js Development",
    desc: "Production-grade React + Next.js builds. Static, fast, accessible.",
    items: ["Next.js 16 / SSG", "Sanity / Cloud CMS", "Animations (Framer)", "CI / Vercel"],
  },
  {
    icon: Search,
    title: "SEO & Content",
    desc: "Technical SEO baked in, plus content systems that compound over time.",
    items: ["Technical SEO", "Schema / OpenGraph", "Content strategy", "Analytics setup"],
  },
];

export default function ServicesPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Services</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            What we <span className="text-gradient-berry">do</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            We work across brand, design, and engineering — usually together.
            Below is what an engagement typically looks like.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-berry hover:shadow-glow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground">
                  <s.icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              Need something <span className="text-gradient-berry">custom?</span>
            </h2>
            <p className="max-w-md text-muted-foreground">
              Most projects we take on don&apos;t fit a tidy box. Tell us what
              you&apos;re thinking and we&apos;ll figure it out together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Get in touch <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}