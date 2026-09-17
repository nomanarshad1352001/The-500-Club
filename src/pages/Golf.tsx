import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, BadgeDollarSign, GraduationCap, MonitorPlay, TableProperties, ScrollText, Crown,
  CalendarCheck, Percent, Trophy, Timer, Users, Grape, Croissant, Package, PartyPopper, ShoppingBag,
  Phone, ArrowUpRight, Snowflake, SunDim,
} from 'lucide-react';
import {
  A, CONTACT, GOLF_RULES, MEMBER_BENEFITS, PROSHOP_HOURS, RANGE_HOURS, RATES_SPECIAL,
  RATES_WEEKDAY, RATES_WEEKEND, SCORECARD, SIM_HOURS, type Go,
} from '../data';
import { Accordion, Btn, Checkers, EASE, Frame, Lines, PageHero, R, Tag } from '../components/ui';

const TABS = [
  { id: 'hours', label: 'Hours of Operation', icon: Clock },
  { id: 'rates', label: 'Rates', icon: BadgeDollarSign },
  { id: 'lessons', label: 'Lessons', icon: GraduationCap },
  { id: 'sims', label: 'Golf Simulators', icon: MonitorPlay },
  { id: 'scorecard', label: 'Scorecard', icon: TableProperties },
  { id: 'rules', label: 'Rules', icon: ScrollText },
  { id: 'benefits', label: 'Member Benefits', icon: Crown },
] as const;
type TabId = (typeof TABS)[number]['id'];

const BENEFIT_ICONS = [CalendarCheck, Timer, Percent, ShoppingBag, Trophy, MonitorPlay, Users, Grape, Croissant, Package, PartyPopper];

