import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Projects from '../components/Projects'
import Process from '../components/Process'
import Experience from '../components/Experience'
import Marquee from '../components/Marquee'
import Brands from '../components/Brands'
import Contact from '../components/Contact'

export default function Home({ ready }: { ready: boolean }) {
  return (
    <>
      <main>
        <Hero ready={ready} />
        <Intro />
        <Projects />
        <Process />
        <Experience />
        <Marquee />
        <Brands compact />
      </main>
      <Contact />
    </>
  )
}
