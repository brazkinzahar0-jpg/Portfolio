'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface ExperienceItem {
  period: string
  role: string
  company: string
  achievements: string[]
}

interface ExperienceProps {
  experiences?: ExperienceItem[]
}

export default function Experience({ experiences: experiencesProp }: ExperienceProps = {}) {
  const defaultExperiences: ExperienceItem[] = [
    {
      period: '2022 — Present',
      role: 'Senior Product Designer',
      company: 'Tech Innovation Lab',
      achievements: [
        'Led design for 3 major product launches with 500K+ users',
        'Established design system used across 15+ products',
        'Increased user engagement by 40% through UX improvements',
      ],
    },
  ]
  
  const experiences = experiencesProp || defaultExperiences
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
      ref={ref}
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6">
            <span className="text-white">Опыт</span>{' '}
            <span className="gradient-text">работы</span>
          </h2>
          <div className="w-24 h-1 bg-neon-cyan mx-auto" />
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-turquoise opacity-30" />

          <div className="space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="relative pl-12 sm:pl-16 md:pl-24"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-2 sm:left-4 md:left-6 top-2 w-3 h-3 sm:w-4 sm:h-4 bg-neon-cyan rounded-full border-2 sm:border-4 border-dark-primary z-10">
                  <motion.div
                    className="absolute inset-0 bg-neon-cyan rounded-full"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: [0, 1.5, 1] } : { scale: 0 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  className="relative bg-dark-secondary/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-neon-cyan/50 transition-colors duration-300"
                  whileHover={{ scale: 1.02, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <span className="text-neon-cyan text-sm font-medium mb-1 block">
                        {exp.period}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-xl text-white/60">{exp.company}</p>
                    </div>
                  </div>

                  {/* Achievements */}
                  <ul className="space-y-3 mt-6">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        className="flex items-start gap-3 text-white/70"
                        initial={{ opacity: 0, x: -20 }}
                        animate={
                          isInView
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -20 }
                        }
                        transition={{ delay: index * 0.2 + 0.4 + i * 0.1 }}
                      >
                        <span className="text-neon-cyan mt-2">▹</span>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-neon-cyan/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-neon-purple/5 to-transparent pointer-events-none" />
    </section>
  )
}

