import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const filter = searchParams.get('filter')

  // In a real application, this data would come from a database
  const activities = [
    { id: 1, type: 'new_talents', title: 'New Talent Added', description: 'John Doe was added to the talent pool', time: '2 hours ago' },
    { id: 2, type: 'profile_updates', title: 'Profile Updated', description: 'Jane Smith updated her skills', time: '4 hours ago' },
    { id: 3, type: 'interviews', title: 'Interview Scheduled', description: 'Interview set with Mike Johnson for ICU position', time: '1 day ago' },
    { id: 4, type: 'placements', title: 'Job Placement', description: 'Sarah Brown placed at City Hospital', time: '2 days ago' },
    { id: 5, type: 'new_talents', title: 'New Talent Added', description: 'Emma Wilson was added to the talent pool', time: '3 days ago' },
    { id: 6, type: 'profile_deletions', title: 'Profile Deleted', description: 'Alex Johnson\'s profile was deleted', time: '1 day ago' },
  ]

  const stats = {
    newTalents: 24,
    updatedProfiles: 145,
    deletedProfiles: 12,
  }

  const filteredActivities = filter
    ? activities.filter(activity => activity.type === filter)
    : activities

  return NextResponse.json({ activities: filteredActivities, stats })
}

