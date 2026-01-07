import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// В продакшене используйте переменные окружения или более безопасный метод хранения
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Валидация
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Заполните все поля' },
        { status: 400 }
      )
    }

    // Проверка учетных данных
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Создание сессии (в продакшене используйте JWT или более безопасный метод)
      const sessionToken = Buffer.from(`${username}:${Date.now()}`).toString('base64')
      
      // Установка cookie
      const response = NextResponse.json({ success: true })
      response.cookies.set('admin_session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      })

      return response
    } else {
      return NextResponse.json(
        { error: 'Неверные учетные данные' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Произошла ошибка при входе' },
      { status: 500 }
    )
  }
}


