import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '16', 10)

  // In a real application, this data would come from a database
  const talents = Array.from({ length: 32 }, (_, i) => ({
    id: i + 1,
    name: `Talent ${i + 1}`,
    specialization: ['ICU Nurse', 'Pediatric Nurse', 'ER Nurse', 'OR Nurse'][i % 4],
    status: ['Active', 'In Progress', 'On Hold', 'Inactive'][i % 4] as 'Active' | 'In Progress' | 'On Hold' | 'Inactive',
    experience: `${(i % 10) + 1} years`,
    createdAt: new Date(2023, 11, 28 + (i % 4)).toLocaleDateString(),
    profileScore: Math.floor(Math.random() * 30) + 70,
    lastModified: new Date(2023, 11, 29 + (i % 3)).toLocaleDateString(),
    address: '2651 Calvano Dr., Land O Lakes, Florida, USA'
  }))

  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedTalents = talents.slice(startIndex, endIndex)

  return NextResponse.json({
    talents: paginatedTalents,
    totalPages: Math.ceil(talents.length / limit),
    currentPage: page
  })
}

