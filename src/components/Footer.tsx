import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, AtSign } from 'lucide-react';
import { A, CONTACT, type Go } from '../data';
import { Btn, Checkers, R, SuccessMark } from './ui';
import { Logo } from './Header';

const Instagram = (p: { size?: number; className?: string }) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const Facebook = (p: { size?: number; className?: string }) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Youtube = (p: { size?: number; className?: string }) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
  </svg>
);

export default function Footer({ go }: { go: Go }) {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const gallery = [A.kiawahLake, A.cartMen, A.wingsCocktail, A.crowd, A.familyCart, A.cocktailsTrio];

  return (
    <footer className="relative border-t border-ivory/10 bg-coal">
      <Checkers slide />

      {/* newsletter */}
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-2 md:px-10 md:py-20">
        <R>
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">The Back Nine Bulletin</p>
          <h3 className="mt-4 font-display text-3xl leading-tight text-ivory md:text-4xl">
            Subscribe to our <em className="text-gold2">newsletter</em>
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-sand">
            Tee sheet openings, live music lineups, wing-night intel — straight to your inbox. Never more than once a week.
          </p>
        </R>
        <R delay={0.1} className="flex items-end">
          {joined ? (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-5">
              <SuccessMark show />
              <div>
                <p className="font-display text-xl text-gold2">You're on the list.</p>
                <p className="mt-1 text-sm text-sand">See you at the Club — first tee or first round.</p>
              </div>
            </motion.div>
          ) : (
            <form className="flex w-full gap-3" onSubmit={(e) => { e.preventDefault(); if (email.includes('@')) setJoined(true); }}>
              <div className="flex-1">
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="your@email.com" className="field" />
              </div>
              <Btn small>Join</Btn>
            </form>
          )}
        </R>
      </div>

      {/* social strip */}
      <div className="border-y border-ivory/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 pt-10 md:px-10">
          <R y={16} className="flex items-center gap-3 pb-6 text-[11px] font-bold uppercase tracking-[0.3em] text-ivory">
            <AtSign size={14} className="text-gold" /> Stay connected — {CONTACT.social}
          </R>
          <R y={16} delay={0.1} className="flex gap-2 pb-6">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="social"
                className="grid size-9 place-items-center border border-ivory/15 text-ivory/60 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:text-gold">
                <Icon size={14} />
              </a>
            ))}
          </R>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-5 pb-12 sm:grid-cols-3 md:grid-cols-6 md:px-10">
          {gallery.map((g, i) => (
            <R key={i} delay={i * 0.06} y={20}>
              <div className="group relative aspect-square overflow-hidden">
                <img src={g} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115" />
                <div className="absolute inset-0 grid place-items-center bg-ink/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <Instagram size={20} className="text-gold2" />
                </div>
              </div>
            </R>
          ))}
        </div>
      </div>

      {/* columns */}
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] md:px-10">
        <R>
          <Logo onClick={() => go('home')} />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand">
            Lake Norman's premier sports club — 18 holes of championship golf, Victory Lane dining, simulators, and race-day energy. Open to the public.
          </p>
          <p className="mt-4 font-poster text-2xl tracking-wide text-ivory/25">EST. STATESVILLE, NC</p>
        </R>
        <R delay={0.08}>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Explore</p>
          <ul className="space-y-3 text-sm">
            {([['membership', 'Membership'], ['dining', 'Dining'], ['events', 'Events'], ['golf', 'Golf'], ['tee-times', 'Book a Tee Time']] as const).map(([p, l]) => (
              <li key={p}>
                <button onClick={() => go(p)} className="group cursor-pointer text-sand transition-colors hover:text-gold2">
                  <span className="mr-2 inline-block w-0 overflow-hidden text-gold transition-all duration-300 group-hover:w-4">→</span>{l}
                </button>
              </li>
            ))}
          </ul>
        </R>
        <R delay={0.16}>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Calendars</p>
          <ul className="space-y-3 text-sm">
            {([['event-calendar', 'Event Calendar'], ['club-calendar', 'Club Calendar'], ['book-event', 'Book an Event']] as const).map(([p, l]) => (
              <li key={p}>
                <button onClick={() => go(p)} className="group cursor-pointer text-sand transition-colors hover:text-gold2">
                  <span className="mr-2 inline-block w-0 overflow-hidden text-gold transition-all duration-300 group-hover:w-4">→</span>{l}
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => go('careers')} className="group cursor-pointer text-sand transition-colors hover:text-gold2">
                <span className="mr-2 inline-block w-0 overflow-hidden text-gold transition-all duration-300 group-hover:w-4">→</span>Careers
              </button>
            </li>
          </ul>
        </R>
        <R delay={0.24}>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Visit</p>
          <ul className="space-y-4 text-sm text-sand">
            <li className="flex gap-3"><MapPin size={15} className="mt-0.5 shrink-0 text-gold" /> {CONTACT.address}</li>
            <li className="flex gap-3"><Phone size={15} className="mt-0.5 shrink-0 text-gold" /> <a href={CONTACT.phoneLink} className="transition-colors hover:text-gold2">Phone: 704.872.9990</a></li>
            <li className="flex gap-3"><Mail size={15} className="mt-0.5 shrink-0 text-gold" /> <a href="mailto:Scott@500-club.com" className="transition-colors hover:text-gold2">Scott@500-club.com</a></li>
          </ul>
          <Btn small className="mt-6" variant="outline" onClick={() => go('contact')}>Contact Us</Btn>
        </R>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-[10px] uppercase tracking-[0.25em] text-sand/50 md:flex-row md:px-10">
          <span>© 2026 The 500 Club. All rights reserved.</span>
          <span className="flex items-center gap-2">Site by <span className="text-gold/70">Clubessential</span> · Reimagined</span>
        </div>
      </div>
    </footer>
  );
}
