import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { timeAgo } from '@/lib/utils';
import { Activity } from '@/shared/types/activity';
import {
  UserPlus,
  FileText,
  Calendar,
  Briefcase,
  UserMinus,
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: Activity[];
}

const activityTypes = {
  added: { icon: UserPlus, color: 'bg-[#F2994A]' },
  updated: { icon: FileText, color: 'bg-[#004E64]' },
  interviews: { icon: Calendar, color: 'bg-[#00B4D8]' },
  placements: { icon: Briefcase, color: 'bg-[#90BE6D]' },
  deleted: { icon: UserMinus, color: 'bg-[#FF6B6B]' },
};

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  console.log(activities);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='space-y-8'>
          {activities.map((activity) => {
            const { icon: Icon, color } =
              activityTypes[activity.type as keyof typeof activityTypes];
            return (
              <li key={activity.id} className='flex items-start space-x-4'>
                <div className={`${color} p-2 rounded-full`}>
                  <Icon className='h-5 w-5 text-white' />
                </div>
                <div className='flex-1 space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {activity.firstName + ' ' + activity.lastName}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {activity.type === 'added'
                      ? 'New talent added'
                      : 'Profile ' + activity.type}
                  </p>
                  <p className='text-xs text-muted-foreground'>
                    {timeAgo(activity.date)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
