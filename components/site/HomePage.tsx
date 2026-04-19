"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, Search, Layers } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";

const services = [
  { icon: Sparkles, title: "Brand & Identity", desc: "Visual systems with personality and rigor." },
  { icon: Layers, title: "Web Design", desc: "Editorial layouts, motion, and craft." },
  { icon: Zap, title: "Next.js Development", desc: "Fast, accessible, production-grade." },
  { icon: Search, title: "SEO & Content", desc: "Get found. Stay found. Convert." },
];

const featured = [
  { title: "Lumen Studio", tag: "Brand · Web", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit Commerce", tag: "E-commerce · Next.js", color: "from-pink-500 to-rose-600" },
  { title: "North Atlas", tag: "SaaS · Marketing", color: "from-violet-500 to-indigo-600" },
  { title: "Field Notes", tag: "Editorial · CMS", color: "from-rose-500 to-fuchsia-600" },
];

export function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-4">
        <div className="mx-auto max-w-6xl pt-16 pb-32 text-center md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gradient-berry" />
            Studio · Open for Q3
          </motion.div>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            {["We", "design", "websites", "that"].map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 inline-block"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block text-gradient-berry"
            >
              get found.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            BerryDesign is a small studio for brands that want to look serious
            on the web — fast, accessible, and built for SEO from the first pixel.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              Start a project
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              View our work
            </Link>
          </motion.div>

          <div className="pointer-events-none absolute left-[-10%] top-1/3 h-72 w-72 rounded-full bg-berry/30 blur-3xl animate-float" />
          <div
            className="pointer-events-none absolute right-[-10%] top-1/2 h-80 w-80 rounded-full bg-pink/30 blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>
      </section>

      <Marquee />

      {/* SERVICES */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">What we do</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  Four disciplines.<br />
                  <span className="text-gradient-berry">One outcome.</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1 text-sm font-semibold hover:text-gradient-berry md:inline-flex"
              >
                All services <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-berry hover:shadow-glow">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">Selected work</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  Recent <span className="text-gradient-berry">case studies</span>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {featured.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <Link
                  href="/portfolio"
                  className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
                >
                  <div className={`relative aspect-[4/3] bg-gradient-to-br ${p.color}`}>
                    <div className="absolute inset-0 bg-background/10 transition-opacity group-hover:opacity-0" />
                    <motion.div
                      className="absolute right-6 top-6 rounded-full bg-background/90 p-3"
                      whileHover={{ rotate: 45 }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </motion.div>
                  </div>
                  <div className="flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                      <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.tag}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-32">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-10 text-center md:p-20">
              <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-60" />
              <h2 className="relative font-display text-4xl font-bold md:text-6xl">
                Have a project <br />
                <span className="text-gradient-berry">in mind?</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-md text-muted-foreground">
                We take on a small number of projects each quarter. Tell us about
                yours — we usually reply within 24 hours.
              </p>
              <Link
                href="/contact"
                className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-berry px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Let&apos;s talk <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
