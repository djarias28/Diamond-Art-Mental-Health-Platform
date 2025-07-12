import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Users, Palette, Clock, Tag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us - Diamond Art',
  description: 'Learn about our mission to promote mental wellness through the therapeutic art of diamond painting.',
};

export default function AboutPage() {
  const stats = [
    { value: '10,000+', label: 'Happy Crafters', icon: <Users className="w-6 h-6 text-primary" /> },
    { value: '50+', label: 'Therapeutic Designs', icon: <Palette className="w-6 h-6 text-primary" /> },
    { value: '24/7', label: 'Community Support', icon: <Clock className="w-6 h-6 text-primary" /> },
    { value: '100%', label: 'Satisfaction', icon: <Heart className="w-6 h-6 text-primary" /> },
  ];

  const features = [
    {
      icon: <Heart className="w-8 h-8 text-pink-500" />,
      title: 'Mindful Crafting',
      description: 'Our designs are carefully curated to promote mindfulness and relaxation.',
      tags: ['Mindfulness', 'Relaxation', 'Therapy']
    },
    {
      icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
      title: 'Quality Materials',
      description: 'Premium diamond drills and canvas for a satisfying crafting experience.',
      tags: ['Premium', 'Durable', 'Vibrant']
    },
    {
      icon: <Users className="w-8 h-8 text-blue-500" />,
      title: 'Supportive Community',
      description: 'Connect with fellow crafters and share your journey.',
      tags: ['Community', 'Support', 'Sharing']
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: 'Endless Creativity',
      description: 'From beginner to expert, find designs that match your skill level.',
      tags: ['Creative', 'All Levels', 'Custom']
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative py-32 overflow-hidden bg-muted/30">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/about-hero-image.jpg"
            alt="Person working on diamond art"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="container relative px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Crafting Wellness, One Diamond at a Time
            </h1>
            <p className="mx-auto mb-10 text-lg text-white/90">
              At Diamond Art, we believe in the healing power of creativity. Our mission is to provide a therapeutic 
              outlet that promotes mental well-being through the meditative art of diamond painting.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/30 transition-all">
                <Link href="/design/create" className="font-medium">
                  Start Creating
                </Link>
              </Button>
              <Button variant="outline" className="text-white border-white/80 hover:bg-white/20 hover:border-white hover:text-white transition-colors">
                <Link href="/community">Join Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Icons */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 text-center bg-white rounded-lg shadow-sm dark:bg-card">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with Tags */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Why Choose Diamond Art?</h2>
            <p className="text-muted-foreground">
              We&apos;re committed to your creative journey and mental well-being every step of the way.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-center">{feature.title}</h3>
                <p className="mb-4 text-center text-muted-foreground">{feature.description}</p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {feature.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section with Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">Our Story</h2>
            <p className="mb-12 text-muted-foreground">
              Founded in 2023, Diamond Art was born from a simple idea: art should be accessible, 
              therapeutic, and bring people together.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-8">
            {[
              { year: '2023', title: 'Founded', description: 'Diamond Art was established with a vision to combine art therapy with creative expression.' },
              { year: '2024', title: 'Community Growth', description: 'Our community grew to 10,000+ members, sharing their creations and stories.' },
              { year: '2025', title: 'New Features', description: 'Launched our mobile app and introduced AI-powered design suggestions.' },
            ].map((item, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-primary/20">
                <div className="absolute flex items-center justify-center w-8 h-8 -left-4 rounded-full bg-primary text-white">
                  <span className="text-sm font-medium">{item.year}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
