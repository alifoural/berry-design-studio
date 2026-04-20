import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Nav } from '@/components/site/Nav';
import { Footer } from '@/components/site/Footer';
import { Providers } from '../providers';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://berrydesign.online'),
  title: {
    default: 'BerryDesign — Web Design & Development Studio',
    template: '%s — BerryDesign',
  },
  description: 'BerryDesign builds fast, SEO-first websites.',
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className="light"
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <div className="relative min-h-screen">
              <Nav />
              <main className="pt-28">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}