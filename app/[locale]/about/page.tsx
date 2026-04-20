import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "BerryDesign is a small, senior studio. We partner with founders and marketing teams to ship websites that work.",
  openGraph: {
    title: "About — BerryDesign",
    description: "A small, senior studio shipping websites that work.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/about" },
};

const values = [
  {
    title: "Senior, hands-on",
    desc: "No layers between you and the people doing the work. Same designer and developer from kickoff to launch.",
  },
  {
    title: "Built to be found",
    desc: "Static rendering, semantic HTML, real meta — every page indexable from day one.",
  },
  {
    title: "Made to last",
    desc: "Clean code, a real design system, and a CMS your team can actually use after we hand it off.",
  },
];

export default function AboutPage() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">About</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            A small studio that <span className="text-gradient-berry">ships</span>.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg text-muted-foreground">
            <p>
              BerryDesign is an independent design and development studio. We
              work with founders, marketing teams, and other agencies to design
              and build websites that look great and rank well.
            </p>
            <p>
              We&apos;re senior practitioners — not a stack of juniors managed by a
              project manager. You get the people doing the work, on every call.
              That&apos;s the only way we know how to make things we&apos;re proud of.
            </p>
            <p>
              Most of our work is in Next.js, with content managed in Sanity or
              a Cloud-based CMS, deployed to the edge. We care a lot about
              performance, accessibility, and SEO — they&apos;re not features, they
              are the work.
            </p>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold text-gradient-berry">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}