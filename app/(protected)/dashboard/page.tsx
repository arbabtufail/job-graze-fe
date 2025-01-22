'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  UserPlus,
  Users,
  ArrowUpRight,
  Upload,
  Users2,
  User,
  Lock,
  FileText,
  UserMinus,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { TalentAcquisitionChart } from '@/components/talent-acquisition-chart';
import { TalentSpecializationChart } from '@/components/talent-specialization-chart';
import Link from 'next/link';
import {
  getMonthlyTalentAcquisitionCount,
  getProfileCount,
  getRecentUpdates,
  getTalentSpecializations,
} from '@/services/network/networkManager';
import { timeAgo } from '@/lib/utils';

type RecentUpdates = {
  id: string;
  type: 'added' | 'updated' | 'viewed' | 'deleted';
  firstName: string;
  lastName: string;
  date: string;
};

type MonthlyTalentAcquisition = {
  month: string;
  activeProfilesCount: number;
};

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [recentUpdates, setRecentUpdates] = useState<RecentUpdates[]>([]);
  const [monthlyAcquisition, setMonthlyAcquisition] = useState<
    MonthlyTalentAcquisition[]
  >([]);

  const [talentSpecialization, setTalentSpecialization] = useState<
    { name: string; value: number }[]
  >([]);

  const [profileCount, setProfileCount] = useState<{
    totalProfilesCount: number;
    completedProfilesCount: number;
    incompleteProfilesCount: number;
  }>({
    totalProfilesCount: 0,
    completedProfilesCount: 0,
    incompleteProfilesCount: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          profileCount,
          monthlyTalentAcquisition,
          specializations,
          recentUpdates,
        ] = await Promise.all([
          getProfileCount(),
          getMonthlyTalentAcquisitionCount(),
          getTalentSpecializations(),
          getRecentUpdates(),
        ]);
        if (profileCount.status === 200) {
          setProfileCount(profileCount.data.data);
        }
        if (monthlyTalentAcquisition.status === 200) {
          setMonthlyAcquisition(monthlyTalentAcquisition.data.data);
        }
        if (specializations.status === 200) {
          setTalentSpecialization(specializations.data.data);
        }
        if (recentUpdates.status === 200) {
          setRecentUpdates(recentUpdates.data.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
  };

  return (
    <div className='min-h-screen bg-gray-50 flex'>
      <Sidebar />

      <main className='flex-1 p-4 md:p-8 ml-0 md:ml-64 overflow-auto'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold text-[#333333] mb-8'>Dashboard</h1>

          <div className='mb-8'>
            <form onSubmit={handleSearch} className='flex gap-4'>
              <Input
                type='search'
                placeholder='Search...'
                className='flex-grow'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type='submit'>
                <Search className='h-4 w-4 mr-2' />
                Search
              </Button>
            </form>
          </div>

          {isLoading ? (
            <p className='mb-8'>Loading...</p>
          ) : (
            <>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8'>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Total Profiles
                    </CardTitle>
                    <Users className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {profileCount.totalProfilesCount}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Complete Profiles
                    </CardTitle>
                    <CheckCircle className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {profileCount.completedProfilesCount}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle className='text-sm font-medium'>
                      Incomplete Profiles
                    </CardTitle>
                    <AlertCircle className='h-4 w-4 text-muted-foreground' />
                  </CardHeader>
                  <CardContent>
                    <div className='text-2xl font-bold'>
                      {profileCount.incompleteProfilesCount}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 mb-8'>
                <TalentAcquisitionChart data={monthlyAcquisition || []} />
                <TalentSpecializationChart data={talentSpecialization || []} />
              </div>
            </>
          )}

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8'>
            <Card>
              <CardHeader>
                <CardTitle>Recent Profile Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className='space-y-4'>
                  {recentUpdates.map((activity, index) => (
                    <li key={index} className='flex items-center'>
                      {activity.type === 'added' && (
                        <UserPlus className='h-5 w-5 mr-3 text-[#F2994A]' />
                      )}
                      {activity.type === 'updated' && (
                        <FileText className='h-5 w-5 mr-3 text-[#F2994A]' />
                      )}
                      {activity.type === 'viewed' && (
                        <Users2 className='h-5 w-5 mr-3 text-[#F2994A]' />
                      )}
                      {activity.type === 'deleted' && (
                        <UserMinus className='h-5 w-5 mr-3 text-[#F2994A]' />
                      )}
                      <div className='flex-1'>
                        <p className='text-sm font-medium'>
                          {activity.type === 'added'
                            ? 'New talent added: '
                            : 'Profile ' + activity.type + ': '}{' '}
                          {activity.firstName + ' ' + activity.lastName}
                        </p>
                        <p className='text-xs text-muted-foreground'>
                          {timeAgo(activity.date)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  <Button
                    variant='outline'
                    className='w-full justify-between'
                    asChild
                  >
                    <Link href='/bulk-upload'>
                      <Upload className='h-4 w-4 mr-2' />
                      Bulk Upload New Profiles
                      <ArrowUpRight className='h-4 w-4 ml-2' />
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full justify-between'
                    asChild
                  >
                    <Link href='/talent-profiles'>
                      <Users2 className='h-4 w-4 mr-2' />
                      View Profiles
                      <ArrowUpRight className='h-4 w-4 ml-2' />
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full justify-between'
                    asChild
                  >
                    <Link href='/account-settings?tab=personal'>
                      <User className='h-4 w-4 mr-2' />
                      Update Personal Information
                      <ArrowUpRight className='h-4 w-4 ml-2' />
                    </Link>
                  </Button>
                  <Button
                    variant='outline'
                    className='w-full justify-between'
                    asChild
                  >
                    <Link href='/account-settings?tab=security'>
                      <Lock className='h-4 w-4 mr-2' />
                      Change Password
                      <ArrowUpRight className='h-4 w-4 ml-2' />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
