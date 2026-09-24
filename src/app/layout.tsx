import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Navbar } from '@/components/Navbar';
import { MobileNav } from '@/components/MobileNav';
import { Footer } from '@/components/Footer';
import { RealtimeProvider } from '@/components/RealtimeProvider';
import { LanguageProvider } from '@/context/LanguageContext';
import { CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  title: `${CONFIG.appName} | Real-Time Multi-Language News Platform`,
  description: 'Automated real-time news intelligence platform with AI summaries, multi-language translation, verification scoring, and multi-channel feed ingestion.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white">
        <LanguageProvider>
          <RealtimeProvider>
            <Navbar />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
            <MobileNav />
          </RealtimeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
