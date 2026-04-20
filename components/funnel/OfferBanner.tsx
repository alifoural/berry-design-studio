"use client";

import { Reveal } from "@/components/site/Reveal";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const included = [
  "Custom website design (not a template)",
  "All copywriting included",
  "Arabic homepage translation",
  "Mobile optimisation",
  "SEO foundation setup",
  "WhatsApp inquiry button",
  "Google Analytics setup",
  "Parent inquiry form",
  "CMS setup + staff training",
  "30-day post-launch support",
  "Google Business Profile setup",
  "90-day email support",
];

export function OfferBanner() {
  return (
    <section className="py-24 px-4">
      <div className="mx-auto max-w-4xl">
        <Reveal delay={0}>
          <div className="rounded-3xl bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 p-8 md:p-14 text-white overflow-hidden relative">
            {/* Background aurora overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-aurora opacity-20" />

            <div className="relative z-10 flex flex-col items-center text-center gap-8">
              {/* Top badge */}
              <Reveal delay={0.05}>
                <span className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/70">
                  🔥 Launch Offer — Limited to 10 Schools
                </span>
              </Reveal>

              {/* Price */}
              <Reveal delay={0.1}>
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <p className="font-display text-7xl md:text-9xl font-bold text-white leading-none">
                      QAR 799
                    </p>
                  </motion.div>
                  <div className="flex items-center gap-1 flex-wrap justify-center mt-2">
                    <span className="line-through text-white/40 text-2xl">
                      QAR 1,700
                    </span>
                    <span className="text-green-400 ml-3 text-xl font-semibold">
                      Save QAR 901
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* Subtitle */}
              <Reveal delay={0.15}>
                <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl">
                  Full Growth Package — Everything Included. First 10 schools only.
                </p>
              </Reveal>

              {/* Scarcity counter */}
              <Reveal delay={0.2}>
                <div className="flex flex-col items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: 10 }, (_, i) => (
                      <div
                        key={i}
                        className={`h-3 w-8 rounded-full ${
                          i < 8 ? "bg-white" : "bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm font-medium">
                    8 of 10 spots taken
                  </p>
                </div>
              </Reveal>

              {/* What's included */}
              <Reveal delay={0.25}>
                <div className="w-full">
                  <p className="text-white/60 text-xs uppercase tracking-widest font-semibold mb-4">
                    What&apos;s Included
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-left">
                    {included.map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Guarantee box */}
              <Reveal delay={0.3}>
                <div className="w-full rounded-2xl border border-white/20 p-4 text-center">
                  <p className="text-white/90 text-sm md:text-base">
                    🛡️{" "}
                    <span className="font-semibold">90-Day Guarantee:</span>{" "}
                    More inquiries than your current site — or we redesign for free.
                  </p>
                </div>
              </Reveal>

              {/* CTA button */}
              <Reveal delay={0.35}>
                <a
                  href="#audit-form"
                  className="inline-block rounded-full bg-white px-10 py-5 text-purple-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-200"
                >
                  Claim Your Spot — QAR 799
                </a>
              </Reveal>

              {/* Small text */}
              <Reveal delay={0.4}>
                <p className="text-white/50 text-sm">
                  No hidden fees. You own the website. Contract sent within 24 hours.
                </p>
              </Reveal>

              {/* Urgency line */}
              <Reveal delay={0.45}>
                <p className="text-white/60 text-sm font-medium">
                  This price ends when 10 slots are filled. Price will
                  return to QAR 1,700.
                </p>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
