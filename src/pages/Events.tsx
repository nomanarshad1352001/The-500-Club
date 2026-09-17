import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Flag, PartyPopper, ArrowLeft, ArrowRight, Check, Mic2, Music3, Trophy, Mail } from 'lucide-react';
import { A, CONTACT, EVENT_SPACES, type Go } from '../data';
import { Btn, EASE, Frame, Lines, PageHero, R, Tag, Checkers } from '../components/ui';

const TABS = [
  { id: 'calendar', label: 'Calendar', icon: CalendarDays },
  { id: 'outings', label: 'Golf Outings', icon: Flag },
  { id: 'private', label: 'Private Events', icon: PartyPopper },
] as const;
type TabId = (typeof TABS)[number]['id'];

const SLIDES = [
  { img: A.instruments, t: 'Live on the Lane', s: 'Local & regional acts · every week' },
  { img: A.stage, t: 'Open Mic Night', s: 'Thursdays · sign-ups at 6:30 PM' },
  { img: A.trombone, t: 'Brass & Bourbon', s: 'Seasonal jazz on the patio' },
  { img: A.cartMen, t: 'Sunday Scramble Series', s: '1st & 3rd Sundays · 4 PM shotgun' },
  { img: A.swingPants, t: 'Club Championship', s: 'September · members only' },
  { img: A.tableCandles, t: 'Whiskey & Fairways', s: 'Five pours · chef pairings' },
  { img: A.crowd, t: 'Race Day Watch Parties', s: 'Every green flag, on every screen' },
  { img: A.golfersRelax, t: 'Member Guest Invitational', s: 'October · our flagship weekend' },
  { img: A.sunset, t: 'Twilight Nine & Dine', s: 'Fridays · golf then dinner for two' },
  { img: A.wingsCocktail, t: 'Wing Wednesday', s: 'Six sauces · $9 baskets' },
  { img: A.banquetFloral, t: 'The 500 Room Socials', s: 'Monthly member mixers' },
  { img: A.lake, t: 'Lakeside Cinema', s: 'Family movie nights on the lawn' },
  { img: A.greenFlag, t: 'Junior Clinics', s: 'Saturdays · ages 6–15' },
  { img: A.kiawahLake, t: 'Couples Twilight', s: 'Alternate-shot fun, weekly' },
  { img: A.tableWedding, t: 'Holiday Galas', s: 'Seasonal celebrations' },
  { img: A.fairwayPath, t: 'Charity Scrambles', s: 'Giving back, one tee at a time' },
  { img: A.cocktailsTrio, t: '500 Vines Wine Club', s: 'Monthly tastings for members' },
];

