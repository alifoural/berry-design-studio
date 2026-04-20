import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export default function FinalCTA() {
  return (
    <section className="px-4 py-32 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
      <div className="mx-auto max-w-4xl flex flex-col items-center text-center gap-10">

        {/* Headline */}
        <Reveal delay={0}>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            Your Competitors Are Not Waiting
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.1}>
          <p className="text-white/70 text-lg sm:text-xl leading-relaxed max-w-2xl">
            Every month without a high-performing website is another month of enrolments
            going somewhere else. The audit is free. The call is 45 minutes. The risk is
            zero.
          </p>
        </Reveal>

        {/* Urgency callout */}
        <Reveal delay={0.18}>
          <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur px-6 py-4 text-white font-semibold text-sm sm:text-base">
            ⏳ 8 of 10 launch slots at QAR 799 are taken. When they&apos;re gone, the
            price returns to QAR 14,500.
          </div>
        </Reveal>

        {/* CTA buttons */}
        <Reveal delay={0.26}>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              href="#audit-form"
              className="bg-white text-purple-900 font-bold rounded-full shadow-xl px-10 py-5 text-base hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              Book Your Free Website Audit
            </Link>
            <Link
              href="https://wa.me/97431490766"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/40 text-white rounded-full px-10 py-5 text-base hover:bg-white/10 hover:-translate-y-0.5 transition-all"
            >
              WhatsApp Us Directly →
            </Link>
          </div>
        </Reveal>

        {/* Reassurance */}
        <Reveal delay={0.34}>
          <p className="text-white/50 text-sm">
            No sales pressure. No obligation. Just clarity on where your school stands.
          </p>
        </Reveal>

      </div>
    </section>
  );
}
