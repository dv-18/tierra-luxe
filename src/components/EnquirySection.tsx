import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../content'
import { EASE } from '../lib/motion'

/**
 * Charcoal CTA band. Without `villaName` it's a simple "Begin the conversation"
 * link to the home contact form. With `villaName` it renders an inline enquiry
 * form with the subject prefilled (placeholder submit).
 */
export default function EnquirySection({ villaName }: { villaName?: string }) {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="enquire" className="bg-charcoal py-24 text-ivory md:py-28">
      <div className="mx-auto max-w-[1000px] px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="section-label text-xs text-ivory/60"
        >
          {villaName ? 'Enquire About This Villa' : 'Begin the Conversation'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: EASE, delay: 0.05 }}
          className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl"
        >
          {villaName ? (
            <>
              Request the brochure for <em className="italic text-gold">{villaName}</em>.
            </>
          ) : (
            "Let's build something exceptional."
          )}
        </motion.h2>

        {villaName ? (
          <div className="mt-12 max-w-2xl">
            {sent ? (
              <p className="py-8 font-display text-2xl italic text-ivory/90">
                Thank you — we'll send the {villaName} brochure shortly.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
                <input type="hidden" name="subject" value={`Enquiry — ${villaName}`} />
                <Field label="Name" name="name" type="text" autoComplete="name" />
                <Field label="Email" name="email" type="email" autoComplete="email" />
                <div className="sm:col-span-2">
                  <Field label="Message" name="message" type="text" />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-ivory px-8 py-4 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 ease-expo hover:bg-gold hover:text-ivory"
                  >
                    Request Brochure
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <Link
              to="/#contact"
              className="group inline-flex items-center gap-3 rounded-full border border-ivory/40 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ease-expo hover:border-ivory"
            >
              Begin the conversation
              <ArrowUpRight
                strokeWidth={1.5}
                className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-xs uppercase tracking-[0.2em] text-ivory/70 hover:text-ivory"
            >
              {site.email}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type,
  autoComplete,
}: {
  label: string
  name: string
  type: string
  autoComplete?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-[10px] uppercase tracking-[0.22em] text-ivory/50">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required
        placeholder={label === 'Message' ? 'Tell us about your enquiry…' : ''}
        className="border-b border-ivory/25 bg-transparent py-3 text-sm text-ivory placeholder-ivory/30 outline-none transition-colors focus:border-gold"
      />
    </div>
  )
}
