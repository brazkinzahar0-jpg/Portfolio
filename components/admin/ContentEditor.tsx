'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HeroData {
  title: string
  subtitle: string
  cta: string
}

export default function ContentEditor() {
  const [data, setData] = useState<HeroData>({
    title: '',
    subtitle: '',
    cta: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetch('/api/admin/content')
      if (!response.ok) {
        throw new Error('Failed to load')
      }
      const content = await response.json()
      setData({
        title: content.hero?.title || '',
        subtitle: content.hero?.subtitle || '',
        cta: content.hero?.cta || '',
      })
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка загрузки данных' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hero: {
            ...data,
          },
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Данные сохранены!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        throw new Error('Ошибка сохранения')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка сохранения данных' })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return <div className="text-white/60">Загрузка...</div>
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h2 className="text-2xl font-display font-bold text-white mb-6">
          Редактирование главной секции
        </h2>

        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">
              Заголовок
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full px-4 py-3 bg-dark-tertiary/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
              placeholder="Создаю цифровые миры"
            />
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">
              Подзаголовок
            </label>
            <input
              type="text"
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              className="w-full px-4 py-3 bg-dark-tertiary/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
              placeholder="Product Designer | Creative Developer"
            />
          </div>

          {/* CTA */}
          <div>
            <label className="block text-white/70 text-sm mb-2 font-medium">
              Текст кнопки
            </label>
            <input
              type="text"
              value={data.cta}
              onChange={(e) => setData({ ...data, cta: e.target.value })}
              className="w-full px-4 py-3 bg-dark-tertiary/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
              placeholder="Погрузиться"
            />
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-xl text-sm ${
                message.type === 'success'
                  ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                  : 'bg-red-500/20 border border-red-500/50 text-red-400'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-6 py-3 bg-neon-cyan/10 border-2 border-neon-cyan rounded-xl text-neon-cyan font-medium hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </div>
      </div>
    </div>
  )
}

