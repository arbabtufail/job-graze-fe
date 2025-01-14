"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { ActivityTimeline } from "@/components/activity-timeline"
import { ActivityFilters } from "@/components/activity-filters"
import { ActivityStats } from "@/components/activity-stats"

export default function ActivityTrackerPage() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null)
  const [activities, setActivities] = useState([])
  const [stats, setStats] = useState({ newTalents: 0, updatedProfiles: 0, deletedProfiles: 0 })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchActivityData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/activity-tracker${selectedFilter ? `?filter=${selectedFilter}` : ''}`)
        const data = await response.json()
        setActivities(data.activities)
        setStats(data.stats)
      } catch (error) {
        console.error('Error fetching activity data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivityData()
  }, [selectedFilter])

  const handleFilterChange = (filter: string | null) => {
    setSelectedFilter(filter)
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col md:pl-64">
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-6xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold text-foreground">Activity Tracker</h1>
            <div className="activity-stat-card">
              <ActivityStats stats={stats} />
            </div>
            <ActivityFilters onFilterChange={handleFilterChange} />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ActivityTimeline activities={activities} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

