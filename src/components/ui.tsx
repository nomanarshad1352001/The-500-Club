import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronDown, X } from 'lucide-react';

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ---------------- Reveal ---------------- */
export function R({ children, delay = 0, y = 32, className = '', once = true }: {
  children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-60px' }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- masked line reveal ---------------- */
export function Lines({ text, className = '', delay = 0, as: Tag = 'span' }: {
  text: string; className?: string; delay?: number; as?: 'span' | 'div';
}) {
  const lines = text.split('\n');
  const M: any = motion[Tag as 'span'];
  return (
    <>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <M
            className={`block ${className}`}
            initial={{ y: '115%', rotate: 2.5 }}
            whileInView={{ y: '0%', rotate: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1, delay: delay + i * 0.11, ease: EASE }}
          >
            {l}
          </M>
        </span>
      ))}
    </>
  );
}

/* ---------------- section tag ---------------- */
export function Tag({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <R y={14} className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-gold" />
      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.35em] text-gold">{children}</span>
    </R>
  );
}

/* ---------------- buttons ---------------- */
export function Btn({ children, onClick, variant = 'solid', className = '', small = false }: {
  children: ReactNode; onClick?: () => void; variant?: 'solid' | 'outline' | 'ghost'; className?: string; small?: boolean;
}) {
  const base = `group relative inline-flex cursor-pointer items-center gap-3 overflow-hidden font-bold uppercase tracking-[0.22em] transition-colors duration-500 ${small ? 'px-5 py-2.5 text-[10px]' : 'px-8 py-4 text-[11px]'}`;
  const styles =
    variant === 'solid'
      ? 'bg-gold text-ink hover:text-ivory'
      : variant === 'outline'
        ? 'border border-ivory/30 text-ivory hover:border-gold'
        : 'text-ivory/80 hover:text-gold';
  return (
    <motion.button whileTap={{ scale: 0.96 }} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {variant !== 'ghost' && (
        <span className="absolute inset-0 -z-0 translate-y-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
      )}
      <span className="relative z-10 flex items-center gap-3">
        {children}
        <ArrowRight size={small ? 12 : 14} className="transition-transform duration-500 group-hover:translate-x-1.5" />
      </span>
    </motion.button>
  );
}

/* ---------------- checkered strip ---------------- */
export function Checkers({ className = '', dark = false, slide = false }: { className?: string; dark?: boolean; slide?: boolean }) {
  return (
    <div
      aria-hidden
      className={`${dark ? 'checkers-dark' : 'checkers'} ${slide ? 'checkers-slide' : ''} w-full ${className}`}
      style={{ height: 11, opacity: dark ? 0.5 : 1 }}
    />
  );
}

