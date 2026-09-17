import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PageKey } from './data';
import Header, { LoginModal } from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Membership from './pages/Membership';
import Dining from './pages/Dining';
import Events from './pages/Events';
import EventCalendar from './pages/EventCalendar';
import ClubCalendar from './pages/ClubCalendar';
import BookEvent from './pages/BookEvent';
import Golf from './pages/Golf';
import TeeTimes from './pages/TeeTimes';
import Careers from './pages/Careers';
import Contact from './pages/Contact';
import AdminApp from './admin/AdminApp';
import { EASE } from './components/ui';

const VALID: PageKey[] = ['home', 'membership', 'dining', 'events', 'event-calendar', 'club-calendar', 'book-event', 'golf', 'tee-times', 'careers', 'contact'];
const ADMIN_HASH = 'admin';

function readRoute(): string {
  return window.location.hash.replace('#/', '').replace('#', '');
}
function readPage(): PageKey {
  const h = readRoute() as PageKey;
  return VALID.includes(h) ? h : 'home';
}

/* ---------------- preloader ---------------- */
function Preloader({ done }: { done: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(p * 500));
      if (p < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.9, ease: EASE }}>
          <div className="checkers absolute inset-x-0 top-0 h-[11px] checkers-slide" />
          <div className="checkers absolute inset-x-0 bottom-0 h-[11px] checkers-slide" />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: EASE }}
            className="relative grid size-44 place-items-center md:size-56">
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full">
              <motion.circle cx="100" cy="100" r="94" fill="none" stroke="#C7A15C" strokeWidth="1.5"
                strokeDasharray="590" initial={{ strokeDashoffset: 590 }} animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, ease: EASE }} />
              <circle cx="100" cy="100" r="84" fill="none" stroke="rgba(199,161,92,.25)" strokeWidth="0.75" strokeDasharray="2 4" />
            </svg>
            <span className="font-poster text-7xl text-gold2 md:text-8xl">{n}</span>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-8 text-[10px] font-bold uppercase tracking-[0.5em] text-sand">
            Statesville · North Carolina
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-2 font-display text-sm italic text-gold2/80">
            "Here the rules are simple — have fun!"
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- checkered page wipe ---------------- */
const WIPE_COLS = 6;
const colVariants = {
  in: (i: number) => ({ scaleY: 1, originY: 0, transition: { duration: 0.45, delay: i * 0.045, ease: EASE } }),
  out: (i: number) => ({ scaleY: 0, originY: 1, transition: { duration: 0.45, delay: (WIPE_COLS - 1 - i) * 0.04, ease: EASE } }),
};

function Wipe({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div className="pointer-events-none fixed inset-0 z-[150] flex">
          {Array.from({ length: WIPE_COLS }).map((_, i) => (
            <motion.div key={i} className="relative h-full flex-1 bg-coal"
              custom={i} variants={colVariants}
              initial={{ scaleY: 0, originY: 0 }} animate="in" exit="out"
            >
              <div className="absolute inset-y-0 right-0 w-px bg-gold/10" />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="font-poster text-6xl text-gold/70 md:text-8xl">500</span>
            <div className="checkers absolute inset-x-0 top-0 h-[11px] checkers-slide" />
            <div className="checkers absolute inset-x-0 bottom-0 h-[11px] checkers-slide" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  const isAdminRoute = readRoute() === ADMIN_HASH;
  const [loading, setLoading] = useState(!isAdminRoute);
  const [page, setPage] = useState<PageKey>(readPage);
  const [adminMode, setAdminMode] = useState(isAdminRoute);
  const [wiping, setWiping] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2100);
    const onHash = () => setAdminMode(readRoute() === ADMIN_HASH);
    window.addEventListener('hashchange', onHash);
    return () => { clearTimeout(t); window.removeEventListener('hashchange', onHash); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [loading]);

  const go = useCallback((p: PageKey) => {
    if (p === page) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    setWiping(true);
    window.location.hash = p === 'home' ? '/' : p;
    setTimeout(() => {
      setPage(p);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setTimeout(() => setWiping(false), 350);
    }, 620);
  }, [page]);

  const pages: Record<PageKey, React.ReactNode> = {
    home: <Home go={go} />,
    membership: <Membership go={go} />,
    dining: <Dining go={go} />,
    events: <Events go={go} />,
    'event-calendar': <EventCalendar go={go} />,
    'club-calendar': <ClubCalendar go={go} />,
    'book-event': <BookEvent go={go} />,
    golf: <Golf go={go} />,
    'tee-times': <TeeTimes go={go} />,
    careers: <Careers go={go} />,
    contact: <Contact go={go} />,
  };

  /* ------- completely separate admin experience ------- */
  if (adminMode) {
    return (
      <div className="min-h-screen bg-ink text-ivory">
        <div className="noise" />
        <AdminApp onExit={() => { window.location.hash = '/'; }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink text-ivory">
      <div className="noise" />
      <Preloader done={!loading} />
      <Wipe active={wiping} />
      <Header page={page} go={go} onLogin={() => setLogin(true)} />
      <LoginModal open={login} onClose={() => setLogin(false)} />

      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {pages[page]}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer go={go} />
      <BackToTop />
    </div>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 700);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-[95] grid size-12 cursor-pointer place-items-center border border-gold/50 bg-ink/80 text-gold2 backdrop-blur-md transition-colors hover:bg-gold hover:text-ink"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
