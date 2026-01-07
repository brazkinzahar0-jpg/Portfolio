import fs from 'fs/promises'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'content.json')

export interface PortfolioData {
  hero: {
    title: string
    subtitle: string
    cta: string
  }
  about: {
    manifesto: string[]
    skills: Array<{
      name: string
      level: number
      color: string
      bgColor: string
    }>
  }
  projects: Array<{
    id: number
    title: string
    category: string
    description: string
    image: string
    tags: string[]
    link?: string
  }>
  experiences: Array<{
    period: string
    role: string
    company: string
    achievements: string[]
  }>
  contact: {
    email: string
    telegram: string
    linkedin: string
  }
}

const defaultData: PortfolioData = {
  hero: {
    title: 'Создаю цифровые миры',
    subtitle: 'Product Designer | Creative Developer',
    cta: 'Погрузиться',
  },
  about: {
    manifesto: [
      'Я создаю цифровые продукты, которые не просто работают, а завораживают.',
      'Каждый проект — это история, рассказанная через взаимодействие, визуальный язык и безупречную производительность. Я верю в силу деталей и в то, что лучший интерфейс — тот, который чувствуется, а не только видится.',
    ],
    skills: [
      { name: 'Product Design', level: 95, color: 'text-neon-cyan', bgColor: 'bg-neon-cyan' },
      { name: 'Frontend Development', level: 90, color: 'text-neon-turquoise', bgColor: 'bg-neon-turquoise' },
      { name: 'UI/UX Design', level: 92, color: 'text-neon-lime', bgColor: 'bg-neon-lime' },
      { name: '3D Graphics', level: 75, color: 'text-neon-purple', bgColor: 'bg-neon-purple' },
      { name: 'Motion Design', level: 88, color: 'text-neon-orange', bgColor: 'bg-neon-orange' },
    ],
  },
  projects: [
    {
      id: 1,
      title: 'Luxury E-Commerce Platform',
      category: 'Product Design',
      description: 'Премиум платформа для luxury брендов с immersive shopping experience',
      image: '/api/placeholder/800/600',
      tags: ['React', 'Next.js', 'Three.js', 'GSAP'],
    },
    {
      id: 2,
      title: 'Creative Agency Website',
      category: 'Web Development',
      description: 'Кинематографичный сайт с параллакс эффектами и 3D элементами',
      image: '/api/placeholder/800/600',
      tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'UX/UI Design',
      description: 'Инновационный дизайн для финансового приложения нового поколения',
      image: '/api/placeholder/800/600',
      tags: ['Figma', 'Prototyping', 'Design System'],
    },
    {
      id: 4,
      title: 'Immersive Exhibition',
      category: 'Interactive Design',
      description: 'Виртуальная выставка с WebGL шейдерами и интерактивными элементами',
      image: '/api/placeholder/800/600',
      tags: ['WebGL', 'Three.js', 'Shaders'],
    },
  ],
  experiences: [
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
    {
      period: '2020 — 2022',
      role: 'Creative Developer',
      company: 'Digital Studio',
      achievements: [
        'Developed 20+ premium websites for luxury brands',
        'Created innovative WebGL experiences for brand campaigns',
        'Mentored junior developers and designers',
      ],
    },
    {
      period: '2018 — 2020',
      role: 'UI/UX Designer',
      company: 'Startup Hub',
      achievements: [
        'Designed mobile apps used by 1M+ users',
        'Collaborated with cross-functional teams on product strategy',
        'Won 3 design awards for innovative solutions',
      ],
    },
  ],
  contact: {
    email: 'hello@portfolio.com',
    telegram: '@username',
    linkedin: 'linkedin.com/in/username',
  },
}

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    const fileContent = await fs.readFile(DATA_FILE, 'utf-8')
    const parsed = JSON.parse(fileContent)
    // Объединяем с дефолтными данными на случай, если структура изменилась
    return {
      ...defaultData,
      ...parsed,
      hero: { ...defaultData.hero, ...parsed.hero },
      about: { 
        ...defaultData.about, 
        manifesto: parsed.about?.manifesto || defaultData.about.manifesto,
        skills: parsed.about?.skills || defaultData.about.skills,
      },
      projects: parsed.projects || defaultData.projects,
      experiences: parsed.experiences || defaultData.experiences,
      contact: { ...defaultData.contact, ...parsed.contact },
    }
  } catch {
    // Если файл не существует, создаем его с дефолтными данными
    await savePortfolioData(defaultData)
    return defaultData
  }
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  try {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error saving portfolio data:', error)
    throw error
  }
}

