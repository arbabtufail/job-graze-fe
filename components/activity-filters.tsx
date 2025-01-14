import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react'
import { useState } from "react"
import { format } from "date-fns"

interface ActivityFiltersProps {
  onFilterChange: (filter: string | null) => void
}

export function ActivityFilters({ onFilterChange }: ActivityFiltersProps) {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="flex flex-wrap gap-4">
      <Button 
        variant="outline" 
        onClick={() => onFilterChange(null)}
      >
        All Activities
      </Button>
      <Button 
        variant="outline" 
        onClick={() => onFilterChange('new_talents')}
      >
        New Talents
      </Button>
      <Button 
        variant="outline" 
        onClick={() => onFilterChange('profile_updates')}
      >
        Profile Updates
      </Button>
      <Button 
        variant="outline" 
        onClick={() => onFilterChange('profile_deletions')}
      >
        Profile Deletions
      </Button>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

