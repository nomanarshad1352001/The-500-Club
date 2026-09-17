import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Plus, Trash2, Mail, ChevronDown, Pause, CirclePlay, Save, RotateCcw, Users,
} from 'lucide-react';
import { useAdmin } from './store';
import { AButton, ACard, AField, ASelect, Empty } from './panels';
import { EASE } from '../components/ui';

const TIER_COLORS: Record<string, string> = {
  'Full Family': '#C7A15C', 'Dual': '#9A8FD8', 'Individual': '#7FA98A', 'Junior': '#6FA8C9', 'Corporate': '#C25B4E',
};
const MSTATUS_COLORS: Record<string, string> = { 'Active': '#7FA98A', 'Past Due': '#C25B4E', 'Frozen': '#8d8574' };

/* ==================== MEMBERS ==================== */

export function MembersPanel() {
  const { members, addMember, removeMember, cycleMemberStatus } = useAdmin();
  const [q, setQ] = useState('');
  const [tierF, setTierF] = useState('All');
  const [form, setForm] = useState({ name: '', tier: 'Individual' });

  const tiers = ['All', 'Full Family', 'Dual', 'Individual', 'Junior', 'Corporate'];
  const filtered = members.filter((m) =>
    (tierF === 'All' || m.tier === tierF) && m.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-5">
      <ACard title="Enroll a Member" sub="Instant roster + welcome email (demo)">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
          <AField label="Full name" placeholder="Annika Sorenstam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <ASelect label="Tier" value={form.tier} onChange={(v) => setForm({ ...form, tier: v })}
            options={['Full Family', 'Dual', 'Individual', 'Junior', 'Corporate']} />
          <div className="flex items-end">
            <AButton onClick={() => { if (form.name) { addMember(form.name, form.tier); setForm({ name: '', tier: 'Individual' }); } }}>
              <Users size={13} /> Enroll
            </AButton>
          </div>
        </div>
      </ACard>

      <ACard title={`Member Roster — ${filtered.length} of ${members.length}`} sub="Tap status to cycle · Active / Past Due / Frozen"
        action={
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand/50" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search members…"
              className="w-44 border border-ivory/12 bg-ink py-2.5 pl-9 pr-3 text-xs text-ivory outline-none placeholder:text-sand/40 focus:border-gold md:w-56" />
          </div>
        }>
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tiers.map((t) => (
            <button key={t} onClick={() => setTierF(t)}
              className={`cursor-pointer border px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] transition-all ${tierF === t ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/12 text-sand/70 hover:text-ivory'}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-ivory/10 text-[9px] font-bold uppercase tracking-[0.22em] text-sand/60">
                <th className="pb-3 pr-4">Member</th><th className="pb-3 pr-4">Tier</th><th className="pb-3 pr-4">Joined</th>
                <th className="pb-3 pr-4">Rounds YTD</th><th className="pb-3 pr-4">Status</th><th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map((m) => (
                  <motion.tr key={m.id} layout initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, transition: { duration: 0.3 } }}
                    className="group border-b border-ivory/[0.06] transition-colors hover:bg-ivory/[0.02]">
                    <td className="py-3.5 pr-4">
                      <div className="flex items-center gap-3">
                        <span className="grid size-9 shrink-0 place-items-center border border-gold/30 font-poster text-xs text-gold2">
                          {m.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-ivory/90">{m.name}</p>
                          <p className="text-[10px] text-sand/50">{m.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em]"
                        style={{ background: `${TIER_COLORS[m.tier]}1e`, color: TIER_COLORS[m.tier], border: `1px solid ${TIER_COLORS[m.tier]}44` }}>
                        {m.tier}
                      </span>
                    </td>
                    <td className="py-3.5 pr-4 font-poster text-sm text-sand">{m.joined}</td>
                    <td className="py-3.5 pr-4">
                      <span className="font-poster text-base text-gold2">{m.rounds}</span>
                      <span className="ml-1.5 text-[9px] uppercase tracking-widest text-sand/50">rds</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <button onClick={() => cycleMemberStatus(m.id)}
                        className="flex cursor-pointer items-center gap-1.5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.15em] transition-transform hover:scale-105"
                        style={{ background: `${MSTATUS_COLORS[m.status]}1e`, color: MSTATUS_COLORS[m.status], border: `1px solid ${MSTATUS_COLORS[m.status]}44` }}>
                        <span className="size-1.5 rounded-full" style={{ background: MSTATUS_COLORS[m.status] }} /> {m.status}
                      </button>
                    </td>
                    <td className="py-3.5 text-right">
                      <span className="flex items-center justify-end gap-1">
                        <a href={`mailto:${m.email}`} className="cursor-pointer p-2 text-sand/40 opacity-0 transition-all hover:text-gold2 group-hover:opacity-100"><Mail size={13} /></a>
                        <button onClick={() => removeMember(m.id)} className="cursor-pointer p-2 text-sand/40 opacity-0 transition-all hover:text-crimson group-hover:opacity-100"><Trash2 size={13} /></button>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && <Empty msg="No members found — maybe check the 19th hole." />}
        </div>
      </ACard>
    </div>
  );
}

/* ==================== JOBS / CAREERS ==================== */

export function JobsPanel() {
  const { jobs, toggleJob, removeJob, addJob } = useAdmin();
  const [form, setForm] = useState({ title: '', dept: '', type: 'Full-time' as 'Full-time' | 'Part-time' | 'Seasonal', pay: '' });

  return (
    <div className="space-y-5">
      <ACard title="Post a Job" sub="Goes live on the careers page immediately">
        <div className="grid gap-4 md:grid-cols-[2fr_2fr_1fr_1fr_auto]">
          <AField label="Role title" placeholder="Simulator/Lounge Host" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <AField label="Department" placeholder="Victory Lane — Simulators" value={form.dept} onChange={(e) => setForm({ ...form, dept: e.target.value })} />
          <ASelect label="Type" value={form.type} onChange={(v) => setForm({ ...form, type: v as typeof form.type })} options={['Full-time', 'Part-time', 'Seasonal']} />
          <AField label="Pay" placeholder="$15/hr + tips" value={form.pay} onChange={(e) => setForm({ ...form, pay: e.target.value })} />
          <div className="flex items-end">
            <AButton onClick={() => {
              if (form.title && form.dept) {
                addJob({ ...form, starts: 'Immediate', desc: 'Help guests book bays, keep the clubs racked and the good times flowing between swings.', reqs: ['Hospitality attitude', 'Evening availability'] });
                setForm({ title: '', dept: '', type: 'Full-time', pay: '' });
              }
            }}>
              <Plus size={13} /> Post
            </AButton>
          </div>
        </div>
      </ACard>

      <div className="grid gap-3 xl:grid-cols-2">
        <AnimatePresence initial={false}>
          {jobs.map((j) => (
            <motion.div key={j.id} layout initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
              className={`border p-5 transition-colors ${j.status === 'open' ? 'border-ivory/10 bg-coal hover:border-gold/30' : 'border-ivory/[0.07] bg-ink opacity-70'}`}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-display text-lg text-ivory">{j.title}</p>
                <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] ${j.status === 'open' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-ivory/10 text-sand'}`}>
                  {j.status === 'open' ? '● Live' : '❚❚ Paused'}
                </span>
                <span className="ml-auto text-[9px] font-bold uppercase tracking-[0.18em] text-gold2">{j.apps} applicants</span>
              </div>
              <p className="mt-1.5 text-xs text-sand">{j.dept} · {j.type} · {j.pay}</p>
              <div className="mt-4 flex items-center gap-2">
                <AButton small variant="ghost" onClick={() => toggleJob(j.id)}>
                  {j.status === 'open' ? <><Pause size={10} /> Pause Posting</> : <><CirclePlay size={10} /> Resume Posting</>}
                </AButton>
                <AButton small variant="danger" onClick={() => removeJob(j.id)}><Trash2 size={10} /> Remove</AButton>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {jobs.length === 0 && <Empty msg="No postings — the crew is complete. For now." />}
      </div>
    </div>
  );
}

/* ==================== INBOX ==================== */

const MSG_COLORS: Record<string, string> = {
  Membership: '#C7A15C', 'Private Events': '#9A8FD8', 'Tee Times': '#7FA98A', Careers: '#6FA8C9', Dining: '#D9A441', General: '#8d8574',
};

export function InboxPanel() {
  const { msgs, toggleUnread, removeMsg } = useAdmin();
  const [open, setOpen] = useState<string | null>(null);
  const unread = msgs.filter((m) => m.unread).length;

  return (
    <ACard title={`Guest & Member Inbox — ${unread} unread`} sub="Membership requests, event inquiries, tee-time asks and applications">
      <div className="divide-y divide-ivory/[0.07]">
        <AnimatePresence initial={false}>
          {msgs.map((m, i) => {
            const isOpen = open === m.id;
            const color = MSG_COLORS[m.type] ?? '#8d8574';
            return (
              <motion.div key={m.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 30, transition: { duration: 0.3 } }} transition={{ delay: i * 0.04, duration: 0.45, ease: EASE }}>
                <button
                  onClick={() => { setOpen(isOpen ? null : m.id); if (m.unread) toggleUnread(m.id); }}
                  className="group grid w-full cursor-pointer gap-2 py-4 text-left transition-colors hover:bg-ivory/[0.02] md:grid-cols-[8px_150px_130px_1fr_110px] md:items-center md:gap-4 md:px-2">
                  <span className={`hidden size-2 rounded-full md:block ${m.unread ? 'animate-pulse bg-gold' : 'bg-ivory/10'}`} />
                  <span className="flex items-center gap-2">
                    <span className={`size-2 rounded-full md:hidden ${m.unread ? 'animate-pulse bg-gold' : 'bg-ivory/10'}`} />
                    <span className={`text-sm ${m.unread ? 'font-bold text-ivory' : 'text-ivory/75'}`}>{m.name}</span>
                  </span>
                  <span className="px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.15em]"
                    style={{ background: `${color}1e`, color, border: `1px solid ${color}44` }}>
                    {m.type}
                  </span>
                  <span className={`truncate text-sm ${m.unread ? 'text-ivory/85' : 'text-sand'}`}>
                    <span className="font-semibold">{m.subject}</span> — {m.body}
                  </span>
                  <span className="flex items-center justify-between gap-2 md:justify-end">
                    <span className="text-[9px] uppercase tracking-[0.12em] text-sand/50">{m.date}</span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }} className="text-sand/50"><ChevronDown size={13} /></motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }} className="overflow-hidden">
                      <div className="mb-4 border border-ivory/10 bg-ink p-5 md:mx-2">
                        <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-sand">
                          <span>From: <span className="text-gold2">{m.name} · {m.email}</span></span>
                          <span className="ml-auto">{m.date}</span>
                        </div>
                        <p className="mt-1 font-display text-lg text-ivory">{m.subject}</p>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-sand">{m.body}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          <AButton small onClick={() => window.open(`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`)}>
                            <Mail size={11} /> Reply
                          </AButton>
                          <AButton small variant="ghost" onClick={() => toggleUnread(m.id)}>
                            Mark {m.unread ? 'Read' : 'Unread'}
                          </AButton>
                          <AButton small variant="danger" onClick={() => { removeMsg(m.id); setOpen(null); }}>
                            <Trash2 size={11} /> Archive
                          </AButton>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {msgs.length === 0 && <Empty msg="Inbox zero. Pour yourself a Creamsicle." />}
      </div>
    </ACard>
  );
}

/* ==================== SETTINGS ==================== */

export function SettingsPanel() {
  const { settings, saveSettings, resetAll } = useAdmin();
  const [draft, setDraft] = useState(settings);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
      <ACard title="Club Settings" sub="Powers the public site experience">
        <div className="space-y-5">
          <AField label="Main phone line" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
          <AField label="Happy hour window" value={draft.happyHour} onChange={(e) => setDraft({ ...draft, happyHour: e.target.value })} />
          <AField label="Social handle" value={draft.social} onChange={(e) => setDraft({ ...draft, social: e.target.value })} />
          <label className="block">
            <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.25em] text-sand/80">Homepage announcement</span>
            <textarea rows={3} value={draft.announcement}
              onChange={(e) => setDraft({ ...draft, announcement: e.target.value })}
              className="w-full resize-none border border-ivory/12 bg-ink px-3 py-2.5 text-sm leading-relaxed text-ivory outline-none focus:border-gold" />
          </label>
          <AButton onClick={() => saveSettings(draft)}><Save size={13} /> Save Settings</AButton>
        </div>
      </ACard>

      <div className="space-y-5">
        <ACard title="Session" sub="You're signed in as">
          <div className="flex items-center gap-4">
            <span className="relative grid size-14 place-items-center">
              <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
                <circle cx="24" cy="24" r="22.5" fill="none" stroke="#C7A15C" strokeWidth="1.2" />
              </svg>
              <span className="font-poster text-sm text-gold2">SA</span>
            </span>
            <div>
              <p className="font-display text-lg text-ivory">Scott — Director of Golf</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-sand">admin@500-club.com · Full access</p>
            </div>
          </div>
          <p className="mt-4 border border-ivory/10 bg-ink p-3.5 text-[10px] uppercase leading-relaxed tracking-[0.15em] text-sand">
            Permissions: events · menu · tee sheet · roster · careers · inbox · settings
          </p>
        </ACard>

        <ACard title="Danger Zone" sub="Handle like a downhill putt">
          <button onClick={resetAll}
            className="flex w-full cursor-pointer items-center justify-center gap-2 border border-crimson/50 py-3.5 text-[10px] font-bold uppercase tracking-[0.22em] text-crimson transition-colors hover:bg-crimson/10">
            <RotateCcw size={13} /> Reset All Demo Data
          </button>
          <p className="mt-3 text-center text-[10px] leading-relaxed text-sand/60">
            Restores every panel — events, menu, tee sheet, members, jobs, inbox — to factory settings.
          </p>
        </ACard>
      </div>
    </div>
  );
}
