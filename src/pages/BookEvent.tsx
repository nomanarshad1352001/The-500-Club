import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarCheck, MapPinned, Sparkles, GlassWater, Users, Phone, Mail } from 'lucide-react';
import { A, CONTACT, EVENT_SPACES, type Go } from '../data';
import { Btn, EASE, Frame, Lines, PageHero, R, SuccessMark, Tag } from '../components/ui';

const STEPS = [
  { icon: CalendarCheck, t: 'Inquire', d: 'Tell us the occasion, headcount and dream date — we answer within one business day.' },
  { icon: MapPinned, t: 'Tour', d: 'Walk the 500 Room, the lawn and Victory Lane with our events team. Coffee’s on us.' },
  { icon: Sparkles, t: 'Customize', d: 'Menus, bar packages, simulators, music and decor — tailored to the last detail.' },
];

export default function BookEvent(_props: { go: Go }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', type: 'Wedding / Reception', date: '', guests: '50', msg: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <PageHero
        img={A.tableCandles} kicker="Private Events" title={'BOOK AN\nEVENT'}
        sub="Weddings, corporate outings, birthday blowouts and charity galas — set against the 18th green with Victory Lane catering. Reduced rental fees for members."
        tall
      >
        <Btn onClick={() => document.getElementById('event-form')?.scrollIntoView({ behavior: 'smooth' })}>Start the Conversation</Btn>
        <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}><Phone size={13} /> {CONTACT.phone}</Btn>
      </PageHero>

      {/* spaces */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Tag>The Spaces</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl"><Lines text="Pick your" /> <em className="text-gold2"><Lines text="backdrop." delay={0.1} /></em></h2>
          </div>
          <R delay={0.2} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-sand">
            <GlassWater size={13} className="text-gold" /> Full F&B · <Users size={13} className="text-gold" /> 12 – 300 guests
          </R>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {EVENT_SPACES.map((sp, i) => (
            <R key={sp.name} delay={i * 0.12} className="h-full">
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.5, ease: EASE }}
                className="group h-full border border-ivory/10 bg-coal transition-colors duration-500 hover:border-gold/40">
                <div className="relative">
                  <Frame src={sp.img} ratio="aspect-[4/3]" />
                  <span className="absolute left-4 top-4 bg-ink/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-gold2 backdrop-blur-sm">{sp.cap}</span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl text-ivory">{sp.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand">{sp.desc}</p>
                </div>
              </motion.div>
            </R>
          ))}
        </div>
      </section>

      {/* steps */}
      <section className="border-y border-ivory/10 bg-coal py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Tag>How it works</Tag>
          <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl"><Lines text="Three steps to a" /> <em className="text-gold2"><Lines text="checkered-flag finish." delay={0.1} /></em></h2>
          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <R key={s.t} delay={i * 0.12} className="h-full">
                <div className="group relative h-full border border-ivory/10 bg-ink p-8 transition-colors duration-500 hover:border-gold/40">
                  <span className="absolute right-6 top-5 font-poster text-6xl text-ivory/[0.06] transition-colors duration-500 group-hover:text-gold/10">{String(i + 1).padStart(2, '0')}</span>
                  <s.icon size={22} className="text-gold2" />
                  <h3 className="mt-6 font-display text-2xl text-ivory">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-sand">{s.d}</p>
                </div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* form */}
      <section id="event-form" className="relative mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Tag>Tell Us Everything</Tag>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-5xl"><Lines text="Let's plan" /> <em className="text-gold2"><Lines text="something loud." delay={0.1} /></em></h2>
            <R delay={0.15} className="mt-6 max-w-md space-y-4 text-sm leading-relaxed text-sand">
              <p>Share the basics and our events team will follow up with availability, menus and a quote.</p>
              <p className="flex items-center gap-3"><Mail size={14} className="shrink-0 text-gold" /> {CONTACT.golfEmail}</p>
              <p className="flex items-center gap-3"><Phone size={14} className="shrink-0 text-gold" /> {CONTACT.phone}</p>
            </R>
            <R delay={0.25} className="mt-8">
              <Frame src={A.lake} ratio="aspect-video" className="border border-ivory/10" />
            </R>
          </div>

          <R delay={0.15}>
            <div className="relative border border-ivory/12 bg-coal p-8 md:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex min-h-[480px] flex-col items-center justify-center text-center">
                    <SuccessMark show />
                    <h3 className="mt-6 font-display text-3xl text-ivory">Consider it <em className="text-gold2">in motion.</em></h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand">
                      Your inquiry is on our events board{form.date ? ` for ${form.date}` : ''}. Expect a call or email within one business day.
                    </p>
                    <Btn variant="outline" className="mt-8" onClick={() => setSent(false)}>Plan Another Event</Btn>
                  </motion.div>
                ) : (
                  <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -16 }}
                    className="grid grid-cols-2 gap-x-6 gap-y-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                    <div>
                      <label className="field-label">Full Name *</label>
                      <input required className="field" placeholder="Jordan Spieth" value={form.name} onChange={set('name')} />
                    </div>
                    <div>
                      <label className="field-label">Phone</label>
                      <input className="field" placeholder="(___) ___-____" value={form.phone} onChange={set('phone')} />
                    </div>
                    <div className="col-span-2">
                      <label className="field-label">Email *</label>
                      <input required type="email" className="field" placeholder="you@email.com" value={form.email} onChange={set('email')} />
                    </div>
                    <div>
                      <label className="field-label">Event Type</label>
                      <select className="field cursor-pointer" value={form.type} onChange={set('type')}>
                        {['Wedding / Reception', 'Corporate Outing', 'Golf Tournament', 'Birthday Party', 'Charity Gala', 'Holiday Party', 'Other'].map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="field-label">Preferred Date</label>
                      <input type="date" className="field cursor-pointer" value={form.date} onChange={set('date')} />
                    </div>
                    <div className="col-span-2">
                      <label className="field-label">Estimated Guests — {form.guests}</label>
                      <input type="range" min="12" max="300" step="4" value={form.guests} onChange={set('guests')}
                        className="w-full cursor-pointer accent-gold" />
                      <div className="flex justify-between text-[9px] uppercase tracking-[0.2em] text-sand/50"><span>12</span><span>300</span></div>
                    </div>
                    <div className="col-span-2">
                      <label className="field-label">Tell us about it</label>
                      <textarea rows={4} className="field resize-none" placeholder="Live band? Simulator tournament? Taco bar? Yes, we can." value={form.msg} onChange={set('msg')} />
                    </div>
                    <div className="col-span-2"><Btn className="w-full justify-center">Send Event Inquiry</Btn></div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </R>
        </div>
      </section>
    </>
  );
}
