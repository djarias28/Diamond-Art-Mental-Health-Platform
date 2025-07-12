import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Popular Designs | Diamond Art',
  description: 'Browse the most popular diamond art designs in our community.',
};

type Design = {
  id: string;
  title: string;
  author: string;
  likes: number;
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  colors: number;
  size: string;
};

const popularDesigns: Design[] = [
  {
    id: '1',
    title: 'Tropical Sunset',
    author: 'Sarah K.',
    likes: 1243,
    imageUrl: '/images/designs/tropical-sunset.jpg',
    difficulty: 'Intermediate',
    colors: 28,
    size: '40x50cm',
  },
  {
    id: '2',
    title: 'Mountain Lake',
    author: 'Michael T.',
    likes: 987,
    imageUrl: '/images/designs/mountain-lake.jpg',
    difficulty: 'Advanced',
    colors: 42,
    size: '50x70cm',
  },
  {
    id: '3',
    title: 'Floral Mandala',
    author: 'Priya M.',
    likes: 1567,
    imageUrl: '/images/designs/floral-mandala.jpg',
    difficulty: 'Intermediate',
    colors: 35,
    size: '40x40cm',
  },
  {
    id: '4',
    title: 'Ocean Waves',
    author: 'Carlos R.',
    likes: 2034,
    imageUrl: '/images/designs/ocean-waves.jpg',
    difficulty: 'Beginner',
    colors: 15,
    size: '30x40cm',
  },
  {
    id: '5',
    title: 'Galaxy Cat',
    author: 'Jamie L.',
    likes: 3120,
    imageUrl: '/images/designs/galaxy-cat.jpg',
    difficulty: 'Advanced',
    colors: 38,
    size: '50x70cm',
  },
  {
    id: '6',
    title: 'Autumn Forest',
    author: 'Emma W.',
    likes: 1456,
    imageUrl: '/images/designs/autumn-forest.jpg',
    difficulty: 'Intermediate',
    colors: 24,
    size: '40x50cm',
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-blue-100 text-blue-800';
    case 'Advanced':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function PopularDesignsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Popular Designs</h1>
        <p className="text-xl text-muted-foreground">
          Discover what others in our community are creating
        </p>
      </div>

      <div className="mb-8 flex justify-between items-center">
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-full">
            All Designs
          </button>
          <button className="px-4 py-2 hover:bg-accent rounded-full">
            Trending
          </button>
          <button className="px-4 py-2 hover:bg-accent rounded-full">
            Newest
          </button>
        </div>
        <div>
          <select className="bg-background border rounded-full px-4 py-2">
            <option>Sort by: Most Popular</option>
            <option>Newest First</option>
            <option>Most Liked</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularDesigns.map((design) => (
          <div key={design.id} className="glass-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <Image
                src={design.imageUrl}
                alt={design.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                ❤️ {design.likes.toLocaleString()}
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{design.title}</h2>
                <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(design.difficulty)}`}>
                  {design.difficulty}
                </span>
              </div>
              <p className="text-muted-foreground text-sm mb-3">by {design.author}</p>
              
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>🎨 {design.colors} colors</span>
                <span>📏 {design.size}</span>
              </div>
              
              <button className="mt-4 w-full bg-primary/10 text-primary hover:bg-primary/20 py-2 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground px-6 py-3 rounded-full font-medium">
          Load More Designs
        </button>
      </div>
    </div>
  );
}
