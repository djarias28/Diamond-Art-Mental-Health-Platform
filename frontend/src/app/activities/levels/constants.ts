export type LevelOption = {
  id: string;
  name: string;
  description: string;
  projects: string;
  icon: string;
  color: string;
};

export const levelOptions: LevelOption[] = [
  {
    id: 'beginner',
    name: 'Beginner',
    description: 'Perfect for your first diamond art project',
    projects: 'Simple designs with large color blocks',
    icon: '🌱',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    description: 'For those with some experience',
    projects: 'More detailed designs with moderate complexity',
    icon: '🌿',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
  },
  {
    id: 'advanced',
    name: 'Advanced',
    description: 'Challenging projects for experienced crafters',
    projects: 'Highly detailed designs with many colors',
    icon: '🌳',
    color: 'bg-purple-50 border-purple-200 hover:border-purple-400',
  },
  {
    id: 'expert',
    name: 'Expert',
    description: 'For the most skilled diamond art enthusiasts',
    projects: 'Complex, large-scale designs with intricate details',
    icon: '🎨',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
  },
];
