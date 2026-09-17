import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ChevronDown, Menu, X, User, Lock, Flag, ShieldCheck } from 'lucide-react';
import { NAV, CONTACT, type Go, type PageKey } from '../data';
import { Btn, Checkers, EASE, Modal } from './ui';

export function Logo({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  return (
    <button onClick={onClick} className="group flex cursor-pointer items-center gap-3">
      <span className={`relative grid ${compact ? 'size-10' : 'size-12'} place-items-center`}>
        <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
          <circle cx="24" cy="24" r="22.5" fill="none" stroke="#C7A15C" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="18.5" fill="none" stroke="rgba(199,161,92,.35)" strokeWidth="0.8" strokeDasharray="2 3" />
        </svg>
        <span className={`font-poster ${compact ? 'text-sm' : 'text-base'} text-gold2 transition-transform duration-500 group-hover:rotate-[360deg]`}>500</span>
      </span>
      <span className="hidden text-left leading-none sm:block">
        <span className={`block font-poster ${compact ? 'text-sm' : 'text-base'} tracking-wide text-ivory`}>THE 500 CLUB</span>
        <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.32em] text-sand">Statesville · NC</span>
      </span>
    </button>
  );
}

export default function Header({ page, go, onLogin }: { page: PageKey; go: Go; onLogin: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [drop, setDrop] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    fn();
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setMobile(false); setDrop(false); }, [page]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, delay: 2.3, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 ${scrolled ? 'border-b border-ivory/10 bg-ink/85 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        {/* utility bar */}
        <div className={`hidden overflow-hidden border-b border-ivory/10 transition-all duration-500 lg:block ${scrolled ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
          <div className="mx-auto flex max-w-7xl items-center justify-between px-10 py-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-sand">
            <span className="flex items-center gap-2">
              <Flag size={11} className="text-gold" /> Where Lake Norman comes to play
            </span>
            <span className="flex items-center gap-6">
              <a href={CONTACT.phoneLink} className="flex items-center gap-2 transition-colors hover:text-gold2"><Phone size={11} /> {CONTACT.phone}</a>
              <button onClick={onLogin} className="flex cursor-pointer items-center gap-2 transition-colors hover:text-gold2"><User size={11} /> Member Login</button>
            </span>
          </div>
        </div>

        {/* main bar */}
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-10">
          <Logo onClick={() => go('home')} compact={scrolled} />

          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) =>
              n.children ? (
                <div key={n.label} className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
                  <button
                    onClick={() => go(n.page)}
                    className={`flex cursor-pointer items-center gap-1.5 py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${['events', 'event-calendar', 'club-calendar', 'book-event'].includes(page) ? 'text-gold2' : 'text-ivory/80 hover:text-gold2'}`}
                  >
                    {n.label}
                    <motion.span animate={{ rotate: drop ? 180 : 0 }}><ChevronDown size={12} /></motion.span>
                  </button>
                  <AnimatePresence>
                    {drop && (
                      <motion.div
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="absolute left-1/2 top-full w-[430px] -translate-x-1/2 pt-2"
                      >
                        <div className="border border-ivory/12 bg-coal/95 p-2 shadow-2xl backdrop-blur-xl">
                          <Checkers dark className="mb-2" />
                          {n.children.map((c) => (
                            <button key={c.page} onClick={() => { go(c.page); setDrop(false); }}
                              className="group flex w-full cursor-pointer items-center gap-4 p-3 text-left transition-colors hover:bg-ivory/5">
                              <span className="h-14 w-20 shrink-0 overflow-hidden">
                                <img src={c.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              </span>
                              <span>
                                <span className="block font-display text-base text-ivory transition-colors group-hover:text-gold2">{c.label}</span>
                                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-sand">{c.desc}</span>
                              </span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button key={n.label} onClick={() => go(n.page)}
                  className={`relative cursor-pointer py-4 text-[11px] font-bold uppercase tracking-[0.22em] transition-colors ${page === n.page ? 'text-gold2' : 'text-ivory/80 hover:text-gold2'}`}>
                  {n.label}
                  {page === n.page && <motion.span layoutId="navline" className="absolute bottom-2 left-0 right-0 h-px bg-gold" />}
                </button>
              )
            )}
            <Btn small onClick={() => go('tee-times')}>Book a Tee Time</Btn>
            <button
              onClick={() => { window.location.hash = 'admin'; }}
              title="Club Command — staff admin"
              className="group flex cursor-pointer items-center gap-2 border border-ivory/25 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/70 transition-all duration-300 hover:border-gold hover:text-gold2 hover:shadow-[0_0_20px_rgba(199,161,92,.25)]"
            >
              <ShieldCheck size={12} className="transition-transform duration-500 group-hover:rotate-[360deg]" /> Admin
            </button>
          </nav>

          <button onClick={() => setMobile(true)} className="grid size-11 cursor-pointer place-items-center border border-ivory/20 text-ivory lg:hidden" aria-label="Menu">
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-[130] flex flex-col bg-ink"
          >
            <Checkers slide />
            <div className="flex items-center justify-between p-5">
              <Logo onClick={() => { go('home'); setMobile(false); }} compact />
              <button onClick={() => setMobile(false)} className="grid size-11 cursor-pointer place-items-center border border-ivory/20 text-ivory" aria-label="Close">
                <X size={18} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8 pb-10">
              {[...NAV, { label: 'Book a Tee Time', page: 'tee-times' as PageKey }].map((n, i) => (
                <div key={n.label}>
                  <motion.button
                    initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                    onClick={() => { go(n.page); setMobile(false); }}
                    className="group flex w-full cursor-pointer items-baseline gap-4 border-b border-ivory/10 py-4 text-left"
                  >
                    <span className="font-poster text-xs text-gold/60">{String(i + 1).padStart(2, '0')}</span>
                    <span className="font-display text-3xl text-ivory transition-colors group-hover:text-gold2">{n.label}</span>
                  </motion.button>
                  {'children' in n && n.children?.map((c) => (
                    <motion.button
                      key={c.page}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.06 }}
                      onClick={() => { go(c.page); setMobile(false); }}
                      className="block cursor-pointer py-2 pl-10 text-xs font-bold uppercase tracking-[0.25em] text-sand transition-colors hover:text-gold2"
                    >
                      — {c.label}
                    </motion.button>
                  ))}
                </div>
              ))}
            </nav>
            <div className="flex items-center justify-between px-8 pb-8 text-[10px] font-bold uppercase tracking-[0.25em] text-sand">
              <a href={CONTACT.phoneLink} className="flex items-center gap-2"><Phone size={12} className="text-gold" /> {CONTACT.phone}</a>
              <span className="flex items-center gap-5">
                <button onClick={() => { onLogin(); setMobile(false); }} className="flex cursor-pointer items-center gap-2"><User size={12} className="text-gold" /> Member Login</button>
                <button onClick={() => { window.location.hash = 'admin'; setMobile(false); }} className="flex cursor-pointer items-center gap-2 text-gold2"><ShieldCheck size={12} className="text-gold" /> Admin</button>
              </span>
            </div>
            <Checkers slide />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  useEffect(() => { if (!open) setTimeout(() => setSent(false), 400); }, [open]);
  return (
    <Modal open={open} onClose={onClose}>
      <div className="pt-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Members Only</p>
        <h3 className="mt-3 font-display text-3xl text-ivory">Member <em className="text-gold2">Login</em></h3>
        {sent ? (
          <div className="mt-8 flex flex-col items-center gap-4 pb-2 text-center">
            <motion.svg viewBox="0 0 52 52" className="size-14">
              <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#C7A15C" strokeWidth="1.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8 }} />
              <motion.path fill="none" stroke="#E9CF9B" strokeWidth="2.5" strokeLinecap="round" d="M15 27l7.5 7L37 19" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.5 }} />
            </motion.svg>
            <p className="text-sm text-sand">Welcome back to the Club. Redirecting to your member portal…</p>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div>
              <label className="field-label">Email</label>
              <div className="relative">
                <input required type="email" placeholder="member@email.com" className="field pr-8" />
                <User size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-sand/50" />
              </div>
            </div>
            <div>
              <label className="field-label">Password</label>
              <div className="relative">
                <input required type="password" placeholder="••••••••" className="field pr-8" />
                <Lock size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-sand/50" />
              </div>
            </div>
            <Btn className="w-full justify-center">Sign In</Btn>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-sand/60">Demo portal — no real credentials required</p>
          </form>
        )}
      </div>
    </Modal>
  );
}
