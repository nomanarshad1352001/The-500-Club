import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Clock, ChefHat, ShoppingBag, ScrollText, UtensilsCrossed, Bike, MousePointerClick, CreditCard, BellRing, Flame } from 'lucide-react';
import { A, CONTACT, DINING_POLICIES, MENU_ALLDAY, MENU_KIDS, MENU_TURN, TURN_HOURS, VICTORY_HOURS, WING_SAUCES, type Go, type MenuSection } from '../data';
import { Accordion, Btn, Checkers, EASE, Frame, Lines, PageHero, R, Tag } from '../components/ui';

const TABS = [
  { id: 'dine', label: 'Dine-In', icon: UtensilsCrossed },
  { id: 'order', label: 'Order Online', icon: ShoppingBag },
  { id: 'hours', label: 'Hours of Operation', icon: Clock },
  { id: 'menu', label: 'Menu', icon: ChefHat },
  { id: 'policies', label: 'Policies', icon: ScrollText },
] as const;

type TabId = (typeof TABS)[number]['id'];

function MenuRenderer({ sections }: { sections: MenuSection[] }) {
  return (
    <div className="space-y-16">
      {sections.map((sec, si) => (
        <R key={sec.title} delay={0.03 * si}>
          <div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <h4 className="font-display text-2xl italic text-gold2 md:text-3xl">{sec.title}</h4>
              {sec.note && <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-sand">{sec.note}</p>}
            </div>
            <div className={`mt-6 ${sec.columns ? 'grid gap-x-10 gap-y-4 sm:grid-cols-2' : 'space-y-5'}`}>
              {sec.items.map((it) => (
                <div key={it.name} className="group">
                  <div className="flex items-baseline gap-3">
                    <span className="text-sm font-bold uppercase tracking-[0.08em] text-ivory transition-colors group-hover:text-gold2">{it.name}</span>
                    {it.tags?.map((t) => (
                      <span key={t} className="hidden shrink-0 border border-gold/40 px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.18em] text-gold2 sm:inline">{t}</span>
                    ))}
                    {it.price && <><span className="leader" /><span className="font-poster text-lg text-gold2">{it.price}</span></>}
                  </div>
                  {it.desc && <p className="mt-1.5 max-w-lg text-xs leading-relaxed text-sand">{it.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </R>
      ))}
    </div>
  );
}

function DineIn() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <Tag>Victory Lane · Sports Bar & Restaurant</Tag>
        <h3 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-5xl">
          <Lines text="Good food. Cold drinks." /> <em className="text-gold2"><Lines text="Race day energy." delay={0.12} /></em>
        </h3>
        <R delay={0.2} className="mt-6 space-y-4 text-sm leading-relaxed text-sand md:text-base">
          <p>
            Everyone is invited — no membership required. Watch the latest sports action, play dozens of world-class
            golf courses on our simulators, and settle in for lunch and dinner six days a week.
          </p>
          <p>Bold flavors, no dress code. Where Lake Norman comes to play — and stays for dinner.</p>
        </R>
        <R delay={0.3} className="mt-8 border border-gold/30 bg-gold/[0.06] p-5">
          <p className="flex items-start gap-3 text-sm text-gold2">
            <Phone size={15} className="mt-0.5 shrink-0" />
            For parties of 8 or more, please call the Club to make a reservation — {CONTACT.phone}.
          </p>
        </R>
        <R delay={0.35} className="mt-8 flex flex-wrap gap-2">
          {['Open to the Public', 'Simulators', 'Big-Game Screens', 'Patio Seating'].map((c) => (
            <span key={c} className="border border-ivory/15 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-ivory/70">{c}</span>
          ))}
        </R>
      </div>
      <div className="grid grid-cols-5 gap-3">
        <R className="col-span-3"><Frame src={A.burgerDark} ratio="aspect-[4/5]" className="border border-ivory/10" /></R>
        <R delay={0.12} className="col-span-2 mt-12"><Frame src={A.wingsCocktail} ratio="aspect-[3/4]" className="border border-ivory/10" /></R>
        <R delay={0.2} className="col-span-2 -mt-12"><Frame src={A.cocktailRosemary} ratio="aspect-square" className="border border-ivory/10" /></R>
        <R delay={0.28} className="col-span-3"><Frame src={A.barModern} ratio="aspect-[5/4]" className="border border-ivory/10" /></R>
      </div>
    </div>
  );
}

function OrderOnline() {
  const steps = [
    { icon: MousePointerClick, t: 'Browse & tap', d: 'Build your basket from the full Victory Lane menu — wings, smash burgers, tacos and all.' },
    { icon: CreditCard, t: 'Pay ahead', d: 'Card, Apple Pay or member charge. Add a tip for the crew up front.' },
    { icon: Bike, t: 'Swing by', d: 'Pickup at the Turn Bar window in about 20 minutes. Call ahead for large orders.' },
  ];
  return (
    <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <Tag>To-Go, Trackside</Tag>
        <h3 className="mt-5 font-display text-3xl text-ivory md:text-5xl"><Lines text="Victory Lane," /> <em className="text-gold2"><Lines text="wherever you are." delay={0.1} /></em></h3>
        <R delay={0.2} className="mt-6 max-w-lg text-sm leading-relaxed text-sand md:text-base">
          Order online for quick pickup — perfect between nines or on the way to the lake. Kitchen hours match Victory Lane
          and close one hour before the restaurant.
        </R>
        <R delay={0.3} className="mt-8 flex flex-wrap gap-4">
          <Btn>Start an Order</Btn>
          <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}>Call {CONTACT.phone}</Btn>
        </R>
      </div>
      <div className="space-y-3">
        {steps.map((s, i) => (
          <R key={s.t} delay={i * 0.1}>
            <div className="group flex gap-5 border border-ivory/10 bg-coal p-6 transition-colors duration-300 hover:border-gold/40">
              <span className="font-poster text-3xl text-gold/40 transition-colors group-hover:text-gold2">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <p className="flex items-center gap-2 font-display text-xl text-ivory"><s.icon size={16} className="text-gold" /> {s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-sand">{s.d}</p>
              </div>
            </div>
          </R>
        ))}
      </div>
    </div>
  );
}

function Hours() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      {[
        { title: 'Victory Lane', note: 'Kitchen closes 1 hour before restaurant closing time', rows: VICTORY_HOURS, img: A.sportsBar },
        { title: 'The Turn Bar', note: 'Full menu · new location: upstairs in The 500 Room', rows: TURN_HOURS, img: A.barPlants },
      ].map((v, i) => (
        <R key={v.title} delay={i * 0.12}>
          <div className="group border border-ivory/10 bg-coal">
            <div className="relative h-56 overflow-hidden">
              <img src={v.img} alt="" className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-108" />
              <div className="absolute inset-0 bg-gradient-to-t from-coal to-transparent" />
              <h4 className="absolute bottom-5 left-7 font-display text-3xl text-ivory">{v.title}</h4>
            </div>
            <div className="p-7 md:p-9">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">{v.note}</p>
              <div className="mt-6 divide-y divide-ivory/10">
                {v.rows.map((r) => (
                  <div key={r.d} className="flex items-center justify-between py-3.5 text-sm">
                    <span className="font-semibold uppercase tracking-[0.12em] text-ivory/80">{r.d}</span>
                    <span className={r.h === 'Closed' ? 'font-poster text-base tracking-wide text-crimson' : 'font-poster text-base tracking-wide text-gold2'}>{r.h}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-sand/60"><Clock size={11} /> Hours vary upon season</p>
            </div>
          </div>
        </R>
      ))}
    </div>
  );
}

function Menu({ go }: { go: Go }) {
  const [sub, setSub] = useState<'allday' | 'turn' | 'kids'>('allday');
  const topRef = useRef<HTMLDivElement>(null);
  const subs = [
    { id: 'allday' as const, label: 'All-Day Menu' },
    { id: 'turn' as const, label: 'The Turn Menu' },
    { id: 'kids' as const, label: 'Kids Menu' },
  ];
  return (
    <div ref={topRef}>
      {/* most ordered strip */}
      <R className="mb-12 grid gap-3 md:grid-cols-3">
        {[
          { t: 'Hot Honey Pimento Chicken', d: 'A little sweet, a little spicy — just like us', img: A.burgerWedges },
          { t: 'Wedge Salad + Steak', d: 'Crunchy, creamy, and delicious', img: A.saladPlate },
          { t: '12 Wings — Grilled Buffalo', d: "Dale Jr.'s favorite", img: A.wingsCelery },
        ].map((m) => (
          <div key={m.t} className="group relative h-44 overflow-hidden border border-ivory/10">
            <img src={m.img} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/40 to-ink/10" />
            <div className="absolute inset-x-5 bottom-4">
              <p className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-gold"><Flame size={10} /> Most Ordered</p>
              <p className="mt-1 font-display text-lg text-ivory">{m.t}</p>
              <p className="text-[11px] text-sand">{m.d}</p>
            </div>
          </div>
        ))}
      </R>

      {/* sub tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {subs.map((s) => (
          <button
            key={s.id}
            onClick={() => { setSub(s.id); topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
            className={`relative cursor-pointer px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors ${sub === s.id ? 'text-ink' : 'text-ivory/60 hover:text-ivory'}`}
          >
            {sub === s.id && <motion.span layoutId="dining-sub" className="absolute inset-0 bg-gold" transition={{ duration: 0.5, ease: EASE }} />}
            <span className={sub === s.id ? 'relative' : 'relative border-b border-ivory/20 pb-1'}>{s.label}</span>
          </button>
        ))}
      </div>

      {sub === 'allday' && (
        <R className="mb-10 flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-sand">Wing sauces:</span>
          {WING_SAUCES.map((s) => (
            <span key={s} className="border border-gold/40 bg-gold/[0.06] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-gold2">{s}</span>
          ))}
        </R>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={sub} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }}>
          <MenuRenderer sections={sub === 'allday' ? MENU_ALLDAY : sub === 'turn' ? MENU_TURN : MENU_KIDS} />
        </motion.div>
      </AnimatePresence>

      <R className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-ivory/12 bg-coal p-7 md:p-9">
        <div>
          <p className="font-display text-2xl text-ivory">Hungry yet? <em className="text-gold2">Everyone is invited.</em></p>
          <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sand">Open to the public · serious golf, seriously fun</p>
        </div>
        <Btn onClick={() => go('membership')}>Join the Club</Btn>
      </R>

      <p className="mt-8 text-[10px] leading-relaxed tracking-wide text-sand/50">
        * These foods may be offered undercooked or raw. Consuming raw or undercooked meats, poultry, seafood, shellfish or eggs may increase your risk of foodborne illness, especially if you have certain medical conditions.
      </p>
    </div>
  );
}

export default function Dining({ go }: { go: Go }) {
  const [tab, setTab] = useState<TabId>('dine');
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <PageHero
        img={A.burgerBeer} kicker="Victory Lane · Sports Bar & Restaurant" title={'GOOD FOOD.\nCOLD DRINKS.'}
        sub="Lunch and dinner six days a week — watch the latest sports action and play dozens of world-class golf courses on our state-of-the-art simulators. Everyone is invited."
      >
        <Btn variant="outline" onClick={() => window.open(CONTACT.phoneLink)}><Phone size={13} /> {CONTACT.phone}</Btn>
      </PageHero>

      {/* sticky sub nav */}
      <div className="sticky top-0 z-40 border-b border-ivory/10 bg-ink/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-5 md:justify-center md:px-10">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}
              className="group relative flex shrink-0 cursor-pointer items-center gap-2 px-5 py-5 text-[10px] font-bold uppercase tracking-[0.22em] transition-colors"
            >
              <t.icon size={13} className={tab === t.id ? 'text-gold' : 'text-sand/60'} />
              <span className={tab === t.id ? 'text-gold2' : 'text-ivory/60 group-hover:text-ivory'}>{t.label}</span>
              {tab === t.id && <motion.span layoutId="dining-tab" className="absolute inset-x-3 bottom-0 h-0.5 bg-gold" transition={{ duration: 0.5, ease: EASE }} />}
            </button>
          ))}
        </div>
      </div>

      <div ref={contentRef} className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.55, ease: EASE }}>
            {tab === 'dine' && <DineIn />}
            {tab === 'order' && <OrderOnline />}
            {tab === 'hours' && <Hours />}
            {tab === 'menu' && <Menu go={go} />}
            {tab === 'policies' && (
              <div className="mx-auto max-w-3xl">
                <Tag className="justify-center">House Rules</Tag>
                <h3 className="mt-5 text-center font-display text-3xl text-ivory md:text-5xl"><Lines text="Good taste," /> <em className="text-gold2"><Lines text="good times." delay={0.1} /></em></h3>
                <R delay={0.2} className="mt-10"><Accordion items={DINING_POLICIES} /></R>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* join band */}
      <section className="relative overflow-hidden border-t border-ivory/10">
        <img src={A.redCocktails} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/78" />
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-5 py-20 md:px-10 md:py-24">
          <div>
            <BellRing size={18} className="text-gold" />
            <h3 className="mt-4 font-display text-3xl text-ivory md:text-5xl">The table is set. <em className="text-gold2">The pour is cold.</em></h3>
            <p className="mt-3 max-w-md text-sm text-sand">Members save on every plate and every round — join the Club and taste the difference.</p>
          </div>
          <Btn onClick={() => go('membership')}>Request Membership Info</Btn>
        </div>
        <Checkers slide />
      </section>
    </>
  );
}
