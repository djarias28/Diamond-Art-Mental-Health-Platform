import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { levelOptions } from '../constants';
import LevelActivitiesClient from './LevelActivitiesClient';

type Props = {
  params: { level: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const level = levelOptions.find((l) => l.id === params.level);
  
  if (!level) {
    return {
      title: 'Level Not Found',
    };
  }

  return {
    title: `${level.name} Level Activities | Diamond Art`,
    description: level.description,
  };
}

export default function LevelPage({ params }: Props) {
  const level = levelOptions.find((l) => l.id === params.level);
  
  if (!level) {
    notFound();
  }

  return <LevelActivitiesClient levelId={params.level} />;
}

// Generate static params for SSG
export async function generateStaticParams() {
  return levelOptions.map((level) => ({
    level: level.id,
  }));
}
