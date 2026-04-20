import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers, Zap, Search } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Brand identity, web design, Next.js development, and SEO. End-to-end services for ambitious brands.",
  openGraph: {
    title: "Services — BerryDesign",
    description: "Brand, web design, Next.js development, and SEO under one roof.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/services" },
};

const icons = [Sparkles, Layers, Zap, Search];

type Props = { params: Promise<{ locale: string }> };

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const services = [0, 1, 2, 3].map((i) => ({
    Icon: icons[i],
    title: t(`service${i}Title` as Parameters<typeof t>[0]),
    desc: t(`service${i}Desc` as Parameters<typeof t>[0]),
    items: [0, 1, 2, 3].map((j) =>
      t(`service${i}Item${j}` as Parameters<typeof t>[0])
    ),
  }));

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("label")}</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            {t("heading")} <span className="text-gradient-berry">{t("headingHighlight")}</span>
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">{t("intro")}</p>
        </Reveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 0.08}>
              <div className="group h-full rounded-3xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-berry hover:shadow-glow">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-berry text-primary-foreground">
                  <s.Icon className="h-6 w-6" />
                </div>
                <h2 className="font-display text-3xl font-semibold">{s.title}</h2>
                <p className="mt-3 text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-24 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-12 text-center">
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {t("ctaHeading")} <span className="text-gradient-berry">{t("ctaHeadingHighlight")}</span>
            </h2>
            <p className="max-w-md text-muted-foreground">{t("ctaPara")}</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-berry px-7 py-3.5 font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
            >
              {t("ctaBtn")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
