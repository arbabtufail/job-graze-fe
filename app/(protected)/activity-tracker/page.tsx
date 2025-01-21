'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';
import { ActivityTimeline } from '@/components/activity-timeline';
import { ActivityFilters } from '@/components/activity-filters';
import { ActivityStats } from '@/components/activity-stats';
import { getRecentActivity } from '@/services/network/networkManager';
import { Activity } from '@/shared/types/activity';

type ActivityData = {
  added: Activity[];
  updated: Activity[];
  deleted: Activity[];
};

export default function ActivityTrackerPage() {
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'added' | 'updated' | 'deleted'
  >('all');
  const [data, setData] = useState<ActivityData>({
    added: [],
    updated: [],
    deleted: [],
  });
  const [fullData, setFullData] = useState<Activity[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [stats, setStats] = useState({
    newTalents: 0,
    updatedProfiles: 0,
    deletedProfiles: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchActivityData = async () => {
      setIsLoading(true);
      try {
        const data = new Date(date.toISOString().split('T')[0]).toISOString();
        const response = await getRecentActivity(data);
        if (!response) {
          return;
        }
        const sanitizedData: ActivityData = {
          added: response.data.data.added
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((activity: any) => ({
              ...activity,
              type: 'added',
            })),
          updated: response.data.data.updated
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((activity: any) => ({
              ...activity,
              type: 'updated',
            })),
          deleted: response.data.data.deleted
            .sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map((activity: any) => ({
              ...activity,
              type: 'deleted',
            })),
        };
        const finalData = [
          ...sanitizedData.added,
          ...sanitizedData.updated,
          ...sanitizedData.deleted,
        ].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setData(sanitizedData);
        setFullData(finalData);
        setActivities(finalData);
        setStats({
          newTalents: response.data.data.added.length,
          updatedProfiles: response.data.data.updated.length,
          deletedProfiles: response.data.data.deleted.length,
        });
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchActivityData();
    setSelectedFilter('all');
  }, [date]);

  const handleFilterChange = (
    filter: 'all' | 'added' | 'updated' | 'deleted'
  ) => {
    setSelectedFilter(filter);
    if (filter !== 'all') {
      setActivities(data[filter]);
    } else {
      setActivities(fullData);
    }
  };

  const handleDateChange = (date: Date) => {
    setDate(date);
  };

  return (
    <div className='min-h-screen bg-background'>
      <Sidebar />
      <div className='flex-1 flex flex-col md:pl-64'>
        <DashboardHeader />
        <main className='flex-1 p-6 overflow-auto'>
          <div className='max-w-6xl mx-auto space-y-8'>
            <h1 className='text-3xl font-bold text-foreground'>
              Activity Tracker
            </h1>
            <div className='activity-stat-card'>
              <ActivityStats stats={stats} />
            </div>
            <ActivityFilters
              filterValue={selectedFilter}
              onFilterChange={handleFilterChange}
              onDateChange={handleDateChange}
            />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ActivityTimeline activities={activities} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
