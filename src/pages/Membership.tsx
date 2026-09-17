import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spade, CircleDot, MonitorPlay, Target, ShoppingBag, UtensilsCrossed, Beer, Dumbbell, CalendarCheck, Percent, Trophy, Timer, Users, Grape, Croissant, Package, PartyPopper, Quote } from 'lucide-react';
import { A, MEMBER_BENEFITS, HAPPY_HOUR, type Go } from '../data';
import { Btn, Frame, Lines, PageHero, R, SuccessMark, Tag } from '../components/ui';

const AMENITIES = [
  { icon: Spade, name: '18-Hole Golf Course', desc: 'TifEagle Bermuda greens & lake views' },
  { icon: CircleDot, name: 'Putting Green', desc: 'Dawn-to-dusk practice surface' },
  { icon: MonitorPlay, name: 'Golf Simulators', desc: 'Play dozens of world-class tracks' },
  { icon: Target, name: 'Hitting Bays', desc: 'Dial in the long game, year-round' },
  { icon: ShoppingBag, name: 'Pro Shop', desc: 'Member pricing on gear & apparel' },
  { icon: UtensilsCrossed, name: 'Victory Lane', desc: 'Full-service restaurant & sports bar' },
  { icon: Beer, name: 'The Turn Bar', desc: 'Mid-round fuel in The 500 Room' },
  { icon: Dumbbell, name: 'Pickleball Courts', desc: 'Coming soon — members first', soon: true },
];

const BENEFIT_ICONS = [CalendarCheck, Timer, Percent, ShoppingBag, Trophy, MonitorPlay, Users, Grape, Croissant, Package, PartyPopper];

