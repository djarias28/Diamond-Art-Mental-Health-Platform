import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact Us - Diamond Art',
  description: 'Get in touch with our support team. We\'re here to help with any questions about our diamond art platform.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: 'Email Us',
      description: 'Our team will get back to you within 24 hours',
      details: 'support@diamondart.com',
      link: 'mailto:support@diamondart.com',
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-primary" />,
      title: 'Live Chat',
      description: 'Chat with our support team',
      details: 'Start Chat',
      link: '#chat',
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: 'Call Us',
      description: 'Mon-Fri from 9am to 5pm EST',
      details: '+1 (555) 123-4567',
      link: 'tel:+15551234567',
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: 'Visit Us',
      description: 'Come say hello at our office',
      details: '123 Artisan Way, Creative City, CA 90210',
      link: 'https://maps.google.com',
    },
  ];

  const faqs = [
    {
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account and visiting the Orders section.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, PayPal, and Apple Pay.',
    },
    {
      question: 'How can I return an item?',
      answer: 'Please contact our support team within 30 days of receiving your order to initiate a return.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-primary/10 to-background">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              We&apos;d Love to Hear From You
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-lg text-muted-foreground">
              Have questions about our diamond art platform? Our team is here to help you with any inquiries or feedback.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method, index) => (
              <div key={index} className="p-6 rounded-lg bg-card hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-primary/10">
                  {method.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-center">{method.title}</h3>
                <p className="mb-3 text-sm text-center text-muted-foreground">{method.description}</p>
                <Link 
                  href={method.link} 
                  className="block text-sm font-medium text-center text-primary hover:underline"
                >
                  {method.details}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 bg-white rounded-lg shadow-sm dark:bg-card">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-foreground">Send us a message</h2>
                <p className="text-muted-foreground">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block mb-2 text-sm font-medium text-foreground">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="first-name"
                      className="w-full px-4 py-2 border rounded-md border-input bg-background text-foreground"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-foreground">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="last-name"
                      className="w-full px-4 py-2 border rounded-md border-input bg-background text-foreground"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border rounded-md border-input bg-background text-foreground"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block mb-2 text-sm font-medium text-foreground">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 border rounded-md border-input bg-background text-foreground"
                    placeholder="How can we help you?"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-foreground">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border rounded-md border-input bg-background text-foreground"
                    placeholder="Tell us more about how we can help you..."
                    required
                  ></textarea>
                </div>
                
                <div>
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-12 text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4 text-left">
              {faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-lg bg-card">
                  <h3 className="font-medium text-foreground">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-muted-foreground">
                Can&apos;t find what you&apos;re looking for?{' '}
                <Link href="/help" className="font-medium text-primary hover:underline">
                  Visit Our Help Center
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