function HoursTab() {
  const blocks = [
    { title: 'Pro Shop', rows: PROSHOP_HOURS, img: A.greenFlag, note: 'Your first stop for check-in, gear and gossip' },
    { title: 'Driving Range', rows: RANGE_HOURS, img: A.swing, note: 'Mondays open late for course maintenance' },
    { title: 'Golf Simulators', rows: SIM_HOURS, img: A.indoorPutting, note: 'Two tour-grade bays in Victory Lane' },
  ];
  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {blocks.map((b, i) => (
          <R key={b.title} delay={i * 0.1} className="h-full">
            <div className="group h-full border border-ivory/10 bg-coal">
              <div className="relative h-40 overflow-hidden">
                <img src={b.img} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-coal to-transparent" />
                <h4 className="absolute bottom-4 left-6 font-display text-2xl text-ivory">{b.title}</h4>
              </div>
              <div className="p-6">
                <div className="divide-y divide-ivory/10">
                  {b.rows.map((r) => (
                    <div key={r.d} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-semibold uppercase tracking-[0.1em] text-ivory/75">{r.d}</span>
                      <span className="font-poster text-sm tracking-wide text-gold2">{r.h}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-sand/60">{b.note} · Vary upon season</p>
              </div>
            </div>
          </R>
        ))}
      </div>
      <R delay={0.25} className="mt-6 grid gap-3 sm:grid-cols-2">
        {[{ icon: Snowflake, t: 'Closed: Thanksgiving Day' }, { icon: Snowflake, t: 'Closed: Christmas Day' }].map((c) => (
          <div key={c.t} className="flex items-center gap-4 border border-ivory/10 bg-coal p-5">
            <c.icon size={16} className="text-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ivory/80">{c.t}</span>
          </div>
        ))}
      </R>
    </div>
  );
}

function RatesTab({ go }: { go: Go }) {
  return (
    <div>
      <R className="mb-10 flex flex-wrap items-center gap-3">
        <span className="flex items-center gap-2 border border-gold/40 bg-gold/[0.07] px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold2">
          <SunDim size={13} /> Holiday rates = Friday–Sunday rates
        </span>
        <span className="border border-ivory/15 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
          Price change notice — all rates increased $3 starting Sept 1
        </span>
      </R>
      <div className="grid gap-6 lg:grid-cols-2">
        {[
          { title: 'Monday – Thursday', rows: RATES_WEEKDAY, img: A.sunset },
          { title: 'Friday – Sunday', rows: RATES_WEEKEND, img: A.fairwayPath },
        ].map((t, i) => (
          <R key={t.title} delay={i * 0.12}>
            <div className="group border border-ivory/10 bg-coal">
              <div className="relative h-44 overflow-hidden">
                <img src={t.img} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-coal via-coal/40 to-transparent" />
                <h4 className="absolute bottom-5 left-7 font-display text-3xl text-ivory">{t.title}</h4>
                <span className="absolute right-6 top-6 border border-gold/50 bg-ink/70 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold2 backdrop-blur-sm">18 Holes · Cart Incl.</span>
              </div>
              <div className="divide-y divide-ivory/10 px-7 md:px-9">
                {t.rows.map((r) => (
                  <div key={r.time} className="flex items-center justify-between py-5">
                    <span className="text-sm font-semibold uppercase tracking-[0.12em] text-ivory/75">{r.time}</span>
                    <span className="font-poster text-2xl text-gold2">{r.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </R>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RATES_SPECIAL.map((s, i) => (
          <R key={s.name} delay={i * 0.08} className="h-full">
            <div className="h-full border border-ivory/10 bg-ink p-6 transition-colors duration-500 hover:border-gold/40">
              <p className="font-poster text-3xl text-gold2">{s.value}</p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/80">{s.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-sand">{s.note}</p>
            </div>
          </R>
        ))}
      </div>
      <R delay={0.2} className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-xs leading-relaxed text-sand/70">
          Rates are subject to change. Groups may be paired together on busy days. Tee times may be reserved 7 days
          in advance for public golfers; members reserve 14 days out.
        </p>
        <Btn onClick={() => go('tee-times')}>Book a Tee Time</Btn>
      </R>
    </div>
  );
}

function LessonsTab() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Tag>Instruction</Tag>
        <h3 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-5xl">
          <Lines text="Swing easier." /> <em className="text-gold2"><Lines text="Score better." delay={0.12} /></em>
        </h3>
        <R delay={0.2} className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">
          Whether it's your first grip or your five-thousandth, our teaching professional meets you where your game
          is — on the range, on the simulators, or out on the course.
        </R>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {[
            ['Private Lesson', '$70 · 45 min'], ['Playing Lesson (9 holes)', '$140 · on course'],
            ['Junior Clinic', '$25 · Saturdays'], ['Simulator Session + Data', '$90 · 60 min'],
          ].map(([t, p], i) => (
            <R key={t} delay={0.1 + i * 0.07}>
              <div className="border border-ivory/10 bg-coal p-5 transition-colors duration-300 hover:border-gold/40">
                <p className="font-display text-lg text-ivory">{t}</p>
                <p className="mt-1 font-poster text-base text-gold2">{p}</p>
              </div>
            </R>
          ))}
        </div>
        <R delay={0.35} className="mt-9 border border-gold/30 bg-gold/[0.05] p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Contact Our Teaching Professional</p>
          <p className="mt-2 font-display text-2xl text-ivory">Luke Newman</p>
          <p className="mt-1 text-sm text-sand">Call the Pro Shop {CONTACT.proShop} or email {CONTACT.golfEmail}</p>
          <Btn small className="mt-5" variant="outline" onClick={() => window.open('mailto:' + CONTACT.golfEmail)}>Book a Lesson</Btn>
        </R>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <R className="col-span-2"><Frame src={A.swingGlove} ratio="aspect-[16/10]" className="border border-ivory/10" /></R>
        <R delay={0.12}><Frame src={A.fatherDaughter} ratio="aspect-[4/5]" className="border border-ivory/10" /></R>
        <R delay={0.2}><Frame src={A.golferOrange} ratio="aspect-[4/5]" className="border border-ivory/10" /></R>
      </div>
    </div>
  );
}

function SimsTab() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <Tag>Indoor Golf</Tag>
        <h3 className="mt-5 font-display text-3xl text-ivory md:text-5xl"><Lines text="Rainproof golf." /> <em className="text-gold2"><Lines text="Bar service included." delay={0.12} /></em></h3>
        <R delay={0.2} className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">
          Two state-of-the-art simulator bays inside Victory Lane. Play dozens of world-class courses, grind through
          skills challenges, or just settle bets — with the full menu and Turn Bar within arm's reach.
        </R>
        <R delay={0.28} className="mt-8 grid gap-2 sm:grid-cols-2">
          {['Dozens of world-class courses', 'Real-time ball-flight data', 'Leagues & weekly closest-to-pin', 'Members: 1 free hour daily'].map((f, i) => (
            <div key={f} className="flex items-center gap-3 border border-ivory/10 p-4">
              <span className="font-poster text-sm text-gold/60">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ivory/80">{f}</span>
            </div>
          ))}
        </R>
        <R delay={0.35} className="mt-9 flex flex-wrap gap-4">
          <Btn>Click Here to Book <ArrowUpRight size={13} /></Btn>
          <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}>Call the Pro Shop</Btn>
        </R>
      </div>
      <div className="grid gap-3">
        <R><Frame src={A.indoorPutting} ratio="aspect-[16/10]" className="border border-ivory/10" /></R>
        <R delay={0.12}><Frame src={A.chipping} ratio="aspect-[16/10]" className="border border-ivory/10" /></R>
        <R delay={0.2} className="border border-ivory/10 bg-coal p-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Simulator Hours</p>
          <div className="mt-4 divide-y divide-ivory/10">
            {SIM_HOURS.map((r) => (
              <div key={r.d} className="flex items-center justify-between py-2.5 text-sm">
                <span className="font-semibold uppercase tracking-[0.1em] text-ivory/75">{r.d}</span>
                <span className="font-poster text-sm tracking-wide text-gold2">{r.h}</span>
              </div>
            ))}
          </div>
        </R>
      </div>
    </div>
  );
}

function ScorecardTab() {
  const tees = ['Yellow', 'Checkered', 'Green', 'Red'];
  const teeDots = ['bg-yellow-300', 'bg-[repeating-conic-gradient(#F1EAD9_0%_25%,#0B0A07_0%_50%)] bg-[size:6px_6px] border border-ivory/40', 'bg-emerald-500', 'bg-red-500'];
  return (
    <div>
      <R className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-xl text-sm leading-relaxed text-sand">
          GPS-measured yardages from the Carolinas Golf Association, as of 8/29/2023. Four tees plus extra boxes —
          pick your fight.
        </p>
        <Btn small variant="outline">Scorecard PDF</Btn>
      </R>
      <R className="overflow-x-auto border border-ivory/12">
        <table className="w-full min-w-[760px] border-collapse bg-coal text-center">
          <thead>
            <tr className="border-b border-ivory/12 bg-ink text-[9px] font-bold uppercase tracking-[0.2em] text-sand">
              <th className="px-4 py-4 text-left">Hole</th>
              {tees.map((t, i) => (
                <th key={t} className="px-3 py-4">
                  <span className="inline-flex items-center gap-2">
                    <span className={`inline-block size-2.5 rounded-full ${teeDots[i]}`} /> {t}
                  </span>
                </th>
              ))}
              <th className="px-3 py-4">Extra Tees</th>
              <th className="px-3 py-4">Green Ø</th>
            </tr>
          </thead>
          <tbody>
            {SCORECARD.map((row, i) => {
              const isSummary = typeof row[0] === 'string';
              const isTotal = row[0] === 'Total';
              return (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-10px' }}
                  transition={{ duration: 0.35, delay: i * 0.02 }}
                  className={`border-b border-ivory/[0.07] text-sm ${isTotal ? 'bg-gold/[0.1]' : isSummary ? 'bg-ink/70' : 'hover:bg-ivory/[0.03]'}`}
                >
                  <td className={`px-4 py-3 text-left font-poster tracking-wide ${isSummary ? 'text-gold2' : 'text-ivory'}`}>{row[0]}</td>
                  {row.slice(1).map((c, j) => (
                    <td key={j} className={`px-3 py-3 ${isSummary ? 'font-poster text-gold2' : j === 4 || j === 5 ? 'text-xs text-sand' : 'text-ivory/85'}`}>{c}</td>
                  ))}
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </R>
      <R className="mt-6 flex flex-wrap gap-2">
        {['Par-defying 8th — 548 from the tips', 'Signature island-approach 16th', 'Closing 18th beside Victory Lane'].map((n) => (
          <span key={n} className="border border-ivory/15 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/70">{n}</span>
        ))}
      </R>
    </div>
  );
}

function BenefitsTab({ go }: { go: Go }) {
  return (
    <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <Tag>Members Play More</Tag>
        <h3 className="mt-5 font-display text-3xl text-ivory md:text-5xl"><Lines text="The card that" /> <em className="text-gold2"><Lines text="pays for itself." delay={0.12} /></em></h3>
        <R delay={0.2} className="mt-6 max-w-md text-sm leading-relaxed text-sand md:text-base">
          Members do not pay greens fees — only cart fees — with 14-day advance tee times and member-only windows
          after public play. Add food, beverage and Pro Shop discounts and the math does itself.
        </R>
        <R delay={0.3} className="mt-9 flex flex-wrap gap-4">
          <Btn onClick={() => go('membership')}>Join the Club</Btn>
          <Btn variant="outline" onClick={() => go('tee-times')}>Try a Round First</Btn>
        </R>
        <R delay={0.4} className="mt-9"><Frame src={A.golferCart} ratio="aspect-video" className="border border-ivory/10" /></R>
      </div>
      <div className="grid content-start gap-2 sm:grid-cols-2">
        {MEMBER_BENEFITS.map((b, i) => {
          const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
          return (
            <R key={b} delay={(i % 2) * 0.06}>
              <div className="group flex items-center gap-4 border border-ivory/10 p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-ivory/[0.03]">
                <span className="grid size-9 shrink-0 place-items-center border border-gold/30 text-gold2"><Icon size={14} /></span>
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-ivory/80">{b}</span>
              </div>
            </R>
          );
        })}
      </div>
    </div>
  );
}

export default function Golf({ go }: { go: Go }) {
  const [tab, setTab] = useState<TabId>('hours');
  return (
    <>
      <PageHero
        img={A.sunset} kicker="The Championship Course" title={'SERIOUS GOLF.\nSERIOUSLY FUN.'}
        sub="18 holes of multi-million-dollar renovation — TifEagle Bermuda greens, rebuilt bunkers and stunning lake enhancements. Tee it up 7 days out; members 14."
        tall
      >
        <Btn onClick={() => go('tee-times')}>Book a Tee Time</Btn>
        <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}><Phone size={13} /> Pro Shop {CONTACT.proShop}</Btn>
      </PageHero>

      {/* tee time band */}
      <section className="relative border-b border-ivory/10 bg-gold">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-5 py-8 md:px-10">
          <div className="flex items-center gap-5">
            <span className="grid size-12 place-items-center border-2 border-ink/70"><CalendarCheck size={20} className="text-ink" /></span>
            <div>
              <p className="font-poster text-xl uppercase tracking-wide text-ink md:text-2xl">Tee times live 7 days out — 14 for members</p>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-ink/60">Prices subject to change · groups may be paired on busy days</p>
            </div>
          </div>
          <Btn onClick={() => go('tee-times')} className="bg-ink !text-ivory hover:!text-gold2">Book Now</Btn>
        </div>
        <Checkers slide />
      </section>

      {/* tabs */}
      <div className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 md:px-10">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="group relative flex shrink-0 cursor-pointer items-center gap-2 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">
              <t.icon size={13} className={tab === t.id ? 'text-gold' : 'text-sand/60'} />
              <span className={tab === t.id ? 'text-gold2' : 'text-ivory/60 group-hover:text-ivory'}>{t.label}</span>
              {tab === t.id && <motion.span layoutId="golf-tab" className="absolute inset-x-3 bottom-0 h-0.5 bg-gold" transition={{ duration: 0.5, ease: EASE }} />}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.55, ease: EASE }}>
            {tab === 'hours' && <HoursTab />}
            {tab === 'rates' && <RatesTab go={go} />}
            {tab === 'lessons' && <LessonsTab />}
            {tab === 'sims' && <SimsTab />}
            {tab === 'scorecard' && <ScorecardTab />}
            {tab === 'rules' && (
              <div className="mx-auto max-w-3xl">
                <Tag className="justify-center">Course Rules & Etiquette</Tag>
                <h3 className="mt-5 text-center font-display text-3xl text-ivory md:text-5xl"><Lines text="One rule above all:" /> <em className="text-gold2"><Lines text="have fun." delay={0.1} /></em></h3>
                <R delay={0.2} className="mt-10"><Accordion items={GOLF_RULES} /></R>
                <R delay={0.3} className="mt-8 text-center text-[10px] uppercase tracking-[0.25em] text-sand/60">
                  The Director of Golf & Pro Shop staff supervise all play on the course, range and putting green
                </R>
              </div>
            )}
            {tab === 'benefits' && <BenefitsTab go={go} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
