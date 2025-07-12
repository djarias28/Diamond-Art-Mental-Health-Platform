'use client';

import MoodSelector from '@/components/activities/MoodSelector';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type MoodOption = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
};

const moodOptions: MoodOption[] = [
  {
    id: 'calm',
    name: 'Calm & Relaxed',
    description: 'Gentle, flowing designs to maintain your peace',
    color: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
    icon: '🌊',
  },
  {
    id: 'energetic',
    name: 'Energetic',
    description: 'Vibrant, dynamic designs to match your energy',
    color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    icon: '⚡',
  },
  {
    id: 'focused',
    name: 'Focused',
    description: 'Intricate patterns for deep concentration',
    color: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
    icon: '🎯',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Artistic designs to inspire your imagination',
    color: 'bg-pink-100 text-pink-800 hover:bg-pink-200',
    icon: '🎨',
  },
  {
    id: 'stressed',
    name: 'Stressed',
    description: 'Soothing patterns to help you unwind',
    color: 'bg-green-100 text-green-800 hover:bg-green-200',
    icon: '🌿',
  },
  {
    id: 'happy',
    name: 'Happy',
    description: 'Bright and cheerful designs to celebrate your joy',
    color: 'bg-amber-100 text-amber-800 hover:bg-amber-200',
    icon: '😊',
  },
];

export default function MoodSelectionClient() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  
  const handleMoodSelect = (moodId: string) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    router.push(`/activities/mood/${moodId}`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">How are you feeling today?</h1>
        <p className="text-xl text-muted-foreground">
          Select your current mood to find the perfect diamond art activity
        </p>
      </div>

      <MoodSelector 
        moods={moodOptions} 
        onMoodSelect={handleMoodSelect}
        isNavigating={isNavigating}
        className="max-w-6xl mx-auto"
      />
    </div>
  );
}
