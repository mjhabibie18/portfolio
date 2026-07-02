import React from 'react';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import VisitorTracker from '@/components/VisitorTracker';
import { getDictionary, Locale } from '@/dictionaries';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Muhammad Jurnalies Habibie — Fullstack Developer & System Analyst',
  description: 'Portfolio of Muhammad Jurnalies Habibie, .NET & Database Specialist. Expert in enterprise application development, SAP Business One, and high-performance APIs.',
  keywords: ['Muhammad Jurnalies Habibie', 'M.J. Habibie', 'Habibie', 'Software Engineer', '.NET Developer', 'Backend Developer', 'SAP Business One', 'Technical Consultant', 'Indonesia', 'Portfolio', 'Fullstack'],
  authors: [{ name: 'Muhammad Jurnalies Habibie' }],
  creator: 'Muhammad Jurnalies Habibie',
  publisher: 'Muhammad Jurnalies Habibie',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Muhammad Jurnalies Habibie — Fullstack Developer & System Analyst',
    description: 'Portfolio of Muhammad Jurnalies Habibie, .NET & Database Specialist. Building enterprise solutions one query at a time.',
    url: 'https://mjhabibie.vercel.app',
    siteName: 'Muhammad Jurnalies Habibie Portfolio',
    images: [
      {
        url: 'https://mjhabibie.vercel.app/og-image.jpg',
        width: 400,
        height: 400,
        alt: 'Muhammad Jurnalies Habibie Portfolio',
      },
    ],
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Jurnalies Habibie — Fullstack Developer & System Analyst',
    description: 'Portfolio of Muhammad Jurnalies Habibie, .NET & Database Specialist.',
    images: ['https://mjhabibie.vercel.app/og-image.jpg'],
  },
  themeColor: '#0a0a14',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="scroll-smooth">
      <body className={inter.className}>
        <ScrollReveal />

        <Navbar dict={dict} lang={lang} />

        <main>
          {children}
        </main>

        <footer className="footer" style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Muhammad Jurnalies Habibie
        </footer>

        <ChatWidget placeholder={dict.Chat_Input} />
        <VisitorTracker />
      </body>
    </html>
  );
}
