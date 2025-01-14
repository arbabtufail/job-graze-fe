import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { useState } from 'react';
import { format } from 'date-fns';

interface ActivityFiltersProps {
  filterValue: 'all' | 'added' | 'updated' | 'deleted';
  onFilterChange: (filter: 'all' | 'added' | 'updated' | 'deleted') => void;
  onDateChange: (date: Date) => void;
}

export function ActivityFilters({
  filterValue,
  onFilterChange,
  onDateChange,
}: ActivityFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className='flex flex-wrap gap-4'>
      <Button
        variant={filterValue === 'all' ? 'filled' : 'outline'}
        onClick={() => onFilterChange('all')}
      >
        All Activities
      </Button>
      <Button
        variant={filterValue === 'added' ? 'filled' : 'outline'}
        onClick={() => onFilterChange('added')}
      >
        New Talents
      </Button>
      <Button
        variant={filterValue === 'updated' ? 'filled' : 'outline'}
        onClick={() => onFilterChange('updated')}
      >
        Profile Updates
      </Button>
      <Button
        variant={filterValue === 'deleted' ? 'filled' : 'outline'}
        onClick={() => onFilterChange('deleted')}
      >
        Profile Deletions
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date ? format(date, 'PPP') : 'Pick a date'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            toDate={new Date()}
            onSelect={(date) => {
              if (date) {
                setDate(date);
                if (onDateChange) {
                  onDateChange(date);
                }
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
