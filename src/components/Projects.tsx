import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../content'
import { EASE } from '../lib/motion'

function ProjectCard({
  i,
  total,
  project,
  progress,
}: {
  i: number
  total: number
  project: Project
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}) {
  const targetScale = 1 - (total - 1 - i) * 0.03
  const scale = useTransform(progress, [i / total, 1], [1, targetScale])

  return (
    <div className="sticky top-24 flex h-[86vh] items-center justify-center">
      <motion.article
        style={{ scale, top: `${i * 28}px` }}
        className="group relative w-full origin-top overflow-hidden rounded-[32px] border border-line bg-ivory shadow-[0_30px_80px_-40px_rgba(24,20,16,0.35)]"
      >
        <div className="flex flex-col md:flex-row md:items-stretch">
          {/* Image */}
          <div className="relative overflow-hidden md:w-[56%]">
            <img
              src={project.image}
              alt={project.alt}
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-1200 ease-expo group-hover:scale-105 md:h-[62vh]"
            />
            <div className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-multiply" />
            <span className="absolute left-6 top-6 rounded-full bg-ivory/85 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-charcoal backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          {/* Info bar */}
          <div className="flex flex-1 flex-col justify-between p-8 md:p-12">
            <div className="flex items-start justify-between">
              <span className="font-display text-6xl leading-none text-line md:text-8xl">
                {project.index}
              </span>
            </div>
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.22em] text-stone">
                {project.category}
              </p>
              <h3 className="font-display text-4xl leading-tight text-charcoal md:text-5xl">
                {project.name}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-stone">
                {project.descriptor}
              </p>
              <Link
                to={`/villas/${project.slug}`}
                className="group/btn mt-8 inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-xs uppercase tracking-[0.18em] text-charcoal transition-colors duration-500 ease-expo hover:border-charcoal"
              >
                View Villa
                <ArrowUpRight
                  strokeWidth={1.5}
                  className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  )
}

export default function Projects() {
  const container = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <section id="villas" ref={container} className="bg-sand py-24">
      {/* Heading */}
      <div className="mx-auto mb-8 flex max-w-[1200px] items-end justify-between px-6">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="mb-4 flex items-center gap-4"
          >
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs uppercase tracking-[0.28em] text-stone">
              {projects.eyebrow}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="font-display text-4xl text-charcoal md:text-6xl"
          >
            {projects.title}
          </motion.h2>
        </div>
        <Link
          to="/villas"
          className="link-underline mb-2 hidden text-xs uppercase tracking-[0.18em] text-stone hover:text-charcoal md:inline-block"
        >
          {projects.viewAll}
        </Link>
      </div>

      {/* Sticky stack */}
      <div className="mx-auto max-w-[1200px] px-6">
        {projects.items.map((p, i) => (
          <ProjectCard
            key={p.name}
            i={i}
            total={projects.items.length}
            project={p}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  )
}
