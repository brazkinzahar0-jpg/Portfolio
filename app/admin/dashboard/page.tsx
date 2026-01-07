'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import ContentEditor from '@/components/admin/ContentEditor'
import ProjectsEditor from '@/components/admin/ProjectsEditor'
import ExperienceEditor from '@/components/admin/ExperienceEditor'
import SkillsEditor from '@/components/admin/SkillsEditor'

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'projects' | 'experience'>('hero')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth')
      const data = await response.json()
      setIsAuthenticated(data.authenticated)
      if (!data.authenticated) {
        router.push('/admin/login')
      }
    } catch {
      setIsAuthenticated(false)
      router.push('/admin/login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-primary">
        <div className="text-neon-cyan">Загрузка...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-dark-primary">
      {/* Header */}
      <header className="bg-dark-secondary/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-display font-bold gradient-text">
              Админ-панель
            </h1>
            <div className="flex items-center gap-4">
              <a
                href="/"
                target="_blank"
                className="text-white/70 hover:text-neon-cyan text-sm transition-colors"
              >
                Открыть сайт →
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 text-sm transition-colors"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-white/10 bg-dark-secondary/50">
        <div className="container mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'hero', label: 'Главная секция' },
              { id: 'about', label: 'О себе' },
              { id: 'projects', label: 'Проекты' },
              { id: 'experience', label: 'Опыт работы' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-neon-cyan border-b-2 border-neon-cyan'
                    : 'text-white/60 hover:text-white/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'hero' && <ContentEditor />}
          {activeTab === 'about' && <SkillsEditor />}
          {activeTab === 'projects' && <ProjectsEditor />}
          {activeTab === 'experience' && <ExperienceEditor />}
        </motion.div>
      </div>
    </div>
  )
}


