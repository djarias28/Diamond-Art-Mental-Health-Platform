import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community | Diamond Art',
  description: 'Connect with fellow diamond art enthusiasts and share your creations.',
};

export default function CommunityPage() {
  // Mock data for community posts
  const featuredPosts = [
    {
      id: 1,
      user: 'JaneDoe42',
      avatar: '/avatars/user1.jpg',
      image: '/community/ocean-waves.jpg',
      likes: 128,
      comments: 24,
      caption: 'Just finished my ocean waves piece! The calming blues really helped me relax this week. #diamondart #mentalhealth',
    },
    {
      id: 2,
      user: 'ArtTherapistSarah',
      avatar: '/avatars/user2.jpg',
      image: '/community/mandala.jpg',
      likes: 215,
      comments: 42,
      caption: 'Mandala Monday! Working on this intricate design with my therapy group today. The focus and repetition are so therapeutic. #arttherapy #mindfulness',
    },
  ];

  const popularTopics = [
    { name: '#mentalhealth', count: '1.2k posts' },
    { name: '#diamondarttherapy', count: '845 posts' },
    { name: '#anxietysupport', count: '723 posts' },
    { name: '#selfcare', count: '1.5k posts' },
    { name: '#arttherapy', count: '912 posts' },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Community</h1>
        <p className="text-xl text-muted-foreground">Connect, share, and grow with fellow creators</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-8">
          {/* Create Post */}
          <div className="glass-card p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent"></div>
              <button className="flex-1 text-left text-muted-foreground hover:bg-accent/50 rounded-full px-4 py-2 transition-colors">
                Share your latest creation...
              </button>
            </div>
            <div className="flex justify-between border-t pt-3">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="w-5 h-5 bg-blue-100 rounded-md flex items-center justify-center">
                  <span className="text-blue-500">📷</span>
                </span>
                Photo
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="w-5 h-5 bg-purple-100 rounded-md flex items-center justify-center">
                  <span className="text-purple-500">🎨</span>
                </span>
                Artwork
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <span className="w-5 h-5 bg-green-100 rounded-md flex items-center justify-center">
                  <span className="text-green-500">💭</span>
                </span>
                Reflection
              </button>
            </div>
          </div>

          {/* Featured Posts */}
          {featuredPosts.map((post) => (
            <div key={post.id} className="glass-card rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent"></div>
                  <span className="font-medium">{post.user}</span>
                </div>
                <p className="mb-4">{post.caption}</p>
                <div className="aspect-square bg-accent/30 rounded-lg mb-3">
                  {/* Image would be displayed here */}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground text-sm">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    ❤️ {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    💬 {post.comments} comments
                  </button>
                  <button className="flex items-center gap-1 hover:text-foreground">
                    🔗 Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Topics */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Popular Topics</h2>
            <div className="space-y-3">
              {popularTopics.map((topic) => (
                <Link 
                  key={topic.name} 
                  href={`/community/tags/${topic.name.slice(1)}`}
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-accent/30 transition-colors"
                >
                  <span className="text-primary">{topic.name}</span>
                  <span className="text-sm text-muted-foreground">{topic.count}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="glass-card p-6 rounded-xl">
            <h2 className="text-xl font-semibold mb-3">Community Guidelines</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span>💜</span>
                <span>Be kind and supportive to all members</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🎨</span>
                <span>Share your progress and process</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🤝</span>
                <span>Offer constructive feedback when requested</span>
              </li>
              <li className="flex items-start gap-2">
                <span>🛡️</span>
                <span>Respect copyright and give credit when sharing others&apos; work</span>
              </li>
            </ul>
          </div>

          {/* Join Community Button */}
          <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
            Join Community
          </button>
        </div>
      </div>
    </main>
  );
}
