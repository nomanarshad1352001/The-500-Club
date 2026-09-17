import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flag, Users, Clock, Check, Phone, X, CalendarCheck, Sunrise, Sun, Sunset } from 'lucide-react';
import { A, BOOKING_RULES, CONTACT, TEE_DATES, buildSlots, type TeeSlot, type Go } from '../data';
import { Accordion, Btn, EASE, PageHero, R, SuccessMark, Tag } from '../components/ui';

type Period = 'Anytime' | 'Morning' | 'Midday' | 'Evening';

export default function TeeTimes({ go }: { go: Go }) {
  const slots = useMemo(buildSlots, []);
  const [dateIdx, setDateIdx] = useState(0);
  const [period, setPeriod] = useState<Period>('Anytime');
  const [players, setPlayers] = useState<number | 'Any'>('Any');
  const [holes, setHoles] = useState<'Both' | '9' | '18'>('Both');
  const [sel, setSel] = useState<TeeSlot | null>(null);
  const [booked, setBooked] = useState(false);

  const weekend = TEE_DATES[dateIdx].weekend;
  const priceMod = weekend ? 25 : 0;

  const filtered = slots.filter((s) =>
    (period === 'Anytime' || s.period === period) &&
    (players === 'Any' || s.players === players)
  );

  const date = TEE_DATES[dateIdx];

  return (
    <>
      <PageHero
        img={A.greenFlag} kicker="Championship Course · Public Welcome" title={'BOOK A\nTEE TIME'}
        sub='Welcome to The 500 Club — "Where Lake Norman Comes to Play." 18 pristine holes, NASCAR roots, and a tee sheet that moves fast.'
      />

      {/* booking widget */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            {/* date strip */}
            <R>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Select Date — September 2026</p>
              <div className="mt-4 grid grid-cols-7 gap-1.5 md:gap-2">
                {TEE_DATES.map((d, i) => {
                  const active = i === dateIdx;
                  return (
                    <button key={i} onClick={() => { setDateIdx(i); setSel(null); }}
                      className={`group relative cursor-pointer border px-1 py-3 text-center transition-all duration-300 md:py-4 ${active ? 'border-gold bg-gold text-ink' : 'border-ivory/12 text-ivory hover:border-gold/60'}`}>
                      <span className={`block text-[9px] font-bold uppercase tracking-[0.2em] ${active ? 'text-ink/70' : 'text-sand'}`}>{d.dow}</span>
                      <span className="mt-1 block font-poster text-xl md:text-2xl">{d.day}</span>
                      <span className={`block text-[8px] font-bold uppercase tracking-[0.2em] ${active ? 'text-ink/60' : 'text-sand/60'}`}>{d.mon}</span>
                    </button>
                  );
                })}
              </div>
            </R>

            {/* filters */}
            <R delay={0.08} className="mt-8 flex flex-wrap items-center gap-2">
              {(['Anytime', 'Morning', 'Midday', 'Evening'] as Period[]).map((p) => {
                const Icon = p === 'Morning' ? Sunrise : p === 'Midday' ? Sun : p === 'Evening' ? Sunset : Clock;
                const active = period === p;
                return (
                  <button key={p} onClick={() => setPeriod(p)}
                    className={`flex cursor-pointer items-center gap-2 border px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${active ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-ivory/60 hover:text-ivory'}`}>
                    <Icon size={12} /> {p}
                  </button>
                );
              })}
              <span className="mx-1 hidden h-5 w-px bg-ivory/15 sm:block" />
              {(['Any', 1, 2, 3, 4] as const).map((n) => (
                <button key={n} onClick={() => setPlayers(n as number | 'Any')}
                  className={`cursor-pointer border px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${players === n ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-ivory/60 hover:text-ivory'}`}>
                  {n === 'Any' ? 'Any Players' : n}
                </button>
              ))}
              <span className="mx-1 hidden h-5 w-px bg-ivory/15 sm:block" />
              {(['Both', '9', '18'] as const).map((h) => (
                <button key={h} onClick={() => setHoles(h)}
                  className={`cursor-pointer border px-3.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${holes === h ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-ivory/60 hover:text-ivory'}`}>
                  {h === 'Both' ? '9 + 18 Holes' : `${h} Holes`}
                </button>
              ))}
            </R>

            {/* slots */}
            <R delay={0.12} className="mt-6 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sand">{filtered.length} open times · {date.dow} {date.mon} {date.day}</p>
              {weekend && <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold2">Weekend rates apply</p>}
            </R>
            <div className="mt-4 grid max-h-[560px] grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((s) => {
                  const price = s.price + priceMod;
                  const active = sel === s;
                  return (
                    <motion.button
                      layout key={s.time}
                      initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      onClick={() => setSel(active ? null : s)}
                      className={`group cursor-pointer border p-4 text-left transition-all duration-300 ${active ? 'border-gold bg-gold text-ink' : 'border-ivory/10 bg-coal hover:border-gold/50 hover:bg-soot'}`}
                    >
                      <p className={`font-poster text-2xl ${active ? 'text-ink' : 'text-ivory'}`}>{s.time}</p>
                      <p className={`mt-1 text-[9px] font-bold uppercase tracking-[0.15em] ${active ? 'text-ink/70' : 'text-sand'}`}>Championship · Front</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold ${active ? 'text-ink/80' : 'text-sand'}`}>
                          <Users size={11} /> {s.players}
                        </span>
                        <span className={`font-poster text-base ${active ? 'text-ink' : 'text-gold2'}`}>${price}.00</span>
                      </div>
                      <div className="mt-2 flex gap-1">
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${active ? 'bg-ink/15 text-ink' : 'bg-ivory/[0.06] text-sand'}`}>9</span>
                        <span className={`px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider ${active ? 'bg-ink/15 text-ink' : 'bg-ivory/[0.06] text-sand'}`}>18</span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* side panel */}
          <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <R delay={0.1}>
              <div className="border border-ivory/12 bg-coal p-6">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 place-items-center border border-gold/40"><Flag size={18} className="text-gold2" /></span>
                  <div>
                    <p className="font-display text-xl text-ivory">Championship Course</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">Facility · The 500 Club (NC)</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 divide-x divide-ivory/10 border-y border-ivory/10 py-4 text-center">
                  {[['6,821', 'Yards'], ['18', 'Holes'], ['72', 'Par']].map(([v, l]) => (
                    <div key={l}><p className="font-poster text-xl text-gold2">{v}</p><p className="mt-1 text-[8px] font-bold uppercase tracking-[0.25em] text-sand">{l}</p></div>
                  ))}
                </div>
                <p className="mt-5 text-xs leading-relaxed text-sand">
                  Non-members may reserve tee times up to 7 days in advance; members 14 days.
                  For assistance call the Pro Shop.
                </p>
                <Btn small variant="outline" className="mt-5 w-full justify-center" onClick={() => window.open(CONTACT.phoneLink)}>
                  <Phone size={12} /> {CONTACT.proShop}
                </Btn>
              </div>
            </R>
            <R delay={0.18}>
              <div>
                <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold"><Check size={13} /> Booking Rules</p>
                <Accordion numbered={false} items={BOOKING_RULES.map((r, i) => ({
                  title: ['Advance Windows', 'Weekdays', 'Weekends & Holidays', 'Need Help?'][i],
                  body: <p className="text-sm leading-relaxed text-sand">{r}</p>,
                }))} />
              </div>
            </R>
          </div>
        </div>
      </section>

      {/* sticky summary bar */}
      <AnimatePresence>
        {sel && !booked && (
          <motion.div
            initial={{ y: 110 }} animate={{ y: 0 }} exit={{ y: 110 }} transition={{ duration: 0.55, ease: EASE }}
            className="fixed inset-x-0 bottom-0 z-[110] border-t border-gold/40 bg-ink/95 backdrop-blur-xl"
          >
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-5 py-4 md:px-10">
              <button onClick={() => setSel(null)} className="cursor-pointer text-sand/60 hover:text-crimson"><X size={17} /></button>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
                <span className="font-poster text-2xl text-gold2">{sel.time}</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sand">{date.dow}, {date.mon} {date.day} · Championship · Front Nine Start</span>
                <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/80"><Users size={11} className="text-gold" /> {sel.players} player{sel.players > 1 ? 's' : ''}</span>
                <span className="font-poster text-lg text-ivory">${((sel.price + priceMod) * sel.players).toFixed(2)} <span className="text-xs text-sand">total</span></span>
              </div>
              <div className="ml-auto flex items-center gap-3">
                <Btn small variant="outline" onClick={() => go('golf')}>Course Info</Btn>
                <Btn small onClick={() => setBooked(true)}><CalendarCheck size={12} /> Confirm Tee Time</Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* confirmation overlay */}
      <AnimatePresence>
        {booked && sel && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[125] grid place-items-center bg-ink/90 p-5 backdrop-blur-md"
            onClick={() => { setBooked(false); setSel(null); }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg border border-gold/30 bg-coal p-10 text-center"
            >
              <div className="flex justify-center"><SuccessMark show /></div>
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.35em] text-gold">You're on the tee sheet</p>
              <h3 className="mt-3 font-display text-4xl text-ivory">See you at <em className="text-gold2">{sel.time}</em></h3>
              <p className="mt-3 text-sm leading-relaxed text-sand">
                {date.dow}, {date.mon} {date.day} · Championship Course · {sel.players} player{sel.players > 1 ? 's' : ''} ·
                Confirmation <span className="font-poster tracking-widest text-gold2">#500-{sel.time.replace(':', '')}{date.day}</span> sent by email.
              </p>
              <div className="mt-6 border border-ivory/10 bg-ink p-4 text-[11px] uppercase tracking-[0.2em] text-sand">
                Please arrive 15 minutes early · Cart fee due at check-in
              </div>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <Btn small onClick={() => { setBooked(false); setSel(null); }}>Book Another</Btn>
                <Btn small variant="outline" onClick={() => { setBooked(false); setSel(null); go('home'); }}>Back to the Club</Btn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* bottom gallery band */}
      <section className="border-t border-ivory/10 bg-coal">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-16 md:grid-cols-[1.2fr_1fr] md:px-10">
          <div>
            <Tag>While You're Here</Tag>
            <h3 className="mt-4 font-display text-3xl text-ivory md:text-4xl">18 holes, an 18-hole putting course, 2 simulators, <em className="text-gold2">a sports bar.</em></h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-sand">Make a day of it — range warm-up, lunch at the Turn Bar, then golden hour on the back nine.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Btn variant="outline" onClick={() => go('golf')}>Explore the Course</Btn>
              <Btn variant="outline" onClick={() => go('dining')}>See Victory Lane</Btn>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[A.swingPants, A.lake].map((src, i) => (
              <div key={src} className={`overflow-hidden border border-ivory/10 ${i ? 'mt-6' : ''}`}>
                <img src={src} alt="" className="aspect-[3/4] h-full w-full object-cover transition-transform duration-[1200ms] hover:scale-108" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