/* ---------------- marquee ---------------- */
export function Marquee({ children, speed = 36, rev = false, className = '' }: {
  children: ReactNode; speed?: number; rev?: boolean; className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee ${rev ? 'marquee-rev' : ''} flex w-max items-center`}
        style={{ '--speed': `${speed}s` } as React.CSSProperties}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden>{children}</div>
      </div>
    </div>
  );
}

/* ---------------- page hero ---------------- */
export function PageHero({ img, kicker, title, sub, children, tall = false }: {
  img: string; kicker: string; title: string; sub?: string; children?: ReactNode; tall?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  return (
    <header ref={ref} className={`relative flex items-end overflow-hidden ${tall ? 'min-h-[88vh]' : 'min-h-[68vh] md:min-h-[74vh]'}`}>
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={img} alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-40 md:px-10 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mb-5 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-gold2">{kicker}</span>
        </motion.div>
        <h1 className="font-poster text-[17vw] leading-[0.9] tracking-tight text-ivory sm:text-7xl md:text-8xl lg:text-[7.5rem]">
          <Lines text={title} delay={0.45} />
        </h1>
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.9, ease: EASE }}
            className="mt-6 max-w-xl text-sm leading-relaxed text-ivory/70 md:text-base"
          >
            {sub}
          </motion.p>
        )}
        {children && (
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.05, ease: EASE }}
            className="mt-8 flex flex-wrap items-center gap-4">
            {children}
          </motion.div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10"><Checkers dark slide /></div>
    </header>
  );
}

/* ---------------- animated counter ---------------- */
export function Counter({ n, comma = false, suffix = '' }: { n: number; comma?: boolean; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, n, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, n]);
  return <span ref={ref}>{comma ? val.toLocaleString() : val}{suffix}</span>;
}

/* ---------------- hover image frame ---------------- */
export function Frame({ src, alt = '', ratio = 'aspect-[4/3]', className = '', zoom = true, children }: {
  src: string; alt?: string; ratio?: string; className?: string; zoom?: boolean; children?: ReactNode;
}) {
  return (
    <div className={`group relative overflow-hidden ${ratio} ${className}`}>
      <img
        src={src} alt={alt} loading="lazy"
        className={`h-full w-full object-cover ${zoom ? 'transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110' : ''}`}
      />
      {children}
    </div>
  );
}

/* ---------------- accordion ---------------- */
export function Accordion({ items, numbered = true }: { items: { title: string; items?: string[]; body?: ReactNode }[]; numbered?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-ivory/10 border-y border-ivory/10">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
            >
              {numbered && <span className="font-poster text-sm text-gold/70">{String(i + 1).padStart(2, '0')}</span>}
              <span className={`flex-1 font-display text-lg transition-colors md:text-2xl ${isOpen ? 'text-gold2 italic' : 'text-ivory group-hover:text-gold2'}`}>
                {it.title}
              </span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}
                className={`grid size-9 shrink-0 place-items-center rounded-full border transition-colors ${isOpen ? 'border-gold text-gold' : 'border-ivory/20 text-ivory/60 group-hover:border-gold/60'}`}>
                <ChevronDown size={15} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className={`pb-7 ${numbered ? 'pl-9 md:pl-12' : ''} max-w-3xl`}>
                    {it.items ? (
                      <ul className="space-y-3">
                        {it.items.map((li, j) => (
                          <li key={j} className="flex gap-3 text-sm leading-relaxed text-sand">
                            <span className="mt-[7px] size-1 shrink-0 rotate-45 bg-gold" />
                            {li}
                          </li>
                        ))}
                      </ul>
                    ) : it.body}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- modal ---------------- */
export function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[120] grid place-items-center bg-ink/80 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}
            className="relative w-full max-w-md border border-ivory/15 bg-coal p-8 shadow-2xl md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <Checkers className="absolute left-0 right-0 top-0 opacity-90" />
            <button onClick={onClose} className="absolute right-4 top-5 text-ivory/50 transition-colors hover:text-gold">
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- link with arrow ---------------- */
export function ArrowLink({ children, onClick, className = '' }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button onClick={onClick} className={`group inline-flex cursor-pointer items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold2 ${className}`}>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-gold/60 transition-transform duration-500 group-hover:scale-x-0" />
        <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 delay-100 group-hover:scale-x-100" />
      </span>
      <ArrowUpRight size={13} className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </button>
  );
}

/* ---------------- success check ---------------- */
export function SuccessMark({ show }: { show: boolean }) {
  return (
    <motion.svg viewBox="0 0 52 52" className="size-16">
      <motion.circle cx="26" cy="26" r="23" fill="none" stroke="#C7A15C" strokeWidth="1.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 0.9, ease: EASE }} />
      <motion.path fill="none" stroke="#E9CF9B" strokeWidth="2.5" strokeLinecap="round" d="M15 27l7.5 7L37 19"
        initial={{ pathLength: 0 }} animate={{ pathLength: show ? 1 : 0 }} transition={{ duration: 0.6, delay: 0.6, ease: EASE }} />
    </motion.svg>
  );
}
