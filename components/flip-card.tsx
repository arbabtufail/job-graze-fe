"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { User, Calendar, MapPin, Zap } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface FlipCardProps {
  talent: {
    id: number
    name: string
    specialization: string
    status: 'Active' | 'In Progress' | 'On Hold' | 'Inactive'
    experience: string
    createdAt: string
    profileScore: number
    lastModified: string
    address: string
  }
  onDelete: (id: number) => void
}

const statusConfig = {
  'Active': { color: 'bg-green-100 text-green-800', label: 'Active' },
  'In Progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  'On Hold': { color: 'bg-yellow-100 text-yellow-800', label: 'On Hold' },
  'Inactive': { color: 'bg-gray-100 text-gray-800', label: 'Inactive' }
}

export function FlipCard({ talent, onDelete }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const router = useRouter()

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/talent-profiles/${talent.id}/edit`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(talent.id)
  }

  return (
    <div 
      className={`flip-card ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleFlip}
    >
      <div className="flip-card-inner">
        <Card className="flip-card-front">
          <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-base sm:text-lg font-semibold">{talent.name}</h3>
                <Badge className={statusConfig[talent.status].color}>
                  {statusConfig[talent.status].label}
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-2">{talent.specialization}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{talent.address}</span>
              </div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{talent.experience}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Created: {talent.createdAt}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="flip-card-back">
          <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">{talent.name}</h3>
              <p className="text-sm mb-4">{talent.specialization}</p>
              <div className="flex items-center mb-2">
                <Zap className="h-4 w-4 mr-2" />
                <span>Profile Score: {talent.profileScore}%</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Last Modified: {talent.lastModified}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Button 
                className="w-full text-sm py-1 sm:py-2 bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleEdit}
              >
                Edit Talent
              </Button>
              <Button 
                variant="destructive"
                className="w-full text-sm py-1 sm:py-2"
                onClick={handleDelete}
              >
                Delete Talent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

