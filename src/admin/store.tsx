import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import {
  MENU_ALLDAY, JOBS, eventsForMonth, buildSlots,
  type EventCat, type EventStatus, type Job,
} from '../data';

/* ---------------- types ---------------- */

export interface AdminEvent { id: string; date: string; title: string; time: string; cat: EventCat; status: EventStatus }
export interface MenuRow { id: string; section: string; name: string; price?: string; desc?: string; eightySixed: boolean }
export interface AdminSlot { id: string; time: string; period: string; players: number; price: number; status: 'open' | 'blocked' | 'booked' }
export interface Member { id: string; name: string; tier: string; joined: number; rounds: number; status: 'Active' | 'Past Due' | 'Frozen'; email: string }
export interface AdminJob extends Job { status: 'open' | 'paused'; apps: number }
export interface Msg { id: string; type: string; name: string; email: string; subject: string; body: string; date: string; unread: boolean }
export interface ClubSettings { phone: string; announcement: string; happyHour: string; social: string }

let uid = 0;
const nid = (p: string) => `${p}-${++uid}`;

/* ---------------- seeds ---------------- */

const seedEvents = (): AdminEvent[] =>
  eventsForMonth(2026, 8).flatMap((d) =>
    d.events.map((e) => ({
      id: nid('ev'),
      date: `Sep ${d.date.getDate()}`,
      title: e.title, time: e.time, cat: e.cat, status: e.status,
    }))
  );

const seedMenu = (): MenuRow[] =>
  MENU_ALLDAY.flatMap((s) => s.items.map((it) => ({
    id: nid('mi'), section: s.title, name: it.name, price: it.price, desc: it.desc, eightySixed: false,
  })));

const seedSlots = (): AdminSlot[] =>
  buildSlots().filter((_, i) => i % 4 === 0).slice(0, 18).map((s, i) => ({
    id: nid('sl'), time: s.time, period: s.period, players: s.players, price: s.price,
    status: i % 5 === 0 ? 'booked' : 'open',
  }));

const seedMembers = (): Member[] => {
  const base: [string, string, number, number, Member['status']][] = [
    ['Rickie Harmon', 'Full Family', 2021, 142, 'Active'],
    ['Dale Warren Jr.', 'Corporate', 2022, 98, 'Active'],
    ['Marlene Sikes', 'Dual', 2020, 187, 'Active'],
    ['Tommy Kahn', 'Individual', 2023, 61, 'Past Due'],
    ['Priya Natarajan', 'Full Family', 2024, 44, 'Active'],
    ['Bill Guthrie', 'Individual', 2019, 211, 'Active'],
    ['Junior Palmore', 'Junior', 2024, 76, 'Active'],
    ['Sandy Beaumont', 'Dual', 2022, 89, 'Frozen'],
    ['Cole Trickle', 'Corporate', 2023, 55, 'Active'],
    ['Ada Martinez', 'Individual', 2025, 12, 'Active'],
    ['Walt Dennison', 'Full Family', 2018, 264, 'Past Due'],
    ['Halsey Reed', 'Junior', 2025, 9, 'Active'],
  ];
  return base.map(([name, tier, joined, rounds, status]) => ({
    id: nid('mb'), name, tier, joined, rounds, status,
    email: name.toLowerCase().replace(/[^a-z]+/g, '.') + '@email.com',
  }));
};

const seedJobs = (): AdminJob[] =>
  JOBS.map((j, i) => ({ ...j, status: i === 6 ? 'paused' : 'open', apps: [4, 12, 8, 17, 3, 6, 0][i] }));

