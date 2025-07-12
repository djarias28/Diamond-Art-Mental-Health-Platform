import { Activity } from '../types';

export const activities: Activity[] = [
  // Beginner activities
  {
    id: 'beginner-1',
    title: 'Peaceful Garden',
    description: 'A simple garden scene with large color blocks and minimal detail, perfect for beginners.',
    level: 'beginner',
    duration: '30-45 min',
    image: 'https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start with the largest color sections first',
      'Work from top to bottom to avoid smudging',
      'Use the wax to pick up diamonds',
      'Gently press each diamond onto the corresponding symbol',
      'Use the included tray to organize your diamonds'
    ],
    materials: [
      'Diamond painting canvas',
      'Diamond applicator pen',
      'Wax',
      'Tray',
      'Diamonds (pre-sorted)'
    ],
    tips: [
      'Work in a well-lit area',
      'Take breaks every 30 minutes to rest your eyes',
      'Store unused diamonds in the provided containers'
    ]
  },
  {
    id: 'beginner-2',
    title: 'Ocean Sunset',
    description: 'A beautiful sunset over calm ocean waves with simple color gradients.',
    level: 'beginner',
    duration: '45-60 min',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start with the lightest colors first',
      'Work in small sections',
      'Use the included tool to straighten diamonds',
      'Complete one color at a time',
      'Seal with the provided sealant when finished'
    ],
    materials: [
      'Diamond painting canvas',
      'Diamond applicator pen',
      'Wax',
      'Tray',
      'Diamonds (pre-sorted)'
    ],
    tips: [
      'Work from the top down to avoid smudging',
      'Use a ruler to help straighten rows',
      'Take your time with color transitions'
    ]
  },
  // Intermediate activities
  {
    id: 'intermediate-1',
    title: 'Mountain Serenity',
    description: 'A peaceful mountain landscape with moderate detail for those with some experience.',
    level: 'intermediate',
    duration: '60-90 min',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Start with the sky and background',
      'Work on one section at a time',
      'Use the color-coded guide',
      'Save detailed areas for last'
    ],
    materials: [
      'Diamond painting canvas',
      'Diamond applicator pen',
      'Wax',
      'Tray',
      'Diamonds (pre-sorted)'
    ],
    tips: [
      'Work in natural light if possible',
      'Take breaks to rest your eyes',
      'Use a light pad for better visibility'
    ]
  },
  // Advanced activities
  {
    id: 'advanced-1',
    title: 'Floral Fantasy',
    description: 'An intricate floral pattern with many colors and fine details.',
    level: 'advanced',
    duration: '90-120 min',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486cd94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Work on one flower at a time',
      'Start with the lightest colors',
      'Use the magnifying glass for small details',
      'Take your time with color blending'
    ],
    materials: [
      'Diamond painting canvas',
      'Diamond applicator pen',
      'Wax',
      'Tray',
      'Diamonds (pre-sorted)',
      'Magnifying glass (optional)'
    ],
    tips: [
      'Work in good lighting',
      'Take frequent breaks',
      'Use a multi-diamond applicator for large areas'
    ]
  },
  // Expert activities
  {
    id: 'expert-1',
    title: 'Celestial Dreams',
    description: 'A challenging night sky with intricate star patterns and deep colors.',
    level: 'expert',
    duration: '120+ min',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc2674?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    instructions: [
      'Work from top to bottom',
      'Start with the darkest colors',
      'Use a single-diamond applicator for stars',
      'Take your time with the details'
    ],
    materials: [
      'Diamond painting canvas',
      'Diamond applicator pens (multiple sizes)',
      'Wax',
      'Tray',
      'Diamonds (pre-sorted)',
      'Tweezers for precise placement'
    ],
    tips: [
      'Work in a well-lit area',
      'Take regular breaks to rest your eyes',
      'Use a light pad for better visibility of symbols'
    ]
  }
];

// Helper function to filter activities by level
export function getActivitiesByLevel(level: string): Activity[] {
  return activities.filter(activity => activity.level === level);
}

// Get a single activity by ID
export function getActivityById(id: string): Activity | undefined {
  return activities.find(activity => activity.id === id);
}

export default activities;
