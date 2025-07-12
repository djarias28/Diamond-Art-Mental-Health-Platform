export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Activity {
  id: string;
  title: string;
  description: string;
  level: Difficulty;
  duration: string;
  image: string;
  instructions: string[];
  materials: string[];
  tips?: string[];
}

export interface Level {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  projects: string;
}
