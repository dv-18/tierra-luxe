import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { contact, site } from '../content'
import { EASE } from '../lib/motion'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Placeholder handler — wire to Tierra's CRM / email service.
    setSent(true)
  }

  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-charcoal pb-10 pt-24 text-ivory"
    >
      {/* Faint background image + heavy overlay */}
      <img
        src={contact.bgPoster}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="pointer-events-none absolute inset-0 bg-charcoal/70" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
        {/* CTA block */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-xs uppercase tracking-[0.3em] text-ivory/60"
          >
            {contact.eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE, delay: 0.05 }}
            className="mt-6 font-display text-5xl leading-[1.02] md:text-7xl text-balance"
          >
            {contact.title}
          </motion.h2>

          <motion.a
            href={`mailto:${site.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="group mt-10 inline-flex items-center gap-3 rounded-full border border-ivory/40 px-8 py-4 text-xs uppercase tracking-[0.2em] transition-colors duration-500 ease-expo hover:border-ivory"
          >
            {site.email}
            <ArrowUpRight
              strokeWidth={1.5}
              className="h-4 w-4 text-gold transition-transform duration-500 ease-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </motion.a>
        </div>

        {/* Enquiry form */}
        <div className="mx-auto mt-20 max-w-2xl">
          {sent ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-10 text-center font-display text-2xl italic text-ivory/90"
            >
              Thank you — we'll be in touch shortly.
            </motion.p>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2">
              <Field label="Name" name="name" type="text" autoComplete="name" />
              <Field label="Email" name="email" type="email" autoComplete="email" />

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="interest"
                  className="text-[10px] uppercase tracking-[0.22em] text-ivory/50"
                >
                  Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  defaultValue=""
                  className="border-b border-ivory/25 bg-transparent py-3 text-sm text-ivory outline-none transition-colors focus:border-gold [&>option]:text-charcoal"
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  {contact.interests.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <Field label="Message" name="message" type="text" />

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-ivory px-8 py-4 text-xs uppercase tracking-[0.2em] text-charcoal transition-colors duration-500 ease-expo hover:bg-gold hover:text-ivory"
                >
                  Send Enquiry
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer bar */}
        <div className="mt-24 flex flex-col items-center gap-6 border-t border-ivory/12 pt-8 text-xs text-ivory/60 md:flex-row md:justify-between">
          <p className="tracking-wide">
            © Tierra Luxe {site.year} · {site.location}
          </p>

          <div className="flex items-center gap-6">
            {contact.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline uppercase tracking-[0.16em] hover:text-ivory"
              >
                {s.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-dot-pulse rounded-full bg-gold" />
            <span className="uppercase tracking-[0.16em]">{contact.availability}</span>
          </div>
        </div>
      </div>
    </footer>
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
      <label
        htmlFor={name}
        className="text-[10px] uppercase tracking-[0.22em] text-ivory/50"
      >
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
