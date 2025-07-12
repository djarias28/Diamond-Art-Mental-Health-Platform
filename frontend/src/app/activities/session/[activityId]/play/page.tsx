"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, RotateCcw, Check, Save, Pause, Play, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';

// Define the Activity interface for the play page
interface Activity {
  id: string;
  title: string;
  colors: string[];
  gridSize: { width: number; height: number };
  mood: string;
}

// Mock data for all activities
const mockActivities: Record<string, Activity> = {
  // Calm activities
  'calm-1': {
    id: 'calm-1',
    title: 'Ocean Wave Diamond Art',
    colors: ['#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6'],
    gridSize: { width: 20, height: 20 },
    mood: 'calm'
  },
  'calm-2': {
    id: 'calm-2',
    title: 'Serene Landscape',
    colors: ['#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d'],
    gridSize: { width: 20, height: 20 },
    mood: 'calm'
  },
  // Energetic activities
  'energy-1': {
    id: 'energy-1',
    title: 'Electric Dreams',
    colors: ['#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207'],
    gridSize: { width: 20, height: 20 },
    mood: 'energetic'
  },
  'energy-2': {
    id: 'energy-2',
    title: 'Dance Party',
    colors: ['#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b'],
    gridSize: { width: 20, height: 20 },
    mood: 'energetic'
  },
  // Focused activities
  'focused-1': {
    id: 'focused-1',
    title: 'Geometric Patterns',
    colors: ['#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#3b0764'],
    gridSize: { width: 20, height: 20 },
    mood: 'focused'
  },
  'focused-2': {
    id: 'focused-2',
    title: 'Mandalas',
    colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95'],
    gridSize: { width: 20, height: 20 },
    mood: 'focused'
  },
  // Creative activities
  'creative-1': {
    id: 'creative-1',
    title: 'Abstract Expression',
    colors: ['#ec4899', '#db2777', '#be185d', '#9d174d', '#831843'],
    gridSize: { width: 20, height: 20 },
    mood: 'creative'
  },
  'creative-2': {
    id: 'creative-2',
    title: 'Color Splash',
    colors: ['#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d'],
    gridSize: { width: 20, height: 20 },
    mood: 'creative'
  },
  // Stressed activities
  'stressed-1': {
    id: 'stressed-1',
    title: 'Tranquil Garden',
    colors: ['#10b981', '#059669', '#047857', '#065f46', '#064e3b'],
    gridSize: { width: 20, height: 20 },
    mood: 'stressed'
  },
  'stressed-2': {
    id: 'stressed-2',
    title: 'Ocean Sunset',
    colors: ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'],
    gridSize: { width: 20, height: 20 },
    mood: 'stressed'
  },
  // Happy activities
  'happy-1': {
    id: 'happy-1',
    title: 'Rainbow Unicorn',
    colors: ['#f472b6', '#f97316', '#eab308', '#84cc16', '#10b981', '#06b6d4', '#8b5cf6'],
    gridSize: { width: 20, height: 20 },
    mood: 'happy'
  },
  'happy-2': {
    id: 'happy-2',
    title: 'Tropical Paradise',
    colors: ['#f97316', '#f59e0b', '#84cc16', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899'],
    gridSize: { width: 20, height: 20 },
    mood: 'happy'
  }
} as const;

export default function DiamondArtPlayPage() {
  const params = useParams<{ activityId: string }>();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [grid, setGrid] = useState<(string | null)[][]>([]);
  const [gridSize, setGridSize] = useState<{width: number; height: number}>({width: 10, height: 10});
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);
  const [isLongPressing, setIsLongPressing] = useState(false);

  const gridSizes = [
    { label: '10x10', value: {width: 10, height: 10} },
    { label: '15x15', value: {width: 15, height: 15} },
    { label: '20x20', value: {width: 20, height: 20} },
    { label: '25x25', value: {width: 25, height: 25} },
  ];

  const activity = mockActivities[params.activityId as keyof typeof mockActivities];
  
  const initializeGrid = useCallback(() => {
    const newGrid = Array(gridSize.height).fill(null).map(() => 
      Array(gridSize.width).fill(null)
    );
    setGrid(newGrid);
  }, [gridSize.width, gridSize.height]);
  
  // Initialize grid when component mounts or activity changes
  useEffect(() => {
    initializeGrid();
  }, [activity, gridSize, initializeGrid]);

  // Save grid state to localStorage when it changes
  useEffect(() => {
    if (grid.length > 0 && grid[0].length > 0) {
      localStorage.setItem(`diamond-art-${activity.id}`, JSON.stringify({
        grid,
        gridSize,
        elapsedTime
      }));
    }
  }, [grid, gridSize, elapsedTime, activity.id]);

  // Load saved state when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem(`diamond-art-${activity.id}`);
    if (savedData) {
      try {
        const { grid: savedGrid, gridSize: savedGridSize, elapsedTime: savedTime } = JSON.parse(savedData);
        
        // Only load if the grid size matches
        if (savedGridSize?.width === gridSize.width && savedGridSize?.height === gridSize.height) {
          setGrid(savedGrid);
          setElapsedTime(savedTime || 0);
          
          // Start the timer if there's any progress
          if (savedGrid.some((row: (string | null)[]) => row.some((cell: string | null) => cell !== null))) {
            setIsPlaying(true);
          }
        }
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, [activity.id, gridSize]);

  // Timer effect
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isPlaying]);
  
  if (!activity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-white/80 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Activity Not Found</h2>
          <p className="mb-6">The requested activity could not be found.</p>
          <Link 
            href="/activities/mood"
            className="inline-flex items-center text-primary hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Link>
        </div>
      </div>
    );
  }
  
  const handleCellClick = (row: number, col: number) => {
    if (!selectedColor) return;
    
    // Start the timer if this is the first cell being colored
    const isFirstCell = grid.flat().every(cell => cell === null);
    if (isFirstCell) {
      setIsPlaying(true);
    }
    
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = selectedColor;
      return newGrid;
    });
  };
  
  const handleClearCell = (row: number, col: number) => {
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[row] = [...newGrid[row]];
      newGrid[row][col] = null;
      return newGrid;
    });
  };
  
  const handleResetGrid = () => {
    toast.custom((t) => (
      <div className="flex flex-col space-y-4 p-4 bg-background rounded-lg shadow-lg border">
        <p className="font-medium">Reset Progress</p>
        <p className="text-sm text-muted-foreground">Are you sure you want to reset your progress? This cannot be undone.</p>
        <div className="flex justify-end space-x-2 mt-2">
          <button 
            onClick={() => toast.dismiss(t)}
            className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              const newGrid = Array(gridSize.height).fill(null).map(() => Array(gridSize.width).fill(null));
              setGrid(newGrid);
              setElapsedTime(0);
              setIsPlaying(false);
              localStorage.removeItem(`diamond-art-${activity.id}`);
              toast.success('Canvas has been reset');
              toast.dismiss(t);
            }}
            className="px-4 py-2 text-sm font-medium text-destructive hover:text-destructive/90"
          >
            Reset
          </button>
        </div>
      </div>
    ), { duration: 10000, position: 'top-center' });
  };
  
  const handleSaveProgress = () => {
    localStorage.setItem(`diamond-art-${activity.id}`, JSON.stringify({
      grid,
      gridSize,
      elapsedTime
    }));
    toast.success('Progress saved successfully!');
  };
  
  const handleTouchStart = (row: number, col: number) => {
    // Start a timer for long press
    const timer = setTimeout(() => {
      setIsLongPressing(true);
      // Clear the cell on long press
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = null;
        return newGrid;
      });
    }, 500); // 500ms for long press
    
    setTouchTimer(timer);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Clear the long press timer if it exists
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
    
    // If we were in a long press, prevent the normal click behavior
    if (isLongPressing) {
      e.preventDefault();
      setIsLongPressing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const completionPercentage = Math.round(
    (grid.flat().filter(cell => cell !== null).length / 
     (gridSize.width * gridSize.height)) * 100
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <Link 
            href={`/activities/session/${activity.id}`}
            className="flex items-center text-primary hover:underline dark:text-blue-400"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="dark:text-white">Back to Activity</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-muted/50 dark:bg-gray-700/50 dark:text-white px-4 py-2 rounded-lg">
              <span className="font-medium">{formatTime(elapsedTime)}</span>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary dark:bg-blue-500/20 dark:hover:bg-blue-500/30 dark:text-blue-400 transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Canvas */}
          <div className="flex-1 overflow-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 sm:p-4">
              <div 
                ref={canvasRef}
                className="grid gap-0.5 sm:gap-1 mx-auto"
                style={{
                  gridTemplateColumns: `repeat(${gridSize.width}, minmax(0, 1fr))`,
                  width: 'fit-content',
                  maxWidth: '100%',
                }}
              >
                {grid.map((row, rowIndex) => (
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`
                        aspect-square w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 
                        border border-gray-300 dark:border-gray-600 rounded-sm 
                        cursor-pointer transition-all duration-200
                        ${selectedColor ? 'hover:brightness-110' : ''}
                        ${isLongPressing ? 'opacity-70' : ''}
                        ${!cell ? 'bg-white dark:bg-gray-800' : ''}
                      `}
                      style={{
                        backgroundColor: cell || 'transparent',
                        boxShadow: cell ? 'inset 0 0 4px rgba(0,0,0,0.1)' : 'none',
                        transform: isLongPressing ? 'scale(0.9)' : 'none',
                        transition: 'transform 0.1s ease, background-color 0.2s ease',
                      }}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onTouchStart={() => handleTouchStart(rowIndex, colIndex)}
                      onTouchEnd={handleTouchEnd}
                      onTouchMove={() => {
                        if (touchTimer) {
                          clearTimeout(touchTimer);
                          setTouchTimer(null);
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        handleClearCell(rowIndex, colIndex);
                      }}
                      title={cell ? 'Right-click or long-press to clear' : 'Click to place color'}
                    />
                  ))
                ))}
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground dark:text-gray-300">
                {completionPercentage}% Complete
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleResetGrid}
                  className="p-2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors"
                  title="Reset canvas"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={handleSaveProgress}
                  className="p-2 text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-white transition-colors"
                  title="Save progress"
                >
                  <Save className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Controls */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="glass-card dark:bg-gray-800/90 dark:border-gray-700 p-6 rounded-2xl">
              <h2 className="text-xl font-bold mb-4 dark:text-white">{activity.title}</h2>
              <p className="text-sm text-muted-foreground dark:text-gray-300 mb-4 capitalize">
                Mood: {activity.mood}
              </p>
              
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full bg-muted dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">Time Spent</span>
                  <span className="font-medium dark:text-white">{formatTime(elapsedTime)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground dark:text-gray-400">Diamonds Placed</span>
                  <span className="font-medium dark:text-white">
                    {grid.flat().filter(cell => cell !== null).length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="glass-card dark:bg-gray-800/90 dark:border-gray-700 p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-4 dark:text-white">Grid Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground dark:text-gray-300 mb-2">
                    Grid Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {gridSizes.map((size) => (
                      <button
                        key={size.label}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          gridSize.width === size.value.width
                            ? 'bg-primary text-white'
                            : 'bg-muted/50 hover:bg-muted dark:bg-gray-700/50 dark:hover:bg-gray-700/70'
                        }`}
                        onClick={() => setGridSize(size.value)}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-card dark:bg-gray-800/90 dark:border-gray-700 p-6 rounded-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium dark:text-white">Color Palette</h3>
                <button 
                  className="p-1 rounded-full hover:bg-muted dark:hover:bg-gray-700 transition-colors"
                  title="Toggle palette"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {activity.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-full aspect-square rounded-full border-2 transition-transform ${
                      selectedColor === color 
                        ? 'ring-2 ring-offset-2 ring-primary scale-110 dark:ring-offset-gray-800' 
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: color, borderColor: selectedColor === color ? color : 'rgba(0,0,0,0.1)' }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color}`}
                  >
                    {selectedColor === color && (
                      <div className="w-full h-full flex items-center justify-center text-white">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              
              {selectedColor && (
                <div className="mt-4 p-3 bg-muted/50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground dark:text-gray-300">Selected:</span>
                    <div 
                      className="w-6 h-6 rounded-full border-2 border-foreground/20"
                      style={{ backgroundColor: selectedColor }}
                    />
                  </div>
                </div>
              )}
              
              <button
                onClick={() => setSelectedColor(null)}
                disabled={!selectedColor}
                className={`w-full mt-4 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  selectedColor
                    ? 'bg-destructive text-destructive-foreground hover:text-destructive/90 dark:bg-red-600 dark:hover:bg-red-700'
                    : 'bg-muted text-muted-foreground cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                }`}
              >
                Clear Selection
              </button>
            </div>
            
            <div className="glass-card dark:bg-gray-800/90 dark:border-gray-700 p-4 text-center">
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Tip: Click to place, right-click or long-press to remove
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
