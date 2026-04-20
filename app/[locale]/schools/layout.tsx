import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Analytics } from '@vercel/analytics/next';
import '../../globals.css';

export const metadata: Metadata = {
  title: 'School Website Design Qatar — Berry Design Studio',
  description:
    'Berry Design Studio builds high-converting websites for schools and nurseries in Qatar. Get a free website audit within 48 hours. Launch offer: QAR 799 for the first 10 schools.',
  openGraph: {
    title: 'School Website Design Qatar — Berry Design Studio',
    description:
      'Your school website is losing you enrolments. We fix that. Free audit + full website from QAR 799.',
    images: [{ url: '/og-default.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
};

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function SchoolsLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning className="light">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
