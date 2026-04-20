import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import FunnelHero from '@/components/funnel/FunnelHero';
import ProblemSection from '@/components/funnel/ProblemSection';
import SolutionSection from '@/components/funnel/SolutionSection';
import BenefitsSection from '@/components/funnel/BenefitsSection';
import { ServicesSection } from '@/components/funnel/ServicesSection';
import { OfferBanner } from '@/components/funnel/OfferBanner';
import { PricingSection } from '@/components/funnel/PricingSection';
import TrustSection from '@/components/funnel/TrustSection';
import ProcessSection from '@/components/funnel/ProcessSection';
import LeadCaptureForm from '@/components/funnel/LeadCaptureForm';
import FAQSection from '@/components/funnel/FAQSection';
import FinalCTA from '@/components/funnel/FinalCTA';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = { params: Promise<{ locale: string }> };

export default async function SchoolsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <FunnelHero />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <ServicesSection />
      <OfferBanner />
      <PricingSection />
      <TrustSection />
      <ProcessSection />
      <LeadCaptureForm />
      <FAQSection />
      <FinalCTA />

      {/* Footer strip */}
      <footer className="border-t border-border px-4 py-8 text-center text-xs text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Berry Design Studio · Qatar ·{' '}
          <a href="mailto:hello@berrydesign.online" className="hover:underline">
            hello@berrydesign.online
          </a>
        </p>
      </footer>
    </main>
  );
}