function Slideshow() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  useEffect(() => {
    const t = setInterval(() => { setDir(1); setI((v) => (v + 1) % SLIDES.length); }, 5000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => { setDir(d); setI((v) => (v + d + SLIDES.length) % SLIDES.length); };
  const s = SLIDES[i];
  return (
    <div>
      <div className="relative overflow-hidden border border-ivory/10" style={{ aspectRatio: '16/8' }}>
        <AnimatePresence custom={dir} mode="popLayout">
          <motion.div
            key={i}
            custom={dir}
            initial={{ x: dir * 320, opacity: 0, scale: 1.06 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: dir * -320, opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="absolute inset-0"
          >
            <img src={s.img} alt={s.t} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-7 md:p-10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Featured</p>
                <h3 className="mt-2 font-display text-3xl text-ivory md:text-5xl">{s.t}</h3>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-sand">{s.s}</p>
              </div>
              <div className="font-poster text-5xl text-ivory/25 md:text-7xl">
                {String(i + 1).padStart(2, '0')}<span className="text-2xl md:text-4xl"> / {SLIDES.length}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* progress bar */}
        <motion.div key={`bar-${i}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 5, ease: 'linear' }}
          className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gold/80" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex gap-2">
          {[{ icon: ArrowLeft, d: -1 }, { icon: ArrowRight, d: 1 }].map(({ icon: Icon, d }) => (
            <button key={d} onClick={() => go(d)}
              className="grid size-12 cursor-pointer place-items-center border border-ivory/20 text-ivory transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink">
              <Icon size={16} />
            </button>
          ))}
        </div>
        <div className="hidden flex-1 items-center gap-1 px-8 md:flex">
          {SLIDES.map((_, d) => (
            <button key={d} onClick={() => { setDir(d > i ? 1 : -1); setI(d); }}
              className={`h-0.5 flex-1 cursor-pointer transition-colors duration-300 ${d === i ? 'bg-gold' : 'bg-ivory/15 hover:bg-ivory/40'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Outings({ go }: { go: Go }) {
  const perks = ['18 holes on the renovated championship course', 'Carts, range balls & scoring included', 'Custom F&B packages from Victory Lane', 'Private simulator bays for the after-party', 'On-course contests — longest drive, closest to pin', 'Dedicated outing coordinator'];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Tag>Corporate · Charity · Crews</Tag>
        <h3 className="mt-5 font-display text-3xl text-ivory md:text-5xl"><Lines text="Your outing," /> <em className="text-gold2"><Lines text="our fairways." delay={0.1} /></em></h3>
        <R delay={0.2} className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">
          From 12-player buddy trips to 144-golfer charity scrambles, our team builds the day around your group —
          golf, food, drinks and a little friendly wagering.
        </R>
        <R delay={0.25} className="mt-8 grid gap-2 sm:grid-cols-2">
          {perks.map((p) => (
            <div key={p} className="flex items-start gap-3 text-[13px] text-ivory/80">
              <Check size={14} className="mt-0.5 shrink-0 text-gold" /> {p}
            </div>
          ))}
        </R>
        <R delay={0.35} className="mt-9 flex flex-wrap gap-4">
          <Btn onClick={() => window.open('mailto:' + CONTACT.golfEmail)}><Mail size={13} /> {CONTACT.golfEmail}</Btn>
          <Btn variant="outline" onClick={() => go('tee-times')}>Book a Tee Time</Btn>
        </R>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <R className="col-span-2"><Frame src={A.cartMen} ratio="aspect-video" className="border border-ivory/10" /></R>
        <R delay={0.12}><Frame src={A.aerial} ratio="aspect-square" className="border border-ivory/10" /></R>
        <R delay={0.2}><Frame src={A.swing} ratio="aspect-square" className="border border-ivory/10" /></R>
      </div>
    </div>
  );
}

function PrivateEvents({ go }: { go: Go }) {
  return (
    <div>
      <div className="max-w-2xl">
        <Tag>Weddings · Galas · Buyouts</Tag>
        <h3 className="mt-5 font-display text-3xl text-ivory md:text-5xl"><Lines text="Rooms with a view" /> <em className="text-gold2"><Lines text="of the 18th green." delay={0.1} /></em></h3>
        <R delay={0.2} className="mt-6 text-sm leading-relaxed text-sand md:text-base">
          Three distinct spaces, one kitchen that never phones it in, and reduced rental fees for members.
        </R>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {EVENT_SPACES.map((sp, i) => (
          <R key={sp.name} delay={i * 0.12} className="h-full">
            <div className="group h-full border border-ivory/10 bg-coal transition-colors duration-500 hover:border-gold/40">
              <Frame src={sp.img} ratio="aspect-[4/3]" />
              <div className="p-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">{sp.cap}</p>
                <h4 className="mt-2 font-display text-2xl text-ivory">{sp.name}</h4>
                <p className="mt-3 text-sm leading-relaxed text-sand">{sp.desc}</p>
              </div>
            </div>
          </R>
        ))}
      </div>
      <R delay={0.25} className="mt-10"><Btn onClick={() => go('book-event')}>Book an Event</Btn></R>
    </div>
  );
}

export default function Events({ go }: { go: Go }) {
  const [tab, setTab] = useState<TabId>('calendar');
  return (
    <>
      <PageHero
        img={A.crowd} kicker="Events at The 500 Club" title={'ALWAYS ON.\nALWAYS FUN.'}
        sub="There's always excitement — Taco Tuesday, Wing Wednesday, Open Mic Night, and Live Music every week, plus tournaments, galas and race-day watch parties."
      >
        <Btn onClick={() => go('event-calendar')}>See Full Calendar</Btn>
        <Btn variant="outline" onClick={() => go('book-event')}>Book an Event</Btn>
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <div className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`relative flex cursor-pointer items-center gap-2 px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${tab === t.id ? 'text-gold2' : 'text-ivory/50 hover:text-ivory'}`}>
                <t.icon size={13} /> {t.label}
                {tab === t.id && <motion.span layoutId="events-tab" className="absolute inset-0 -z-10 border border-gold/40 bg-gold/[0.07]" transition={{ duration: 0.5, ease: EASE }} />}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sand">
            <Mic2 size={12} className="text-gold" /> Weekly <Music3 size={12} className="text-gold" /> Monthly <Trophy size={12} className="text-gold" /> Signature
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.55, ease: EASE }}>
            {tab === 'calendar' && (
              <div>
                <Slideshow />
                <R className="mt-12 flex flex-wrap items-center justify-between gap-6 border border-ivory/12 bg-coal p-7 md:p-9">
                  <div>
                    <p className="font-display text-2xl text-ivory">Want the whole month? <em className="text-gold2">It's a full one.</em></p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sand">Dining events · golf events · tournaments · community</p>
                  </div>
                  <Btn onClick={() => go('event-calendar')}>See Full Calendar</Btn>
                </R>
              </div>
            )}
            {tab === 'outings' && <Outings go={go} />}
            {tab === 'private' && <PrivateEvents go={go} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* join band */}
      <section className="relative overflow-hidden border-t border-ivory/10 bg-coal">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-16 md:px-10 md:py-20">
          <div className="flex items-center gap-6">
            <span className="hidden font-poster text-7xl text-stroke md:block">500</span>
            <div>
              <h3 className="font-display text-3xl text-ivory md:text-4xl">Join the Club, <em className="text-gold2">own the calendar.</em></h3>
              <p className="mt-2 text-sm text-sand">Member-only tournaments, mixers and the 500 Vines Wine Club.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            <Btn onClick={() => go('membership')}>Join the Club</Btn>
            <Btn variant="outline" onClick={() => go('membership')}>Request Membership Info</Btn>
          </div>
        </div>
        <Checkers slide />
      </section>
    </>
  );
}
