import { Link } from 'react-router-dom'
import { contact, site } from '../content'

/** Compact footer bar for sub-pages (matches the home footer bar styling). */
export default function SiteFooter() {
  return (
    <footer className="bg-charcoal px-6 pb-10 pt-12 text-ivory md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 border-t border-ivory/12 pt-8 text-xs text-ivory/60 md:flex-row md:justify-between">
        <p className="tracking-wide">
          © Tierra Luxe {site.year} · {site.location}
        </p>

        <div className="flex items-center gap-6">
          <Link to="/villas" className="link-underline uppercase tracking-[0.16em] hover:text-ivory">
            Villas
          </Link>
          <Link to="/about" className="link-underline uppercase tracking-[0.16em] hover:text-ivory">
            About
          </Link>
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
    </footer>
  )
}
