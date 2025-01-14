import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, FileText, UserMinus } from 'lucide-react'

interface ActivityStatsProps {
  stats: {
    newTalents: number;
    updatedProfiles: number;
    deletedProfiles: number;
  }
}

export function ActivityStats({ stats }: ActivityStatsProps) {
  const statCards = [
    { title: "New Talents", icon: UserPlus, value: stats.newTalents, color: "bg-[#F2994A]" },
    { title: "Updated Profiles", icon: FileText, value: stats.updatedProfiles, color: "bg-[#004E64]" },
    { title: "Deleted Profiles", icon: UserMinus, value: stats.deletedProfiles, color: "bg-[#FF6B6B]" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => (
        <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
          <CardHeader className={`flex flex-row items-center justify-between space-y-0 ${card.color} text-white`}>
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <card.icon className="h-4 w-4" />
          </CardHeader>
          <CardContent className="p-6">
            <div className="text-3xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

