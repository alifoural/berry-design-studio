import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getProjects } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies from BerryDesign — brand systems, marketing sites, and Next.js builds.",
  openGraph: {
    title: "Work — BerryDesign Portfolio",
    description: "Selected case studies — brand systems, marketing sites, and Next.js builds.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/portfolio" },
};

const staticProjects = [
  { title: "Lumen Studio", tag: "Brand · Web", year: "2025", color: "from-fuchsia-500 to-purple-600" },
  { title: "Orbit Commerce", tag: "E-commerce · Next.js", year: "2025", color: "from-pink-500 to-rose-600" },
  { title: "North Atlas", tag: "SaaS · Marketing", year: "2024", color: "from-violet-500 to-indigo-600" },
  { title: "Field Notes", tag: "Editorial · CMS", year: "2024", color: "from-rose-500 to-fuchsia-600" },
  { title: "Solace Wellness", tag: "Brand · Web", year: "2024", color: "from-purple-500 to-pink-600" },
  { title: "Quanta Labs", tag: "Identity · Site", year: "2023", color: "from-indigo-500 to-violet-600" },
];

export default async function PortfolioPage() {
  let projects: Array<{ title: string; tag?: string; year?: string; color?: string }>;

  try {
    const sanityProjects = await getProjects();
    projects = sanityProjects.length > 0 ? sanityProjects : staticProjects;
  } catch {
    projects = staticProjects;
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Portfolio</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Selected <span className="text-gradient-berry">work</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A small set of projects we&apos;re proud of — across brand, web, and
            commerce. Every site is built for performance and SEO from day one.
          </p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.08}>
              <Link
                href="/portfolio"
                className="group relative block overflow-hidden rounded-3xl border border-border bg-card"
              >
                <div
                  className={`relative aspect-[4/3] bg-gradient-to-br ${
                    p.color || "from-violet-500 to-indigo-600"
                  }`}
                >
                  <div className="absolute inset-0 bg-background/10 transition-opacity group-hover:opacity-0" />
                  <div className="absolute right-6 top-6 rounded-full bg-background/90 p-3 transition-transform group-hover:rotate-45">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-6">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {p.tag || "Project"}
                    </p>
                  </div>
                  <span className="text-sm text-muted-foreground">{p.year || ""}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
