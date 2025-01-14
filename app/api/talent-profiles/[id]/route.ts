import { NextResponse } from 'next/server'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id

  // In a real application, you would delete the talent from your database here
  // For this example, we'll just simulate a successful deletion
  console.log(`Deleting talent with id: ${id}`)

  // Simulate a delay to mimic a database operation
  await new Promise(resolve => setTimeout(resolve, 500))

  return NextResponse.json({ success: true, message: 'Talent deleted successfully' })
}

