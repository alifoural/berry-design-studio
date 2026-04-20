import { Reveal } from "@/components/site/Reveal";
import {
  AlertCircle,
  Smartphone,
  Search,
  MessageSquareOff,
  TrendingDown,
  Users,
} from "lucide-react";

const painPoints = [
  {
    icon: AlertCircle,
    title: "Parents Can't Find Basic Information",
    description:
      "Curriculum, fees, timings, and how to apply are buried or missing. Parents leave without calling.",
  },
  {
    icon: Smartphone,
    title: "Broken on Mobile",
    description:
      "80% of Qatar parents browse on their phones. If your site breaks on mobile, you lose them instantly.",
  },
  {
    icon: Search,
    title: "Google Can't Find You",
    description:
      "Parents searching 'nursery in Doha' or 'British curriculum school Qatar' never see your name.",
  },
  {
    icon: MessageSquareOff,
    title: "No Way to Capture Inquiries After Hours",
    description:
      "Parents browse at night. If there's no clear way to reach you, they move on by morning.",
  },
  {
    icon: TrendingDown,
    title: "You Look Smaller Than You Are",
    description:
      "A weak website makes a great school look like an afterthought. First impressions determine shortlists.",
  },
  {
    icon: Users,
    title: "Word-of-Mouth Has a Ceiling",
    description:
      "Referrals only grow so far. Without an online presence, your enrolment growth is capped.",
  },
];

export default function ProblemSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Section label */}
        <Reveal delay={0}>
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            The Real Problem
          </p>
        </Reveal>

        {/* Headline */}
        <Reveal delay={0.08}>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-3xl">
            You Built a Great School.{" "}
            <span className="text-gradient-berry">Your Website Doesn't Show It.</span>
          </h2>
        </Reveal>

        {/* Intro paragraph */}
        <Reveal delay={0.16}>
          <p className="text-lg text-muted-foreground max-w-2xl mb-16 leading-relaxed">
            Most school websites in Qatar were built years ago by someone who 'knows
            computers.' The result costs you enrolments every single month.
          </p>
        </Reveal>

        {/* Pain point cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {painPoints.map(({ icon: Icon, title, description }, i) => (
            <Reveal key={title} delay={0.08 * i}>
              <div className="rounded-3xl border border-border bg-card p-6 flex gap-5 hover:-translate-y-1 hover:border-purple-400 hover:shadow-glow transition-all">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="bg-gradient-berry rounded-2xl w-10 h-10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom callout */}
        <Reveal delay={0.48}>
          <div className="rounded-3xl bg-card border border-border p-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold mb-3">
              The Cost You Don't See
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              Every month your website underperforms, 10–30 families who searched for
              a school quietly enrolled somewhere else. You never knew they visited.
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
