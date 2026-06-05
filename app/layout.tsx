import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

export const metadata: Metadata = {
  title: 'KronGage – Unified Customer Engagement Platform',
  description: 'Meet your customers wherever they are. KronGage transforms fragmented data into a single, intelligent conversation.',
  icons: { icon: '/Krongage-Logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body style={{ fontFamily: 'var(--font-manrope), system-ui, sans-serif' }}>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
