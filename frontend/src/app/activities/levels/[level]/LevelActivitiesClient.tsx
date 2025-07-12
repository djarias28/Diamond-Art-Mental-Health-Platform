'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Grid2X2, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getActivitiesByLevel } from '../../data/activities';
import { levelOptions } from '../constants';

interface LevelActivitiesClientProps {
  levelId: string;
}

type GridSize = 'grid' | 'grid-md' | 'grid-lg' | 'list';

export default function LevelActivitiesClient({ levelId }: LevelActivitiesClientProps) {
  const router = useRouter();
  const [gridSize, setGridSize] = useState<GridSize>('grid');
  const level = levelOptions.find((l) => l.id === levelId);
  const activities = getActivitiesByLevel(levelId);

  const gridClasses = {
    grid: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    'grid-md': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    'grid-lg': 'grid-cols-1 md:grid-cols-2',
    list: 'grid-cols-1',
  };

  const getActivityCardClass = (size: GridSize) => {
    switch (size) {
      case 'grid':
        return 'flex-row md:flex-col';
      case 'list':
        return 'flex-row';
      default:
        return 'flex-col';
    }
  };

  const getImageClass = (size: GridSize) => {
    switch (size) {
      case 'grid':
        return 'w-24 h-24 md:w-full md:aspect-video';
      case 'list':
        return 'w-24 h-24';
      default:
        return 'w-full aspect-video';
    }
  };

  const getContentClass = (size: GridSize) => {
    return size === 'list' ? 'flex-1' : 'w-full';
  };

  if (!level) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Level not found</h1>
        <Link href="/activities/levels" className="text-primary hover:underline">
          ← Back to all levels
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 sm:mb-0 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Levels
          </Button>
          <h1 className="text-2xl md:text-3xl font-bold">{level.name} Activities</h1>
          <p className="text-muted-foreground">
            {activities.length} activities found for {level.name.toLowerCase()} level
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <Button
            variant={gridSize === 'grid' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setGridSize('grid')}
            className="h-8 w-8"
            title="Grid View"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={gridSize === 'grid-md' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setGridSize('grid-md')}
            className="h-8 w-8"
            title="Medium Grid"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={gridSize === 'grid-lg' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setGridSize('grid-lg')}
            className="h-8 w-8"
            title="Large Grid"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={gridSize === 'list' ? 'default' : 'ghost'}
            size="icon"
            onClick={() => setGridSize('list')}
            className="h-8 w-8"
            title="List View"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No activities found for this level.</p>
        </div>
      ) : (
        <div className={`grid ${gridClasses[gridSize]} gap-4`}>
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/session/${activity.id}`}
              className={`group block hover:shadow-md transition-all duration-200 rounded-lg overflow-hidden bg-white dark:bg-gray-800 border border-border ${gridSize === 'list' ? 'h-32' : 'h-full'}`}
            >
              <div className={`flex ${getActivityCardClass(gridSize)} h-full`}>
                <div className={`relative bg-muted ${getImageClass(gridSize)} flex-shrink-0`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-4xl">
                    {level.icon}
                  </div>
                </div>
                <div className={`p-4 ${getContentClass(gridSize)}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {activity.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto text-xs text-muted-foreground">
                    <span>{activity.duration}</span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted">
                      {activity.level.charAt(0).toUpperCase() + activity.level.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
