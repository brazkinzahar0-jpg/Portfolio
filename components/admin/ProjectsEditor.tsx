'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

export default function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([])
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
      setProjects(content.projects || [])
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
          projects,
        }),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Проекты сохранены!' })
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

  const addProject = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1
    setProjects([...projects, {
      id: newId,
      title: 'Новый проект',
      category: 'Категория',
      description: 'Описание проекта',
      image: '/api/placeholder/800/600',
      tags: [],
    }])
  }

  const removeProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id))
  }

  const updateProject = (id: number, field: keyof Project, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p))
  }

  const addTag = (projectId: number, tag: string) => {
    if (!tag.trim()) return
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, tags: [...p.tags, tag.trim()] }
        : p
    ))
  }

  const removeTag = (projectId: number, tagIndex: number) => {
    setProjects(projects.map(p => 
      p.id === projectId 
        ? { ...p, tags: p.tags.filter((_, i) => i !== tagIndex) }
        : p
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
            Редактирование проектов
          </h2>
          <button
            onClick={addProject}
            className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan rounded-lg text-neon-cyan hover:bg-neon-cyan/30 text-sm transition-colors"
          >
            + Добавить проект
          </button>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-tertiary/30 border border-white/10 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-neon-cyan font-medium">Проект #{index + 1}</span>
                <button
                  onClick={() => removeProject(project.id)}
                  className="px-3 py-1 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 text-xs transition-colors"
                >
                  Удалить
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/70 text-xs mb-1">Название</label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
                <div>
                  <label className="block text-white/70 text-xs mb-1">Категория</label>
                  <input
                    type="text"
                    value={project.category}
                    onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                    className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Описание</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan resize-none"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">URL изображения</label>
                <input
                  type="text"
                  value={project.image}
                  onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                  className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                  placeholder="/images/project.jpg"
                />
              </div>

              <div>
                <label className="block text-white/70 text-xs mb-1">Теги</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-neon-cyan/20 border border-neon-cyan/50 rounded text-neon-cyan text-xs flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(project.id, tagIndex)}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Добавить тег и нажать Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addTag(project.id, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                  className="w-full px-3 py-2 bg-dark-secondary/50 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-neon-cyan"
                />
              </div>
            </motion.div>
          ))}

          {projects.length === 0 && (
            <div className="text-center py-12 text-white/40">
              Нет проектов. Добавьте первый проект.
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

