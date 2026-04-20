"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Zap, Search, Layers } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { useTranslations } from "next-intl";

const serviceIcons = [Sparkles, Layers, Zap, Search];

const featured = [
  { title: "Lumen Studio", tag: "Brand · Web", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit Commerce", tag: "E-commerce · Next.js", color: "from-pink-500 to-rose-600" },
  { title: "North Atlas", tag: "SaaS · Marketing", color: "from-violet-500 to-indigo-600" },
  { title: "Field Notes", tag: "Editorial · CMS", color: "from-rose-500 to-fuchsia-600" },
];

export function HomePage() {
  const t = useTranslations("home");

  const heroWords = [t("heroWord0"), t("heroWord1"), t("heroWord2"), t("heroWord3")];

  const services = [
    { icon: serviceIcons[0], title: t("service0Title"), desc: t("service0Desc") },
    { icon: serviceIcons[1], title: t("service1Title"), desc: t("service1Desc") },
    { icon: serviceIcons[2], title: t("service2Title"), desc: t("service2Desc") },
    { icon: serviceIcons[3], title: t("service3Title"), desc: t("service3Desc") },
  ];

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
            {t("badge")}
          </motion.div>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] md:text-7xl lg:text-8xl">
            {heroWords.map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="mr-3 rtl:mr-0 rtl:ml-3 inline-block"
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
              {t("heroHighlight")}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="mx-auto mt-8 max-w-xl text-base text-muted-foreground md:text-lg"
          >
            {t("heroPara")}
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
              {t("heroCta1")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-border glass px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-secondary"
            >
              {t("heroCta2")}
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
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("servicesLabel")}</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  {t("servicesHeading")}<br />
                  <span className="text-gradient-berry">{t("servicesHeadingHighlight")}</span>
                </h2>
              </div>
              <Link
                href="/services"
                className="hidden items-center gap-1 text-sm font-semibold hover:text-gradient-berry md:inline-flex"
              >
                {t("servicesLink")} <ArrowUpRight className="h-4 w-4" />
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
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("featuredLabel")}</p>
                <h2 className="mt-3 font-display text-4xl font-bold md:text-6xl">
                  {t("featuredHeading")} <span className="text-gradient-berry">{t("featuredHeadingHighlight")}</span>
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
                {t("ctaHeading")} <br />
                <span className="text-gradient-berry">{t("ctaHeadingHighlight")}</span>
              </h2>
              <p className="relative mx-auto mt-6 max-w-md text-muted-foreground">
                {t("ctaPara")}
              </p>
              <Link
                href="/contact"
                className="relative mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-berry px-8 py-4 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                {t("ctaBtn")} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
