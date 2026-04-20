import { Reveal } from "@/components/site/Reveal";
import {
  TrendingUp,
  Shield,
  Star,
  Clock,
  CheckCircle,
  Key,
} from "lucide-react";

const benefits = [
  {
    icon: TrendingUp,
    title: "More Qualified Inquiries",
    description:
      "Parents arrive at your office already sold on your school. Your admissions team stops explaining basics and starts closing enrolments.",
  },
  {
    icon: Shield,
    title: "Parents Trust You Before They Meet You",
    description:
      "A professional website signals that your school is serious, established, and worth the fees. Trust starts online.",
  },
  {
    icon: Star,
    title: "Stand Out in a Crowded Market",
    description:
      "Private schools in Qatar compete for the same families. A distinctive website makes the choice obvious before the visit.",
  },
  {
    icon: Clock,
    title: "Parents Get Answers Instantly",
    description:
      "Curriculum. Timings. Fees. Admissions process. When parents get answers instantly, they call. When they have to search, they don't.",
  },
  {
    icon: CheckCircle,
    title: "Works on Every Device",
    description:
      "65% of parents in Qatar browse on mobile, often in evenings. Your site will be fast and functional on every screen.",
  },
  {
    icon: Key,
    title: "You Own It Completely",
    description:
      "No monthly 'website rental' fees. No agency holding your site hostage. Every file, every page, every word is yours from day one.",
  },
];

export default function BenefitsSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            What Changes
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-16 max-w-3xl">
            What Happens When Your Website{" "}
            <span className="text-gradient-berry">Actually Works</span>
          </h2>
        </Reveal>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="rounded-3xl border border-border bg-card p-6 flex flex-col gap-4 hover:-translate-y-1 hover:border-purple-400 hover:shadow-glow transition-all h-full">
                <div className="bg-gradient-berry rounded-2xl w-11 h-11 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
