import { Trophy, Award, Star, Zap, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
};

export default function AchievementsPage() {
  const achievements: Achievement[] = [
    {
      id: 'first-art',
      title: 'First Creation',
      description: 'Complete your first diamond art',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      unlocked: true,
    },
    {
      id: 'streak-7',
      title: '7-Day Streak',
      description: 'Practice for 7 days in a row',
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      unlocked: true,
      progress: 5,
      total: 7,
    },
    {
      id: 'community-star',
      title: 'Community Star',
      description: 'Share 5 creations with the community',
      icon: <Star className="w-6 h-6 text-blue-400" />,
      unlocked: false,
      progress: 2,
      total: 5,
    },
    {
      id: 'zen-master',
      title: 'Zen Master',
      description: 'Complete 10 sessions of 30+ minutes',
      icon: <Heart className="w-6 h-6 text-rose-400" />,
      unlocked: false,
      progress: 3,
      total: 10,
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalAchievements = achievements.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="p-3 rounded-full bg-amber-50 dark:bg-amber-900/30">
          <Trophy className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-1">Your Achievements</h1>
          <p className="text-muted-foreground">Track your progress and celebrate your journey</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`transition-all hover:shadow-lg ${
              !achievement.unlocked ? 'opacity-70' : ''
            }`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-4">
                <div className="p-2 rounded-full bg-accent">
                  {achievement.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </div>
              </div>
              {achievement.unlocked ? (
                <Award className="w-6 h-6 text-amber-400" />
              ) : (
                <Award className="w-6 h-6 text-muted-foreground/30" />
              )}
            </CardHeader>
            {achievement.progress !== undefined && (
              <CardContent>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{
                      width: `${(achievement.progress / (achievement.total || 1)) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 text-right">
                  {achievement.progress} / {achievement.total}
                </p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-amber-500" />
          <span>Milestones</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 mb-2 rounded-full bg-blue-50 dark:bg-blue-900/20">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-3xl font-bold">5</CardTitle>
              <CardDescription>Total Creations</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 mb-2 rounded-full bg-purple-50 dark:bg-purple-900/20">
                <Zap className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-3xl font-bold">12h 45m</CardTitle>
              <CardDescription>Total Time Spent</CardDescription>
            </CardHeader>
          </Card>
          <Card className="border-2 border-amber-100 dark:border-amber-900/50 bg-amber-50/30 dark:bg-amber-900/10">
            <CardHeader className="flex flex-col items-center text-center">
              <div className="p-3 mb-2 rounded-full bg-amber-50 dark:bg-amber-900/30">
                <Trophy className="w-6 h-6 text-amber-500" />
              </div>
              <CardTitle className="text-3xl font-bold">{unlockedCount} / {totalAchievements}</CardTitle>
              <CardDescription>Achievements Unlocked</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
