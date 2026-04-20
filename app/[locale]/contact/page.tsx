import type { Metadata } from "next";
import { setRequestLocale } from 'next-intl/server';
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us about your project. We usually reply within 24 hours.",
  openGraph: {
    title: "Contact — BerryDesign",
    description: "Tell us about your project.",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "https://berrydesign.online/contact" },
};

type Props = { params: Promise<{ locale: string }> };

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-2">
        <Reveal>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Contact</p>
          <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl">
            Let&apos;s <span className="text-gradient-berry">talk</span>.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Tell us a bit about your project, your timeline, and your budget.
            We usually reply within 24 hours.
          </p>

          <div className="mt-12 space-y-4">
            <a
              href="mailto:sales@berrydesign.online"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-berry"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-berry text-primary-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Sales</div>
                <div className="text-sm font-medium">sales@berrydesign.online</div>
              </div>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="mailto:support@berrydesign.online"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-colors hover:border-berry"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-berry text-primary-foreground">
                <Mail className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Support</div>
                <div className="text-sm font-medium">support@berrydesign.online</div>
              </div>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-berry text-primary-foreground">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Studio</div>
                <div className="text-sm font-medium">Remote · Working worldwide</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}