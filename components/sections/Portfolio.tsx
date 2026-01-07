'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
}

interface PortfolioProps {
  projects?: Project[]
}

export default function Portfolio({ projects: projectsProp }: PortfolioProps = {}) {
  const defaultProjects: Project[] = [
    {
      id: 1,
      title: 'Luxury E-Commerce Platform',
      category: 'Product Design',
      description: 'Премиум платформа для luxury брендов с immersive shopping experience',
      image: '/api/placeholder/800/600',
      tags: ['React', 'Next.js', 'Three.js', 'GSAP'],
    },
  ]
  
  const projects = projectsProp || defaultProjects
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section
      id="portfolio"
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
            <span className="gradient-text">Избранные</span>{' '}
            <span className="text-white">проекты</span>
          </h2>
          <div className="w-24 h-1 bg-neon-cyan mx-auto" />
          <p className="mt-6 text-xl text-white/60 max-w-2xl mx-auto">
            Каждый проект — это путешествие от концепции до реализации
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Project Card */}
              <div className="relative h-[400px] sm:h-[450px] md:h-[500px] rounded-2xl overflow-hidden bg-dark-secondary border border-white/10 backdrop-blur-sm">
                {/* Project Number */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="text-6xl md:text-8xl font-display font-bold text-white/5 group-hover:text-neon-cyan/20 transition-colors duration-500">
                    {String(project.id).padStart(2, '0')}
                  </span>
                </div>

                {/* Image/Preview */}
                <div className="absolute inset-0">
                  <div className="w-full h-full bg-gradient-to-br from-dark-tertiary to-dark-secondary flex items-center justify-center">
                    <span className="text-white/20 text-sm">Project Preview</span>
                  </div>
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-dark-primary via-dark-primary/50 to-transparent transition-opacity duration-500 ${
                      hoveredIndex === index ? 'opacity-100' : 'opacity-60'
                    }`}
                  />
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <motion.div
                    animate={{
                      y: hoveredIndex === index ? 0 : 20,
                      opacity: hoveredIndex === index ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-neon-cyan text-sm font-medium mb-2 block">
                      {project.category}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-display font-bold mb-3 text-white">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="px-6 py-3 bg-neon-cyan/10 border border-neon-cyan rounded-full text-neon-cyan font-medium text-sm backdrop-blur-sm group-hover:bg-neon-cyan group-hover:text-dark-primary transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Исследовать кейс →
                    </motion.button>
                  </motion.div>
                </div>

                {/* Hover Glow */}
                {hoveredIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-neon-cyan/10 rounded-2xl blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <motion.div
        style={{ y }}
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-neon-purple/5 to-transparent pointer-events-none"
      />
    </section>
  )
}

