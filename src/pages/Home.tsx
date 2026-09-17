import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Flag, Star, ChevronDown, Spade, UtensilsCrossed, Music4, CalendarDays, Clock, Beer, Wine, IceCreamCone, MonitorPlay } from 'lucide-react';
import { A, CONTACT, HAPPY_HOUR, STATS, upcomingEvents, CAT_META, STATUS_META, type Go } from '../data';
import { Btn, Checkers, Counter, EASE, Frame, Lines, Marquee, R, Tag } from '../components/ui';

export const EVENTS_PREVIEW = upcomingEvents(new Date(2026, 8, 17), 4).flatMap((d) =>
  d.events.slice(0, d.events.length > 2 ? 2 : d.events.length).map((e) => ({ date: d.date, ...e }))
).slice(0, 5);

/* ================= HERO ================= */
function Hero({ go }: { go: Go }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const yTxt = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <motion.div style={{ y: yBg }} className="absolute inset-0 scale-105">
        <video autoPlay muted loop playsInline poster={A.heroPoster} className="h-full w-full object-cover">
          <source src={A.heroVideo} type="video/mp4" />
        </video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-ink/30" />

      <motion.div style={{ y: yTxt, opacity: fade }} className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-32 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5, duration: 1, ease: EASE }}
          className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-3"
        >
          <span className="inline-flex items-center gap-2 border border-gold/40 bg-ink/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold2 backdrop-blur-sm">
            <Flag size={12} /> Statesville · North Carolina
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/70">
            {[...Array(5)].map((_, i) => <Star key={i} size={11} className="fill-gold text-gold" />)}
            Lake Norman's Premier Sports Club
          </span>
        </motion.div>

        <p className="max-w-md font-display text-lg italic text-ivory/85 md:text-xl">
          <Lines text="Here the rules are simple — have fun!" delay={2.55} />
        </p>

        <h1 className="mt-4 font-poster leading-[0.85] tracking-tight text-ivory">
          <Lines text={'PLAY.'} delay={2.6} className="text-[20vw] md:text-[11rem] lg:text-[13rem]" />
          <span className="flex items-baseline gap-4 md:gap-8">
            <Lines text={'DINE.'} delay={2.72} className="gold-grad text-[20vw] md:text-[11rem] lg:text-[13rem]" />
            <Lines text={'UNWIND.'} delay={2.84} className="text-stroke text-[8vw] md:text-[4.5rem] lg:text-[5.5rem]" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.1, duration: 1, ease: EASE }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-ivory/75 md:text-base"
        >
          The 500 Club redefines the modern sports club experience — a multi-million dollar renovated championship
          golf course, Victory Lane dining, tour-grade simulators, and exceptional service with access to all.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.25, duration: 1, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Btn onClick={() => go('membership')}>Join the Club</Btn>
          <Btn variant="outline" onClick={() => go('tee-times')}>Book a Tee Time</Btn>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.6, duration: 1.2 }}
        className="relative z-10 mx-auto flex w-full max-w-7xl items-end justify-between px-5 pb-10 md:px-10"
      >
        <div className="hidden items-center gap-8 text-[10px] font-bold uppercase tracking-[0.25em] text-ivory/60 md:flex">
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gold" /> Open to the Public</span>
          <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-gold" /> Victory Lane · Tue–Sun</span>
        </div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[9px] font-bold uppercase tracking-[0.35em] text-ivory/50">
          Scroll <ChevronDown size={14} className="text-gold" />
        </motion.div>
      </motion.div>

      <div className="relative z-10"><Checkers slide /></div>
    </section>
  );
}

