import { NextResponse } from 'next/server'
import { getPortfolioData } from '@/lib/data'

export async function GET() {
  try {
    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error loading content:', error)
    return NextResponse.json(
      { error: 'Failed to load content' },
      { status: 500 }
    )
  }
}


