import { notFound } from 'next/navigation';
import { getActivityById } from '../../data/activities';
import ActivitySession from './play/ActivitySession';

type Props = {
  params: { activityId: string };
};

export default function ActivityPage({ params }: Props) {
  const activity = getActivityById(params.activityId);

  if (!activity) {
    notFound();
  }

  return <ActivitySession activity={activity} />;
}

export async function generateMetadata({ params }: Props) {
  const activity = getActivityById(params.activityId);
  
  if (!activity) {
    return {
      title: 'Activity Not Found',
    };
  }

  return {
    title: `${activity.title} | Diamond Art Activity`,
    description: activity.description,
  };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  // Generate static paths for all activities at build time
  const { activities } = await import('../../data/activities');
  return activities.map((activity) => ({
    activityId: activity.id,
  }));
}
