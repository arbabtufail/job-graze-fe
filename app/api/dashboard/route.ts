import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const dashboardData = {
    totalProfiles: 1234,
    completeProfiles: 987,
    incompleteProfiles: 247,
    recentUpdates: [
      { type: 'new', text: 'New profile created: Emily Johnson', time: '1 hour ago' },
      { type: 'update', text: 'Profile updated: Michael Chang', time: '3 hours ago' },
      { type: 'view', text: 'Profile viewed: Sarah Martinez', time: '5 hours ago' },
      { type: 'delete', text: 'Profile deleted: Chris Taylor', time: '1 day ago' },
    ],
    talentAcquisition: [
      { month: "Jan", acquisitions: 65 },
      { month: "Feb", acquisitions: 78 },
      { month: "Mar", acquisitions: 92 },
      { month: "Apr", acquisitions: 85 },
      { month: "May", acquisitions: 110 },
      { month: "Jun", acquisitions: 130 },
      { month: "Jul", acquisitions: 125 },
      { month: "Aug", acquisitions: 140 },
      { month: "Sep", acquisitions: 155 },
      { month: "Oct", acquisitions: 170 },
      { month: "Nov", acquisitions: 185 },
      { month: "Dec", acquisitions: 200 },
    ],
    talentSpecialization: [
      { name: "ICU Nurse", value: 35 },
      { name: "ER Nurse", value: 25 },
      { name: "Pediatric Nurse", value: 20 },
      { name: "OR Nurse", value: 15 },
      { name: "Other", value: 5 },
    ],
  }

  return NextResponse.json(dashboardData)
}

