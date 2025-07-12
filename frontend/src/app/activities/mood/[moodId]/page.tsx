import { notFound } from 'next/navigation';
import MoodActivitiesClient from './MoodActivitiesClient';

type Activity = {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  mood: {
    id: string;
    name: string;
    color: string;
    icon: string;
  };
};

type MoodData = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  activities: Activity[];
};

// Mock data - in a real app, this would come from an API or database
const moodData: Record<string, MoodData> = {
  calm: {
    id: 'calm',
    name: 'Calm & Relaxed',
    description: 'Gentle activities to maintain your peace and tranquility',
    color: 'bg-blue-100 text-blue-800',
    icon: '🌊',
    activities: [
      {
        id: 'calm-1',
        title: 'Ocean Wave Diamond Art',
        description: 'A soothing wave pattern with gentle color gradients',
        difficulty: 'Beginner',
        duration: '2-3 hours',
        mood: {
          id: 'calm',
          name: 'Calm & Relaxed',
          color: 'bg-blue-100 text-blue-800',
          icon: '🌊',
        },
      },
      {
        id: 'calm-2',
        title: 'Serene Landscape',
        description: 'Peaceful countryside scene with soft colors',
        difficulty: 'Intermediate',
        duration: '4-5 hours',
        mood: {
          id: 'calm',
          name: 'Calm & Relaxed',
          color: 'bg-blue-100 text-blue-800',
          icon: '🌊',
        },
      },
    ],
  },
  energetic: {
    id: 'energetic',
    name: 'Energetic',
    description: 'Dynamic activities to channel your energy',
    color: 'bg-yellow-100 text-yellow-800',
    icon: '⚡',
    activities: [
      {
        id: 'energy-1',
        title: 'Electric Dreams',
        description: 'Vibrant and dynamic patterns to match your energy',
        difficulty: 'Intermediate',
        duration: '3-4 hours',
        mood: {
          id: 'energetic',
          name: 'Energetic',
          color: 'bg-yellow-100 text-yellow-800',
          icon: '⚡',
        },
      },
      {
        id: 'energy-2',
        title: 'Dance Party',
        description: 'Colorful and lively design to keep your energy up',
        difficulty: 'Beginner',
        duration: '2-3 hours',
        mood: {
          id: 'energetic',
          name: 'Energetic',
          color: 'bg-yellow-100 text-yellow-800',
          icon: '⚡',
        },
      },
    ],
  },
  focused: {
    id: 'focused',
    name: 'Focused',
    description: 'Activities to enhance your concentration and attention',
    color: 'bg-purple-100 text-purple-800',
    icon: '🎯',
    activities: [
      {
        id: 'focused-1',
        title: 'Geometric Patterns',
        description: 'Structured patterns to help maintain focus and concentration',
        difficulty: 'Advanced',
        duration: '5-6 hours',
        mood: {
          id: 'focused',
          name: 'Focused',
          color: 'bg-purple-100 text-purple-800',
          icon: '🎯',
        },
      },
      {
        id: 'focused-2',
        title: 'Mandalas',
        description: 'Intricate circular designs to enhance focus and mindfulness',
        difficulty: 'Advanced',
        duration: '4-5 hours',
        mood: {
          id: 'focused',
          name: 'Focused',
          color: 'bg-purple-100 text-purple-800',
          icon: '🎯',
        },
      },
    ],
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Inspiring activities to spark your imagination',
    color: 'bg-pink-100 text-pink-800',
    icon: '🎨',
    activities: [
      {
        id: 'creative-1',
        title: 'Abstract Expression',
        description: 'Let your creativity flow with this abstract design',
        difficulty: 'Intermediate',
        duration: '3-4 hours',
        mood: {
          id: 'creative',
          name: 'Creative',
          color: 'bg-pink-100 text-pink-800',
          icon: '🎨',
        },
      },
      {
        id: 'creative-2',
        title: 'Color Splash',
        description: 'Vibrant colors and dynamic patterns to spark your imagination',
        difficulty: 'Beginner',
        duration: '2-3 hours',
        mood: {
          id: 'creative',
          name: 'Creative',
          color: 'bg-pink-100 text-pink-800',
          icon: '🎨',
        },
      },
    ],
  },
  stressed: {
    id: 'stressed',
    name: 'Stressed',
    description: 'Calming activities to help you unwind and destress',
    color: 'bg-green-100 text-green-800',
    icon: '🌿',
    activities: [
      {
        id: 'stressed-1',
        title: 'Tranquil Garden',
        description: 'A peaceful garden scene to help relieve stress and anxiety',
        difficulty: 'Beginner',
        duration: '2-3 hours',
        mood: {
          id: 'stressed',
          name: 'Stressed',
          color: 'bg-green-100 text-green-800',
          icon: '🌿',
        },
      },
      {
        id: 'stressed-2',
        title: 'Ocean Sunset',
        description: 'Calming ocean sunset to help you relax and destress',
        difficulty: 'Intermediate',
        duration: '3-4 hours',
        mood: {
          id: 'stressed',
          name: 'Stressed',
          color: 'bg-green-100 text-green-800',
          icon: '🌿',
        },
      },
    ],
  },
  happy: {
    id: 'happy',
    name: 'Happy',
    description: 'Joyful activities to celebrate your good mood',
    color: 'bg-amber-100 text-amber-800',
    icon: '🌈',
    activities: [
      {
        id: 'happy-1',
        title: 'Rainbow Unicorn',
        description: 'A magical unicorn design to keep your spirits high!',
        difficulty: 'Beginner',
        duration: '2-3 hours',
        mood: {
          id: 'happy',
          name: 'Happy',
          color: 'bg-amber-100 text-amber-800',
          icon: '🌈',
        },
      },
      {
        id: 'happy-2',
        title: 'Tropical Paradise',
        description: 'Vibrant tropical scene to keep you in high spirits',
        difficulty: 'Intermediate',
        duration: '3-4 hours',
        mood: {
          id: 'happy',
          name: 'Happy',
          color: 'bg-amber-100 text-amber-800',
          icon: '🌈',
        },
      },
    ],
  },
};

export default function MoodActivityPage({ params }: { params: { moodId: string } }) {
  const mood = moodData[params.moodId];

  if (!mood) {
    notFound();
  }

  return <MoodActivitiesClient mood={mood} />;
}

// Generate static params for static generation
export async function generateStaticParams() {
  return Object.keys(moodData).map((moodId) => ({
    moodId,
  }));
}