import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, TrendingDown, MousePointerClick, MailOpen, BadgeCheck, Download, CreditCard,
  Trash2, Copy, CheckCircle2, KeyRound, Webhook, Plug, Crown, ShieldCheck, Eye, EyeOff,
  CircleDot, Send,
} from 'lucide-react';
import { useAdmin } from './store';
import { AButton, ACard, AField, ASelect, Pill } from './panels';
import { EASE, Counter } from '../components/ui';

/* ==================== ANALYTICS (SaaS) ==================== */

const REV = [38, 42, 47, 44, 52, 58, 54, 61, 66, 72, 79, 86.4];
const MONTHS = ['O', 'N', 'D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S'];

export function AnalyticsPanel() {
  const { toast } = useAdmin();
  const { path, area, pts } = useMemo(() => {
    const W = 620, H = 210, P = 14;
    const max = Math.max(...REV), min = Math.min(...REV) - 8;
    const xs = (i: number) => P + (i / (REV.length - 1)) * (W - 2 * P);
    const ys = (v: number) => H - P - ((v - min) / (max - min)) * (H - 2 * P);
    const points = REV.map((v, i) => [xs(i), ys(v)] as const);
    const p = `M ${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')}`;
    const a = `${p} L ${xs(REV.length - 1)} ${H - P} L ${xs(0)} ${H - P} Z`;
    return { path: p, area: a, pts: points };
  }, []);

  const donut = [
    { l: 'Tee Times', v: 46, c: '#C7A15C' }, { l: 'Food & Beverage', v: 34, c: '#7FA98A' },
    { l: 'Events & Outings', v: 12, c: '#9A8FD8' }, { l: 'Pro Shop', v: 8, c: '#6FA8C9' },
  ];
  const R = 52, CIRC = 2 * Math.PI * R;
  let acc = 0;

  const topItems = [
    { n: 'Bang Bang Shrimp', v: 412 }, { n: '12 Wings — Buffalo', v: 366 }, { n: 'Frozen Creamsicle', v: 338 },
    { n: '500 Margarita', v: 290 }, { n: 'Hot Honey Pimento Chicken', v: 241 },
  ];
  const funnel = [
    { l: 'Site visits', v: '12.4K', p: 100 }, { l: 'Tee sheet views', v: '4.1K', p: 66 },
    { l: 'Bookings started', v: '1.9K', p: 44 }, { l: 'Bookings confirmed', v: '1.2K', p: 29 },
  ];

  return (
    <div className="space-y-5">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {[
          { l: 'Monthly Revenue', v: 86.4, pre: '$', suf: 'K', d: '+12.4% vs Aug', up: true },
          { l: 'Online Bookings', v: 1240, d: '+8.1% vs Aug', up: true },
          { l: 'Email Open Rate', v: 68, suf: '%', d: '+3.2 pts', up: true },
          { l: 'Member Churn', v: 1.8, suf: '%', d: '-0.4 pts', up: false },
        ].map((k, i) => (
          <motion.div key={k.l} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.5, ease: EASE }}
            className="border border-ivory/10 bg-coal p-5">
            <p className="font-poster text-3xl text-ivory md:text-4xl">{k.pre}<Counter n={Math.round(k.v * 10) / 10} />{k.suf}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sand">{k.l}</p>
            <p className={`mt-1.5 flex items-center gap-1 text-[10px] font-semibold ${k.up ? 'text-emerald-400' : 'text-gold2'}`}>
              {k.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />} {k.d}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        {/* revenue chart */}
        <ACard title="Revenue — Trailing 12 Months" sub="All revenue streams · $ thousands"
          action={<AButton small variant="ghost" onClick={() => toast('Report emailed to admin@500-club.com')}><Download size={11} /> Export</AButton>}>
          <div className="relative">
            <svg viewBox="0 0 620 210" className="w-full">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C7A15C" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C7A15C" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.33, 0.66].map((f) => (
                <line key={f} x1="14" x2="606" y1={210 * f} y2={210 * f} stroke="rgba(241,234,217,.07)" strokeDasharray="3 5" />
              ))}
              <motion.path d={area} fill="url(#revGrad)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1.2 }} />
              <motion.path d={path} fill="none" stroke="#C7A15C" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
              {pts.map(([x, y], i) => (
                <motion.circle key={i} cx={x} cy={y} r="3.5" fill="#0B0A07" stroke="#E9CF9B" strokeWidth="1.5"
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.35 }} />
              ))}
            </svg>
            <div className="flex justify-between px-3 text-[9px] font-bold uppercase tracking-widest text-sand/50">
              {MONTHS.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
        </ACard>

        {/* revenue by channel donut */}
        <ACard title="Revenue by Channel" sub="September split">
          <div className="flex items-center gap-6">
            <div className="relative grid size-40 shrink-0 place-items-center">
              <svg viewBox="0 0 120 120" className="absolute inset-0 size-full -rotate-90">
                {donut.map((d, i) => {
                  const start = acc; acc += d.v;
                  return (
                    <motion.circle key={d.l} cx="60" cy="60" r={R} fill="none" stroke={d.c} strokeWidth="10"
                      strokeDasharray={`${(d.v / 100) * CIRC} ${CIRC}`} strokeDashoffset={-((start / 100) * CIRC)}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.15, duration: 0.8 }} />
                  );
                })}
              </svg>
              <div className="text-center">
                <p className="font-poster text-2xl text-ivory">$86.4K</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-sand">Sept</p>
              </div>
            </div>
            <ul className="flex-1 space-y-3">
              {donut.map((d) => (
                <li key={d.l} className="flex items-center gap-2.5 text-xs">
                  <span className="size-2.5 rounded-sm" style={{ background: d.c }} />
                  <span className="text-ivory/80">{d.l}</span>
                  <span className="ml-auto font-poster text-sm text-gold2">{d.v}%</span>
                </li>
              ))}
            </ul>
          </div>
        </ACard>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* top sellers */}
        <ACard title="Top Sellers — Victory Lane" sub="Units moved in September">
          <div className="space-y-3.5">
            {topItems.map((t, i) => (
              <div key={t.n}>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ivory/85">{t.n}</span>
                  <span className="font-poster text-sm text-gold2">{t.v}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full bg-ivory/[0.07]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${(t.v / topItems[0].v) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: EASE }}
                    className="h-full bg-gradient-to-r from-gold/60 to-gold" />
                </div>
              </div>
            ))}
          </div>
        </ACard>

        {/* booking funnel */}
        <ACard title="Booking Funnel" sub="Website → confirmed tee times · 30 days">
          <div className="space-y-3.5">
            {funnel.map((f, i) => (
              <div key={f.l}>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-ivory/85"><MousePointerClick size={11} className="text-gold" /> {f.l}</span>
                  <span className="text-sand">{f.v} · <span className="font-poster text-gold2">{f.p}%</span></span>
                </div>
                <div className="mt-1.5 h-6 w-full bg-ivory/[0.05]">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${f.p}%` }} transition={{ delay: 0.3 + i * 0.12, duration: 0.9, ease: EASE }}
                    className="flex h-full items-center justify-end bg-gradient-to-r from-moss to-gold/80 pr-2">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-ink/70">▼</span>
                  </motion.div>
                </div>
              </div>
            ))}
            <p className="pt-1 text-[10px] uppercase tracking-[0.18em] text-sand/60">
              <MailOpen size={10} className="mr-1.5 inline text-gold" /> Abandoned-cart emails recover 18% of started bookings
            </p>
          </div>
        </ACard>
      </div>
    </div>
  );
}

/* ==================== PLAN & BILLING (SaaS) ==================== */

export function BillingPanel() {
  const { toast } = useAdmin();
  const usage = [
    { l: 'Events published', v: 38, max: 50 }, { l: 'Marketing emails sent', v: 8400, max: 10000, fmt: true },
    { l: 'Storage', v: 61, max: 100, pct: true, display: '12.2 GB / 20 GB' }, { l: 'SMS credits', v: 240, max: 500 },
  ];
  const plans = [
    { name: 'Starter', price: 99, feats: ['10 events / month', '1 staff seat', 'Basic tee sheet', 'Email support'], active: false },
    { name: 'Clubhouse Pro', price: 299, feats: ['50 events / month', '8 staff seats', 'Full POS + menu manager', 'Analytics suite', 'Priority support'], active: true },
    { name: 'Enterprise', price: 599, feats: ['Unlimited everything', 'Multi-course groups', 'White-label site', 'API + webhooks', 'Dedicated CSM'], active: false },
  ];
  const invoices = [
    ['INV-2026-009', 'Sep 2026 — Clubhouse Pro', '$299.00', 'Paid'], ['INV-2026-008', 'Aug 2026 — Clubhouse Pro', '$299.00', 'Paid'],
    ['INV-2026-007', 'Jul 2026 — Clubhouse Pro', '$299.00', 'Paid'], ['INV-2026-006', 'Jun 2026 — Clubhouse Pro + SMS pack', '$324.00', 'Paid'],
    ['INV-2026-005', 'May 2026 — Clubhouse Pro', '$299.00', 'Paid'], ['INV-2026-004', 'Apr 2026 — Starter → Pro upgrade', '$271.00', 'Paid'],
  ];

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
        {/* current plan */}
        <ACard title="Current Plan — Clubhouse Pro" sub="Billed monthly · renews Nov 1, 2026"
          action={<Pill color="#C7A15C">Active Subscription</Pill>}>
          <div className="flex flex-wrap items-end gap-6">
            <p className="font-poster text-6xl text-ivory">$299<span className="text-xl text-sand">/mo</span></p>
            <p className="max-w-sm pb-2 text-xs leading-relaxed text-sand">
              Everything in Starter, plus the full POS-connected menu manager, analytics suite, inbox automation and priority support with a 4-hour response SLA.
            </p>
          </div>
          <div className="mt-7 space-y-4">
            {usage.map((u, i) => {
              const p = Math.round((u.v / u.max) * 100);
              const warn = p > 80;
              return (
                <div key={u.l}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-ivory/85">{u.l}</span>
                    <span className={warn ? 'font-bold text-crimson' : 'text-sand'}>
                      {u.display ?? `${u.fmt ? u.v.toLocaleString() : u.v}${u.pct ? '%' : ''} / ${u.fmt ? u.max.toLocaleString() : u.max}${u.pct ? '%' : ''}`}
                    </span>
                  </div>
                  <div className="mt-1.5 h-2 w-full bg-ivory/[0.07]">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(p, 100)}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: EASE }}
                      className={`h-full ${warn ? 'bg-crimson' : 'bg-gradient-to-r from-gold/60 to-gold'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </ACard>

        {/* payment method */}
        <ACard title="Payment Method" sub="Auto-billing on the 1st">
          <div className="border border-gold/30 bg-gradient-to-br from-soot via-coal to-ink p-6">
            <div className="flex items-center justify-between">
              <CreditCard size={22} className="text-gold2" />
              <span className="checkers h-2 w-14 opacity-80" />
            </div>
            <p className="mt-8 font-poster text-2xl tracking-[0.2em] text-ivory">•••• •••• •••• 4415</p>
            <div className="mt-5 flex items-end justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-sand">
              <span>The 500 Club LLC<br /><span className="text-ivory/80">Scott A. — Cardholder</span></span>
              <span>EXP<br /><span className="font-poster text-base tracking-widest text-gold2">09/28</span></span>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <AButton small variant="ghost" onClick={() => toast('Card update link sent to billing contact')}>Update Card</AButton>
            <AButton small variant="ghost" onClick={() => toast('Billing history exported as CSV')}><Download size={11} /> History</AButton>
          </div>
        </ACard>
      </div>

      {/* plans */}
      <div className="grid gap-4 xl:grid-cols-3">
        {plans.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
            className={`relative border p-6 ${p.active ? 'border-gold/60 bg-gold/[0.05]' : 'border-ivory/10 bg-coal'}`}>
            {p.active && <span className="absolute -top-3 left-6 bg-gold px-3 py-1 text-[8px] font-bold uppercase tracking-[0.25em] text-ink">Current Plan</span>}
            <p className="font-display text-xl text-ivory">{p.name}</p>
            <p className="mt-2 font-poster text-4xl text-gold2">${p.price}<span className="text-sm text-sand">/mo</span></p>
            <ul className="mt-5 space-y-2">
              {p.feats.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-xs text-sand">
                  <BadgeCheck size={12} className="shrink-0 text-gold" /> {f}
                </li>
              ))}
            </ul>
            <AButton small variant={p.active ? 'ghost' : 'gold'} className="mt-6 w-full"
              onClick={() => toast(p.active ? 'You are already on this plan' : `Plan change to ${p.name} scheduled for next cycle`)}>
              {p.active ? 'Current Plan' : p.price > 299 ? 'Upgrade' : 'Downgrade'}
            </AButton>
          </motion.div>
        ))}
      </div>

      {/* invoices */}
      <ACard title="Invoices" sub="Last 6 billing cycles">
        <div className="divide-y divide-ivory/[0.07]">
          {invoices.map(([id, d, amt, st]) => (
            <div key={id} className="group flex flex-wrap items-center gap-4 py-3.5">
              <span className="font-poster text-sm tracking-wide text-gold2">{id}</span>
              <span className="flex-1 text-sm text-ivory/85">{d}</span>
              <span className="font-poster text-base text-ivory">{amt}</span>
              <Pill color="#7FA98A">{st}</Pill>
              <button onClick={() => toast(`${id} downloaded as PDF`)}
                className="cursor-pointer p-2 text-sand/40 transition-colors hover:text-gold2 group-hover:text-sand">
                <Download size={14} />
              </button>
            </div>
          ))}
        </div>
      </ACard>
    </div>
  );
}

