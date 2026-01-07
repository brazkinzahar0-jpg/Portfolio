export interface Project {
  id: number
  title: string
  category: string
  description: string
  image: string
  tags: string[]
  link?: string
  github?: string
}

export interface Experience {
  period: string
  role: string
  company: string
  achievements: string[]
}

export interface Skill {
  name: string
  level: number
  color: string
  bgColor: string
}

export interface SocialLink {
  name: string
  href: string
  icon: string
  copy?: string
}


