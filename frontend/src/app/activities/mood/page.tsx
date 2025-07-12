import { Metadata } from 'next';
import dynamic from 'next/dynamic';

// Disable SSR for the client component
const MoodSelectionClient = dynamic(
  () => import('./MoodSelectionClient'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Mood-based Selection | Diamond Art',
  description: 'Find diamond art activities that match your current mood and energy level.',
};

export default function MoodSelectionPage() {
  return <MoodSelectionClient />;
}
