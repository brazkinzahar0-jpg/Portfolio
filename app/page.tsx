import { getPortfolioData } from '@/lib/data'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Portfolio from '@/components/sections/Portfolio'
import Experience from '@/components/sections/Experience'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/Footer'

export default async function Home() {
  // Загружаем данные из файла (или используем дефолтные)
  const data = await getPortfolioData()

  return (
    <main className="relative">
      <Hero data={data.hero} />
      <About data={data.about} />
      <Portfolio projects={data.projects} />
      <Experience experiences={data.experiences} />
      <Contact contact={data.contact} />
      <Footer />
    </main>
  )
}
