'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Heart, Users, Activity } from 'lucide-react';
import { useAuth } from '@/providers/AuthProvider';

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 w-full h-full">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
              backgroundAttachment: 'fixed'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 backdrop-blur-sm" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Find Peace Through Diamond Art
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto drop-shadow-md">
              A therapeutic journey that combines the joy of creativity with the benefits of mindfulness and mental wellness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 transition-colors">
                <Link href={isAuthenticated ? "/design/create" : "/signup"}>
                  {isAuthenticated ? "Start Creating" : "Get Started"}
                </Link>
              </Button>
              {!isAuthenticated && (
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/30 backdrop-blur-sm">
                  <Link href="/activities">
                    Explore Activities
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Diamond Art Helps</h2>
            <p className="text-muted-foreground">
              Our platform combines art therapy techniques with the meditative practice of diamond painting to support your mental wellness journey.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8 mb-4" />,
                title: "AI-Powered Suggestions",
                description: "Get personalized diamond art recommendations based on your mood and preferences."
              },
              {
                icon: <Heart className="w-8 h-8 mb-4" />,
                title: "Therapeutic Benefits",
                description: "Reduce stress and anxiety through the calming, repetitive motions of diamond painting."
              },
              {
                icon: <Users className="w-8 h-8 mb-4" />,
                title: "Supportive Community",
                description: "Connect with others on similar wellness journeys in our safe, supportive community."
              },
              {
                icon: <Activity className="w-8 h-8 mb-4" />,
                title: "Track Your Progress",
                description: "Monitor your mood improvements and artistic progress over time."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of others who have found peace and purpose through diamond art therapy.
            </p>
            <Button size="lg" asChild>
              <Link href={isAuthenticated ? "/activities" : "/signup"}>
                {isAuthenticated ? "Continue Creating" : "Create Your Free Account"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}