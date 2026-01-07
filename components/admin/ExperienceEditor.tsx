'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Experience {
  period: string
  role: string
  company: string
  achievements: string[]
}

export default function ExperienceEditor() {
  const [experiences, setExperiences] = useState<Experience[]>([])
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
      setExperiences(content.experiences || [])
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
          experiences,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Опыт работы сохранен!' })
        setTimeout(() => setMessage(null), 3000)
      } else {
        throw new Error('Ошибка сохранения')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка сохранения' })
    } finally {
      setIsSaving(false)
    }
  }

  const addExperience = () => {
    setExperiences([...experiences, {
      period: '2024 — Present',
      role: 'Должность',
      company: 'Компания',
      achievements: [],
    }])
  }

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const updateExperience = (index: number, field: keyof Experience, value: any) => {
    setExperiences(experiences.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ))
  }

  const addAchievement = (index: number, achievement: string) => {
    if (!achievement.trim()) return
    setExperiences(experiences.map((exp, i) => 
      i === index 
        ? { ...exp, achievements: [...exp.achievements, achievement.trim()] }
        : exp
    ))
  }

  const removeAchievement = (expIndex: number, achIndex: number) => {
    setExperiences(experiences.map((exp, i) => 
      i === expIndex 
        ? { ...exp, achievements: exp.achievements.filter((_, ai) => ai !== achIndex) }
        : exp
    ))
  }

  if (isLoading) {
    return <div className="text-white/60">Загрузка...</div>
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white">
            Редактирование опыта работы
          </h2>
          <button
            onClick={addExperience}
            className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan rounded-lg text-neon-cyan hover:bg-neon-cyan/30 text-sm transition-colors"
          >
            + Добавить опыт
          </button>
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-tertiary/30 border border-white/10 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-neon-cyan font-medium">Опыт #{index + 1}</span>
                <button
                  onClick={() => removeExperience(index)}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 text-xs transition-colors"
                >
                  Удалить
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-xs mb-1">Период</label>
                  <input
                    type="text"
                    value={exp.period}
                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                    placeholder="2024 — Present"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs mb-1">Должность</label>
                  <input
                    type="text"
                    value={exp.role}
                    onChange={(e) => updateExperience(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Компания</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExperience(index, 'company', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Достижения</label>
                <div className="space-y-2 mb-2">
                  {exp.achievements.map((ach, achIndex) => (
                    <div key={achIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={ach}
                        onChange={(e) => {
                          const newAchievements = [...exp.achievements]
                          newAchievements[achIndex] = e.target.value
                          updateExperience(index, 'achievements', newAchievements)
                        }}
                        className="flex-1 px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                      />
                      <button
                        onClick={() => removeAchievement(index, achIndex)}
                        className="px-2 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Добавить достижение и нажать Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addAchievement(index, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                  className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </motion.div>
          ))}

          {experiences.length === 0 && (
            <div className="text-center py-12 text-white/40">
              Нет записей. Добавьте первый опыт работы.
            </div>
          )}

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

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full px-6 py-3 bg-neon-cyan/10 border-2 border-neon-cyan rounded-xl text-neon-cyan font-medium hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 disabled:opacity-50"
          >
            {isSaving ? 'Сохранение...' : 'Сохранить все изменения'}
          </button>
        </div>
      </div>
    </div>
  )
}

