/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, RotateCcw, Palette, Download, Share2, Volume2, VolumeX, Grid, ImageIcon, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Activity } from '@/app/activities/types';
import Image from 'next/image';

interface ActivitySessionProps {
  activity: Activity;
}

export default function ActivitySession({ activity }: ActivitySessionProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6');
  const [isComplete, setIsComplete] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [gridSize, setGridSize] = useState<number>(20); // Default grid size
  const [isErasing, setIsErasing] = useState(false);
  const [canvasData, setCanvasData] = useState<string | null>(null);
  const [showReference, setShowReference] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const colors = [
    '#3b82f6', // blue-500
    '#ef4444', // red-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
    '#14b8a6', // teal-500
    '#f97316', // orange-500
  ];

  const gridSizes = [
    { value: 10, label: '10x10' },
    { value: 20, label: '20x20' },
    { value: 30, label: '30x30' },
  ];

  const toggleEraser = () => {
    setIsErasing(!isErasing);
  };

  // Update the drawGrid function for better mobile display
  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, size: number, scale: number = 1) => {
    const gridCellSize = gridSize;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set background color based on theme
    ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#ffffff';
    ctx.fillRect(0, 0, size, size);
    
    // Calculate number of cells that can fit, accounting for scale
    const numCells = Math.ceil(size / (gridCellSize * scale));
    const scaledGridSize = gridCellSize * scale;
    
    // Set grid colors based on theme
    const mainGridColor = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    const subGridColor = isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    
    // Draw main grid lines (darker)
    ctx.strokeStyle = mainGridColor;
    ctx.lineWidth = Math.max(1, 1 / scale); // Ensure minimum line width of 1px
    
    // Draw vertical main grid lines
    for (let i = 0; i <= numCells; i++) {
      const x = Math.round(i * scaledGridSize) + 0.5; // Add 0.5 for crisp lines
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    
    // Draw horizontal main grid lines
    for (let i = 0; i <= numCells; i++) {
      const y = Math.round(i * scaledGridSize) + 0.5; // Add 0.5 for crisp lines
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
    
    // Only draw sub-grid for larger cells on mobile
    const isMobile = window.innerWidth < 768; // 768px is typically tablet breakpoint
    if ((!isMobile && scaledGridSize > 15) || (isMobile && scaledGridSize > 25)) {
      ctx.strokeStyle = subGridColor;
      ctx.lineWidth = Math.max(0.5, 0.5 / scale); // Ensure minimum line width
      
      // Draw vertical sub-grid lines
      for (let i = 0; i <= numCells * 2; i++) {
        const x = Math.round((i * scaledGridSize) / 2) + 0.5;
        if (x % scaledGridSize !== 0) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, size);
          ctx.stroke();
        }
      }
      
      // Draw horizontal sub-grid lines
      for (let i = 0; i <= numCells * 2; i++) {
        const y = Math.round((i * scaledGridSize) / 2) + 0.5;
        if (y % scaledGridSize !== 0) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(size, y);
          ctx.stroke();
        }
      }
    }
    
    // Add subtle border around the canvas
    ctx.strokeStyle = isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = Math.max(1, 1 / scale);
    ctx.strokeRect(0.5, 0.5, size - 1, size - 1);
  }, [gridSize]);

  const drawAtPosition = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gridCellSize = gridSize;
    const gridX = Math.floor(x / gridCellSize) * gridCellSize;
    const gridY = Math.floor(y / gridCellSize) * gridCellSize;

    // Draw or erase based on mode
    if (isErasing) {
      // Erase by filling with background color
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      ctx.fillStyle = isDarkMode ? '#1a1a1a' : '#ffffff';
    } else {
      // Draw with selected color
      ctx.fillStyle = selectedColor;
    }

    ctx.fillRect(gridX, gridY, gridCellSize, gridCellSize);

    // Redraw grid lines
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const gridLineColor = isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
    ctx.strokeStyle = gridLineColor;
    ctx.lineWidth = 1;
    ctx.strokeRect(gridX, gridY, gridCellSize, gridCellSize);

    // Update the canvas data state to trigger a save
    setCanvasData(canvas.toDataURL('image/png'));
  }, [gridSize, selectedColor, isErasing]);

  const updateProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let filledPixels = 0;
    let totalPixels = 0;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const bgColor = isDarkMode ? [26, 26, 26] : [255, 255, 255];

    // Get level-specific progress requirements
    const getLevelMultiplier = () => {
      switch (activity.level) {
        case 'beginner':
          return 0.5;    // 50% of cells need to be filled for completion
        case 'intermediate':
          return 0.65;   // 65% of cells need to be filled
        case 'advanced':
          return 0.8;    // 80% of cells need to be filled
        case 'expert':
          return 0.9;    // 90% of cells need to be filled
        default:
          return 0.5;
      }
    };

    const levelMultiplier = getLevelMultiplier();
    
    // For beginners, use larger grid cells to make progress smoother
    const cellSize = activity.level === 'beginner' ? gridSize * 3 : gridSize * 2;
    
    // Calculate progress based on grid cells
    for (let y = 0; y < canvas.height; y += cellSize) {
      for (let x = 0; x < canvas.width; x += cellSize) {
        totalPixels++;
        const index = (y * canvas.width + x) * 4;
        
        // Check if the pixel is not transparent and not the background color
        if (pixels[index + 3] > 0 && 
            (pixels[index] !== bgColor[0] || 
             pixels[index + 1] !== bgColor[1] || 
             pixels[index + 2] !== bgColor[2])) {
          filledPixels++;
        }
      }
    }

    // Calculate raw progress (0-100%)
    const rawProgress = totalPixels > 0 ? (filledPixels / totalPixels) * 100 : 0;
    
    // Apply level multiplier to get adjusted progress
    const adjustedProgress = Math.min(Math.round((rawProgress / 100) * levelMultiplier * 100), 100);
    
    // Only update if progress has changed significantly (more than 1%)
    if (Math.abs(adjustedProgress - progress) >= 1) {
      const newProgress = adjustedProgress;
      setProgress(newProgress);
      
      if (newProgress === 100) {
        setIsComplete(true);
        toast.success('Congratulations! You\'ve completed the activity!');
      }
      
      // This will trigger the save effect
      setCanvasData(prev => prev);
    }
  }, [progress, gridSize, activity.level]);

  const handleTouchStart = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Start drawing
    drawAtPosition(x, y);
    setIsDrawing(true);
  }, [drawAtPosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // Continue drawing
    drawAtPosition(x, y);
  }, [isDrawing, drawAtPosition]);

  const handleTouchEnd = useCallback(() => {
    setIsDrawing(false);
    if (!isErasing) {
      updateProgress();
    }
  }, [isErasing, updateProgress]);

  // Update the canvas initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      // Calculate size to fit container with some padding on mobile
      const isMobile = window.innerWidth < 768;
      const padding = isMobile ? 20 : 40;
      const displaySize = Math.min(container.clientWidth - padding, 600);
      
      // Get device pixel ratio, but cap it for better performance on mobile
      const scale = Math.min(window.devicePixelRatio || 1, isMobile ? 2 : 3);
      
      // Set display size (CSS pixels)
      canvas.style.width = `${displaySize}px`;
      canvas.style.height = `${displaySize}px`;
      
      // Set actual size in memory (scaled for device DPI)
      const bufferSize = Math.floor(displaySize * scale);
      canvas.width = bufferSize;
      canvas.height = bufferSize;
      
      // Reset transform and scale the context
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(scale, scale);
      
      // Draw the grid with the correct scale
      drawGrid(ctx, displaySize, scale);
      
      // Load saved state immediately after initial draw
      loadCanvasState();
    };

    // Initial setup
    updateCanvasSize();
    
    // Handle window resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateCanvasSize, 100);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [drawGrid, activity.id]);

  // Update loadCanvasState to handle canvas state more reliably
  const loadCanvasState = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load saved canvas data
    const savedData = localStorage.getItem(`canvas_${activity.id}`);
    if (savedData) {
      const img = new window.Image();
      img.onload = () => {
        // Clear the canvas and redraw the grid first
        const displaySize = parseInt(canvas.style.width || '600', 10);
        drawGrid(ctx, displaySize);
        // Then draw the saved image
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        setCanvasData(savedData);
      };
      img.onerror = (e) => {
        console.error('Error loading saved canvas data:', e);
        // If there's an error loading the image, just redraw the grid
        const displaySize = parseInt(canvas.style.width || '600', 10);
        drawGrid(ctx, displaySize);
      };
      img.src = savedData;
    } else {
      // If no saved data, just ensure the grid is drawn
      const displaySize = parseInt(canvas.style.width || '600', 10);
      drawGrid(ctx, displaySize);
    }

    // Load saved progress
    const savedProgress = localStorage.getItem(`progress_${activity.id}`);
    if (savedProgress) {
      const progressValue = parseInt(savedProgress, 10);
      setProgress(progressValue);
      setIsComplete(progressValue === 100);
    }
  }, [activity.id, drawGrid]);

  const resetCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear all saved states from localStorage
    localStorage.removeItem(`canvas_${activity.id}`);
    localStorage.removeItem(`progress_${activity.id}`);
    
    // Reset states
    setCanvasData(null);
    setProgress(0);
    setIsComplete(false);

    // Redraw the grid
    const size = Math.min(canvas.width, canvas.height);
    drawGrid(ctx, size);
  }, [activity.id, drawGrid]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawAtPosition(x, y);
    setIsDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawAtPosition(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    if (!isErasing) {
      updateProgress();
    }
  };

  const shareActivity = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `Check out my Diamond Art: ${activity.title}`,
          text: `I just completed the ${activity.title} activity on Diamond Art!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const downloadArt = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `diamond-art-${activity.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const toggleReference = () => {
    setShowReference(!showReference);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Activities
          </Button>

          <div className="flex items-center gap-2 flex-wrap justify-center overflow-x-auto pb-2">
            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg flex-nowrap">
              <span className="text-sm font-medium px-2 text-muted-foreground whitespace-nowrap">
                <Grid className="w-4 h-4 inline-block mr-1" />
                Grid:
              </span>
              {gridSizes.map((size) => (
                <Button
                  key={size.value}
                  variant={gridSize === size.value ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => {
                    setGridSize(size.value);
                    // Redraw canvas with new grid size
                    const canvas = canvasRef.current;
                    if (canvas) {
                      const ctx = canvas.getContext('2d');
                      if (ctx) {
                        drawGrid(ctx, canvas.width);
                      }
                    }
                  }}
                  className="h-8 px-3 text-xs whitespace-nowrap"
                >
                  {size.label}
                </Button>
              ))}
            </div>

            <Button
              variant={isErasing ? 'destructive' : 'outline'}
              size="sm"
              onClick={toggleEraser}
              className="h-8 whitespace-nowrap"
            >
              {isErasing ? 'Drawing Mode' : 'Eraser'}
            </Button>

            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
              <span className="text-sm font-medium px-2 text-muted-foreground">
                <Palette className="w-4 h-4 inline-block mr-1" />
                Colors:
              </span>
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-primary' : 'border-transparent'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={resetCanvas}
              className="h-8 w-8"
              title="Reset Canvas"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={downloadArt}
              className="h-8 w-8"
              title="Download Art"
            >
              <Download className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={shareActivity}
              className="h-8 w-8"
              title="Share Art"
            >
              <Share2 className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMuted(!isMuted)}
              className="h-8 w-8"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-foreground">{activity.title}</h1>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleReference}
                  className="flex items-center gap-2"
                >
                  {showReference ? 'Hide Reference' : 'Show Reference'}
                  <ImageIcon className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">{activity.description}</p>

              {isComplete && (
                <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Activity completed! Take a moment to appreciate your work.</span>
                </div>
              )}
            </div>

            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-full max-w-md aspect-square bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md">
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  className="absolute inset-0 w-full h-full touch-none select-none max-w-full h-auto"
                  style={{
                    touchAction: 'none', // Prevent default touch behaviors
                    WebkitTapHighlightColor: 'transparent', // Remove tap highlight on iOS
                  }}
                />

                {showReference && (
                  <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl w-full max-h-[90vh] bg-background rounded-lg overflow-hidden">
                      <Image
                        src={activity.image}
                        alt={`Reference for ${activity.title}`}
                        width={800}
                        height={600}
                        className="w-full h-auto max-h-[80vh] object-contain"
                        onLoadingComplete={() => setIsLoading(false)}
                      />
                      {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleReference}
                        className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                      <div className="p-4 bg-background/80 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground">Reference Image - {activity.level} Level</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm text-muted-foreground text-center">
                Click and drag to place diamonds on the grid
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
