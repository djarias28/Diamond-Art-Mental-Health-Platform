import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Heart, Palette, Award, BookOpen, Youtube } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides & Tutorials - Diamond Art',
  description: 'Learn diamond painting techniques, tips, and tricks with our comprehensive guides and tutorials.',
};

const guides = [
  {
    category: 'Getting Started',
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    items: [
      { title: 'Diamond Painting 101: A Complete Beginner\'s Guide', slug: 'diamond-painting-101' },
      { title: 'Essential Tools & Supplies for Beginners', slug: 'essential-tools-supplies' },
      { title: 'How to Read Diamond Painting Patterns', slug: 'reading-patterns' },
      { title: 'Setting Up Your First Diamond Painting Workspace', slug: 'workspace-setup' },
    ],
  },
  {
    category: 'Techniques',
    icon: <Palette className="w-6 h-6 text-primary" />,
    items: [
      { title: 'Checkerboard Technique for Faster Completion', slug: 'checkerboard-technique' },
      { title: 'How to Prevent and Fix Common Mistakes', slug: 'fixing-mistakes' },
      { title: 'Working with Different Diamond Shapes', slug: 'diamond-shapes' },
      { title: 'Creating Custom Designs from Photos', slug: 'custom-designs' },
    ],
  },
  {
    category: 'Advanced Tips',
    icon: <Award className="w-6 h-6 text-primary" />,
    items: [
      { title: 'Framing and Displaying Your Finished Work', slug: 'framing-display' },
      { title: 'Creating 3D Effects with Special Drills', slug: '3d-effects' },
      { title: 'Working with Large and Complex Canvases', slug: 'large-canvases' },
      { title: 'Mixing Custom Colors and Blends', slug: 'custom-colors' },
    ],
  },
  {
    category: 'Therapeutic Benefits',
    icon: <Heart className="w-6 h-6 text-primary" />,
    items: [
      { title: 'Using Diamond Art for Stress Relief', slug: 'stress-relief' },
      { title: 'Mindfulness Techniques While Crafting', slug: 'mindfulness' },
      { title: 'Building a Daily Creative Practice', slug: 'daily-practice' },
      { title: 'Joining a Supportive Crafting Community', slug: 'crafting-community' },
    ],
  },
];

const videoTutorials = [
  {
    title: 'Getting Started with Diamond Painting',
    duration: '8:24',
    thumbnail: '/images/guides/thumbnail-1.jpg',
    url: '#',
  },
  {
    title: 'Advanced Techniques for Perfect Placement',
    duration: '12:45',
    thumbnail: '/images/guides/thumbnail-2.jpg',
    url: '#',
  },
  {
    title: 'Framing Your Finished Masterpiece',
    duration: '6:18',
    thumbnail: '/images/guides/thumbnail-3.jpg',
    url: '#',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-6">
              Guides & Tutorials
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn new techniques, discover tips and tricks, and enhance your diamond painting skills with our comprehensive guides and video tutorials.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="#guides">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Guides
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#videos">
                  <Youtube className="w-4 h-4 mr-2" />
                  Watch Tutorials
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Section */}
      <section id="guides" className="py-16 bg-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Comprehensive Guides</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {guides.map((section) => (
                <Card key={section.category} className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {section.icon}
                      <CardTitle className="text-xl">{section.category}</CardTitle>
                    </div>
                    <CardDescription>Step-by-step guides to improve your skills</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item.slug}>
                          <Link 
                            href={`/guides/${item.slug}`}
                            className="text-foreground hover:text-primary transition-colors flex items-start"
                          >
                            <span className="mr-2">•</span>
                            <span>{item.title}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Video Tutorials Section */}
      <section id="videos" className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Video Tutorials</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {videoTutorials.map((video, index) => (
                <div key={index} className="group">
                  <div className="relative aspect-video bg-muted rounded-lg overflow-hidden mb-3">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Can&apos;t find what you&apos;re looking for?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our community forum is a great place to ask questions and get advice from fellow diamond painting enthusiasts.
          </p>
          <Button asChild>
            <Link href="/community">
              Visit Community
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
