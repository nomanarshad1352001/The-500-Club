import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Wand2, ArrowLeft, ShieldCheck, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { A } from '../data';
import { EASE } from '../components/ui';

export const ADMIN_CREDS = { email: 'admin@500-club.com', pass: 'fairways500' };

function CredRow({ label, value, onCopy }: { label: string; value: string; onCopy: (v: string, t: string) => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-3 border border-ivory/12 bg-coal px-4 py-3">
      <span className="w-20 shrink-0 text-[9px] font-bold uppercase tracking-[0.25em] text-sand">{label}</span>
      <code className="flex-1 truncate font-mono text-[13px] font-semibold tracking-wide text-gold2">{value}</code>
      <button
        type="button"
        onClick={() => { onCopy(value, label); setCopied(true); setTimeout(() => setCopied(false), 1400); }}
        className="grid size-8 shrink-0 cursor-pointer place-items-center border border-ivory/15 text-sand transition-all hover:border-gold/60 hover:text-gold2"
        title={`Copy ${label}`}
      >
        {copied ? <CheckCircle2 size={13} className="text-emerald-400" /> : <Copy size={13} />}
      </button>
    </div>
  );
}

export default function AdminLogin({ onUnlock, onExit }: { onUnlock: () => void; onExit: () => void }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [filled, setFilled] = useState(false);
  const [error, setError] = useState(false);
  const [busy, setBusy] = useState(false);

  const autofill = () => {
    setEmail(ADMIN_CREDS.email);
    setPass(ADMIN_CREDS.pass);
    setFilled(true);
    setError(false);
    setTimeout(() => setFilled(false), 1800);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    if (email.trim().toLowerCase() === ADMIN_CREDS.email && pass === ADMIN_CREDS.pass) {
      setBusy(true);
      setTimeout(onUnlock, 1000);
    } else {
      setError(true);
      setTimeout(() => setError(false), 700);
    }
  };

  return (
    <div className="grid min-h-screen bg-ink lg:grid-cols-2">
      {/* left visual */}
      <div className="relative hidden overflow-hidden lg:block">
        <motion.img
          initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }}
          src={A.sunset} alt="" className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 via-ink/50 to-ink" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.9 }}>
            <span className="inline-flex items-center gap-2 border border-gold/40 bg-ink/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold2 backdrop-blur-sm">
              <ShieldCheck size={12} /> Staff Only · Command Center
            </span>
          </motion.div>
          <div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
              className="font-display text-4xl italic leading-tight text-ivory/90 lg:text-5xl">
              "Run the clubhouse<br />like a pit crew."
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.9 }}
              className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-sand">
              <span className="h-px w-8 bg-gold" /> The 500 Club · Back Office
            </motion.div>
          </div>
        </div>
        <div className="checkers absolute inset-x-0 top-0 h-[11px] checkers-slide" />
        <div className="checkers absolute inset-x-0 bottom-0 h-[11px] checkers-slide" />
      </div>

      {/* right form */}
      <div className="relative flex items-center justify-center p-6">
        <div className="checkers-dark pointer-events-none absolute inset-0 opacity-[0.05]" />
        <motion.div
          initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
          className="relative w-full max-w-md"
        >
          <motion.div animate={error ? { x: [0, -12, 12, -8, 8, 0] } : {}} transition={{ duration: 0.5 }}
            className="border border-ivory/12 bg-coal shadow-2xl">
            <div className="checkers h-[11px] w-full" />
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4">
                <span className="relative grid size-14 place-items-center">
                  <svg viewBox="0 0 48 48" className="absolute inset-0 size-full">
                    <circle cx="24" cy="24" r="22.5" fill="none" stroke="#C7A15C" strokeWidth="1.2" />
                    <circle cx="24" cy="24" r="18.5" fill="none" stroke="rgba(199,161,92,.35)" strokeWidth="0.8" strokeDasharray="2 3" />
                  </svg>
                  <span className="font-poster text-lg text-gold2">500</span>
                </span>
                <div>
                  <p className="font-poster text-xl tracking-wide text-ivory">CLUB COMMAND</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.32em] text-sand">Admin Portal — v2.6</p>
                </div>
              </div>

              <form onSubmit={submit} className="mt-9 space-y-6">
                <div>
                  <label className="field-label">Staff Email</label>
                  <div className="relative">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="off"
                      placeholder="staff@500-club.com" className="field pr-9" />
                    <User size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-sand/40" />
                  </div>
                </div>
                <div>
                  <label className="field-label">Password</label>
                  <div className="relative">
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" required
                      placeholder="••••••••••" className="field pr-9" />
                    <Lock size={14} className="absolute right-1 top-1/2 -translate-y-1/2 text-sand/40" />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="border border-crimson/40 bg-crimson/10 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-crimson">
                      Access denied — check credentials
                    </motion.p>
                  )}
                </AnimatePresence>

                <button type="button" onClick={autofill}
                  className="group relative flex w-full cursor-pointer items-center justify-center gap-2 border border-dashed border-gold/50 py-3.5 text-[10px] font-bold uppercase tracking-[0.25em] text-gold2 transition-colors hover:bg-gold/[0.07]">
                  <AnimatePresence mode="wait">
                    {filled ? (
                      <motion.span key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <ShieldCheck size={13} /> Demo credentials filled
                      </motion.span>
                    ) : (
                      <motion.span key="fill" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <Wand2 size={13} /> Autofill Demo Login
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button type="submit" disabled={busy}
                  className="group relative w-full cursor-pointer overflow-hidden bg-gold py-4 text-[11px] font-bold uppercase tracking-[0.28em] text-ink transition-colors disabled:opacity-80">
                  <span className="absolute inset-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                  <span className="relative flex items-center justify-center gap-2 group-hover:text-gold2">
                    {busy ? <><Loader2 size={14} className="animate-spin" /> Unlocking Clubhouse…</> : <>Enter the Club <Lock size={12} /></>}
                  </span>
                </button>

                {/* demo credentials vault */}
                <div className="border border-gold/30 bg-gold/[0.05] p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <ShieldCheck size={13} className="text-gold" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold2">Demo Access Vault</span>
                    <span className="ml-auto text-[8px] font-bold uppercase tracking-[0.2em] text-sand/50">Tap to copy</span>
                  </div>
                  <div className="space-y-2">
                    <CredRow label="Email" value={ADMIN_CREDS.email} onCopy={(v) => navigator.clipboard?.writeText(v).catch(() => undefined)} />
                    <CredRow label="Password" value={ADMIN_CREDS.pass} onCopy={(v) => navigator.clipboard?.writeText(v).catch(() => undefined)} />
                  </div>
                  <p className="mt-3 text-center text-[9px] uppercase leading-relaxed tracking-[0.2em] text-sand/60">
                    Sandbox build — any changes live only in this browser session
                  </p>
                </div>
              </form>
            </div>
          </motion.div>

          <button onClick={onExit}
            className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-sand/60 transition-colors hover:text-gold2">
            <ArrowLeft size={13} /> Back to public website
          </button>
        </motion.div>
      </div>
    </div>
  );
}
