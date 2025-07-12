'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiImage, FiRotateCw } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';
import { Eraser } from 'lucide-react';
import {Diamond} from 'lucide-react';

type Tool = 'diamond' | 'eraser' | 'fill' | 'color-picker';
type Color = string;

const DEFAULT_COLORS: Color[] = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
  '#D4A373', '#FEFAE0', '#E9EDC9', '#CCD5AE', '#FAEDCD', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
];

export default function DesignCreator() {
  const [selectedTool, setSelectedTool] = useState<Tool>('diamond');
  const [selectedColor, setSelectedColor] = useState<Color>('#FF6B6B'); 
  const [colors] = useState<Color[]>(DEFAULT_COLORS);
  const [gridSize, setGridSize] = useState(20);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [canvas, setCanvas] = useState<{ color: string | null }[][]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize canvas
  const initializeCanvas = useCallback(() => {
    const newCanvas = [];
    for (let i = 0; i < gridSize; i++) {
      const row = [];
      for (let j = 0; j < gridSize; j++) {
        row.push({ color: null });
      }
      newCanvas.push(row);
    }
    setCanvas(newCanvas);
  }, [gridSize]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  const handleCellClick = (row: number, col: number) => {
    if (selectedTool === 'diamond') {
      const newCanvas = [...canvas];
      newCanvas[row][col].color = selectedColor;
      setCanvas(newCanvas);
    } else if (selectedTool === 'eraser') {
      const newCanvas = [...canvas];
      newCanvas[row][col].color = null;
      setCanvas(newCanvas);
    }
  };

  const clearCanvas = () => {
    toast((t) => (
      <div className="space-y-4">
        <p className="font-medium">Are you sure you want to clear the canvas?</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              initializeCanvas();
              toast.success('Canvas cleared!');
              toast.dismiss(t.id);
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>
    ), {
      duration: Infinity, // Keep the toast open until user interacts
      style: {
        minWidth: '300px',
        padding: '1rem',
      },
    });
  };

  const saveDesign = () => {
    // Add your save logic here
    toast.promise(
      new Promise((resolve) => {
        // Simulate API call
        setTimeout(() => {
          resolve('Design saved successfully!');
        }, 1000);
      }),
      {
        loading: 'Saving your design...',
        success: (message) => message as string,
        error: 'Failed to save design',
      }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast.error('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Create a temporary canvas to process the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas dimensions to match the grid size
        canvas.width = gridSize;
        canvas.height = gridSize;

        // Draw image on canvas (scaled to fit the grid)
        ctx.drawImage(img, 0, 0, gridSize, gridSize);

        // Get image data and create new canvas
        const imageData = ctx.getImageData(0, 0, gridSize, gridSize);
        const newCanvas = [];

        // Convert image to diamond art pattern
        for (let y = 0; y < gridSize; y++) {
          const row = [];
          for (let x = 0; x < gridSize; x++) {
            const i = (y * gridSize + x) * 4;
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];
            // Convert to hex color
            const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
            // Find the closest color from our palette
            const closestColor = findClosestColor(hex);
            row.push({ color: closestColor });
          }
          newCanvas.push(row);
        }
        
        setCanvas(newCanvas);
        toast.success('Image imported successfully!');
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Helper function to find the closest color from our palette
  const findClosestColor = (hexColor: string): string => {
    // Convert hex to RGB
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Find the closest color in our palette
    let closestColor = colors[0];
    let minDistance = Number.MAX_VALUE;

    colors.forEach(color => {
      const colorHex = color.replace('#', '');
      const cr = parseInt(colorHex.substring(0, 2), 16);
      const cg = parseInt(colorHex.substring(2, 4), 16);
      const cb = parseInt(colorHex.substring(4, 6), 16);

      // Calculate color distance (simple Euclidean distance in RGB space)
      const distance = Math.sqrt(
        Math.pow(r - cr, 2) + 
        Math.pow(g - cg, 2) + 
        Math.pow(b - cb, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestColor = color;
      }
    });

    return closestColor;
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--background))',
            color: 'hsl(var(--foreground))',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '0.75rem',
            padding: '0.75rem 1rem',
            border: '1px solid hsl(var(--border))',
          },
          success: {
            iconTheme: {
              primary: 'hsl(var(--primary))',
              secondary: 'hsl(var(--primary-foreground))',
            },
          },
          error: {
            iconTheme: {
              primary: 'hsl(var(--destructive))',
              secondary: 'hsl(var(--destructive-foreground))',
            },
          },
        }}
      />
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Create Your Diamond Art Design
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Tools</h2>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={() => setSelectedTool('diamond')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                  selectedTool === 'diamond' 
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Diamond className="w-5 h-5 mb-1" />
                <span className="text-xs">Diamond</span>
              </button>
              
              <button
                onClick={() => setSelectedTool('eraser')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                  selectedTool === 'eraser' 
                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-300 shadow-md' 
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                <Eraser className="w-5 h-5 mb-1" />
                <span className="text-xs">Eraser</span>
              </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Colors Theme <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(scrollable)</span></h2>
            <div className="flex overflow-x-auto pb-2 -mx-2">
              <div className="flex gap-2 px-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 flex-shrink-0 rounded-full transition-transform hover:scale-110 border-2 ${
                      selectedColor === color 
                        ? 'border-indigo-500 dark:border-indigo-400 scale-110 ring-2 ring-offset-2 ring-indigo-200 dark:ring-indigo-800' 
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3 mt-6">
              <button 
                onClick={saveDesign}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white py-2 px-4 rounded-xl transition-colors"
              >
                <FiSave className="w-4 h-4" />
                Save Design
              </button>
              <button 
                onClick={clearCanvas}
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <FiRotateCw className="w-4 h-4" />
                Clear Canvas
              </button>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={triggerFileInput}
                  className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <FiImage className="w-4 h-4" />
                  Import Image
                </button>
              </div>
            </div>
          </motion.div>

          {/* Canvas */}
          <div className="lg:col-span-3">
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Canvas</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Grid: {gridSize}×{gridSize}</span>
                  <select 
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    className="text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg px-2 py-1"
                  >
                    <option value={10}>10×10</option>
                    <option value={20}>20×20</option>
                    <option value={30}>30×30</option>
                    <option value={40}>40×40</option>
                  </select>
                </div>
              </div>
              
              <div 
                ref={canvasRef}
                className="w-full aspect-square bg-white dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden"
              >
                <div 
                  className="grid w-full h-full"
                  style={{
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
                  }}
                >
                  {canvas.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        className={`border border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-colors ${
                          !cell.color ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''
                        }`}
                        style={{
                          backgroundColor: cell.color || 'transparent',
                        }}
                      />
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
