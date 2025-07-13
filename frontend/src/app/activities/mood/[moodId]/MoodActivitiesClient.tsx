'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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

type MoodActivitiesClientProps = {
  mood: MoodData;
};

export default function MoodActivitiesClient({ mood }: MoodActivitiesClientProps) {
  const router = useRouter();

  const handleStartActivity = (activityId: string) => {
    // In a real app, you might want to track the activity start time
    // or make an API call to log the activity start
    console.log(`Starting activity: ${activityId}`);
    
    // Navigate to the activity session page
    router.push(`/activities/session/${activityId}/play`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          href="/activities/mood" 
          className="inline-flex items-center text-primary hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Mood Selection
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-4xl mr-3">{mood.icon}</span>
              <h1 className="text-3xl font-bold">{mood.name} Activities</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {mood.description}
            </p>
          </div>
          <div className={`${mood.color} px-4 py-2 rounded-full text-sm font-medium`}>
            {mood.activities.length} activities available
          </div>
        </div>
      </div>

      {mood.activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No activities found for this mood.</p>
          <Link 
            href="/activities/mood" 
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Mood Selection
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mood.activities.map((activity) => (
            <div 
              key={activity.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    activity.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                      : activity.difficulty === 'Intermediate' 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
                        : 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                  }`}>
                    {activity.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {activity.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {activity.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {activity.mood.name}
                  </span>
                </div>
                
                <button
                  onClick={() => handleStartActivity(activity.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-white dark:text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
