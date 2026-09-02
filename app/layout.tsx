import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { cn } from "@/lib/utils";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'KronGage – Unified Customer Engagement Platform',
  description: 'Meet your customers wherever they are. KronGage transforms fragmented data into a single, intelligent conversation.',
  icons: { icon: '/Krongage-Logo.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cn("font-sans", manrope.variable)}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-SX157HTLN7" strategy="afterInteractive" />
        <Script id="google-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SX157HTLN7');
          `}
        </Script>
      </head>
      <body className="[font-family:var(--font-sans),system-ui,sans-serif]">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
