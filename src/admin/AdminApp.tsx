import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, CalendarDays, Flag, UtensilsCrossed, Users, Briefcase, Inbox, Settings2,
  LogOut, ExternalLink, CheckCircle2, Menu, BarChart3, CreditCard, ShieldCheck, Puzzle,
} from 'lucide-react';
import { AdminProvider, useAdmin } from './store';
import AdminLogin from './Login';
import { DashboardPanel, EventsPanel, TeePanel, MenuPanel } from './panels';
import { MembersPanel, JobsPanel, InboxPanel, SettingsPanel } from './panels2';
import { AnalyticsPanel, BillingPanel, TeamPanel, IntegrationsPanel } from './panels3';
import { EASE } from '../components/ui';

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'tee', label: 'Tee Sheet', icon: Flag },
  { id: 'menu', label: 'Menu', icon: UtensilsCrossed },
  { id: 'members', label: 'Members', icon: Users },
  { id: 'jobs', label: 'Careers', icon: Briefcase },
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'billing', label: 'Billing & Plan', icon: CreditCard },
  { id: 'team', label: 'Team & Roles', icon: ShieldCheck },
  { id: 'integrations', label: 'Integrations', icon: Puzzle },
  { id: 'settings', label: 'Settings', icon: Settings2 },
] as const;
type PanelId = (typeof NAV)[number]['id'];

