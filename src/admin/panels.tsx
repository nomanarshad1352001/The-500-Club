import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, CalendarDays, Users, UtensilsCrossed, Flag, Inbox, Plus, Trash2,
  Search, Ban, CirclePlay, Annoyed, Wand2, Sparkles, ArrowUpRight, Printer,
} from 'lucide-react';
import { CAT_META, STATUS_META, type EventCat, type EventStatus } from '../data';
import { useAdmin, type AdminEvent } from './store';
import { EASE, Counter } from '../components/ui';

/* ==================== shared bits ==================== */

export function ACard({ title, sub, action, children, className = '' }: {
  title?: string; sub?: string; action?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
      className={`border border-ivory/10 bg-coal ${className}`}
    >
      {title && (
        <header className="flex flex-wrap items-center gap-4 border-b border-ivory/10 px-5 py-4 md:px-6">
          <div>
            <h3 className="font-display text-lg text-ivory">{title}</h3>
            {sub && <p className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-sand/70">{sub}</p>}
          </div>
          {action && <div className="ml-auto">{action}</div>}
        </header>
      )}
      <div className="p-5 md:p-6">{children}</div>
    </motion.section>
  );
}

export function AField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.25em] text-sand/80">{label}</span>
      <input {...props} className="w-full border border-ivory/12 bg-ink px-3 py-2.5 text-sm text-ivory outline-none transition-colors placeholder:text-sand/40 focus:border-gold" />
    </label>
  );
}

export function ASelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.25em] text-sand/80">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full cursor-pointer border border-ivory/12 bg-ink px-3 py-2.5 text-sm text-ivory outline-none transition-colors focus:border-gold">
        {options.map((o) => <option key={o} value={o} className="bg-ink">{o}</option>)}
      </select>
    </label>
  );
}

export function AButton({ children, onClick, variant = 'gold', small = false, className = '' }: {
  children: React.ReactNode; onClick?: () => void; variant?: 'gold' | 'ghost' | 'danger'; small?: boolean; className?: string;
}) {
  const s = variant === 'gold'
    ? 'bg-gold text-ink hover:bg-gold2'
    : variant === 'danger'
      ? 'border border-crimson/50 text-crimson hover:bg-crimson/10'
      : 'border border-ivory/20 text-ivory/80 hover:border-gold/60 hover:text-gold2';
  return (
    <button onClick={onClick}
      className={`flex cursor-pointer items-center justify-center gap-2 font-bold uppercase tracking-[0.2em] transition-all duration-300 ${small ? 'px-3 py-2 text-[9px]' : 'px-5 py-3 text-[10px]'} ${s} ${className}`}>
      {children}
    </button>
  );
}