const seedMsgs = (): Msg[] => [
  { id: nid('ms'), type: 'Membership', name: 'Jordan Pruitt', email: 'jpruitt@email.com', subject: 'Family membership pricing', body: 'Hi — we just moved to Mooresville and play 3x a week. Can you send full-family rates and whether the simulator hour stacks with the referral program? Also, do you offer any initiation specials this fall?', date: 'Today · 9:41 AM', unread: true },
  { id: nid('ms'), type: 'Private Events', name: 'The Hendrick Group', email: 'events@hendrickgroup.com', subject: 'Corporate outing — Nov 6', body: 'Looking at Friday Nov 6 for a 48-player outing with lunch at the Turn Bar and awards in The 500 Room. Do you have shotgun availability and can the simulators be reserved for the after-party?', date: 'Today · 8:12 AM', unread: true },
  { id: nid('ms'), type: 'Tee Times', name: 'Marcus Bell', email: 'mbell88@email.com', subject: 'Saturday foursome request', body: 'Any chance of a 7:40–8:00 slot this Saturday for 4? Website shows twos but we need all four seats. Happy to pair with another group if needed.', date: 'Yesterday · 6:03 PM', unread: true },
  { id: nid('ms'), type: 'Careers', name: 'Sofia Delgado', email: 'sofiad@email.com', subject: 'Beverage cart attendant (seasonal)', body: 'Hi! I sent my application last week for the bev cart role. Checking in — I have my ABC permit and tournament-day experience from Quail Hollow events.', date: 'Yesterday · 2:47 PM', unread: false },
  { id: nid('ms'), type: 'Dining', name: 'Pastor Greg Haney', email: 'ghaney@email.com', subject: 'Party of 14 — Oct 3', body: 'Our young-adults group wants dinner after the Sunday Scramble on Oct 3 — 14 people around 6 PM. Do you need a set menu for a group that size, and is the 20% gratuity automatic?', date: 'Sep 16 · 11:20 AM', unread: false },
  { id: nid('ms'), type: 'General', name: 'Lake Norman Magazine', email: 'editor@lknmag.com', subject: 'Featured course photography', body: 'We\'re running "Best Back Nines of the Lake" in the winter issue and would love to feature The 500 Club post-renovation. Who handles media day visits?', date: 'Sep 15 · 4:55 PM', unread: false },
];

const seedSettings = (): ClubSettings => ({
  phone: '(704) 872-9990',
  announcement: "Members Happy Hour — weekdays 4–6 PM in Victory Lane. $1 off drafts, $2 off wine, $5 shareables.",
  happyHour: 'Weekdays · 4 – 6 PM',
  social: '@500clubnc',
});

/* ---------------- context ---------------- */

interface AdminStore {
  events: AdminEvent[]; addEvent: (e: Omit<AdminEvent, 'id'>) => void; removeEvent: (id: string) => void; cycleStatus: (id: string) => void;
  menu: MenuRow[]; addMenuItem: (m: Omit<MenuRow, 'id' | 'eightySixed'>) => void; removeMenuItem: (id: string) => void; toggle86: (id: string) => void; setPrice: (id: string, p: string) => void;
  slots: AdminSlot[]; toggleSlot: (id: string) => void; bumpPrices: () => void; addSlot: (time: string) => void; removeSlot: (id: string) => void;
  members: Member[]; addMember: (name: string, tier: string) => void; removeMember: (id: string) => void; cycleMemberStatus: (id: string) => void;
  jobs: AdminJob[]; toggleJob: (id: string) => void; removeJob: (id: string) => void; addJob: (j: Omit<Job, 'id'>) => void;
  msgs: Msg[]; toggleUnread: (id: string) => void; removeMsg: (id: string) => void;
  settings: ClubSettings; saveSettings: (s: ClubSettings) => void;
  resetAll: () => void;
  toast: (msg: string) => void;
  toasts: { id: number; msg: string }[];
}

const Ctx = createContext<AdminStore | null>(null);
export const useAdmin = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error('admin store missing');
  return v;
};

const STATUS_CYCLE: EventStatus[] = ['available', 'reserved', 'waitlist', 'soldout', 'closed'];
const MSTATUS_CYCLE: Member['status'][] = ['Active', 'Past Due', 'Frozen'];

