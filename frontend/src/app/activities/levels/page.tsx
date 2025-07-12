import { Metadata } from 'next';
import Link from 'next/link';
import { levelOptions } from './constants';

export const metadata: Metadata = {
  title: 'Skill Levels | Diamond Art',
  description: 'Find diamond art activities that match your skill level.',
};

export default function SkillLevelsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Choose Your Skill Level</h1>
        <p className="text-xl text-muted-foreground">
          Find projects that match your diamond art experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {levelOptions.map((level) => (
          <Link 
            key={level.id}
            href={`/activities/levels/${level.id}`}
            className={`block glass-card p-6 rounded-xl border-2 transition-all hover:scale-105 ${level.color}`}
            aria-label={`View ${level.name} level activities`}
          >
            <div className="text-4xl mb-4">{level.icon}</div>
            <h2 className="text-2xl font-semibold mb-2">{level.name}</h2>
            <p className="text-muted-foreground mb-3">{level.description}</p>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Projects include:</span> {level.projects}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Not sure where to start?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you&apos;re new to diamond art, we recommend starting with a beginner kit.
          Our guided tutorials will help you master the basics before moving on to more complex projects.
        </p>
        <Link 
          href="/activities/assessment" 
          className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Take Our Skill Assessment
        </Link>
      </div>
    </div>
  );
}
