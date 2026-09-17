import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, ChevronDown, Printer, CalendarRange } from 'lucide-react';
import { A, CAT_META, STATUS_META, eventsForDate, fmtDay, type ClubEvent, type Go } from '../data';
import { Btn, EASE, PageHero, R, Tag } from '../components/ui';

interface Row { date: Date; ev: ClubEvent }

export default function ClubCalendar({ go }: { go: Go }) {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<number | null>(0);

  const rows = useMemo<Row[]>(() => {
    const out: Row[] = [];
    const start = new Date(2026, 8, 17);
    for (let i = 0; i < 60 && out.length < 26; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      eventsForDate(d).forEach((ev) => out.push({ date: new Date(d), ev }));
    }
    return out;
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((r) => r.ev.title.toLowerCase().includes(needle) || r.ev.desc.toLowerCase().includes(needle) || CAT_META[r.ev.cat].label.toLowerCase().includes(needle));
  }, [rows, q]);

  return (
    <>
      <PageHero
        img={A.lake} kicker="Sep 17, 2026 – Onward" title={'CLUB\nCALENDAR'}
        sub="The rolling sixty-day schedule — every tee, table and toast in one searchable stream."
      >
        <Btn variant="outline" onClick={() => window.print()}><Printer size={13} /> Printable Version</Btn>
      </PageHero>

      <div className="mx-auto max-w-5xl px-5 py-16 md:px-10 md:py-24">
        {/* search */}
        <R className="sticky top-[76px] z-30 flex items-center gap-4 border border-ivory/15 bg-ink/90 px-5 py-4 backdrop-blur-xl">
          <Search size={16} className="shrink-0 text-gold" />
          <input
            value={q} onChange={(e) => { setQ(e.target.value); setOpen(null); }}
            placeholder="Search events — try 'dog fight', 'magic', 'wine'…"
            className="w-full bg-transparent text-sm tracking-wide text-ivory outline-none placeholder:text-sand/50"
          />
          <span className="hidden items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-sand md:flex">
            <CalendarRange size={12} className="text-gold" /> {filtered.length} events
          </span>
        </R>

        {/* stream */}
        <div className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="font-display text-2xl text-ivory">Nothing matches <em className="text-gold2">"{q}"</em></p>
              <p className="mt-2 text-sm text-sand">Try a different word — or just show up. Something's always happening.</p>
            </div>
          )}
          {filtered.map((r, i) => {
            const isOpen = open === i;
            const cat = CAT_META[r.ev.cat];
            return (
              <motion.div key={`${r.date.getTime()}-${r.ev.title}`}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.03, 0.3) }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="group grid w-full cursor-pointer grid-cols-[72px_1fr_auto] items-center gap-4 py-5 text-left md:grid-cols-[110px_110px_1fr_auto] md:gap-6"
                >
                  <span className="hidden text-[11px] font-bold uppercase tracking-[0.15em] text-sand md:block">{r.ev.time}</span>
                  <span>
                    <span className="block font-poster text-sm uppercase tracking-wide text-gold2 md:hidden">{r.ev.time}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-sand">
                      {r.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </span>
                  </span>
                  <span className="flex flex-wrap items-center gap-3">
                    <span className={`font-display text-lg transition-colors md:text-xl ${isOpen ? 'text-gold2 italic' : 'text-ivory group-hover:text-gold2'}`}>{r.ev.title}</span>
                    <span className="border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: `${cat.color}44`, color: cat.color }}>{cat.label}</span>
                    <span className="hidden items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.18em] sm:flex" style={{ color: STATUS_META[r.ev.status].color }}>
                      <span className="size-1.5 rounded-full" style={{ background: STATUS_META[r.ev.status].color }} />{STATUS_META[r.ev.status].label}
                    </span>
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}
                    className="grid size-8 place-items-center rounded-full border border-ivory/20 text-ivory/50 group-hover:border-gold/50">
                    <ChevronDown size={13} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                      <div className="grid gap-4 pb-6 md:grid-cols-[110px_110px_1fr]">
                        <span className="hidden md:block" /><span className="hidden md:block" />
                        <div className="border border-ivory/10 bg-coal p-5">
                          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gold"><Clock size={11} /> {fmtDay(r.date)} · {r.ev.time}</p>
                          <p className="mt-3 text-sm leading-relaxed text-sand">{r.ev.desc}</p>
                          {(r.ev.cat === 'golf' || r.ev.cat === 'tournament') && (
                            <Btn small className="mt-4" onClick={() => go('tee-times')}>Book a Tee Time</Btn>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        <R className="mt-12 text-center">
          <Tag className="justify-center">The calendar lives here</Tag>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-sand">
            Magic every Sunday, Dog Fights every Tuesday, live music every weekend — this is the rhythm of the Club.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Btn onClick={() => go('event-calendar')}>Month View</Btn>
            <Btn variant="outline" onClick={() => go('book-event')}>Add Your Event</Btn>
          </div>
        </R>
      </div>
    </>
  );
}
