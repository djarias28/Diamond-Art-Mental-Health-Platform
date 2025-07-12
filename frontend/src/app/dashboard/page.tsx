"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { authService, UserStats } from '@/lib/api/auth';
import { useAuth } from '@/providers/AuthProvider';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [stats, setStats] = useState<{
    loading: boolean;
    data: UserStats | null;
    error: string | null;
  }>({ loading: true, data: null, error: null });
  
  const { user } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await authService.getUserStats();
        setStats({ loading: false, data, error: null });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
        setStats({ 
          loading: false, 
          data: null, 
          error: 'Failed to load dashboard data' 
        });
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { name: 'Current Streak', value: stats.data?.streak || 0, suffix: ' days' },
    { name: 'Total Points', value: stats.data?.totalPoints || 0 },
    { name: 'Activities Completed', value: stats.data?.activitiesCompleted || 0 },
    { 
      name: 'Mood Improvement', 
      value: stats.data?.avgMoodImprovement || 0, 
      suffix: ' points',
      tooltip: 'Average mood improvement after activities'
    },
  ];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-muted-foreground">Here&apos;s your creative journey at a glance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statsData.map((stat) => (
          <div key={stat.name} className="glass-card p-6 rounded-xl">
            <p className="text-sm font-medium text-muted-foreground">
              {stat.name}
              {stat.tooltip && (
                <span className="ml-2 text-xs text-muted-foreground" title={stat.tooltip}>
                  ⓘ
                </span>
              )}
            </p>
            {stats.loading ? (
              <Skeleton className="h-8 w-24 mt-2" />
            ) : (
              <p className="text-3xl font-bold mt-2">
                {stat.value}
                {stat.suffix}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Recent Activities */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Recent Activities</h2>
          <Link href="/activities" className="text-sm text-primary hover:underline">
            View all activities
          </Link>
        </div>
        
        <div className="bg-card p-6 rounded-lg">
          {stats.loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : stats.data?.activitiesCompleted ? (
            <p className="text-muted-foreground">
              You&apos;ve completed {stats.data.activitiesCompleted} activities so far!
              {stats.data.avgMoodImprovement > 0 && (
                <span className="block mt-2 text-green-500">
                  Your mood has improved by an average of {stats.data.avgMoodImprovement} points per activity!
                </span>
              )}
            </p>
          ) : (
            <p className="text-muted-foreground">
              No activities completed yet. Start your first activity to see your progress here!
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