export function Pill({ color, children, onClick }: { color: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} disabled={!onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] ${onClick ? 'cursor-pointer transition-transform hover:scale-105' : 'cursor-default'}`}
      style={{ background: `${color}1e`, color, border: `1px solid ${color}44` }}>
      <span className="size-1.5 rounded-full" style={{ background: color }} /> {children}
    </button>
  );
}

export function Empty({ msg }: { msg: string }) {
  return (
    <div className="flex flex-col items-center gap-3 py-14 text-center">
      <Annoyed size={22} className="text-sand/40" />
      <p className="text-sm text-sand/70">{msg}</p>
    </div>
  );
}

/* ==================== DASHBOARD ==================== */

export function DashboardPanel({ goPanel }: { goPanel: (p: string) => void }) {
  const { events, slots, members, msgs, menu } = useAdmin();
  const week = [62, 88, 94, 79, 45, 71, 58];
  const days = ['Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed'];
  const unread = msgs.filter((m) => m.unread);
  const booked = slots.filter((s) => s.status === 'booked').length;
  const occupancy = Math.round(members.length / 650 * 100 * 10) / 10;

  const ring = 2 * Math.PI * 52;
  const activity = [
    { t: 'Tee time 1:40 PM booked online', s: '2 min ago', icon: Flag },
    { t: 'New membership request — Jordan Pruitt', s: '18 min ago', icon: Users },
    { t: '"Frozen Creamsicle" 86\'d? Kitchen says never', s: '1 hr ago', icon: UtensilsCrossed },
    { t: 'Sunday Scramble Series — 6 new teams', s: '3 hrs ago', icon: CalendarDays },
    { t: 'Whiskey & Fairways waitlist +2', s: '5 hrs ago', icon: Sparkles },
  ];

  return (
    <div className="space-y-5">
      {/* stat cards */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { label: 'Active Members', v: 512, d: '+12 this month', icon: Users, p: 'members' },
          { label: 'Tee Times Today', v: 96, d: `${booked} slots pre-booked`, icon: Flag, p: 'tee' },
          { label: 'Events · September', v: events.length, d: '5 categories live', icon: CalendarDays, p: 'events' },
          { label: 'Menu Items Live', v: menu.length - menu.filter((m) => m.eightySixed).length, d: `${menu.filter((m) => m.eightySixed).length} on the 86 board`, icon: UtensilsCrossed, p: 'menu' },
        ].map((c, i) => (
          <motion.button key={c.label} onClick={() => goPanel(c.p)}
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.6, ease: EASE }}
            className="group cursor-pointer border border-ivory/10 bg-coal p-5 text-left transition-colors hover:border-gold/40">
            <div className="flex items-center justify-between">
              <c.icon size={16} className="text-gold" />
              <ArrowUpRight size={13} className="text-sand/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold2" />
            </div>
            <p className="mt-4 font-poster text-4xl text-ivory"><Counter n={c.v} /></p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sand">{c.label}</p>
            <p className="mt-1 flex items-center gap-1 text-[10px] text-gold2/80"><TrendingUp size={10} /> {c.d}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
        {/* tee sheet chart */}
        <ACard title="Tee Sheet Utilization" sub="Next 7 days · % of slots booked" action={<AButton small variant="ghost" onClick={() => goPanel('tee')}>Manage Sheet</AButton>}>
          <div className="flex h-48 items-end gap-3 md:gap-5">
            {week.map((v, i) => (
              <div key={i} className="group flex flex-1 flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-gold2 opacity-0 transition-opacity group-hover:opacity-100">{v}%</span>
                <motion.div initial={{ height: 0 }} animate={{ height: `${v * 0.72}%` }} transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease: EASE }}
                  className={`w-full ${v > 85 ? 'bg-gold' : 'bg-gold/35'} transition-colors group-hover:bg-gold2`} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-sand/70">{days[i]}</span>
              </div>
            ))}
          </div>
        </ACard>

        {/* membership ring */}
        <ACard title="Membership Capacity" sub="512 of 650 full-family equivalents">
          <div className="flex items-center gap-6">
            <div className="relative grid size-36 shrink-0 place-items-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(241,234,217,.08)" strokeWidth="6" />
                <motion.circle cx="60" cy="60" r="52" fill="none" stroke="#C7A15C" strokeWidth="6" strokeLinecap="butt"
                  strokeDasharray={ring} initial={{ strokeDashoffset: ring }}
                  animate={{ strokeDashoffset: ring * (1 - occupancy / 100) }}
                  transition={{ duration: 1.6, delay: 0.4, ease: EASE }} />
              </svg>
              <div className="text-center">
                <p className="font-poster text-3xl text-ivory">{occupancy}%</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-sand">Full</p>
              </div>
            </div>
            <ul className="space-y-2.5 text-xs text-sand">
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-gold" /> Full Family · 214</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-gold/70" /> Dual · 128</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-gold/45" /> Individual · 119</li>
              <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-gold/25" /> Junior + Corporate · 51</li>
            </ul>
          </div>
        </ACard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* activity */}
        <ACard title="Live Activity" sub="Club pulse, newest first">
          <ul className="divide-y divide-ivory/[0.07]">
            {activity.map((a, i) => (
              <motion.li key={a.t} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08, duration: 0.5 }}
                className="flex items-center gap-4 py-3">
                <span className="grid size-8 shrink-0 place-items-center border border-gold/25 text-gold2"><a.icon size={12} /></span>
                <span className="flex-1 text-sm text-ivory/80">{a.t}</span>
                <span className="text-[9px] uppercase tracking-[0.15em] text-sand/50">{a.s}</span>
              </motion.li>
            ))}
          </ul>
        </ACard>

        {/* inbox preview */}
        <ACard title={`Inbox — ${unread.length} unread`} sub="Latest guest & member messages"
          action={<AButton small variant="ghost" onClick={() => goPanel('inbox')}><Inbox size={11} /> Open Inbox</AButton>}>
          <ul className="space-y-3">
            {msgs.slice(0, 3).map((m, i) => (
              <motion.li key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                className="group cursor-pointer border border-ivory/10 bg-ink p-4 transition-colors hover:border-gold/40" onClick={() => goPanel('inbox')}>
                <div className="flex items-center gap-3">
                  {m.unread && <span className="size-2 shrink-0 animate-pulse rounded-full bg-gold" />}
                  <p className="text-sm font-semibold text-ivory">{m.name}</p>
                  <span className="ml-auto text-[9px] uppercase tracking-[0.15em] text-sand/50">{m.date}</span>
                </div>
                <p className="mt-1.5 truncate text-xs text-sand">{m.subject} — {m.body}</p>
              </motion.li>
            ))}
          </ul>
        </ACard>
      </div>

      {/* quick actions */}
      <ACard title="Quick Actions" sub="One-tap clubhouse moves">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {[
            { l: 'Publish Event', icon: CalendarDays, p: 'events' }, { l: 'Add Menu Item', icon: UtensilsCrossed, p: 'menu' },
            { l: 'Block a Tee Time', icon: Flag, p: 'tee' }, { l: 'Post a Job', icon: Users, p: 'jobs' },
          ].map((q) => (
            <button key={q.l} onClick={() => goPanel(q.p)}
              className="group flex cursor-pointer items-center gap-3 border border-ivory/12 bg-ink px-4 py-3.5 text-left transition-all duration-300 hover:border-gold hover:bg-gold/[0.06]">
              <q.icon size={15} className="text-gold transition-transform duration-300 group-hover:scale-110" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-ivory/80 group-hover:text-gold2">{q.l}</span>
              <Plus size={12} className="ml-auto text-sand/40 group-hover:text-gold2" />
            </button>
          ))}
        </div>
      </ACard>
    </div>
  );
}

/* ==================== EVENTS ==================== */

export function EventsPanel() {
  const { events, addEvent, removeEvent, cycleStatus } = useAdmin();
  const [q, setQ] = useState('');
  const [catF, setCatF] = useState<string>('all');
  const [form, setForm] = useState({ title: '', date: '', time: '', cat: 'golf' as EventCat, status: 'available' as EventStatus });

  const filtered = events.filter((e) =>
    (catF === 'all' || e.cat === catF) &&
    (e.title + e.date).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <ACard title="Publish an Event" sub="Appears instantly on the public calendars">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
          <AField label="Event title" placeholder="Fall Whiskey Dinner" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AField label="Date" placeholder="Oct 24" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <AField label="Time" placeholder="6:30 PM" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
          <ASelect label="Category" value={form.cat} onChange={(v) => setForm({ ...form, cat: v as EventCat })}
            options={['golf', 'dining', 'entertainment', 'community', 'tournament']} />
          <ASelect label="Status" value={form.status} onChange={(v) => setForm({ ...form, status: v as EventStatus })}
            options={['available', 'reserved', 'waitlist', 'soldout', 'closed']} />
          <div className="flex items-end">
            <AButton onClick={() => { if (form.title && form.date) { addEvent({ ...form, time: form.time || 'TBD' }); setForm({ title: '', date: '', time: '', cat: 'golf', status: 'available' }); } }}>
              <Plus size={13} /> Publish
            </AButton>
          </div>
        </div>
      </ACard>

      <ACard title={`Event Manager — ${filtered.length} of ${events.length}`} sub="Tap a status pill to cycle it"
        action={
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand/50" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search events…"
                className="w-44 border border-ivory/12 bg-ink py-2.5 pl-9 pr-3 text-xs text-ivory outline-none placeholder:text-sand/40 focus:border-gold md:w-56" />
            </div>
          </div>
        }>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {['all', 'golf', 'dining', 'entertainment', 'community', 'tournament'].map((c) => (
            <button key={c} onClick={() => setCatF(c)}
              className={`cursor-pointer border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] transition-all ${catF === c ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-sand/70 hover:text-ivory'}`}>
              {c === 'all' ? 'All' : CAT_META[c as EventCat].label}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-ivory/10 text-[9px] font-bold uppercase tracking-[0.22em] text-sand/60">
                <th className="pb-3 pr-4">Date</th><th className="pb-3 pr-4">Event</th><th className="pb-3 pr-4">Time</th>
                <th className="pb-3 pr-4">Category</th><th className="pb-3 pr-4">Status</th><th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((e) => (
                  <motion.tr key={e.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, transition: { duration: 0.3 } }}
                    className="group border-b border-ivory/[0.06] transition-colors hover:bg-ivory/[0.02]">
                    <td className="py-3.5 pr-4 font-poster text-sm tracking-wide text-gold2">{e.date}</td>
                    <td className="py-3.5 pr-4 text-sm font-semibold text-ivory/90">{e.title}</td>
                    <td className="py-3.5 pr-4 text-xs text-sand">{e.time}</td>
                    <td className="py-3.5 pr-4"><Pill color={CAT_META[e.cat].color}>{CAT_META[e.cat].label}</Pill></td>
                    <td className="py-3.5 pr-4"><Pill color={STATUS_META[e.status].color} onClick={() => cycleStatus(e.id)}>{STATUS_META[e.status].label}</Pill></td>
                    <td className="py-3.5 text-right">
                      <button onClick={() => removeEvent(e.id)}
                        className="cursor-pointer p-2 text-sand/40 opacity-0 transition-all hover:text-crimson group-hover:opacity-100">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && <Empty msg="No events match those filters." />}
        </div>
      </ACard>
    </div>
  );
}

