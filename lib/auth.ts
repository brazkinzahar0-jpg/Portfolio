import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkAuth() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')

    if (!session) {
      redirect('/admin/login')
    }

    return true
  } catch (error) {
    redirect('/admin/login')
  }
}

export async function isAuthenticated() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('admin_session')
    return !!session
  } catch {
    return false
  }
}

