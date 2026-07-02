import React from 'react';
import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ScrollReveal from '@/components/ScrollReveal';
import Navbar from '@/components/Navbar';
import ChatWidget from '@/components/ChatWidget';
import { getDictionary, Locale } from '@/dictionaries';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'M.J. Habibie — Technical Consultant Analyst',
  description: 'Portfolio of M.J. Habibie, .NET & Database Specialist.',
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
      </body>
    </html>
  );
}
