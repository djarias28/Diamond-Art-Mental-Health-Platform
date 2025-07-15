import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/providers/AuthProvider';
 
const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: 'Diamond Art - Mental Wellness Platform',
  description: 'Find peace and mindfulness through creative diamond art',
  keywords: ['diamond art', 'mental health', 'wellness', 'art therapy', 'mindfulness', 'creativity'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-[calc(100vh-64px)]">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </AuthProvider>
        <Analytics/>
        <Toaster />
      </body>
    </html>
  );
}