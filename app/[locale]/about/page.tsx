import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Berry Design Studio is a specialized web design agency helping schools and nurseries in Qatar turn their websites into real enrolment channels.",
  openGraph: {
    title: "About — Berry Design Studio",
    description: "We build websites for schools and nurseries in Qatar that convert parent visits into enrolment inquiries.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/about" },
};

const approach = [
  { title: "Your positioning", desc: "How your school stands apart from competitors in the Qatar market." },
  { title: "Your target parents", desc: "What they search for, what they worry about, and what makes them call." },
  { title: "Your key selling points", desc: "The things that make families choose you over the school down the road." },
  { title: "The structure that drives inquiries", desc: "Pages, flows, and CTAs designed around how parents actually behave." },
];

const differentiators = [
  { title: "Built for results, not just visuals", desc: "Every design decision is tested against one question: will this get more parents to call?" },
  { title: "Local Qatar market knowledge", desc: "We know Ramadan intake cycles, dual-language expectations, and why WhatsApp matters more than email." },
  { title: "Mobile-first by default", desc: "80% of Qatar parents browse on their phones. Your site is designed for that screen first." },
  { title: "Clarity over complexity", desc: "We simplify programme pages, fees, and admissions processes so parents get answers instantly." },
  { title: "Conversion-focused from day one", desc: "Strategy comes before design. The site is planned to convert before a single pixel is drawn." },
];

const expectations = [
  "A professional website aligned with your brand",
  "Clear presentation of your programmes and facilities",
  "A structure that encourages parent inquiries",
  "Fast performance and SEO-ready setup",
  "Ongoing support after launch",
];

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-28">

        {/* Hero */}
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
              Websites that{" "}
              <span className="text-gradient-berry">fill enrolments</span>.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground max-w-3xl">
              <p>
                Berry Design Studio is a specialised web design agency focused on one thing:
                helping schools and nurseries turn their websites into real enrolment channels.
              </p>
              <p>
                Most education websites fail at the only thing that matters — converting visitors
                into parent inquiries. They look outdated, load slowly, confuse users, and don't
                build trust. That directly impacts how parents perceive your institution.
              </p>
              <p className="font-semibold text-foreground">We fix that.</p>
            </div>
          </Reveal>
        </div>

        {/* What We Do */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What We Do</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Websites built around{" "}
              <span className="text-gradient-berry">how parents think</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl">
              <p>
                We design and build websites specifically for schools and nurseries in Qatar.
                Not generic business websites. Not templates recycled from other industries.
              </p>
              <p>Every project is built around:</p>
            </div>
            <ul className="mt-5 space-y-2">
              {[
                "How parents search",
                "What parents care about",
                "What makes them trust a school",
                "What makes them take action",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg text-muted-foreground">
              The result is a website that doesn&apos;t just &ldquo;exist&rdquo; — it works.
            </p>
          </div>
        </Reveal>

        {/* Our Approach */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Our Approach</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Strategy before{" "}
              <span className="text-gradient-berry">design</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              We don&apos;t start with design. Before anything is built, we define:
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              {approach.map((item, i) => (
                <Reveal key={item.title} delay={0.06 * i}>
                  <div className="rounded-3xl border border-border bg-card p-6 h-full">
                    <h3 className="font-display text-lg font-semibold text-gradient-berry mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-lg text-muted-foreground max-w-3xl">
              Then we translate that into a clean, fast, mobile-first website that is easy to
              navigate and built to convert.
            </p>
          </div>
        </Reveal>

        {/* Why Schools & Nurseries */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Why Schools & Nurseries</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              Focus beats{" "}
              <span className="text-gradient-berry">generalism</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl">
              <p>Most agencies try to serve everyone. That leads to average results.</p>
              <p>We chose to focus on education because:</p>
            </div>
            <ul className="mt-5 space-y-3">
              {[
                "The decision-making process of parents is unique",
                "Trust is more important than design trends",
                "Messaging must be clear, simple, and reassuring",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl">
              This focus allows us to build websites that actually match how parents think and behave.
            </p>
          </div>
        </Reveal>

        {/* What Makes Us Different */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What Makes Us Different</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              The five things that{" "}
              <span className="text-gradient-berry">set us apart</span>
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {differentiators.map((item, i) => (
                <Reveal key={item.title} delay={0.06 * i}>
                  <div className="rounded-3xl border border-border bg-card p-6 h-full hover:-translate-y-1 hover:border-purple-400 hover:shadow-glow transition-all">
                    <h3 className="font-semibold text-base mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        {/* What You Can Expect */}
        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-border bg-card p-8 md:p-12">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">What You Can Expect</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
              Working with{" "}
              <span className="text-gradient-berry">Berry Design Studio</span>
            </h2>
            <ul className="space-y-3">
              {expectations.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-gradient-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Goal + CTA */}
        <Reveal delay={0.05}>
          <div className="text-center flex flex-col items-center gap-6">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Our Goal</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
              Help your school attract more parents,{" "}
              <span className="text-gradient-berry">starting online</span>.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              If your current website is outdated, underperforming, or not bringing results,
              it&apos;s time to fix the problem at its core.
            </p>
            <Link
              href="/contact"
              className="mt-2 inline-block rounded-full bg-gradient-berry px-8 py-4 text-base font-semibold text-white shadow-glow hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              Request a Consultation
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
