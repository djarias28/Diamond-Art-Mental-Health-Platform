import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Pricing | Diamond Art',
  description: 'Choose the perfect plan for your creative journey.',
};

const pricingPlans = [
  {
    name: 'Starter',
    price: 'Free',
    description: 'Perfect for trying out diamond art',
    features: [
      'Access to basic designs',
      '5 projects per month',
      'Community access',
      'Basic support',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Creator',
    price: '$9.99',
    description: 'For regular diamond art enthusiasts',
    features: [
      'Unlimited basic designs',
      '20 projects per month',
      'Premium community features',
      'Priority support',
      'Progress tracking',
      'Mood-based recommendations',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Therapist',
    price: '$24.99',
    description: 'For professionals and serious creators',
    features: [
      'All Creator features',
      'Unlimited projects',
      'Therapist dashboard',
      'Client management',
      'Group sessions',
      'Therapeutic resources',
      'Analytics & reports',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <main className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, transparent pricing</h1>
        <p className="text-xl text-muted-foreground">
          Choose the plan that works best for your creative journey. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan) => (
          <div 
            key={plan.name}
            className={`glass-card rounded-xl p-8 relative overflow-hidden transition-all hover:shadow-lg ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1 rounded-bl-lg rounded-tr-lg">
                MOST POPULAR
              </div>
            )}
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-muted-foreground">{plan.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Free' && <span className="text-muted-foreground">/month</span>}
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              asChild 
              className={`w-full ${
                plan.popular 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90' 
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              <Link href="/signup">
                {plan.cta}
                {plan.popular && <Sparkles className="ml-2 h-4 w-4" />}
              </Link>
            </Button>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          {[
            {
              question: 'Can I change plans later?',
              answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the start of your next billing cycle.',
            },
            {
              question: 'Is there a free trial?',
              answer: 'Yes! The Creator plan comes with a 14-day free trial. No credit card required to start.',
            },
            {
              question: 'What payment methods do you accept?',
              answer: 'We accept all major credit cards, PayPal, and bank transfers for annual plans.',
            },
            {
              question: 'Can I cancel anytime?',
              answer: 'Absolutely. You can cancel your subscription at any time, and you\'ll continue to have access until the end of your billing period.',
            },
          ].map((item, index) => (
            <div key={index} className="glass-card p-6 rounded-xl">
              <h3 className="font-semibold text-lg mb-2">{item.question}</h3>
              <p className="text-muted-foreground">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <div className="glass-card p-12 rounded-2xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to start your creative journey?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of others who have found peace and joy through diamond art.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90">
              Start Free Trial
              <Sparkles className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
