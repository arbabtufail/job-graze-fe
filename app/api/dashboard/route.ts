import { NextResponse } from 'next/server';

export async function GET() {
  // In a real application, this data would come from a database
  const dashboardData = {
    totalProfiles: 1234,
    completeProfiles: 987,
    incompleteProfiles: 247,
    recentUpdates: [
      {
        type: 'new',
        text: 'New profile created: Emily Johnson',
        time: '1 hour ago',
      },
      {
        type: 'update',
        text: 'Profile updated: Michael Chang',
        time: '3 hours ago',
      },
      {
        type: 'view',
        text: 'Profile viewed: Sarah Martinez',
        time: '5 hours ago',
      },
      {
        type: 'delete',
        text: 'Profile deleted: Chris Taylor',
        time: '1 day ago',
      },
    ],
    talentAcquisition: [
      { month: 'Jan', activeProfilesCount: 65 },
      { month: 'Feb', activeProfilesCount: 78 },
      { month: 'Mar', activeProfilesCount: 92 },
      { month: 'Apr', activeProfilesCount: 85 },
      { month: 'May', activeProfilesCount: 110 },
      { month: 'Jun', activeProfilesCount: 130 },
      { month: 'Jul', activeProfilesCount: 125 },
      { month: 'Aug', activeProfilesCount: 140 },
      { month: 'Sep', activeProfilesCount: 155 },
      { month: 'Oct', activeProfilesCount: 170 },
      { month: 'Nov', activeProfilesCount: 185 },
      { month: 'Dec', activeProfilesCount: 200 },
    ],
    talentSpecialization: [
      { name: 'ICU Nurse', value: 35 },
      { name: 'ER Nurse', value: 25 },
      { name: 'Pediatric Nurse', value: 20 },
      { name: 'OR Nurse', value: 15 },
      { name: 'Other', value: 5 },
    ],
  };

  return NextResponse.json(dashboardData);
}
