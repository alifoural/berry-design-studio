import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { getPosts } from "@/lib/sanity-queries";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on web design, performance, SEO, and the craft of shipping the modern web.",
  openGraph: {
    title: "Blog — BerryDesign",
    description: "Notes on web design, performance, SEO, and shipping the modern web.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/blog" },
};

const staticPosts = [
  {
    slug: "ssg-vs-csr",
    title: "Why we still bet on Static Generation in 2026",
    excerpt: "SSG isn't a relic — it's the cheapest, fastest, most SEO-friendly way to ship a marketing site.",
    date: "Apr 12, 2026",
    tag: "Performance",
  },
  {
    slug: "design-system-on-a-budget",
    title: "A design system on a budget",
    excerpt: "How to build a small, useful design system without spending six months on tokens.",
    date: "Mar 28, 2026",
    tag: "Design",
  },
  {
    slug: "seo-for-portfolios",
    title: "SEO for portfolio sites that actually rank",
    excerpt: "Most portfolios bury their best content. Here's how to structure case studies for search.",
    date: "Mar 14, 2026",
    tag: "SEO",
  },
];

export const revalidate = 3600;

type Props = { params: Promise<{ locale: string }> };

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  let posts: Array<{ slug: string; title: string; excerpt?: string; date?: string; publishedAt?: string; tag?: string; tags?: string[] }>;

  try {
    const sanityPosts = await getPosts();
    posts = sanityPosts.length > 0
      ? sanityPosts.map((p) => ({
          slug: p.slug.current,
          title: p.title,
          excerpt: p.excerpt,
          publishedAt: p.publishedAt,
          tag: p.tags?.[0],
        }))
      : staticPosts;
  } catch {
    posts = staticPosts;
  }

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Journal</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Notes & <span className="text-gradient-berry">field reports</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Things we&apos;ve learned shipping web work.
          </p>
        </Reveal>

        <div className="mt-20 space-y-4">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href="/blog"
                className="group flex items-start justify-between gap-6 rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-berry hover:shadow-glow md:p-8"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="rounded-full border border-border px-3 py-1">
                      {p.tag || "Post"}
                    </span>
                    <span>{p.date || p.publishedAt || ""}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-semibold md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-muted-foreground">{p.excerpt}</p>
                </div>
                <div className="rounded-full bg-secondary p-3 transition-transform group-hover:rotate-45 group-hover:bg-gradient-berry group-hover:text-primary-foreground">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}