function Toasts() {
  const { toasts } = useAdmin();
  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[180] flex w-72 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id} layout initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 60 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex items-center gap-3 border border-gold/40 bg-coal px-4 py-3 shadow-2xl">
            <span className="checkers h-full max-h-8 w-1.5 self-stretch" style={{ minHeight: 28 }} />
            <p className="flex-1 text-[11px] font-bold uppercase tracking-[0.12em] text-ivory/90">{t.msg}</p>
            <CheckCircle2 size={14} className="shrink-0 text-gold" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Shell({ onExit, onLogout }: { onExit: () => void; onLogout: () => void }) {
  const [panel, setPanel] = useState<PanelId>('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const { msgs } = useAdmin();
  const unread = msgs.filter((m) => m.unread).length;
  const current = NAV.find((n) => n.id === panel)!;

  const panels: Record<PanelId, React.ReactNode> = {
    dashboard: <DashboardPanel goPanel={(p) => setPanel(p as PanelId)} />,
    events: <EventsPanel />,
    tee: <TeePanel />,
    menu: <MenuPanel />,
    members: <MembersPanel />,
    jobs: <JobsPanel />,
    inbox: <InboxPanel />,
    analytics: <AnalyticsPanel />,
    billing: <BillingPanel />,
    team: <TeamPanel />,
    integrations: <IntegrationsPanel />,
    settings: <SettingsPanel />,
  };

  const NavButtons = ({ vertical }: { vertical: boolean }) => (
    <>
      {NAV.map((n, i) => (
        <motion.button key={n.id}
          initial={{ opacity: 0, x: vertical ? -16 : 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04, duration: 0.5, ease: EASE }}
          onClick={() => { setPanel(n.id); setNavOpen(false); }}
          className={`group relative flex shrink-0 cursor-pointer items-center gap-3 px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-300 ${vertical ? 'w-full' : ''} ${panel === n.id ? 'text-gold2' : 'text-sand/70 hover:text-ivory'}`}>
          {panel === n.id && (
            <motion.span layoutId={vertical ? 'admin-nav-v' : 'admin-nav-h'}
              className={`absolute bg-gold/[0.08] ${vertical ? 'inset-y-0 left-0 w-full border-l-2 border-gold' : 'inset-x-0 bottom-0 h-0.5'}`}
              transition={{ duration: 0.45, ease: EASE }} />
          )}
          <n.icon size={14} className={panel === n.id ? 'text-gold' : 'text-sand/50 group-hover:text-ivory'} />
          <span className="relative">{n.label}</span>
          {n.id === 'inbox' && unread > 0 && (
            <span className="relative ml-auto grid size-5 place-items-center rounded-full bg-gold font-poster text-[10px] text-ink">{unread}</span>
          )}
        </motion.button>
      ))}
    </>
  );

  return (
    <div className="min-h-screen bg-ink lg:grid lg:grid-cols-[240px_1fr]">
      {/* sidebar */}
      <aside className="hidden border-r border-ivory/10 bg-coal lg:flex lg:flex-col">
        <div className="border-b border-ivory/10 p-6">
          <div className="flex items-center gap-3">
            <span className="relative grid size-11 place-items-center">
              <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
                <circle cx="24" cy="24" r="22.5" fill="none" stroke="#C7A15C" strokeWidth="1.2" />
                <circle cx="24" cy="24" r="18.5" fill="none" stroke="rgba(199,161,92,.35)" strokeWidth="0.8" strokeDasharray="2 3" />
              </svg>
              <span className="font-poster text-sm text-gold2">500</span>
            </span>
            <div>
              <p className="font-poster text-base tracking-wide text-ivory">CLUB COMMAND</p>
              <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-sand">Admin · The 500 Club</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          <NavButtons vertical />
        </nav>
        <div className="space-y-1 border-t border-ivory/10 p-3">
          <button onClick={onExit} className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-sand/70 transition-colors hover:text-gold2">
            <ExternalLink size={14} /> View Public Site
          </button>
          <button onClick={onLogout} className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.22em] text-sand/70 transition-colors hover:text-crimson">
            <LogOut size={14} /> Sign Out
          </button>
          <div className="checkers-dark mx-2 mt-2 h-[8px] opacity-50" />
        </div>
      </aside>

      {/* main column */}
      <div className="flex min-h-screen flex-col">
        {/* topbar */}
        <header className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/90 backdrop-blur-xl">
          <div className="flex items-center gap-4 px-5 py-4 md:px-8">
            <button onClick={() => setNavOpen((v) => !v)} className="grid size-10 cursor-pointer place-items-center border border-ivory/15 text-ivory lg:hidden">
              <Menu size={16} />
            </button>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold">Club Command</p>
              <h1 className="font-display text-xl text-ivory md:text-2xl">{current.label}</h1>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button onClick={onExit} className="hidden cursor-pointer items-center gap-2 border border-ivory/15 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:border-gold/60 hover:text-gold2 md:flex">
                <ExternalLink size={12} /> View Site
              </button>
              <button onClick={onLogout} className="hidden cursor-pointer items-center gap-2 border border-ivory/15 px-4 py-2.5 text-[9px] font-bold uppercase tracking-[0.22em] text-ivory/70 transition-colors hover:border-crimson/60 hover:text-crimson md:flex">
                <LogOut size={12} /> Sign Out
              </button>
              <span className="grid size-10 place-items-center border border-gold/40 font-poster text-xs text-gold2" title="Scott — Director of Golf">SA</span>
            </div>
          </div>
          {/* mobile nav */}
          <AnimatePresence>
            {navOpen && (
              <motion.nav initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden border-t border-ivory/10 lg:hidden">
                <div className="flex flex-col p-3">
                  <NavButtons vertical />
                  <div className="mt-2 flex gap-2 border-t border-ivory/10 pt-3">
                    <button onClick={onExit} className="flex flex-1 cursor-pointer items-center justify-center gap-2 border border-ivory/15 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/70">
                      <ExternalLink size={12} /> View Site
                    </button>
                    <button onClick={onLogout} className="flex flex-1 cursor-pointer items-center justify-center gap-2 border border-ivory/15 py-3 text-[9px] font-bold uppercase tracking-[0.2em] text-crimson/80">
                      <LogOut size={12} /> Sign Out
                    </button>
                  </div>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </header>

        {/* content */}
        <main className="flex-1 p-5 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={panel} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease: EASE }}>
              {panels[panel]}
            </motion.div>
          </AnimatePresence>
          <p className="mt-10 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] text-sand/40">
            <span className="h-px w-8 bg-sand/20" /> The 500 Club · Back Office · All data is demo-only, stored in memory
          </p>
        </main>
      </div>

      <Toasts />
    </div>
  );
}

export default function AdminApp({ onExit }: { onExit: () => void }) {
  const [authed, setAuthed] = useState(false);
  return (
    <AdminProvider>
      <AnimatePresence mode="wait">
        {authed ? (
          <motion.div key="shell" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <Shell onExit={onExit} onLogout={() => setAuthed(false)} />
          </motion.div>
        ) : (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.02 }} transition={{ duration: 0.5 }}>
            <AdminLogin onUnlock={() => setAuthed(true)} onExit={onExit} />
          </motion.div>
        )}
      </AnimatePresence>
    </AdminProvider>
  );
}