/* ==================== TEE TIMES ==================== */

export function TeePanel() {
  const { slots, toggleSlot, bumpPrices, addSlot, removeSlot } = useAdmin();
  const [newTime, setNewTime] = useState('');
  const counts = {
    open: slots.filter((s) => s.status === 'open').length,
    blocked: slots.filter((s) => s.status === 'blocked').length,
    booked: slots.filter((s) => s.status === 'booked').length,
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: 'Open Slots', v: counts.open, c: '#C7A15C' }, { l: 'Pre-Booked', v: counts.booked, c: '#7FA98A' }, { l: 'Blocked', v: counts.blocked, c: '#C25B4E' },
        ].map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="border border-ivory/10 bg-coal p-5 text-center">
            <p className="font-poster text-3xl md:text-4xl" style={{ color: s.c }}><Counter n={s.v} /></p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.22em] text-sand">{s.l}</p>
          </motion.div>
        ))}
      </div>

      <ACard title="Tee Sheet Control" sub="Thursday, Sep 17 · Championship Course"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <input value={newTime} onChange={(e) => setNewTime(e.target.value)} placeholder="8:10am"
              className="w-24 border border-ivory/12 bg-ink px-3 py-2 text-xs text-ivory outline-none placeholder:text-sand/40 focus:border-gold" />
            <AButton small variant="ghost" onClick={() => { if (newTime) { addSlot(newTime); setNewTime(''); } }}><Plus size={11} /> Slot</AButton>
            <AButton small onClick={bumpPrices}><Wand2 size={11} /> Apply Sept +$3</AButton>
            <AButton small variant="ghost" onClick={() => window.print()}><Printer size={11} /> Sheet</AButton>
          </div>
        }>
        <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence initial={false}>
            {slots.map((s) => {
              const blocked = s.status === 'blocked';
              const booked = s.status === 'booked';
              return (
                <motion.div key={s.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                  className={`flex items-center gap-4 border p-4 transition-colors ${blocked ? 'border-crimson/40 bg-crimson/[0.06]' : booked ? 'border-emerald-700/40 bg-emerald-900/10' : 'border-ivory/10 bg-ink hover:border-gold/40'}`}>
                  <div className="min-w-16">
                    <p className={`font-poster text-2xl ${blocked ? 'text-crimson/70 line-through' : 'text-ivory'}`}>{s.time}</p>
                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-sand/60">{s.period} · {s.players}p</p>
                  </div>
                  <p className={`font-poster text-lg ${blocked ? 'text-sand/40' : 'text-gold2'}`}>${s.price}.00</p>
                  <div className="ml-auto flex items-center gap-1.5">
                    {booked ? (
                      <span className="flex items-center gap-1.5 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.15em] text-emerald-400/90">
                        <CirclePlay size={10} /> Booked
                      </span>
                    ) : (
                      <button onClick={() => toggleSlot(s.id)}
                        className={`flex cursor-pointer items-center gap-1.5 border px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] transition-all ${blocked ? 'border-crimson/50 text-crimson hover:bg-crimson/10' : 'border-ivory/15 text-sand hover:border-gold/50 hover:text-gold2'}`}>
                        <Ban size={10} /> {blocked ? 'Unblock' : 'Block'}
                      </button>
                    )}
                    <button onClick={() => removeSlot(s.id)} className="cursor-pointer p-1.5 text-sand/30 transition-colors hover:text-crimson">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </ACard>
    </div>
  );
}

/* ==================== MENU ==================== */

export function MenuPanel() {
  const { menu, addMenuItem, removeMenuItem, toggle86, setPrice } = useAdmin();
  const sections = useMemo(() => ['All', ...Array.from(new Set(menu.map((m) => m.section)))], [menu]);
  const [sec, setSec] = useState('All');
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<string | null>(null);
  const [priceDraft, setPriceDraft] = useState('');
  const [form, setForm] = useState({ name: '', price: '', section: 'Start Strong', desc: '' });

  const filtered = menu.filter((m) =>
    (sec === 'All' || m.section === sec) && m.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <ACard title="Add a Menu Item" sub="Live on the public dining page instantly">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_1fr_2fr_auto]">
          <AField label="Item name" placeholder="Checkered Flag Cheesecake" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <AField label="Price" placeholder="9" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <ASelect label="Section" value={form.section} onChange={(v) => setForm({ ...form, section: v })} options={sections.filter((s) => s !== 'All')} />
          <AField label="Description" placeholder="Vanilla bean · bourbon caramel · checkered chocolate" value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
          <div className="flex items-end">
            <AButton onClick={() => { if (form.name) { addMenuItem({ ...form, price: form.price || undefined, desc: form.desc || undefined }); setForm({ name: '', price: '', section: 'Start Strong', desc: '' }); } }}>
              <Plus size={13} /> Add Item
            </AButton>
          </div>
        </div>
      </ACard>

      <ACard title={`Menu Manager — ${filtered.length} items`} sub="Tap the price to edit · 86 anything in one tap"
        action={
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search menu…"
              className="w-44 border border-ivory/12 bg-ink py-2.5 pl-9 pr-3 text-xs text-ivory outline-none placeholder:text-sand/40 focus:border-gold md:w-56" />
          </div>
        }>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {sections.map((s) => (
            <button key={s} onClick={() => setSec(s)}
              className={`cursor-pointer border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] transition-all ${sec === s ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-sand/70 hover:text-ivory'}`}>
              {s}
            </button>
          ))}
        </div>
        <div className="space-y-1.5">
          <AnimatePresence initial={false}>
            {filtered.map((m) => (
              <motion.div key={m.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.25 } }}
                className={`group flex flex-wrap items-center gap-3 border px-4 py-3 transition-colors ${m.eightySixed ? 'border-crimson/30 bg-crimson/[0.05] opacity-60' : 'border-ivory/[0.07] bg-ink hover:border-gold/30'}`}>
                <div className="min-w-52 flex-1">
                  <p className={`text-sm font-semibold ${m.eightySixed ? 'text-sand/60 line-through' : 'text-ivory/90'}`}>{m.name}</p>
                  <p className="truncate text-[10px] uppercase tracking-[0.14em] text-sand/50">{m.section}{m.desc ? ` · ${m.desc}` : ''}</p>
                </div>
                {editing === m.id ? (
                  <input autoFocus value={priceDraft}
                    onChange={(e) => setPriceDraft(e.target.value)}
                    onBlur={() => { setPrice(m.id, priceDraft); setEditing(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setPrice(m.id, priceDraft); setEditing(null); } if (e.key === 'Escape') setEditing(null); }}
                    className="w-20 border border-gold bg-coal px-2 py-1.5 text-center font-poster text-sm text-gold2 outline-none" />
                ) : (
                  <button onClick={() => { setEditing(m.id); setPriceDraft(m.price ?? ''); }}
                    className="cursor-pointer border border-dashed border-ivory/20 px-3 py-1.5 font-poster text-sm text-gold2 transition-colors hover:border-gold/60"
                    title="Tap to edit price">
                    {m.price ? `$${m.price}` : '—'}
                  </button>
                )}
                <button onClick={() => toggle86(m.id)}
                  className={`cursor-pointer border px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.18em] transition-all ${m.eightySixed ? 'border-crimson/60 bg-crimson/15 text-crimson' : 'border-ivory/15 text-sand hover:border-crimson/50 hover:text-crimson'}`}>
                  {m.eightySixed ? '86\'d — Restore' : '86 It'}
                </button>
                <button onClick={() => removeMenuItem(m.id)} className="cursor-pointer p-1.5 text-sand/30 opacity-0 transition-all hover:text-crimson group-hover:opacity-100">
                  <Trash2 size={13} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && <Empty msg="No dishes match. The kitchen is hiding something." />}
        </div>
      </ACard>
    </div>
  );
}

export type { AdminEvent };
