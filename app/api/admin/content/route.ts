import { NextRequest, NextResponse } from 'next/server'
import { getPortfolioData, savePortfolioData, PortfolioData } from '@/lib/data'

async function checkAuth(request: NextRequest) {
  const session = request.cookies.get('admin_session')
  if (!session) {
    throw new Error('Unauthorized')
  }
}

export async function GET(request: NextRequest) {
  try {
    await checkAuth(request)
    const data = await getPortfolioData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await checkAuth(request)
    const updates = await request.json()
    
    // Получаем текущие данные
    const currentData = await getPortfolioData()
    
    // Объединяем с новыми данными (deep merge)
    const updatedData: PortfolioData = {
      ...currentData,
      hero: updates.hero ? { ...currentData.hero, ...updates.hero } : currentData.hero,
      about: updates.about ? {
        ...currentData.about,
        manifesto: updates.about.manifesto !== undefined ? updates.about.manifesto : currentData.about.manifesto,
        skills: updates.about.skills !== undefined ? updates.about.skills : currentData.about.skills,
      } : currentData.about,
      projects: updates.projects !== undefined ? updates.projects : currentData.projects,
      experiences: updates.experiences !== undefined ? updates.experiences : currentData.experiences,
      contact: updates.contact ? { ...currentData.contact, ...updates.contact } : currentData.contact,
    }
    
    await savePortfolioData(updatedData)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error?.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    console.error('Error saving content:', error)
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    )
  }
}

