import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Legal - Diamond Art',
  description: 'Legal information and policies for Diamond Art',
};

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 py-12 mx-auto">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8 -ml-3">
            <Link href="/" className="flex items-center">
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </Button>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
          
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-xl font-semibold mb-4">Legal Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <Link href="/legal/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="/legal/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
              <Link href="/legal/gdpr" className="text-muted-foreground hover:text-foreground transition-colors">
                GDPR
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              Last updated: July 10, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
