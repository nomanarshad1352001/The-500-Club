import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CalendarDays, List, Printer, Clock, X } from 'lucide-react';
import { CAT_META, MONTH_NAMES, STATUS_META, eventsForDate, fmtDay, type ClubEvent, type EventCat, type Go } from '../data';
import { Btn, EASE, PageHero, R, Tag } from '../components/ui';
import { A } from '../data';

type ViewMode = 'month' | 'list';
const CATS: EventCat[] = ['golf', 'dining', 'entertainment', 'community', 'tournament'];

export default function EventCalendar({ go }: { go: Go }) {
  const [ym, setYm] = useState<[number, number]>([2026, 8]); // Sept 2026
  const [view, setView] = useState<ViewMode>('month');
  const [cats, setCats] = useState<Set<EventCat>>(new Set(CATS));
  const [selected, setSelected] = useState<Date | null>(new Date(2026, 8, 20));
  const [year, month] = ym;

  const toggleCat = (c: EventCat) => setCats((prev) => {
    const next = new Set(prev);
    if (next.has(c)) next.delete(c); else next.add(c);
    return next;
  });

  const shift = (d: number) => setYm(([y, m]) => {
    const nm = m + d;
    return [y + Math.floor(nm / 12), ((nm % 12) + 12) % 12];
  });

  const grid = useMemo(() => {
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = Array.from({ length: first }, () => null);
    for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));
    while (cells.length % 7) cells.push(null);
    return cells;
  }, [year, month]);

  const listDays = useMemo(() => {
    const out: { date: Date; events: ClubEvent[] }[] = [];
    const days = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= days; d++) {
      const date = new Date(year, month, d);
      const evs = eventsForDate(date).filter((e) => cats.has(e.cat));
      if (evs.length) out.push({ date, events: evs });
    }
    return out;
  }, [year, month, cats]);

  const selEvents = selected ? eventsForDate(selected).filter((e) => cats.has(e.cat)) : [];
  const isToday = (d: Date) => d.getFullYear() === 2026 && d.getMonth() === 8 && d.getDate() === 17;

  return (
    <>
      <PageHero
        img={A.autumn} kicker="Plan the Fun" title={'EVENT\nCALENDAR'}
        sub="Every scramble, dog fight, magic night, open mic and watch party — September 2026 and beyond. Filter by what you're into."
      />

      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        {/* controls */}
        <R className="flex flex-wrap items-center justify-between gap-5 border border-ivory/12 bg-coal p-4 md:p-5">
          <div className="flex items-center gap-3">
            <div className="flex border border-ivory/15">
              {([['month', CalendarDays, 'Month'], ['list', List, 'List']] as const).map(([v, Icon, l]) => (
                <button key={v} onClick={() => setView(v)}
                  className={`relative flex cursor-pointer items-center gap-2 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors ${view === v ? 'text-ink' : 'text-ivory/60 hover:text-ivory'}`}>
                  {view === v && <motion.span layoutId="cal-view" className="absolute inset-0 bg-gold" transition={{ duration: 0.45, ease: EASE }} />}
                  <span className="relative flex items-center gap-2"><Icon size={12} /> {l}</span>
                </button>
              ))}
            </div>
            <button onClick={() => window.print()} className="hidden cursor-pointer items-center gap-2 border border-ivory/15 px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-ivory/60 transition-colors hover:text-ivory md:flex">
              <Printer size={12} /> Printable Version
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => toggleCat(c)}
                className={`flex cursor-pointer items-center gap-2 border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.16em] transition-all duration-300 ${cats.has(c) ? 'border-ivory/25 text-ivory' : 'border-ivory/10 text-sand/40 line-through'}`}>
                <span className="size-2 rounded-full" style={{ background: cats.has(c) ? CAT_META[c].color : '#4a4437' }} />
                {CAT_META[c].label}
              </button>
            ))}
          </div>
        </R>

        {/* month header */}
        <div className="mt-10 flex items-center justify-between">
          <button onClick={() => shift(-1)}
            className="group flex cursor-pointer items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sand transition-colors hover:text-gold2">
            <ChevronLeft size={15} className="transition-transform group-hover:-translate-x-1" /> Previous
          </button>
          <div className="overflow-hidden text-center">
            <AnimatePresence mode="wait">
              <motion.h2 key={`${year}-${month}`}
                initial={{ y: 34, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -34, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}
                className="font-poster text-4xl uppercase tracking-wide text-ivory md:text-6xl">
                {MONTH_NAMES[month]} <span className="text-stroke">{year}</span>
              </motion.h2>
            </AnimatePresence>
          </div>
          <button onClick={() => shift(1)}
            className="group flex cursor-pointer items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sand transition-colors hover:text-gold2">
            Next <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'month' ? (
            <motion.div key={`m-${year}-${month}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
              className="mt-8 grid gap-8 lg:grid-cols-[1.8fr_1fr]">
              {/* grid */}
              <div className="border border-ivory/12">
                <div className="grid grid-cols-7 border-b border-ivory/12 bg-coal">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                    <div key={d} className="py-3 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-sand">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {grid.map((d, i) => {
                    if (!d) return <div key={`e${i}`} className="min-h-16 border-b border-r border-ivory/[0.07] bg-ink/40 md:min-h-24" />;
                    const evs = eventsForDate(d).filter((e) => cats.has(e.cat));
                    const sel = selected && d.toDateString() === selected.toDateString();
                    const today = isToday(d);
                    return (
                      <button
                        key={d.getTime()} onClick={() => setSelected(d)}
                        className={`group relative min-h-16 cursor-pointer border-b border-r border-ivory/[0.07] p-1.5 text-left align-top transition-colors md:min-h-24 md:p-2 ${sel ? 'bg-gold/[0.12]' : 'hover:bg-ivory/[0.04]'}`}
                      >
                        <span className={`inline-grid size-6 place-items-center font-poster text-xs md:size-7 md:text-sm ${today ? 'bg-gold text-ink' : sel ? 'text-gold2' : 'text-ivory/70'}`}>
                          {d.getDate()}
                        </span>
                        <span className="mt-1 hidden space-y-1 md:block">
                          {evs.slice(0, 3).map((e, j) => (
                            <span key={j} className="block truncate px-1.5 py-0.5 text-[8.5px] font-bold uppercase tracking-wide"
                              style={{ background: `${CAT_META[e.cat].color}1f`, color: CAT_META[e.cat].color, borderLeft: `2px solid ${CAT_META[e.cat].color}` }}>
                              {e.title}
                            </span>
                          ))}
                          {evs.length > 3 && <span className="block px-1 text-[8px] uppercase tracking-[0.15em] text-sand">+{evs.length - 3} more</span>}
                        </span>
                        <span className="mt-1 flex gap-1 md:hidden">
                          {evs.slice(0, 3).map((e, j) => <span key={j} className="size-1.5 rounded-full" style={{ background: CAT_META[e.cat].color }} />)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* day detail */}
              <div className="lg:sticky lg:top-32 lg:self-start">
                <AnimatePresence mode="wait">
                  <motion.div key={selected?.toDateString() ?? 'none'}
                    initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="border border-ivory/12 bg-coal p-7 md:p-8">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold">Day Sheet</p>
                        <h3 className="mt-2 font-display text-2xl text-ivory">{selected ? fmtDay(selected) : 'Pick a day'}</h3>
                      </div>
                      {selected && <button onClick={() => setSelected(null)} className="cursor-pointer text-sand/50 hover:text-gold2"><X size={16} /></button>}
                    </div>
                    <div className="mt-6 space-y-4">
                      {selEvents.length === 0 && <p className="text-sm text-sand">The course is quiet today — a perfect day to make your own fun.</p>}
                      {selEvents.map((e, i) => (
                        <div key={i} className="border-l-2 bg-ink/60 p-4" style={{ borderColor: CAT_META[e.cat].color }}>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-display text-lg text-ivory">{e.title}</span>
                            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-sand"><Clock size={10} /> {e.time}</span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]" style={{ background: `${CAT_META[e.cat].color}22`, color: CAT_META[e.cat].color }}>{CAT_META[e.cat].label}</span>
                            <span className="flex items-center gap-1.5 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]" style={{ color: STATUS_META[e.status].color }}>
                              <span className="size-1.5 rounded-full" style={{ background: STATUS_META[e.status].color }} />{STATUS_META[e.status].label}
                            </span>
                          </div>
                          <p className="mt-3 text-xs leading-relaxed text-sand">{e.desc}</p>
                        </div>
                      ))}
                    </div>
                    {selected && selEvents.some((e) => e.cat === 'golf' || e.cat === 'tournament') && (
                      <Btn small className="mt-6" onClick={() => go('tee-times')}>Book Around It</Btn>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div key={`l-${year}-${month}`} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
              className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
              {listDays.length === 0 && <p className="py-16 text-center text-sm text-sand">Nothing on the books — loosen up a filter.</p>}
              {listDays.map(({ date, events }) => (
                <div key={date.getTime()} className="grid gap-4 py-6 md:grid-cols-[130px_1fr]">
                  <div className="md:text-right">
                    <p className="font-poster text-2xl text-gold2">{date.getDate()}</p>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-sand">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'short' })}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {events.map((e, i) => (
                      <div key={i} className="group border-l-2 bg-coal p-4 transition-colors hover:bg-soot" style={{ borderColor: CAT_META[e.cat].color }}>
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-display text-ivory">{e.title}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-sand">{e.time}</span>
                        </div>
                        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-sand">{e.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* legend */}
        <R className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border border-ivory/10 bg-coal p-5">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-sand">Status</span>
          {Object.entries(STATUS_META).map(([k, v]) => (
            <span key={k} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/70">
              <span className="size-2 rounded-full" style={{ background: v.color }} /> {v.label}
            </span>
          ))}
        </R>
      </div>

      <Tag className="justify-center pb-4">More fun ahead</Tag>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-5 pb-20 md:px-10">
        <Btn variant="outline" onClick={() => go('club-calendar')}>Open Club Calendar</Btn>
        <Btn onClick={() => go('tee-times')}>Book a Tee Time</Btn>
      </div>
    </>
  );
}
