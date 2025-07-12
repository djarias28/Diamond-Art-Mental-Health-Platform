import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Activities | Diamond Art',
  description: 'Discover therapeutic diamond art activities tailored to your mood and preferences.',
};

export default function ActivitiesPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Therapeutic Activities</h1>
        <p className="text-xl text-muted-foreground">Find your perfect diamond art activity</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Activity cards will be mapped here */}
        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-3">Mood-based Selection</h2>
          <p className="text-muted-foreground mb-4">Choose activities based on your current mood and energy level.</p>
          <Link href="/activities/mood" className="text-primary hover:underline">Explore →</Link>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-3">Skill Level</h2>
          <p className="text-muted-foreground mb-4">Find projects matching your experience level.</p>
          <Link href="/activities/levels" className="text-primary hover:underline">Browse by Level →</Link>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-3">Popular Designs</h2>
          <p className="text-muted-foreground mb-4">See what others are working on.</p>
          <Link href="/activities/popular" className="text-primary hover:underline">View Popular →</Link>
        </div>
      </div>
    </main>
  );
}