export default function Membership({ go }: { go: Go }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ first: '', last: '', cell: '', email: '', zip: '' });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  return (
    <>
      <PageHero
        img={A.swingSunset} kicker="Membership" title={'JOIN THE\nCLUB'}
        sub="As Lake Norman's Premier Sports Club, The 500 Club is a destination where friends and families come together to enjoy the best that Statesville has to offer."
      >
        <Btn onClick={() => document.getElementById('member-form')?.scrollIntoView({ behavior: 'smooth' })}>Request Information</Btn>
        <Btn variant="outline" onClick={() => go('tee-times')}>Book a Tee Time</Btn>
      </PageHero>

      {/* story */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Tag>Why The 500 Club</Tag>
            <h2 className="mt-6 font-display text-4xl leading-[1.06] text-ivory md:text-5xl">
              <Lines text="Exceptional service." /> <em className="text-gold2"><Lines text="Access to all." delay={0.12} /></em>
            </h2>
            <R delay={0.2} className="mt-6 space-y-4 text-sm leading-relaxed text-sand md:text-base">
              <p>
                After a multi-million dollar renovation, our amenities include an 18-hole championship golf course,
                putting green, indoor golf simulators, hitting bays, a pro shop, and a full-service restaurant —
                with pickleball courts on the way.
              </p>
              <p>
                Redefining the modern sports club experience isn't about velvet ropes. It's about one rule: have fun.
                Come as you are; leave as a member of the family.
              </p>
            </R>
            <R delay={0.3} className="mt-10 border-l-2 border-gold pl-6">
              <Quote size={20} className="mb-3 text-gold" />
              <p className="font-display text-xl italic leading-relaxed text-ivory/90 md:text-2xl">
                "We didn't join a club. We joined the best nights of our week."
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-sand">The Harrell Family · Members since '24</p>
            </R>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[A.familyCart, A.golfersRelax, A.fatherDaughter, A.wingsCocktail].map((src, i) => (
              <R key={src} delay={i * 0.1} className={i % 2 ? 'mt-10' : ''}>
                <Frame src={src} ratio="aspect-[3/4]" className="border border-ivory/10" />
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* amenities */}
      <section className="border-y border-ivory/10 bg-coal py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Tag>The Grounds</Tag>
              <h2 className="mt-5 font-display text-4xl text-ivory md:text-6xl"><Lines text="Everything," /> <em className="text-gold2"><Lines text="included." delay={0.1} /></em></h2>
            </div>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {AMENITIES.map((a, i) => (
              <R key={a.name} delay={(i % 4) * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`group relative h-full border p-6 transition-colors duration-500 md:p-8 ${a.soon ? 'border-gold/40 bg-gold/[0.05]' : 'border-ivory/10 bg-ink hover:border-gold/40'}`}
                >
                  <a.icon size={22} className="text-gold2 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                  <h3 className="mt-5 font-display text-lg text-ivory md:text-xl">{a.name}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-sand">{a.desc}</p>
                  {a.soon && (
                    <span className="absolute right-4 top-4 bg-gold px-2 py-1 text-[8px] font-bold uppercase tracking-[0.2em] text-ink">Coming Soon</span>
                  )}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
                </motion.div>
              </R>
            ))}
          </div>
        </div>
      </section>

      {/* benefits + happy hour */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Tag>Member Benefits</Tag>
            <h2 className="mt-5 font-display text-4xl text-ivory md:text-5xl"><Lines text="Eleven reasons" /> <em className="text-gold2"><Lines text="to say yes." delay={0.1} /></em></h2>
            <div className="mt-12 grid gap-2 sm:grid-cols-2">
              {MEMBER_BENEFITS.map((b, i) => {
                const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length];
                return (
                  <R key={b} delay={(i % 2) * 0.07}>
                    <div className="group flex items-center gap-4 border border-ivory/10 p-4 transition-colors duration-300 hover:border-gold/40 hover:bg-ivory/[0.03]">
                      <span className="grid size-9 shrink-0 place-items-center border border-gold/30 text-gold2"><Icon size={14} /></span>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-ivory/80">{b}</span>
                    </div>
                  </R>
                );
              })}
            </div>
          </div>
          <R delay={0.15}>
            <div className="relative h-full overflow-hidden border border-ivory/10">
              <img src={A.cocktailsTrio} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
              <div className="relative flex h-full flex-col justify-end p-8 md:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-gold">{HAPPY_HOUR.when}</p>
                <h3 className="mt-3 font-display text-3xl text-ivory">{HAPPY_HOUR.title}</h3>
                <ul className="mt-5 space-y-2">
                  {HAPPY_HOUR.perks.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm text-ivory/80">
                      <span className="size-1 rotate-45 bg-gold" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </R>
        </div>
      </section>

      {/* form */}
      <section id="member-form" className="relative overflow-hidden border-t border-ivory/10 bg-coal py-24 md:py-32">
        <div className="checkers-dark pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Tag>No Commitment</Tag>
            <h2 className="mt-5 font-display text-4xl leading-tight text-ivory md:text-5xl">
              <Lines text="Request membership" /> <em className="text-gold2"><Lines text="information." delay={0.1} /></em>
            </h2>
            <R delay={0.2} className="mt-6 max-w-md text-sm leading-relaxed text-sand">
              Tell us where to find you and our membership team will reach out with rates, tour dates and a round on us.
              Required fields are marked with an asterisk.
            </R>
            <R delay={0.3} className="mt-10">
              <Frame src={A.golferElegant} ratio="aspect-[16/9]" className="border border-ivory/10" />
            </R>
          </div>

          <R delay={0.15}>
            <div className="relative border border-ivory/12 bg-ink p-8 md:p-12">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="flex min-h-[420px] flex-col items-center justify-center text-center"
                  >
                    <SuccessMark show />
                    <h3 className="mt-6 font-display text-3xl text-ivory">Welcome to the <em className="text-gold2">inside lane.</em></h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-sand">
                      Thanks, {form.first || 'friend'} — our membership team will reach out within one business day.
                      Until then, the first tee is calling.
                    </p>
                    <Btn variant="outline" className="mt-8" onClick={() => setSent(false)}>Send Another Request</Btn>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-2 gap-x-6 gap-y-8"
                    onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                  >
                    <div>
                      <label className="field-label">First Name</label>
                      <input className="field" placeholder="Rickie" value={form.first} onChange={set('first')} />
                    </div>
                    <div>
                      <label className="field-label">Last Name</label>
                      <input className="field" placeholder="Fowler" value={form.last} onChange={set('last')} />
                    </div>
                    <div className="col-span-2">
                      <label className="field-label">Cell Phone Number</label>
                      <input className="field" placeholder="(___) ___-____" value={form.cell} onChange={set('cell')} />
                    </div>
                    <div className="col-span-2">
                      <label className="field-label">Email *</label>
                      <input required type="email" className="field" placeholder="you@email.com" value={form.email} onChange={set('email')} />
                    </div>
                    <div>
                      <label className="field-label">Zipcode *</label>
                      <input required className="field" placeholder="_____" maxLength={5} value={form.zip} onChange={set('zip')} />
                    </div>
                    <div className="flex items-end justify-end">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-sand/60">* Denotes required field</p>
                    </div>
                    <div className="col-span-2"><Btn className="w-full justify-center">Request Membership Information</Btn></div>
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
