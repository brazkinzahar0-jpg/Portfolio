'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AboutProps {
  data?: {
    manifesto?: string[]
    skills?: Array<{
      name: string
      level: number
      color: string
      bgColor: string
    }>
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export default function About({ data }: AboutProps = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const skills = data?.skills || [
    { name: 'Product Design', level: 95, color: 'text-neon-cyan', bgColor: 'bg-neon-cyan' },
    { name: 'Frontend Development', level: 90, color: 'text-neon-turquoise', bgColor: 'bg-neon-turquoise' },
    { name: 'UI/UX Design', level: 92, color: 'text-neon-lime', bgColor: 'bg-neon-lime' },
    { name: '3D Graphics', level: 75, color: 'text-neon-purple', bgColor: 'bg-neon-purple' },
    { name: 'Motion Design', level: 88, color: 'text-neon-orange', bgColor: 'bg-neon-orange' },
  ]
  
  const manifesto = data?.manifesto || [
    'Я создаю цифровые продукты, которые не просто работают, а завораживают.',
    'Каждый проект — это история, рассказанная через взаимодействие, визуальный язык и безупречную производительность. Я верю в силу деталей и в то, что лучший интерфейс — тот, который чувствуется, а не только видится.',
  ]

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-6xl mx-auto"
        >
          {/* Title */}
          <motion.div variants={itemVariants} className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">О себе</span>
            </h2>
            <div className="w-24 h-1 bg-neon-cyan mx-auto" />
          </motion.div>

          {/* Manifesto */}
          <motion.div
            variants={itemVariants}
            className="max-w-3xl mx-auto text-center mb-20"
          >
            {manifesto.map((text, index) => (
              <p
                key={index}
                className={`${index === 0 ? 'text-xl md:text-2xl text-white/80' : 'text-lg md:text-xl text-white/60'} leading-relaxed ${index === 0 ? 'mb-6' : ''}`}
              >
                {text}
              </p>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="space-y-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-lg">{skill.name}</span>
                  <span className={`${skill.color} font-bold`}>{skill.level}%</span>
                </div>
                <div className="h-2 bg-dark-tertiary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${skill.bgColor} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ delay: index * 0.1 + 0.7, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Photo Section */}
          <motion.div
            variants={itemVariants}
            className="mt-20 flex justify-center"
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {/* Glitch effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 via-neon-purple/20 to-neon-lime/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Placeholder for photo */}
              <div className="w-full h-full bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                <span className="text-white/30 text-sm">Your Photo</span>
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-neon-cyan rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-neon-cyan/5 to-transparent pointer-events-none" />
    </section>
  )
}

