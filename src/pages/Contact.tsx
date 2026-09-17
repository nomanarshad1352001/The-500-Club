import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare, Navigation2 } from 'lucide-react';
import { A, CONTACT, CONTACT_DEPTS, type Go } from '../data';
import { Btn, Lines, PageHero, R, SuccessMark, Tag } from '../components/ui';

const Instagram = (p: { size?: number; className?: string }) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={p.className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Contact({ go }: { go: Go }) {
  const [sent, setSent] = useState(false);
  const [topic, setTopic] = useState('General Question');

  return (
    <>
      <PageHero
        img={A.aerial} kicker="We're Listening" title={'CONTACT\nTHE CLUB'}
        sub="Questions about membership, tee times, menus or your next big event — a real human answers between dawn patrol and last call."
      >
        <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}><Phone size={13} /> {CONTACT.phone}</Btn>
        <Btn variant="ghost" onClick={() => window.open('https://maps.google.com/?q=175+Club+House+Drive+Statesville+NC')}>
          <Navigation2 size={13} /> Get Directions
        </Btn>
      </PageHero>

      {/* quick cards */}
      <section className="border-b border-ivory/10 bg-coal">
        <div className="mx-auto grid max-w-7xl gap-px bg-ivory/10 sm:grid-cols-3">
          {[
            { icon: MapPin, t: 'Visit', d: CONTACT.address, a: 'Get Directions', href: 'https://maps.google.com/?q=175+Club+House+Drive+Statesville+NC' },
            { icon: Phone, t: 'Call', d: 'Phone: 704.872.9990', a: 'Tap to Call', href: CONTACT.phoneLink },
            { icon: Instagram, t: 'Follow', d: 'Stay connected to @500clubnc', a: '@500clubnc', href: '#' },
          ].map((c, i) => (
            <R key={c.t} delay={i * 0.08} className="bg-coal">
              <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer"
                className="group block bg-coal p-8 transition-colors duration-500 hover:bg-soot md:p-10">
                <c.icon size={20} className="text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.35em] text-sand">{c.t}</p>
                <p className="mt-2 font-display text-xl leading-snug text-ivory">{c.d}</p>
                <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">{c.a} →</p>
              </a>
            </R>
          ))}
        </div>
      </section>

      {/* departments + form */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <Tag>Direct Lines</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl"><Lines text="Skip the switchboard," /> <em className="text-gold2"><Lines text="ring the right desk." delay={0.1} /></em></h2>
            <div className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
              {CONTACT_DEPTS.map((d, i) => (
                <motion.div key={d.name} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group flex flex-wrap items-center gap-4 py-5 transition-colors hover:bg-ivory/[0.03] md:px-3">
                  <span className="grid size-10 shrink-0 place-items-center border border-gold/30 font-poster text-sm text-gold2">{String(i + 1).padStart(2, '0')}</span>
                  <div className="min-w-40">
                    <p className="font-display text-lg text-ivory transition-colors group-hover:text-gold2">{d.name}</p>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-sand">{d.who}</p>
                  </div>
                  <div className="ml-auto text-right">
                    <a href={`tel:${d.phone.replace(/[^0-9]/g, '')}`} className="block text-sm font-semibold text-ivory/80 transition-colors hover:text-gold2">{d.phone}</a>
                    <a href={`mailto:${d.email}`} className="block text-xs text-gold2/80 transition-colors hover:text-gold2">{d.email}</a>
                  </div>
                </motion.div>
              ))}
            </div>
            <R delay={0.2} className="mt-8 flex items-start gap-3 border border-ivory/10 bg-coal p-5">
              <Clock size={15} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-xs leading-relaxed text-sand">
                Phones staffed during Pro Shop hours — Mon 10:30a–6:30p, Tue–Sun 7a–6:30p.
                Emails answered within one business day. Kitchen closes one hour before Victory Lane.
              </p>
            </R>
          </div>

          {/* form */}
          <R delay={0.1}>
            <div className="relative border border-ivory/12 bg-coal p-8 md:p-10">
              <MessageSquare size={18} className="text-gold" />
              <h3 className="mt-4 font-display text-3xl text-ivory">Send a <em className="text-gold2">message.</em></h3>
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    className="flex min-h-[380px] flex-col items-center justify-center text-center">
                    <SuccessMark show />
                    <p className="mt-6 font-display text-2xl text-ivory">Message on its way.</p>
                    <p className="mt-2 max-w-xs text-sm text-sand">A real human (probably Scott) will get back to you within one business day.</p>
                    <Btn small variant="outline" className="mt-7" onClick={() => setSent(false)}>Send Another</Btn>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -14 }}
                    className="mt-8 space-y-7" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div>
                      <label className="field-label">Topic</label>
                      <div className="flex flex-wrap gap-2">
                        {['General Question', 'Membership', 'Tee Times', 'Dining', 'Private Events', 'Careers'].map((t) => (
                          <button type="button" key={t} onClick={() => setTopic(t)}
                            className={`cursor-pointer border px-3.5 py-2 text-[9px] font-bold uppercase tracking-[0.18em] transition-all duration-300 ${topic === t ? 'border-gold bg-gold/[0.1] text-gold2' : 'border-ivory/15 text-ivory/60 hover:text-ivory'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="field-label">Name *</label><input required className="field" placeholder="Your name" /></div>
                      <div><label className="field-label">Phone</label><input className="field" placeholder="(___) ___-____" /></div>
                    </div>
                    <div><label className="field-label">Email *</label><input required type="email" className="field" placeholder="you@email.com" /></div>
                    <div><label className="field-label">Message *</label><textarea required rows={4} className="field resize-none" placeholder="How can we help?" /></div>
                    <Btn className="w-full justify-center"><Mail size={13} /> Send Message</Btn>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </R>
        </div>
      </section>

      {/* find us */}
      <section className="relative overflow-hidden border-t border-ivory/10">
        <img src={A.aerialField} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center px-5 py-24 text-center md:py-32">
          <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            className="grid size-16 place-items-center rounded-full border border-gold/50 bg-ink/70 backdrop-blur-md">
            <MapPin size={24} className="text-gold2" />
          </motion.span>
          <h3 className="mt-8 font-display text-4xl text-ivory md:text-6xl">
            <Lines text="175 Club House Drive" /> <em className="gold-grad"><Lines text="Statesville, NC 28677" delay={0.12} /></em>
          </h3>
          <R delay={0.25} className="mt-6 max-w-md text-sm leading-relaxed text-ivory/70">
            Ten minutes off I-77 & I-40. Twenty minutes from Lake Norman's shoreline. Follow the checkered flags.
          </R>
          <R delay={0.35} className="mt-9 flex flex-wrap justify-center gap-4">
            <Btn onClick={() => window.open('https://maps.google.com/?q=175+Club+House+Drive+Statesville+NC')}>Open in Maps</Btn>
            <Btn variant="outline" onClick={() => go('tee-times')}>Book a Tee Time Nearby</Btn>
          </R>
        </div>
      </section>
    </>
  );
}
