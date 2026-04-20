import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HomePage } from '@/components/site/HomePage';

export const metadata: Metadata = {
  title: 'BerryDesign — Web Design & Development Studio',
  description: 'We build fast, SEO-first websites for schools and brands in Qatar.',
};

type Props = { params: Promise<{ locale: string }> };

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomePage />;
}
