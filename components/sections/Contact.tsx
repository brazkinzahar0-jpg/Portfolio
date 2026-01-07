'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ContactProps {
  contact?: {
    email?: string
    telegram?: string
    linkedin?: string
  }
}

export default function Contact({ contact }: ContactProps = {}) {
  const contactData = contact || {
    email: 'hello@portfolio.com',
    telegram: '@username',
    linkedin: 'linkedin.com/in/username',
  }
  
  const socialLinks = [
    { name: 'Email', href: `mailto:${contactData.email}`, icon: '✉', copy: contactData.email },
    { name: 'Telegram', href: `https://t.me/${contactData.telegram?.replace('@', '')}`, icon: '✈', copy: contactData.telegram },
    { name: 'LinkedIn', href: `https://${contactData.linkedin}`, icon: '💼', copy: contactData.linkedin },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [copied, setCopied] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCopy = async (text: string, name: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(name)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        // Reset form on success
        setFormData({ name: '', email: '', message: '' })
        // You can add a success notification here
        alert('Сообщение успешно отправлено!')
      } else {
        throw new Error('Ошибка отправки')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Произошла ошибка. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Давайте</span>{' '}
              <span className="text-white">создадим шедевр</span>
            </h2>
            <div className="w-24 h-1 bg-neon-cyan mx-auto" />
            <p className="mt-6 text-xl text-white/60 max-w-2xl mx-auto">
              Готов обсудить ваш следующий проект
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h3 className="text-3xl font-display font-bold mb-8 text-white">
                Свяжитесь со мной
              </h3>

              <div className="space-y-6 mb-12">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-xl hover:border-neon-cyan/50 transition-all duration-300 group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="text-3xl">{link.icon}</div>
                    <div className="flex-1">
                      <div className="text-white font-medium mb-1">{link.name}</div>
                      <div className="text-white/60 text-sm">{link.copy}</div>
                    </div>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault()
                        handleCopy(link.copy, link.name)
                      }}
                      className="px-4 py-2 bg-white/5 rounded-lg text-white/60 text-sm hover:bg-neon-cyan/10 hover:text-neon-cyan transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copied === link.name ? '✓ Скопировано' : 'Копировать'}
                    </motion.button>
                  </motion.a>
                ))}
              </div>

              {/* Decorative Element */}
              <motion.div
                className="relative w-full h-64 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-lime/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-30">✨</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <label className="block text-white/70 text-sm mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="Ваше имя"
                    required
                  />
                </motion.div>

                {/* Email Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <label className="block text-white/70 text-sm mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors"
                    placeholder="your@email.com"
                    required
                  />
                </motion.div>

                {/* Message Field */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <label className="block text-white/70 text-sm mb-2">
                    Сообщение
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={6}
                    className="w-full px-4 py-3 bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-neon-cyan transition-colors resize-none"
                    placeholder="Расскажите о вашем проекте..."
                    required
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 bg-neon-cyan/10 border-2 border-neon-cyan rounded-full text-neon-cyan font-medium text-lg backdrop-blur-sm hover:bg-neon-cyan hover:text-dark-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span
                        className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                      Отправка...
                    </span>
                  ) : (
                    <>
                      Отправить сообщение
                      <motion.span
                        className="inline-block ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none" />
    </section>
  )
}

