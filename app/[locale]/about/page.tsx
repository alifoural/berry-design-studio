import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import Link from "next/link";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Berry Design Studio is a specialised web design agency helping schools and nurseries in Qatar turn their websites into real enrolment channels.",
  openGraph: {
    title: "About — Berry Design Studio",
    description: "We build websites for schools and nurseries in Qatar that convert parent visits into enrolment inquiries.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/about" },
};

type Props = { params: Promise<{ locale: string }> };

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const approachItems = [
    { title: t("approachItem0Title"), desc: t("approachItem0Desc") },
    { title: t("approachItem1Title"), desc: t("approachItem1Desc") },
    { title: t("approachItem2Title"), desc: t("approachItem2Desc") },
    { title: t("approachItem3Title"), desc: t("approachItem3Desc") },
  ];

  const differentiators = [
    { title: t("differentItem0Title"), desc: t("differentItem0Desc") },
    { title: t("differentItem1Title"), desc: t("differentItem1Desc") },
    { title: t("differentItem2Title"), desc: t("differentItem2Desc") },
    { title: t("differentItem3Title"), desc: t("differentItem3Desc") },
    { title: t("differentItem4Title"), desc: t("differentItem4Desc") },
  ];

  const whatWeDoItems = [
    t("whatWeDoItem0"),
    t("whatWeDoItem1"),
    t("whatWeDoItem2"),
    t("whatWeDoItem3"),
  ];

  const whyItems = [
    t("whyItem0"),
    t("whyItem1"),
    t("whyItem2"),
  ];

  const expectations = [
    t("expectItem0"),
    t("expectItem1"),
    t("expectItem2"),
    t("expectItem3"),
    t("expectItem4"),
  ];

  return (
    <section className="px-4 py-16">
      <div className="mx-auto max-w-4xl space-y-28">

        {/* Hero */}
        <div>
          <Reveal>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("label")}</p>
            <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
              <span className="text-gradient-berry">{t("heroHeading")}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-8 space-y-5 text-lg text-muted-foreground max-w-3xl">
              <p>{t("heroPara1")}</p>
              <p>{t("heroPara2")}</p>
              <p className="font-semibold text-foreground">{t("heroEmphasis")}</p>
            </div>
          </Reveal>
        </div>

        {/* What We Do */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("whatWeDoLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient-berry">{t("whatWeDoHeading")}</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl">
              <p>{t("whatWeDoPara1")}</p>
              <p>{t("whatWeDoPara2")}</p>
            </div>
            <ul className="mt-5 space-y-2">
              {whatWeDoItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg text-muted-foreground">{t("whatWeDoConclusion")}</p>
          </div>
        </Reveal>

        {/* Our Approach */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("approachLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-gradient-berry">{t("approachHeading")}</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">{t("approachIntro")}</p>
            <div className="grid gap-5 md:grid-cols-2">
              {approachItems.map((item, i) => (
                <Reveal key={item.title} delay={0.06 * i}>
                  <div className="rounded-3xl border border-border bg-card p-6 h-full">
                    <h3 className="font-display text-lg font-semibold text-gradient-berry mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-8 text-lg text-muted-foreground max-w-3xl">{t("approachConclusion")}</p>
          </div>
        </Reveal>

        {/* Why Schools & Nurseries */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("whyLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">
              <span className="text-gradient-berry">{t("whyHeading")}</span>
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground max-w-3xl">
              <p>{t("whyPara1")}</p>
              <p>{t("whyPara2")}</p>
            </div>
            <ul className="mt-5 space-y-3">
              {whyItems.map((item) => (
                <li key={item} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-gradient-berry flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl">{t("whyConclusion")}</p>
          </div>
        </Reveal>

        {/* What Makes Us Different */}
        <Reveal delay={0.05}>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("differentLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-10">
              <span className="text-gradient-berry">{t("differentHeading")}</span>
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{t("expectLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">
              <span className="text-gradient-berry">{t("expectHeading")}</span>
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
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{t("goalLabel")}</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight">
              <span className="text-gradient-berry">{t("goalHeading")}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">{t("goalPara")}</p>
            <Link
              href="/contact"
              className="mt-2 inline-block rounded-full bg-gradient-berry px-8 py-4 text-base font-semibold text-white shadow-glow hover:opacity-90 hover:-translate-y-0.5 transition-all"
            >
              {t("goalCta")}
            </Link>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
