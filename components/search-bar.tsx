"use client"

import { Search, SlidersHorizontal } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onSearch: (query: string) => void
  onFilterClick: () => void
  onSortClick: () => void
}

export function SearchBar({ onSearch, onFilterClick, onSortClick }: SearchBarProps) {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4D4D4D]" />
        <Input
          placeholder="Search buildings..."
          className="pl-10 bg-[#F5F5F5] border-[#4D4D4D] text-[#333333] placeholder-[#4D4D4D]"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <Button
        onClick={onFilterClick}
        className="bg-[#F2994A] hover:bg-[#D9823B] text-white"
      >
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        <span>Filters</span>
      </Button>
      <Button
        onClick={onSortClick}
        className="bg-[#F2994A] hover:bg-[#D9823B] text-white"
      >
        Sort by
      </Button>
    </div>
  )
}

