'use client';

import React from 'react';

type MoodOption = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
};

type MoodSelectorProps = {
  moods: MoodOption[];
  onMoodSelect?: (moodId: string) => void;
  className?: string;
  isNavigating?: boolean;
};

export default function MoodSelector({ 
  moods, 
  onMoodSelect, 
  className = '',
  isNavigating = false
}: MoodSelectorProps) {
  const handleMoodClick = (moodId: string) => {
    if (isNavigating) return;
    onMoodSelect?.(moodId);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {moods.map((mood) => (
        <div
          key={mood.id}
          onClick={() => handleMoodClick(mood.id)}
          className={`glass-card p-6 rounded-xl transition-all hover:scale-105 cursor-pointer ${mood.color} hover:shadow-lg relative overflow-hidden ${
            isNavigating ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleMoodClick(mood.id);
            }
          }}
          aria-label={`Select ${mood.name} mood`}
          aria-disabled={isNavigating}
        >
          {isNavigating && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
          <div className={isNavigating ? 'opacity-50' : ''}>
            <div className="text-4xl mb-4" aria-hidden="true">
              {mood.icon}
            </div>
            <h2 className="text-2xl font-semibold mb-2">{mood.name}</h2>
            <p className="text-muted-foreground">{mood.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
