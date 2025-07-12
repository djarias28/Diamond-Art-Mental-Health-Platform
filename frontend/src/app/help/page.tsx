import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, HelpCircle, Search, Home, Sparkles, LayoutDashboard, Gem, Users } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help & Support - Diamond Art',
  description: 'Find answers to common questions and get support for your diamond art journey.',
};

const faqCategories = [
  {
    id: 'getting-started',
    name: 'Getting Started',
    icon: <Home className="w-5 h-5" />,
    questions: [
      {
        question: 'How do I create my first diamond art design?',
        answer: 'To create your first design, click on the "Create Design" button in the navigation bar. You can upload an image or choose from our templates. Our system will automatically convert it into a diamond art pattern.'
      },
      {
        question: 'What materials do I need to begin?',
        answer: 'You\'ll need our diamond art kit which includes a canvas with adhesive, colored resin diamonds, a diamond applicator pen, wax, and a tray. All these are included when you order a custom design.'
      },
      {
        question: 'How do I track my order?',
        answer: 'Once your order ships, you\'ll receive a tracking number via email. You can also check your order status by logging into your account and visiting the Orders section.'
      }
    ]
  },
  {
    id: 'design-tools',
    name: 'Design Tools',
    icon: <Sparkles className="w-5 h-5" />,
    questions: [
      {
        question: 'What image resolution works best?',
        answer: 'For best results, use high-resolution images (at least 1000x1000 pixels). Higher resolution images allow for more detail in your diamond art.'
      },
      {
        question: 'Can I edit my design after saving?',
        answer: 'Yes, you can edit your saved designs at any time by going to your Dashboard and selecting the design you want to modify.'
      },
      {
        question: 'What file formats do you support?',
        answer: 'We support JPG, PNG, and GIF formats. For best results, we recommend using PNG files with transparent backgrounds.'
      }
    ]
  },
  {
    id: 'account',
    name: 'Account & Billing',
    icon: <LayoutDashboard className="w-5 h-5" />,
    questions: [
      {
        question: 'How do I reset my password?',
        answer: 'Click on "Forgot Password" on the login page and enter your email address. We\'ll send you a link to reset your password.'
      },
      {
        question: 'How do I update my payment method?',
        answer: 'Go to your Account Settings, then select "Payment Methods" to add or update your payment information.'
      },
      {
        question: 'How do I cancel my subscription?',
        answer: 'You can manage your subscription in the Billing section of your account settings. Please note that cancellations take effect at the end of your current billing cycle.'
      }
    ]
  },
  {
    id: 'premium',
    name: 'Premium Features',
    icon: <Gem className="w-5 h-5" />,
    questions: [
      {
        question: 'What are the benefits of a premium account?',
        answer: 'Premium members get access to exclusive designs, unlimited high-resolution downloads, priority customer support, and special discounts on custom orders.'
      },
      {
        question: 'How do I upgrade to premium?',
        answer: 'Go to the Pricing page and select the premium plan that works best for you. You can choose monthly or annual billing.'
      },
      {
        question: 'Is there a free trial for premium features?',
        answer: 'Yes, we offer a 7-day free trial for new premium members. You can cancel anytime during the trial period without being charged.'
      }
    ]
  }
];

const popularArticles = [
  { title: 'How to Choose the Right Canvas Size', url: '/help/article/choosing-canvas-size' },
  { title: 'Diamond Painting Tips for Beginners', url: '/help/article/beginner-tips' },
  { title: 'Understanding Diamond Shapes and Sizes', url: '/help/article/diamond-shapes' },
  { title: 'Framing and Displaying Your Finished Art', url: '/help/article/framing-guide' },
  { title: 'Troubleshooting Common Issues', url: '/help/article/troubleshooting' },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10">
              <HelpCircle className="w-8 h-8 text-primary" />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              How can we help you?
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
              Find answers to common questions or get in touch with our support team.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full py-4 pl-12 pr-4 border rounded-lg border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <h2 className="mb-8 text-2xl font-bold text-center text-foreground">Popular Help Topics</h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {faqCategories.map((category) => (
              <Link 
                key={category.id}
                href={`#${category.id}`}
                className="p-6 transition-all bg-white rounded-lg shadow-sm dark:bg-card hover:shadow-md group"
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20">
                  {category.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {category.questions.length} articles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-12 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto">
            {faqCategories.map((category) => (
              <div key={category.id} id={category.id} className="mb-16 scroll-mt-20">
                <h2 className="flex items-center mb-6 text-2xl font-bold text-foreground">
                  <span className="mr-3">{category.icon}</span>
                  {category.name}
                </h2>
                <div className="space-y-4">
                  {category.questions.map((item, index) => (
                    <div key={index} className="p-6 bg-white rounded-lg shadow-sm dark:bg-card">
                      <h3 className="font-medium text-foreground">{item.question}</h3>
                      <p className="mt-2 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl p-8 mx-auto bg-white rounded-lg shadow-sm dark:bg-card">
            <h2 className="mb-6 text-2xl font-bold text-center text-foreground">Popular Help Articles</h2>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Link 
                  key={index} 
                  href={article.url}
                  className="flex items-center justify-between p-4 transition-colors rounded-lg hover:bg-muted/50 group"
                >
                  <span className="font-medium text-foreground group-hover:text-primary">{article.title}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-muted-foreground group-hover:text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl p-8 mx-auto text-center bg-white rounded-lg shadow-sm dark:bg-card">
            <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h2 className="mb-4 text-2xl font-bold text-foreground">Still need help?</h2>
            <p className="max-w-2xl mx-auto mb-8 text-muted-foreground">
              Our support team is here to help you with any questions or issues you might have.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="outline" className="gap-2" asChild>
                <Link href="/contact">
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
              </Button>
              <Button className="gap-2" asChild>
                <Link href="/community">
                  <Users className="w-4 h-4" />
                  Ask the Community
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
