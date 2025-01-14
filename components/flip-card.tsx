'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, Calendar, MapPin, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { experienceConverterFromYears, timeAgo } from '@/lib/utils';
import { talentInfo } from '@/shared/types/talentInfo';

interface FlipCardProps {
  talent: talentInfo;
  onDelete: (id: string) => void;
}

const statusConfig = {
  Active: { color: 'bg-green-100 text-green-800', label: 'Active' },
  'In Progress': { color: 'bg-blue-100 text-blue-800', label: 'In Progress' },
  'On Hold': { color: 'bg-yellow-100 text-yellow-800', label: 'On Hold' },
  Inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactive' },
};

export function FlipCard({ talent, onDelete }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const router = useRouter();

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/talent-profiles/${talent.id}/edit`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(talent.id);
  };

  return (
    <div
      className={`flip-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className='flip-card-inner'>
        <Card className='flip-card-front'>
          <CardContent className='p-4 sm:p-6 flex flex-col justify-between h-full'>
            <div>
              <div className='flex justify-between items-start mb-4'>
                <h3 className='text-base sm:text-lg font-semibold'>
                  {talent.firstName + ' ' + talent.lastName}
                </h3>
                <Badge
                  className={statusConfig[talent.status || 'Active'].color}
                >
                  {statusConfig[talent.status || 'Active'].label}
                </Badge>
              </div>
              <p className='text-xs sm:text-sm text-muted-foreground mb-2'>
                {talent.specialties.join(', ') || 'No specialization'}
              </p>
              <div className='flex items-center text-sm text-muted-foreground'>
                <MapPin className='h-4 w-4 mr-2' />
                <span>{talent.address1 || 'No address'}</span>
              </div>
            </div>
            <div className='flex justify-between text-sm text-muted-foreground'>
              <div className='flex items-center'>
                {talent.experience > 0 && (
                  <>
                    <User className='h-4 w-4 mr-2' />
                    <span>
                      {experienceConverterFromYears(talent.experience)}
                    </span>
                  </>
                )}
              </div>

              <div className='flex items-center'>
                <Calendar className='h-4 w-4 mr-2' />
                <span>Created: {timeAgo(talent.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className='flip-card-back'>
          <CardContent className='p-4 sm:p-6 flex flex-col justify-between h-full'>
            <div>
              <h3 className='text-base sm:text-lg font-semibold mb-2'>
                {talent.firstName + ' ' + talent.lastName}
              </h3>
              <p className='text-sm mb-4'>{talent.specialties.join(', ')}</p>
              <div className='flex items-center mb-2'>
                <Zap className='h-4 w-4 mr-2' />
                <span>Profile Score: {talent.profileScore}%</span>
              </div>
              {!(talent.updatedAt == talent.createdAt) && (
                <div className='flex items-center text-sm'>
                  <Calendar className='h-4 w-4 mr-2' />
                  <span>Last Modified: {timeAgo(talent.updatedAt)}</span>
                </div>
              )}
            </div>
            <div className='space-y-2'>
              <Button
                className='w-full text-sm py-1 sm:py-2 bg-accent text-accent-foreground hover:bg-accent/90'
                onClick={handleEdit}
              >
                Edit Talent
              </Button>
              <Button
                variant='destructive'
                className='w-full text-sm py-1 sm:py-2'
                onClick={handleDelete}
              >
                Delete Talent
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
