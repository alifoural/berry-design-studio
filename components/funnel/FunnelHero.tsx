"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

export default function FunnelHero() {
  return (
    <>
      {/* Sticky urgency bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-berry text-white text-center text-sm py-2 px-4">
        🎓 Launch Offer: Full website package for QAR 799 (normally QAR 1,700) — First 10 schools only · 8 spots left
      </div>

      {/* Hero section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-32 pb-24">

        {/* Decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #a855f7 0%, #ec4899 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #ec4899 0%, #a855f7 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(ellipse, #a855f7 0%, transparent 70%)" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl flex flex-col items-center text-center gap-8">

          {/* Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-5 py-2 text-sm font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-purple-500" />
              </span>
              Limited Offer · Only 10 Spots at QAR 799
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
          >
            Your School's Website Is{" "}
            <span className="text-gradient-berry">Losing You Enrolments</span>{" "}
            Every Month
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
          >
            Parents in Qatar judge your school in 8 seconds. If your website looks
            outdated, loads slowly, or doesn't answer their questions — they call your
            competitor instead.
          </motion.p>

          {/* Offer card */}
          <motion.div
            custom={0.28}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="w-full max-w-lg rounded-2xl border-2 border-violet-500 bg-card/80 backdrop-blur-sm p-6 shadow-glow flex flex-col items-center gap-3"
          >
            <p className="text-xs font-bold uppercase tracking-widest text-violet-400">
              🔥 Launch Offer — First 10 Schools Only
            </p>
            <div className="flex items-baseline gap-3">
              <span className="font-display text-5xl font-bold text-gradient-berry">QAR 799</span>
              <span className="text-xl text-muted-foreground line-through">QAR 1,700</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Full Growth Package — professional bilingual website, SEO, copywriting & 30-day support.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              8 of 10 spots remaining
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            custom={0.38}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center"
          >
            <Link
              href="#audit-form"
              className="bg-gradient-berry text-white font-bold rounded-full px-10 py-4 text-base shadow-glow hover:opacity-90 transition-all hover:-translate-y-0.5"
            >
              Claim QAR 799 Offer →
            </Link>
            <Link
              href="#pricing"
              className="glass border border-border font-semibold rounded-full px-8 py-4 text-base hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              See All Packages
            </Link>
          </motion.div>

          {/* Trust stats */}
          <motion.div
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 pt-4 w-full"
          >
            {[
              { stat: "48hr", label: "Audit Delivered" },
              { stat: "4 Weeks", label: "To Live Website" },
              { stat: "QAR 799", label: "First 10 Schools Only" },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <span className="font-display text-3xl font-bold text-gradient-berry">
                  {stat}
                </span>
                <span className="text-sm text-muted-foreground">{label}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  );
}
