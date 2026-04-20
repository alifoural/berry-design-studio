"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "We already have a website. Why would we need a new one?",
    a: "Having a website and having a website that generates enrolments are two different things. If you're not getting consistent online inquiries, your current site isn't doing its job. The free audit will show you exactly where it's failing — no commitment required.",
  },
  {
    q: "How much does it cost?",
    a: "The launch offer is QAR 799 for the full Growth Package — available to the first 10 schools only. After that, packages start at QAR 8,500 (Essentials) and go up to QAR 24,000+ (Authority). Every package includes full copywriting, so you don't need to write anything.",
  },
  {
    q: "How long does it take?",
    a: "Four weeks from contract to live site. If your intake season is approaching, tell us and we'll prioritise accordingly.",
  },
  {
    q: "Do we need to provide content and photos?",
    a: "No. We write all copy. We work with whatever photos you have. If your photography needs improvement, we can recommend a local school photographer.",
  },
  {
    q: "Will we be able to update the website ourselves?",
    a: "Yes. We build on a clean CMS that your admin team can manage without technical knowledge. Updating fees, photos, or news takes less than five minutes.",
  },
  {
    q: "What if we don't like the design?",
    a: "Every project includes two full revision rounds. In practice, we rarely need both — because we start with a strategy call that aligns us before a single pixel is designed.",
  },
  {
    q: "Do you offer payment in instalments?",
    a: "Yes. Standard payment is 50% on contract, 50% on launch. For the QAR 799 launch offer, full payment is required upfront to secure the slot.",
  },
  {
    q: "What guarantee do you offer?",
    a: "If your new website doesn't generate more parent inquiries than your current site within 90 days of launch, we redesign any section for free until it does. You carry zero risk.",
  },
  {
    q: "We tried a website before and it didn't work.",
    a: "That's a common story — generic templates, no strategy, no real copywriting. A website without strategy is an expensive brochure. What we do differently starts before design: we figure out what your parents need to see to trust you.",
  },
  {
    q: "Is the QAR 799 price real or will there be hidden fees?",
    a: "It's real. One payment of QAR 799 covers the full Growth Package — design, development, copywriting, SEO, CMS, training, and 30-day support. No monthly fees, no hidden extras. You own the site outright.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm sm:text-base leading-snug">{q}</span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ maxHeight: open ? "500px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-3xl">

        {/* Section label */}
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
          Common Questions
        </p>

        {/* Headline */}
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-16">
          Answers to{" "}
          <span className="text-gradient-berry">What You're Thinking</span>
        </h2>

        {/* FAQ accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

      </div>
    </section>
  );
}
