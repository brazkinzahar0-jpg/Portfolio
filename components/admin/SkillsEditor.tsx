'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  level: number
  color: string
  bgColor: string
}

const colorOptions = [
  { value: 'text-neon-cyan', bg: 'bg-neon-cyan', label: 'Cyan' },
  { value: 'text-neon-turquoise', bg: 'bg-neon-turquoise', label: 'Turquoise' },
  { value: 'text-neon-lime', bg: 'bg-neon-lime', label: 'Lime' },
  { value: 'text-neon-purple', bg: 'bg-neon-purple', label: 'Purple' },
  { value: 'text-neon-orange', bg: 'bg-neon-orange', label: 'Orange' },
]

export default function SkillsEditor() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [manifesto, setManifesto] = useState<string[]>(['', ''])
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
      setSkills(content.about?.skills || [])
      setManifesto(content.about?.manifesto || ['', ''])
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
          about: {
            skills,
            manifesto,
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
      setMessage({ type: 'error', text: 'Ошибка сохранения' })
    } finally {
      setIsSaving(false)
    }
  }

  const addSkill = () => {
    setSkills([...skills, {
      name: 'Новый навык',
      level: 50,
      color: 'text-neon-cyan',
      bgColor: 'bg-neon-cyan',
    }])
  }

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index))
  }

  const updateSkill = (index: number, field: keyof Skill, value: any) => {
    setSkills(skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    ))
  }

  if (isLoading) {
    return <div className="text-white/60">Загрузка...</div>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Manifesto */}
      <div className="bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <h3 className="text-xl font-display font-bold text-white mb-4">
          Манифест / О себе
        </h3>
        <div className="space-y-4">
          {manifesto.map((text, index) => (
            <div key={index}>
              <label className="block text-white/70 text-sm mb-2">
                Абзац {index + 1}
              </label>
              <textarea
                value={text}
                onChange={(e) => {
                  const newManifesto = [...manifesto]
                  newManifesto[index] = e.target.value
                  setManifesto(newManifesto)
                }}
                rows={3}
                className="w-full px-4 py-3 bg-dark-tertiary/50 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan resize-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-display font-bold text-white">
            Навыки
          </h3>
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan rounded-lg text-neon-cyan hover:bg-neon-cyan/30 text-sm transition-colors"
          >
            + Добавить навык
          </button>
        </div>

        <div className="space-y-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-tertiary/30 border border-white/10 rounded-xl p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-neon-cyan text-sm font-medium">Навык #{index + 1}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 text-xs transition-colors"
                >
                  Удалить
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-white/70 text-xs mb-1">Название</label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs mb-1">Уровень (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => updateSkill(index, 'level', parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs mb-1">Цвет</label>
                  <select
                    value={skill.color}
                    onChange={(e) => {
                      const selectedColor = colorOptions.find(c => c.value === e.target.value)
                      if (selectedColor) {
                        updateSkill(index, 'color', selectedColor.value)
                        updateSkill(index, 'bgColor', selectedColor.bg)
                      }
                    }}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  >
                    {colorOptions.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          ))}

          {skills.length === 0 && (
            <div className="text-center py-8 text-white/40">
              Нет навыков. Добавьте первый навык.
            </div>
          )}
        </div>
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
        {isSaving ? 'Сохранение...' : 'Сохранить все изменения'}
      </button>
    </div>
  )
}

