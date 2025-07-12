import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard | Diamond Art',
  description: 'Your personal diamond art journey and progress tracker.',
};

export default function DashboardPage() {
  // Mock data - in a real app, this would come from an API
  const stats = [
    { name: 'Total Projects', value: '12' },
    { name: 'Hours Spent', value: '48' },
    { name: 'Current Streak', value: '14 days' },
  ];

  const recentProjects = [
    { id: 1, name: 'Ocean Waves', progress: 75 },
    { id: 2, name: 'Mountain Sunset', progress: 30 },
    { id: 3, name: 'Floral Mandala', progress: 10 },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, User</h1>
        <p className="text-muted-foreground">Here&apos;s your creative journey at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-card p-6 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Continue Working</h2>
          <Link href="/activities" className="text-sm text-primary hover:underline">
            View all projects
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <div key={project.id} className="glass-card p-6 rounded-xl">
              <h3 className="text-lg font-medium mb-2">{project.name}</h3>
              <div className="w-full bg-accent rounded-full h-2.5 mb-4">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{project.progress}% complete</span>
                <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                  Continue
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/activities" 
            className="glass-card p-6 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <h3 className="font-medium">Start New Project</h3>
            <p className="text-sm text-muted-foreground mt-1">Begin a new creative journey</p>
          </Link>
          
          <Link 
            href="/community" 
            className="glass-card p-6 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <h3 className="font-medium">Community Feed</h3>
            <p className="text-sm text-muted-foreground mt-1">Get inspired by others</p>
          </Link>
          
          <Link 
            href="/dashboard/achievements" 
            className="glass-card p-6 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <h3 className="font-medium">My Achievements</h3>
            <p className="text-sm text-muted-foreground mt-1">View your progress</p>
          </Link>
          
          <Link 
            href="/dashboard/settings" 
            className="glass-card p-6 rounded-xl hover:bg-accent/50 transition-colors"
          >
            <h3 className="font-medium">Settings</h3>
            <p className="text-sm text-muted-foreground mt-1">Customize your experience</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