/* ==================== TEAM & ROLES (SaaS) ==================== */

interface StaffMember { id: number; name: string; email: string; role: 'Owner' | 'Manager' | 'Staff' | 'Viewer'; last: string; active: boolean }

const ROLE_COLORS = { Owner: '#C7A15C', Manager: '#9A8FD8', Staff: '#7FA98A', Viewer: '#8d8574' } as const;
const PERMS_FEATURES = ['Events', 'Menu', 'Tee Sheet', 'Members', 'Inbox', 'Analytics', 'Billing'];

export function TeamPanel() {
  const { toast } = useAdmin();
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: 'Scott Allely', email: 'scott@500-club.com', role: 'Owner', last: 'Online now', active: true },
    { id: 2, name: 'Johanna Banks', email: 'johanna@500-club.com', role: 'Manager', last: '12 min ago', active: true },
    { id: 3, name: 'Luke Newman', email: 'luke@500-club.com', role: 'Staff', last: '1 hr ago', active: true },
    { id: 4, name: 'Marisol Vega', email: 'chef@500-club.com', role: 'Staff', last: '3 hrs ago', active: true },
    { id: 5, name: 'Dana Whitfield', email: 'events@500-club.com', role: 'Manager', last: 'Yesterday', active: true },
    { id: 6, name: 'Kyle Tabor', email: 'grounds@500-club.com', role: 'Viewer', last: 'Sep 14', active: false },
  ]);
  const [perms, setPerms] = useState<Record<'Manager' | 'Staff', Set<string>>>({
    Manager: new Set(PERMS_FEATURES),
    Staff: new Set(['Events', 'Menu', 'Tee Sheet', 'Inbox']),
  });
  const [invite, setInvite] = useState({ email: '', role: 'Staff' as StaffMember['role'] });

  const togglePerm = (role: 'Manager' | 'Staff', f: string) =>
    setPerms((p) => { const s = new Set(p[role]); s.has(f) ? s.delete(f) : s.add(f); return { ...p, [role]: s }; });

  return (
    <div className="space-y-5">
      <ACard title="Invite a Teammate" sub="Seat-based access · 3 of 8 seats used on Clubhouse Pro">
        <div className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
          <AField label="Work email" placeholder="new.gm@500-club.com" value={invite.email} onChange={(e) => setInvite({ ...invite, email: e.target.value })} />
          <ASelect label="Role" value={invite.role} onChange={(v) => setInvite({ ...invite, role: v as StaffMember['role'] })} options={['Manager', 'Staff', 'Viewer']} />
          <div className="flex items-end">
            <AButton onClick={() => {
              if (invite.email.includes('@')) {
                setStaff((s) => [{ id: Date.now(), name: invite.email.split('@')[0].replace(/[._]/g, ' '), email: invite.email, role: invite.role, last: 'Invite sent', active: true }, ...s]);
                setInvite({ email: '', role: 'Staff' });
                toast('Invitation email sent with magic sign-in link');
              }
            }}>
              <Send size={12} /> Send Invite
            </AButton>
          </div>
        </div>
      </ACard>

      <ACard title={`Staff Directory — ${staff.length}`} sub="Tap a row to suspend or reinstate">
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {staff.map((s) => (
              <motion.div key={s.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 30 }}
                className={`flex flex-wrap items-center gap-4 border p-4 transition-colors ${s.active ? 'border-ivory/10 bg-ink' : 'border-ivory/[0.06] bg-ink opacity-50'}`}>
                <span className="grid size-11 shrink-0 place-items-center border font-poster text-sm"
                  style={{ borderColor: `${ROLE_COLORS[s.role]}55`, color: ROLE_COLORS[s.role] }}>
                  {s.name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()}
                </span>
                <div className="min-w-40 flex-1">
                  <p className="flex items-center gap-2 text-sm font-semibold text-ivory/90">{s.name}
                    {s.role === 'Owner' && <Crown size={12} className="text-gold" />}
                  </p>
                  <p className="text-[10px] text-sand/60">{s.email}</p>
                </div>
                <Pill color={ROLE_COLORS[s.role]}>{s.role}</Pill>
                <span className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] ${s.last === 'Online now' ? 'text-emerald-400' : 'text-sand/50'}`}>
                  <CircleDot size={10} /> {s.last}
                </span>
                <div className="ml-auto flex gap-1.5">
                  {s.role !== 'Owner' && (
                    <>
                      <button onClick={() => { setStaff((v) => v.map((x) => x.id === s.id ? { ...x, active: !x.active } : x)); toast(s.active ? `${s.name} suspended` : `${s.name} reinstated`); }}
                        className="cursor-pointer border border-ivory/15 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-sand transition-colors hover:border-gold/50 hover:text-gold2">
                        {s.active ? 'Suspend' : 'Reinstate'}
                      </button>
                      <button onClick={() => { setStaff((v) => v.filter((x) => x.id !== s.id)); toast(`${s.name} removed from team`); }}
                        className="cursor-pointer p-2 text-sand/30 transition-colors hover:text-crimson"><Trash2 size={13} /></button>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ACard>

      <ACard title="Permission Matrix" sub="What each role can touch — Owner has everything, always">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-ivory/10 text-[9px] font-bold uppercase tracking-[0.22em] text-sand/60">
                <th className="pb-3 text-left">Feature</th>
                <th className="pb-3 text-center"><span className="flex items-center justify-center gap-1 text-gold"><Crown size={10} /> Owner</span></th>
                <th className="pb-3 text-center text-[#9A8FD8]">Manager</th>
                <th className="pb-3 text-center text-[#7FA98A]">Staff</th>
                <th className="pb-3 text-center">Viewer</th>
              </tr>
            </thead>
            <tbody>
              {PERMS_FEATURES.map((f) => (
                <tr key={f} className="border-b border-ivory/[0.06]">
                  <td className="py-3 text-sm font-semibold text-ivory/85">{f}</td>
                  <td className="py-3 text-center"><ShieldCheck size={15} className="mx-auto text-gold" /></td>
                  {(['Manager', 'Staff'] as const).map((r) => (
                    <td key={r} className="py-3 text-center">
                      <button onClick={() => { togglePerm(r, f); toast(`${r} · ${f} permission ${perms[r].has(f) ? 'revoked' : 'granted'}`); }}
                        className={`mx-auto grid size-7 cursor-pointer place-items-center border transition-all ${perms[r].has(f) ? 'border-gold/60 bg-gold/15 text-gold2' : 'border-ivory/10 text-ivory/15 hover:border-ivory/30'}`}>
                        <CheckCircle2 size={14} className={perms[r].has(f) ? '' : 'opacity-0'} />
                      </button>
                    </td>
                  ))}
                  <td className="py-3 text-center"><Eye size={14} className="mx-auto text-sand/40" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ACard>
    </div>
  );
}

/* ==================== INTEGRATIONS & API (SaaS) ==================== */

interface Integration { id: string; name: string; what: string; connected: boolean; sync: string; icon: string }

export function IntegrationsPanel() {
  const { toast } = useAdmin();
  const [apps, setApps] = useState<Integration[]>([
    { id: 'stripe', name: 'Stripe', what: 'Payments & subscriptions for tee times and F&B', connected: true, sync: 'Synced 4 min ago', icon: 'S' },
    { id: 'foreup', name: 'ForeUp Tee Sheet', what: 'Two-way tee time sync with the public booking engine', connected: true, sync: 'Synced 2 min ago', icon: 'F' },
    { id: 'toast', name: 'Toast POS', what: 'Kitchen display + menu push from the Menu Manager', connected: false, sync: 'Never connected', icon: 'T' },
    { id: 'mailchimp', name: 'Mailchimp', what: 'Member lists → Back Nine Bulletin campaigns', connected: true, sync: 'Synced 1 hr ago', icon: 'M' },
    { id: 'twilio', name: 'Twilio', what: 'SMS tee-time reminders and waitlist alerts', connected: false, sync: 'Never connected', icon: 'T' },
    { id: 'instagram', name: 'Instagram', what: 'Auto-pull @500clubnc feed into the site gallery', connected: true, sync: 'Synced 26 min ago', icon: 'I' },
  ]);
  const [keys, setKeys] = useState<{ id: number; label: string; key: string; created: string; live: boolean }[]>([
    { id: 1, label: 'Website booking widget', key: 'sk_live_500_9f2eA7dKp3Qz8LmR', created: 'Mar 2026', live: true },
    { id: 2, label: 'Scoreboard display (500 Room)', key: 'sk_live_500_Xt41vBn9YcW2sFh6', created: 'Jun 2026', live: true },
    { id: 3, label: 'Old league portal', key: 'sk_live_500_rT7mQe0pLz5KaXw1', created: 'Jan 2026', live: false },
  ]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, tag: string) => {
    navigator.clipboard?.writeText(text).catch(() => undefined);
    setCopied(tag);
    toast('Copied to clipboard');
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-5">
      <ACard title="Connected Apps" sub="The clubhouse tech stack — tap to connect or disconnect">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {apps.map((a) => (
            <motion.div key={a.id} layout
              className={`border p-5 transition-colors ${a.connected ? 'border-ivory/10 bg-ink' : 'border-dashed border-ivory/15 bg-ink/60'}`}>
              <div className="flex items-center gap-3">
                <span className={`grid size-11 place-items-center border font-poster text-lg ${a.connected ? 'border-gold/40 text-gold2' : 'border-ivory/15 text-sand/50'}`}>
                  {a.icon}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-ivory">{a.name}</p>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-sand/60">{a.sync}</p>
                </div>
                <Pill color={a.connected ? '#7FA98A' : '#8d8574'}>{a.connected ? 'Connected' : 'Not linked'}</Pill>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-sand">{a.what}</p>
              <button
                onClick={() => {
                  setApps((v) => v.map((x) => x.id === a.id ? { ...x, connected: !x.connected, sync: x.connected ? 'Disconnected just now' : 'Synced just now' } : x));
                  toast(a.connected ? `${a.name} disconnected` : `${a.name} connected — initial sync started`);
                }}
                className={`mt-4 flex cursor-pointer items-center gap-2 border px-3 py-2 text-[9px] font-bold uppercase tracking-[0.18em] transition-all ${a.connected ? 'border-crimson/40 text-crimson hover:bg-crimson/10' : 'border-gold/50 text-gold2 hover:bg-gold/[0.08]'}`}>
                <Plug size={11} /> {a.connected ? 'Disconnect' : 'Connect'}
              </button>
            </motion.div>
          ))}
        </div>
      </ACard>

      <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        {/* API keys */}
        <ACard title="API Keys" sub="Programmatic access to Club Command — keep these secret"
          action={
            <AButton small onClick={() => {
              const k = 'sk_live_500_' + Math.random().toString(36).slice(2, 18);
              setKeys((v) => [{ id: Date.now(), label: 'New key', key: k, created: 'Just now', live: true }, ...v]);
              setRevealed((r) => new Set([...r, Date.now()]));
              toast('New live API key generated');
            }}>
              <KeyRound size={12} /> Generate Key
            </AButton>
          }>
          <div className="space-y-3">
            <AnimatePresence initial={false}>
              {keys.map((k) => (
                <motion.div key={k.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: 30 }}
                  className={`flex flex-wrap items-center gap-3 border px-4 py-3 ${k.live ? 'border-ivory/10 bg-ink' : 'border-ivory/[0.06] bg-ink/60 opacity-60'}`}>
                  <div className="min-w-44">
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-ivory/85">{k.label}</p>
                    <p className="text-[9px] uppercase tracking-[0.15em] text-sand/50">Created {k.created} · {k.live ? 'Live' : 'Revoked'}</p>
                  </div>
                  <code className="flex-1 truncate border border-ivory/10 bg-coal px-3 py-1.5 font-mono text-[11px] text-gold2/90">
                    {revealed.has(k.id) ? k.key : k.key.slice(0, 12) + '•••••••••••••'}
                  </code>
                  <button onClick={() => setRevealed((r) => { const n = new Set(r); n.has(k.id) ? n.delete(k.id) : n.add(k.id); return n; })}
                    className="cursor-pointer p-2 text-sand/50 transition-colors hover:text-gold2" title="Reveal">
                    {revealed.has(k.id) ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => copy(k.key, k.key)} className="cursor-pointer p-2 text-sand/50 transition-colors hover:text-gold2" title="Copy">
                    {copied === k.key ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                  {k.live && (
                    <button onClick={() => { setKeys((v) => v.map((x) => x.id === k.id ? { ...x, live: false } : x)); toast('API key revoked'); }}
                      className="cursor-pointer border border-crimson/40 px-2.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.15em] text-crimson transition-colors hover:bg-crimson/10">
                      Revoke
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ACard>

        {/* webhooks */}
        <ACard title="Webhooks" sub="Push events to your own systems">
          <label className="block">
            <span className="mb-1.5 block text-[9px] font-bold uppercase tracking-[0.25em] text-sand/80">Endpoint URL</span>
            <div className="flex">
              <input readOnly value="https://hooks.500-club.com/v1/listen"
                className="w-full border border-ivory/12 bg-ink px-3 py-2.5 font-mono text-[11px] text-ivory outline-none" />
              <button onClick={() => copy('https://hooks.500-club.com/v1/listen', 'wh')}
                className="cursor-pointer border border-l-0 border-ivory/12 px-3 text-sand transition-colors hover:text-gold2">
                {copied === 'wh' ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
              </button>
            </div>
          </label>
          <p className="mb-1.5 mt-5 block text-[9px] font-bold uppercase tracking-[0.25em] text-sand/80">Subscribed events</p>
          <div className="flex flex-wrap gap-1.5">
            {['booking.created', 'booking.cancelled', 'member.joined', 'event.published', 'order.86d', 'invoice.paid'].map((e) => (
              <span key={e} className="border border-ivory/12 bg-ink px-2.5 py-1.5 font-mono text-[10px] text-ivory/75">{e}</span>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <AButton small variant="ghost" onClick={() => toast('Test payload sent — 200 OK in 84ms')}><Webhook size={11} /> Send Test</AButton>
            <AButton small variant="ghost" onClick={() => toast('Delivery log opened — 48h retention')}>Delivery Log</AButton>
          </div>
        </ACard>
      </div>
    </div>
  );
}