export function AdminProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState(seedEvents);
  const [menu, setMenu] = useState(seedMenu);
  const [slots, setSlots] = useState(seedSlots);
  const [members, setMembers] = useState(seedMembers);
  const [jobs, setJobs] = useState(seedJobs);
  const [msgs, setMsgs] = useState(seedMsgs);
  const [settings, setSettings] = useState(seedSettings);
  const [toasts, setToasts] = useState<{ id: number; msg: string }[]>([]);

  const toast = (msg: string) => {
    const id = ++uid;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2600);
  };

  const store = useMemo<AdminStore>(() => ({
    events,
    addEvent: (e) => { setEvents((v) => [{ ...e, id: nid('ev') }, ...v]); toast(`Event "${e.title}" published`); },
    removeEvent: (id) => { setEvents((v) => v.filter((e) => e.id !== id)); toast('Event removed'); },
    cycleStatus: (id) => setEvents((v) => v.map((e) => e.id === id ? { ...e, status: STATUS_CYCLE[(STATUS_CYCLE.indexOf(e.status) + 1) % STATUS_CYCLE.length] } : e)),

    menu,
    addMenuItem: (m) => { setMenu((v) => [{ ...m, id: nid('mi'), eightySixed: false }, ...v]); toast(`"${m.name}" added to ${m.section}`); },
    removeMenuItem: (id) => { setMenu((v) => v.filter((m) => m.id !== id)); toast('Menu item removed'); },
    toggle86: (id) => { setMenu((v) => v.map((m) => m.id === id ? { ...m, eightySixed: !m.eightySixed } : m)); toast('86 board updated'); },
    setPrice: (id, p) => setMenu((v) => v.map((m) => m.id === id ? { ...m, price: p } : m)),

    slots,
    toggleSlot: (id) => { setSlots((v) => v.map((s) => s.id === id ? { ...s, status: (s.status === 'blocked' ? 'open' : 'blocked') as AdminSlot['status'] } : s)); toast('Tee sheet updated'); },
    bumpPrices: () => { setSlots((v) => v.map((s) => ({ ...s, price: s.price + 3 }))); toast('Sept 1 +$3 adjustment applied to all slots'); },
    addSlot: (time) => { setSlots((v) => [...v, { id: nid('sl'), time, period: 'Morning', players: 4, price: 68, status: 'open' as const }].sort((a, b) => a.time.localeCompare(b.time))); toast(`Slot ${time} opened`); },
    removeSlot: (id) => { setSlots((v) => v.filter((s) => s.id !== id)); toast('Slot removed'); },

    members,
    addMember: (name, tier) => { setMembers((v) => [{ id: nid('mb'), name, tier, joined: 2026, rounds: 0, status: 'Active', email: name.toLowerCase().replace(/[^a-z]+/g, '.') + '@email.com' }, ...v]); toast(`Welcome aboard, ${name}`); },
    removeMember: (id) => { setMembers((v) => v.filter((m) => m.id !== id)); toast('Member record removed'); },
    cycleMemberStatus: (id) => setMembers((v) => v.map((m) => m.id === id ? { ...m, status: MSTATUS_CYCLE[(MSTATUS_CYCLE.indexOf(m.status) + 1) % MSTATUS_CYCLE.length] } : m)),

    jobs,
    toggleJob: (id) => { setJobs((v) => v.map((j) => j.id === id ? { ...j, status: j.status === 'open' ? 'paused' : 'open' } : j)); toast('Job posting updated'); },
    removeJob: (id) => { setJobs((v) => v.filter((j) => j.id !== id)); toast('Job posting removed'); },
    addJob: (j) => { setJobs((v) => [{ ...j, id: nid('jb'), status: 'open', apps: 0 }, ...v]); toast(`"${j.title}" is now live on the careers page`); },

    msgs,
    toggleUnread: (id) => setMsgs((v) => v.map((m) => m.id === id ? { ...m, unread: !m.unread } : m)),
    removeMsg: (id) => { setMsgs((v) => v.filter((m) => m.id !== id)); toast('Message archived'); },

    settings,
    saveSettings: (s) => { setSettings(s); toast('Club settings saved'); },
    resetAll: () => {
      setEvents(seedEvents()); setMenu(seedMenu()); setSlots(seedSlots());
      setMembers(seedMembers()); setJobs(seedJobs()); setMsgs(seedMsgs()); setSettings(seedSettings());
      toast('Demo data reset to defaults');
    },
    toast, toasts,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [events, menu, slots, members, jobs, msgs, settings, toasts]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
