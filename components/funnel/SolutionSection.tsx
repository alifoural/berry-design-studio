import { Reveal } from "@/components/site/Reveal";
import { XCircle, CheckCircle2 } from "lucide-react";

const differentiators = [
  "Qatar-Specific Strategy",
  "Full Copywriting Included",
  "You Own It — No Monthly Fees",
];

const beforeItems = [
  "Outdated design",
  "Missing information",
  "Breaks on mobile",
  "Not on Google",
  "No inquiry form",
];

const afterItems = [
  "Professional & credible",
  "Every question answered",
  "Perfect on all devices",
  "Ranking on Google",
  "Inquiry form + WhatsApp",
];

export default function SolutionSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            The Fix
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-4xl">
            A Website That Works Like Your Best{" "}
            <span className="text-gradient-berry">Admissions Officer</span> — 24 Hours
            a Day
          </h2>
        </Reveal>

        {/* Paragraphs */}
        <Reveal delay={0.16}>
          <p className="text-lg text-muted-foreground max-w-2xl mb-4 leading-relaxed">
            Berry Design Studio builds websites specifically for schools and nurseries
            in Qatar. Not templates. Not generic designs. A site engineered to answer
            parent questions, build trust fast, and convert visits into inquiries.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            We know what parents in Qatar look for before they pick up the phone. We
            build that into every page.
          </p>
        </Reveal>

        {/* Differentiator pills */}
        <Reveal delay={0.32}>
          <div className="flex flex-wrap gap-3 mb-16">
            {differentiators.map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium"
              >
                {pill}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Before / After card */}
        <Reveal delay={0.4}>
          <div className="relative rounded-3xl border border-border overflow-hidden p-8 sm:p-12">
            {/* Aurora overlay */}
            <div
              aria-hidden="true"
              className="bg-gradient-aurora absolute inset-0 opacity-10 pointer-events-none"
            />

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-10">

              {/* Before */}
              <div>
                <p className="font-display text-xl font-bold text-red-500 mb-6 flex items-center gap-2">
                  <XCircle className="w-5 h-5" /> Before
                </p>
                <ul className="space-y-3">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <XCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* After */}
              <div>
                <p className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-purple-500" />
                  <span className="text-gradient-berry">After</span>
                </p>
                <ul className="space-y-3">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-purple-500" />
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
