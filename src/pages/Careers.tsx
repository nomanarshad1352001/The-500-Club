import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BadgeCheck, ChevronDown, Clock3, MapPin, Sparkles, UploadCloud, Wallet } from 'lucide-react';
import { A, CONTACT_DEPTS, JOB_PERKS, JOBS, type Go, type Job } from '../data';
import { Btn, EASE, Frame, Lines, Modal, PageHero, R, SuccessMark, Tag, Checkers } from '../components/ui';

function ApplyModal({ job, onClose }: { job: Job | null; onClose: () => void }) {
  const [sent, setSent] = useState(false);
  return (
    <Modal open={!!job} onClose={onClose}>
      {job && (
        <div className="pt-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">Apply — {job.type}</p>
          <h3 className="mt-3 font-display text-2xl text-ivory">{job.title}</h3>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-sand">{job.dept} · {job.pay}</p>
          {sent ? (
            <div className="mt-8 flex flex-col items-center gap-4 pb-2 text-center">
              <SuccessMark show />
              <p className="font-display text-xl text-ivory">Application received.</p>
              <p className="text-sm text-sand">Our team reviews every application by hand — expect a call within a week. Meanwhile, come say hi at the Turn Bar.</p>
            </div>
          ) : (
            <form className="mt-7 space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid grid-cols-2 gap-5">
                <div><label className="field-label">First Name *</label><input required className="field" placeholder="Jordan" /></div>
                <div><label className="field-label">Last Name *</label><input required className="field" placeholder="Spieth" /></div>
              </div>
              <div><label className="field-label">Email *</label><input required type="email" className="field" placeholder="you@email.com" /></div>
              <div><label className="field-label">Cell Phone</label><input className="field" placeholder="(___) ___-____" /></div>
              <div>
                <label className="field-label">Resume / Why you?</label>
                <div className="mt-1 cursor-pointer border border-dashed border-ivory/25 p-5 text-center transition-colors hover:border-gold/60">
                  <UploadCloud size={18} className="mx-auto text-gold" />
                  <p className="mt-2 text-xs text-sand">Drop a PDF, or tell us in three sentences why you're the one.</p>
                  <textarea rows={2} className="field mt-3 resize-none text-left" placeholder="I once made 300 smash burgers before noon and lived to tell about it…" />
                </div>
              </div>
              <Btn className="w-full justify-center">Submit Application</Btn>
            </form>
          )}
        </div>
      )}
    </Modal>
  );
}

export default function Careers({ go }: { go: Go }) {
  const [open, setOpen] = useState<string | null>(JOBS[0].id);
  const [applying, setApplying] = useState<Job | null>(null);
  const careersDept = CONTACT_DEPTS.find((d) => d.name === 'Careers')!;

  return (
    <>
      <PageHero
        img={A.golfersRelax} kicker="Careers at The 500 Club" title={'WORK WHERE\nTHE FUN IS.'}
        sub="From the fryer line to the first tee, our crew keeps the good times running. Competitive pay, free golf, and the best view in Statesville."
      >
        <Btn onClick={() => document.getElementById('openings')?.scrollIntoView({ behavior: 'smooth' })}>See Open Roles</Btn>
        <Btn variant="outline" onClick={() => go('contact')}>Contact Hiring</Btn>
      </PageHero>

      {/* perks */}
      <section className="border-b border-ivory/10 bg-coal py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Tag>Why work here</Tag>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sand">Perks beyond the paycheck</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {JOB_PERKS.map((p, i) => (
              <R key={p} delay={(i % 4) * 0.07}>
                <motion.div whileHover={{ y: -4 }}
                  className="flex h-full items-center gap-3 border border-ivory/10 p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-ivory/[0.03]">
                  <BadgeCheck size={15} className="shrink-0 text-gold" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-ivory/80">{p}</span>
                </motion.div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* openings */}
      <section id="openings" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.7fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Tag>Open Positions</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl"><Lines text="Seven seats" /> <em className="text-gold2"><Lines text="on the crew." delay={0.1} /></em></h2>
            <R delay={0.2} className="mt-5 max-w-sm text-sm leading-relaxed text-sand">
              Tap a role for the full rundown. Don't see your lane? Send your resume anyway — great people get hired
              around here even when there's no posting.
            </R>
            <R delay={0.3} className="mt-8 border border-ivory/10 bg-coal p-6">
              <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold"><Sparkles size={13} /> Hiring desk</p>
              <p className="mt-3 text-sm text-sand">{careersDept.who}</p>
              <p className="mt-1 text-sm font-semibold text-ivory/85">{careersDept.phone}</p>
              <p className="text-sm font-semibold text-gold2">{careersDept.email}</p>
            </R>
            <R delay={0.38} className="mt-6"><Frame src={A.familyCart} ratio="aspect-video" className="border border-ivory/10" /></R>
          </div>

          <div className="divide-y divide-ivory/10 border-y border-ivory/10">
            {JOBS.map((j, i) => {
              const isOpen = open === j.id;
              return (
                <motion.div key={j.id} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }} transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3), ease: EASE }}>
                  <button onClick={() => setOpen(isOpen ? null : j.id)} className="group w-full cursor-pointer py-6 text-left md:px-4">
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                      <span className={`font-display text-xl transition-colors md:text-2xl ${isOpen ? 'italic text-gold2' : 'text-ivory group-hover:text-gold2'}`}>{j.title}</span>
                      <span className="ml-auto flex items-center gap-2">
                        <span className="border border-ivory/15 px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-sand">{j.type}</span>
                        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.4, ease: EASE }}
                          className={`grid size-8 place-items-center rounded-full border ${isOpen ? 'border-gold text-gold' : 'border-ivory/20 text-ivory/50'}`}>
                          <ChevronDown size={13} />
                        </motion.span>
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[10px] font-bold uppercase tracking-[0.18em] text-sand">
                      <span className="flex items-center gap-1.5"><MapPin size={11} className="text-gold" /> {j.dept}</span>
                      <span className="flex items-center gap-1.5"><Wallet size={11} className="text-gold" /> {j.pay}</span>
                      <span className="flex items-center gap-1.5"><Clock3 size={11} className="text-gold" /> Start: {j.starts}</span>
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }} className="overflow-hidden">
                        <div className="pb-7 md:px-4">
                          <p className="max-w-2xl text-sm leading-relaxed text-sand">{j.desc}</p>
                          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">What you bring</p>
                          <ul className="mt-2 space-y-1.5">
                            {j.reqs.map((r) => (
                              <li key={r} className="flex gap-3 text-sm text-sand"><span className="mt-[7px] size-1 shrink-0 rotate-45 bg-gold" />{r}</li>
                            ))}
                          </ul>
                          <Btn small className="mt-5" onClick={() => setApplying(j)}>Apply for this Role</Btn>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* bottom band */}
      <section className="relative overflow-hidden border-t border-ivory/10">
        <img src={A.sunset} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-20 md:px-10">
          <div>
            <h3 className="font-display text-3xl text-ivory md:text-5xl">Best office view <em className="text-gold2">in Iredell County.</em></h3>
            <p className="mt-3 max-w-md text-sm text-sand">Come for the job, stay for golden hour on hole 18. Questions? Our hiring desk answers fast.</p>
          </div>
          <div className="flex gap-4">
            <Btn onClick={() => setApplying(JOBS[0])}>Apply Now</Btn>
            <Btn variant="outline" onClick={() => go('contact')}>Contact Us</Btn>
          </div>
        </div>
        <Checkers slide />
      </section>

      <ApplyModal job={applying} onClose={() => setApplying(null)} />
    </>
  );
}
