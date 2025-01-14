import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, FileText, Calendar, Briefcase, UserMinus } from 'lucide-react'

interface ActivityTimelineProps {
  selectedFilter: string | null
}

const activityTypes = {
  new_talents: { icon: UserPlus, color: "bg-[#F2994A]" },
  profile_updates: { icon: FileText, color: "bg-[#004E64]" },
  interviews: { icon: Calendar, color: "bg-[#00B4D8]" },
  placements: { icon: Briefcase, color: "bg-[#90BE6D]" },
  profile_deletions: { icon: UserMinus, color: "bg-[#FF6B6B]" },
}

export function ActivityTimeline({ selectedFilter }: ActivityTimelineProps) {
  // This would typically come from an API or database
  const activities = [
    { id: 1, type: 'new_talents', title: 'New Talent Added', description: 'John Doe was added to the talent pool', time: '2 hours ago' },
    { id: 2, type: 'profile_updates', title: 'Profile Updated', description: 'Jane Smith updated her skills', time: '4 hours ago' },
    { id: 3, type: 'interviews', title: 'Interview Scheduled', description: 'Interview set with Mike Johnson for ICU position', time: '1 day ago' },
    { id: 4, type: 'placements', title: 'Job Placement', description: 'Sarah Brown placed at City Hospital', time: '2 days ago' },
    { id: 5, type: 'new_talents', title: 'New Talent Added', description: 'Emma Wilson was added to the talent pool', time: '3 days ago' },
    { id: 6, type: 'profile_deletions', title: 'Profile Deleted', description: 'Alex Johnson\'s profile was deleted', time: '1 day ago' },
  ]

  const filteredActivities = selectedFilter
    ? activities.filter(activity => activity.type === selectedFilter)
    : activities

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-8">
          {filteredActivities.map((activity) => {
            const { icon: Icon, color } = activityTypes[activity.type as keyof typeof activityTypes]
            return (
              <li key={activity.id} className="flex items-start space-x-4">
                <div className={`${color} p-2 rounded-full`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </CardContent>
    </Card>
  )
}

