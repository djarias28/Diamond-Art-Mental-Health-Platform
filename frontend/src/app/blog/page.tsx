import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog - Diamond Art',
  description: 'Discover articles, tips, and stories about diamond art and mental wellness.',
};

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'The Therapeutic Benefits of Diamond Painting',
    excerpt: 'Explore how diamond painting can reduce stress and promote mindfulness in your daily routine.',
    date: 'May 15, 2023',
    readTime: '5 min read',
    category: 'Wellness',
    image: '/images/blog/therapeutic-benefits.jpg',
    slug: 'therapeutic-benefits-diamond-painting',
  },
  {
    id: 2,
    title: 'Getting Started with Diamond Art: A Beginner\'s Guide',
    excerpt: 'Everything you need to know to begin your diamond art journey, from tools to techniques.',
    date: 'April 28, 2023',
    readTime: '7 min read',
    category: 'Tutorials',
    image: '/images/blog/beginners-guide.jpg',
    slug: 'beginners-guide-diamond-art',
  },
  {
    id: 3,
    title: 'Creating a Calming Crafting Space at Home',
    excerpt: 'Transform any corner into a peaceful crafting sanctuary with these simple tips and ideas.',
    date: 'April 10, 2023',
    readTime: '4 min read',
    category: 'Lifestyle',
    image: '/images/blog/calming-space.jpg',
    slug: 'creating-calm-crafting-space',
  },
  {
    id: 4,
    title: 'The Science Behind Art Therapy',
    excerpt: 'Learn how creative activities like diamond painting can positively impact mental health.',
    date: 'March 22, 2023',
    readTime: '6 min read',
    category: 'Wellness',
    image: '/images/blog/art-therapy-science.jpg',
    slug: 'science-art-therapy',
  },
  {
    id: 5,
    title: 'Advanced Diamond Painting Techniques',
    excerpt: 'Take your diamond art to the next level with these professional tips and tricks.',
    date: 'March 5, 2023',
    readTime: '8 min read',
    category: 'Tutorials',
    image: '/images/blog/advanced-techniques.jpg',
    slug: 'advanced-diamond-painting-techniques',
  },
  {
    id: 6,
    title: 'Mindfulness Through Creative Expression',
    excerpt: 'How incorporating creative practices like diamond art can enhance your mindfulness routine.',
    date: 'February 18, 2023',
    readTime: '5 min read',
    category: 'Wellness',
    image: '/images/blog/mindfulness-creativity.jpg',
    slug: 'mindfulness-creative-expression',
  },
];

const categories = [
  { name: 'All', count: blogPosts.length, slug: 'all' },
  { name: 'Wellness', count: blogPosts.filter(post => post.category === 'Wellness').length, slug: 'wellness' },
  { name: 'Tutorials', count: blogPosts.filter(post => post.category === 'Tutorials').length, slug: 'tutorials' },
  { name: 'Lifestyle', count: blogPosts.filter(post => post.category === 'Lifestyle').length, slug: 'lifestyle' },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Diamond Art Blog
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
              Discover tips, tutorials, and inspiring stories about the art of diamond painting and its benefits for mental wellness.
            </p>
            <div className="flex justify-center">
              <Button asChild>
                <Link href="#featured-posts">
                  Read Latest Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                className="rounded-full"
                asChild
              >
                <Link href={`/blog/category/${category.slug}`}>
                  {category.name}
                  <span className="ml-2 text-xs bg-muted-foreground/10 text-foreground/60 rounded-full px-2 py-0.5">
                    {category.count}
                  </span>
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section id="featured-posts" className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center text-foreground">Latest Articles</h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.id} className="overflow-hidden transition-transform bg-white rounded-lg shadow-sm dark:bg-card hover:shadow-md hover:-translate-y-1">
                <div className="h-48 bg-muted/50">
                  {/* Image would be loaded via Next/Image in a real app */}
                  <div className="flex items-center justify-center w-full h-full bg-muted/30">
                    <span className="text-muted-foreground">Featured Image: {post.image}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center mr-4">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center mr-4">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{post.readTime}</span>
                    </div>
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">
                    <Link href={`/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <div className="flex items-center text-sm font-medium text-primary">
                    <Link href={`/blog/${post.slug}`} className="flex items-center hover:underline">
                      Read more
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 sm:py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-6 sm:p-8 mx-auto text-center bg-white rounded-lg shadow-sm dark:bg-card border border-border/30">
            <h2 className="mb-3 text-xl font-bold text-foreground sm:text-2xl">
              Subscribe to Our Newsletter
            </h2>
            <p className="mb-6 text-sm text-muted-foreground sm:text-base">
              Get the latest articles, tutorials, and exclusive content delivered straight to your inbox.
            </p>
            <form className="w-full">
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-4 py-2 text-sm border rounded-md sm:rounded-r-none border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <Button 
                  type="submit" 
                  className="w-full sm:w-auto px-6 py-2 text-sm sm:text-base sm:rounded-l-none"
                >
                  Subscribe
                </Button>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