/* ================= TICKER ================= */
function Ticker() {
  const items = ['Taco Tuesday', 'Wing Wednesday', 'Open Mic Night', 'Live Music Weekly', 'Sunday Scramble Series', 'Tuesday Night Dog Fight', "Women's League", 'Members Happy Hour'];
  return (
    <div className="border-b border-ivory/10 bg-gold py-3 md:py-4">
      <Marquee speed={30}>
        {items.map((t, i) => (
          <span key={i} className="mx-6 flex items-center gap-6 font-poster text-lg uppercase tracking-wide text-ink md:text-2xl">
            {t} <Flag size={16} className="opacity-60" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ================= INTRO ================= */
function Intro({ go }: { go: Go }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [120, -40]);

  return (
    <section ref={ref} className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <span className="pointer-events-none absolute -top-6 right-0 select-none font-poster text-[26vw] leading-none text-stroke-faint md:text-[16rem]">500</span>
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative">
          <motion.div style={{ y: y1 }} className="relative z-10 w-[78%]">
            <Frame src={A.kiawahLake} alt="The 500 Club golf course" ratio="aspect-[4/5]" className="shadow-2xl" />
            <div className="absolute inset-0 border border-ivory/15" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute -bottom-10 right-0 z-20 w-[52%] border-4 border-ink shadow-2xl">
            <Frame src={A.ballHole} alt="On the green" ratio="aspect-square" />
          </motion.div>
          <motion.div
            animate={{ rotate: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
            className="absolute -top-7 right-6 z-30 border border-gold/50 bg-ink px-5 py-4 text-center shadow-xl"
          >
            <p className="font-poster text-2xl text-gold2">$MM</p>
            <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-sand">Renovation</p>
          </motion.div>
        </div>

        <div>
          <Tag>The Club</Tag>
          <h2 className="mt-6 font-display text-4xl leading-[1.05] text-ivory md:text-6xl">
            <Lines text={'Redefining the'} delay={0} />
            <Lines text={'modern sports'} delay={0.1} />
            <span className="italic text-gold2"><Lines text={'club experience.'} delay={0.2} /></span>
          </h2>
          <R delay={0.25} className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">
            As Lake Norman's premier sports club, The 500 Club is a destination where friends and families come
            together. Brand-new TifEagle Bermuda greens, rebuilt bunkers, stunning lake enhancements — plus simulators,
            hitting bays, a pro shop and a full-service restaurant. Exceptional service, access to all.
          </R>
          <R delay={0.32} className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-gold/50 pl-4">
                <p className="font-poster text-4xl text-ivory md:text-5xl"><Counter n={s.n} comma={s.comma} /></p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-sand">{s.label}</p>
              </div>
            ))}
          </R>
          <R delay={0.4} className="mt-9 flex flex-wrap gap-2">
            {['18-Hole Course', 'Putting Green', 'Golf Simulators', 'Hitting Bays', 'Pro Shop', 'Victory Lane', 'Pickleball — Coming Soon'].map((c, i) => (
              <motion.span
                key={c} whileHover={{ y: -3, borderColor: '#C7A15C' }}
                className={`border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] transition-colors ${i === 6 ? 'border-gold/60 text-gold2' : 'border-ivory/15 text-ivory/70'}`}
              >
                {c}
              </motion.span>
            ))}
          </R>
          <R delay={0.45} className="mt-9"><Btn variant="outline" onClick={() => go('membership')}>About Membership</Btn></R>
        </div>
      </div>
    </section>
  );
}

/* ================= EXPERIENCE CARDS ================= */
const CARDS = [
  {
    n: '01', title: 'Golf', page: 'golf' as const, img: A.swingSunset, icon: Spade,
    desc: 'Brand-new TifEagle Bermuda greens, rebuilt bunkers and stunning lake enhancements on our multi-million-dollar renovated championship course.',
  },
  {
    n: '02', title: 'Dining', page: 'dining' as const, img: A.burgerBeer, icon: UtensilsCrossed,
    desc: 'Everyone is invited — lunch and dinner six days a week in Victory Lane, with the latest sports action and world-class courses on our simulators.',
  },
  {
    n: '03', title: 'Entertainment', page: 'events' as const, img: A.crowd, icon: Music4,
    desc: "There's always excitement at The 500 Club — Taco Tuesday, Wing Wednesday, Open Mic Night, and Live Music every single week.",
  },
];

function Experience({ go }: { go: Go }) {
  return (
    <section className="relative border-t border-ivory/10 bg-coal py-24 md:py-36">
      <Checkers dark className="absolute left-0 right-0 top-0 opacity-40" />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Tag>Choose your lane</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl">
              <Lines text="Experience" /> <em className="text-gold2"><Lines text="The 500 Club" delay={0.1} /></em>
            </h2>
          </div>
          <R delay={0.2}><p className="max-w-xs text-sm leading-relaxed text-sand">Three ways to play. One club with NASCAR roots and a Lake Norman address.</p></R>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CARDS.map((c, i) => (
            <R key={c.n} delay={i * 0.12} className="h-full">
              <motion.button
                onClick={() => go(c.page)}
                whileHover="hover" initial="rest" animate="rest"
                className="group relative block h-[480px] w-full cursor-pointer overflow-hidden text-left md:h-[540px]"
              >
                <motion.img
                  src={c.img} alt={c.title}
                  variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
                  transition={{ duration: 1.1, ease: EASE }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10 transition-opacity duration-700 group-hover:via-ink/10" />
                <div className="absolute inset-0 border border-ivory/10 transition-colors duration-500 group-hover:border-gold/50" />
                <div className="relative flex h-full flex-col justify-between p-7">
                  <div className="flex items-start justify-between">
                    <span className="font-poster text-lg text-gold2/90">{c.n}</span>
                    <span className="grid size-11 place-items-center border border-ivory/25 bg-ink/40 text-gold2 backdrop-blur-sm transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-gold">
                      <c.icon size={17} />
                    </span>
                  </div>
                  <div>
                    <motion.h3
                      variants={{ rest: { y: 34 }, hover: { y: 0 } }} transition={{ duration: 0.6, ease: EASE }}
                      className="font-poster text-5xl uppercase tracking-wide text-ivory"
                    >
                      {c.title}
                    </motion.h3>
                    <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ duration: 0.6, ease: EASE }}
                      className="mt-3 h-px origin-left bg-gold" />
                    <motion.p
                      variants={{ rest: { opacity: 0, y: 16, height: 0 }, hover: { opacity: 1, y: 0, height: 'auto' } }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden text-sm leading-relaxed text-ivory/80"
                    >
                      {c.desc}
                    </motion.p>
                    <p className="mt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold2 opacity-0 transition-all duration-500 group-hover:opacity-100">
                      Explore <span className="transition-transform duration-500 group-hover:translate-x-2">→</span>
                    </p>
                  </div>
                </div>
              </motion.button>
            </R>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= EVENTS PREVIEW ================= */
function EventsPreview({ go }: { go: Go }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Tag>This Month</Tag>
          <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl">
            <Lines text="Upcoming at" /> <em className="text-gold2"><Lines text="the Club" delay={0.1} /></em>
          </h2>
          <R delay={0.2} className="mt-5 text-sm leading-relaxed text-sand">
            Scrambles, dog fights, magic nights and live music — the calendar never cools off. Members and non-members welcome.
          </R>
          <R delay={0.3} className="mt-8"><Btn onClick={() => go('event-calendar')}>See Full Calendar</Btn></R>
        </div>

        <div className="divide-y divide-ivory/10 border-y border-ivory/10">
          {EVENTS_PREVIEW.map((e, i) => {
            const isOpen = openIdx === i;
            const cat = CAT_META[e.cat];
            return (
              <R key={i} delay={i * 0.07}>
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="group grid w-full cursor-pointer grid-cols-[64px_1fr_auto] items-center gap-5 py-6 text-left transition-colors hover:bg-ivory/[0.03] md:grid-cols-[84px_1fr_auto] md:gap-8 md:px-4"
                >
                  <span className="text-center">
                    <span className="block font-poster text-3xl text-gold2 md:text-4xl">{e.date.getDate()}</span>
                    <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-sand">{e.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short' })}</span>
                  </span>
                  <span>
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg text-ivory transition-colors group-hover:text-gold2 md:text-2xl">{e.title}</span>
                      <span className="border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.2em]" style={{ borderColor: `${cat.color}55`, color: cat.color }}>{cat.label}</span>
                    </span>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: EASE }}
                          className="block overflow-hidden"
                        >
                          <span className="block max-w-xl pt-3 text-sm leading-relaxed text-sand">{e.desc}</span>
                          <span className="mt-3 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: STATUS_META[e.status].color }}>
                            <span className="size-1.5 rounded-full" style={{ background: STATUS_META[e.status].color }} /> {STATUS_META[e.status].label}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="flex flex-col items-end gap-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-sand"><Clock size={11} className="text-gold" />{e.time}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-[0.25em] transition-all duration-300 ${isOpen ? 'text-gold2' : 'text-sand/50 group-hover:text-gold2'}`}>
                      {isOpen ? 'Close ↑' : 'Event details →'}
                    </span>
                  </span>
                </button>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= HAPPY HOUR ================= */
function HappyHour({ go }: { go: Go }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const icons = [Beer, Wine, IceCreamCone, MonitorPlay];
  return (
    <section ref={ref} className="relative overflow-hidden border-y border-ivory/10">
      <motion.div style={{ y }} className="absolute inset-0 -top-[15%] h-[130%]">
        <img src={A.cocktailsTrio} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-ink/78" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-ink/60 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-[1.3fr_1fr] md:px-10 md:py-32">
        <div>
          <Tag>Weekdays · 4–6 PM · Victory Lane</Tag>
          <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-6xl">
            <Lines text="Members" /> <em className="gold-grad"><Lines text="Happy Hour" delay={0.1} /></em>
          </h2>
          <R delay={0.2} className="mt-6 max-w-md text-sm leading-relaxed text-ivory/75">
            {HAPPY_HOUR.note} Pull up a stool, watch the race replays, and let the Turn Bar pour something cold.
          </R>
          <R delay={0.3} className="mt-9 flex flex-wrap gap-4">
            <Btn onClick={() => go('membership')}>Request Membership Info</Btn>
            <Btn variant="outline" onClick={() => go('dining')}>See the Menu</Btn>
          </R>
        </div>
        <div className="grid content-center gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {HAPPY_HOUR.perks.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <R key={p} delay={0.15 + i * 0.08}>
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(199,161,92,.6)' }}
                  className="flex items-center gap-4 border border-ivory/15 bg-ink/60 p-4 backdrop-blur-md transition-colors">
                  <span className="grid size-10 shrink-0 place-items-center border border-gold/40 text-gold2"><Icon size={15} /></span>
                  <span className="text-xs font-bold uppercase tracking-[0.14em] text-ivory/85">{p}</span>
                </motion.div>
              </R>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================= GALLERY ================= */
function Gallery() {
  const row = [A.aerial, A.familyCart, A.wingsCocktail, A.fairwayPath, A.tableCandles, A.golferCart, A.instruments, A.greenFlag];
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto mb-12 max-w-7xl px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Tag>Life at the Club</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl"><Lines text="Where Lake Norman" /> <em className="text-gold2"><Lines text="comes to play" delay={0.1} /></em></h2>
          </div>
          <R delay={0.2}><p className="text-[11px] font-bold uppercase tracking-[0.3em] text-sand">{CONTACT.social}</p></R>
        </div>
      </div>
      <Marquee speed={46}>
        {row.map((src, i) => (
          <div key={i} className="group relative mx-2 h-72 w-80 shrink-0 overflow-hidden md:h-96 md:w-[30rem]">
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
            <div className="absolute inset-0 border border-ivory/0 transition-colors duration-500 group-hover:border-gold/50" />
          </div>
        ))}
      </Marquee>
    </section>
  );
}

/* ================= FINAL CTA ================= */
function FinalCta({ go }: { go: Go }) {
  return (
    <section className="relative overflow-hidden border-t border-ivory/10 bg-coal py-24 text-center md:py-36">
      <div className="checkers-dark pointer-events-none absolute inset-0 opacity-[0.07]" />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-poster text-[38vw] leading-none text-stroke-faint md:text-[24rem]">500</span>
      <div className="relative mx-auto max-w-4xl px-5">
        <Tag className="justify-center">One Rule</Tag>
        <h2 className="mt-6 font-display text-5xl leading-[1.02] text-ivory md:text-7xl">
          <Lines text="Have fun." />{' '}
          <em className="gold-grad"><Lines text="We'll handle the rest." delay={0.12} /></em>
        </h2>
        <R delay={0.25} className="mx-auto mt-8 flex flex-wrap justify-center gap-4">
          <Btn onClick={() => go('membership')}>Join the Club</Btn>
          <Btn variant="outline" onClick={() => go('tee-times')}>Book a Tee Time</Btn>
        </R>
        <R delay={0.35} className="mt-10 text-[10px] font-bold uppercase tracking-[0.3em] text-sand">
          <CalendarDays size={12} className="mr-2 inline text-gold" />
          {CONTACT.address} · {CONTACT.phone}
        </R>
      </div>
    </section>
  );
}

export default function Home({ go }: { go: Go }) {
  return (
    <>
      <Hero go={go} />
      <Ticker />
      <Intro go={go} />
      <Experience go={go} />
      <EventsPreview go={go} />
      <HappyHour go={go} />
      <Gallery />
      <FinalCta go={go} />
    </>
  );
}
