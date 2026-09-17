/* ------------------------------------------------------------------ */
/*  THE 500 CLUB — content & dummy data                                 */
/* ------------------------------------------------------------------ */

export type PageKey =
  | 'home' | 'membership' | 'dining' | 'events'
  | 'event-calendar' | 'club-calendar' | 'book-event'
  | 'golf' | 'tee-times' | 'careers' | 'contact';

export type Go = (p: PageKey) => void;

/* ---------------- media assets (Pexels) ---------------- */

const px = (id: number, p = 'auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200') =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?${p}`;
const pxP = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;

export const A = {
  heroVideo: 'https://videos.pexels.com/video-files/4784177/4784177-uhd_3840_2160_30fps.mp4',
  heroPoster: 'https://images.pexels.com/videos/4784177/4k-club-cart-drone-shot-drone-view-4784177.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200',
  greenFlag: px(4398355),
  sunset: px(19334920),
  kiawahLake: px(8454463),
  ballHole: px(11789585),
  fatherDaughter: px(1325690),
  autumn: px(12485962),
  swing: px(6256827, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  swingSunset: px(6256834, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  swingGlove: px(9207649, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  swingPants: px(6256594, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  golferElegant: px(15376175, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  golferOrange: px(17769342, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  aerial: px(19334919),
  aerialField: px(2220273),
  aerialSea: px(38202234),
  lake: px(2172499),
  cartMen: px(1325709, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  golfersRelax: px(15686444, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  familyCart: px(9207208, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  golferCart: px(9207240, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  fairwayPath: px(32401756, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  /* dining */
  burgerBeer: px(24554391),
  burgerDark: px(11022623),
  burgerWedges: px(28760166),
  cocktail: pxP(36189454),
  cocktailsTrio: pxP(36366519),
  cocktailRosemary: pxP(27154273),
  redCocktails: pxP(8084688),
  wingsCelery: px(6369302, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  wingsCocktail: px(38896810, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  sportsBar: px(32576428),
  barModern: px(18426538),
  barPlants: px(2788823),
  /* entertainment */
  stage: px(11963130),
  crowd: px(12265693),
  trombone: px(442540),
  instruments: px(1763076),
  /* events */
  tableWedding: px(17001764, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  tableCandles: px(4451262, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  banquetFloral: px(16935999, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  tableChic: px(17294715, 'auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'),
  /* simulators */
  indoorPutting: px(34674923),
  chipping: px(34713538),
  saladPlate: px(3599973),
};

export const CONTACT = {
  phone: '(704) 872-9990',
  phoneLink: 'tel:+17048729990',
  address: '175 Club House Drive, Statesville, NC 28677',
  proShop: '(704) 872-9990 x1',
  golfEmail: 'Scott@500-club.com',
  social: '@500clubnc',
};

/* ---------------- navigation ---------------- */

export const NAV: { label: string; page: PageKey; children?: { label: string; page: PageKey; desc: string; img: string }[] }[] = [
  { label: 'Membership', page: 'membership' },
  { label: 'Dining', page: 'dining' },
  {
    label: 'Events', page: 'events',
    children: [
      { label: 'Event Calendar', page: 'event-calendar', desc: 'Browse the month at a glance', img: A.stage },
      { label: 'Club Calendar', page: 'club-calendar', desc: 'Every tee, table & toast — listed', img: A.tableChic },
      { label: 'Book an Event', page: 'book-event', desc: 'Private parties, outings & more', img: A.banquetFloral },
    ],
  },
  { label: 'Golf', page: 'golf' },
];

/* ---------------- weekly programming ---------------- */

export const WEEKLY = [
  { day: 'Tuesdays', name: 'Taco Tuesday', tag: 'Dining' },
  { day: 'Wednesdays', name: 'Wing Wednesday', tag: 'Dining' },
  { day: 'Thursdays', name: 'Open Mic Night', tag: 'Entertainment' },
  { day: 'Fridays + Saturdays', name: 'Live Music', tag: 'Entertainment' },
  { day: 'Sundays', name: 'Scramble Series', tag: 'Golf' },
];

export const HAPPY_HOUR = {
  title: 'Members Happy Hour',
  when: 'Weekdays · 4 – 6 PM · Victory Lane',
  perks: ['$1 off all drafts', '$2 off wines by the glass', '$5 select shareables', 'Half-price simulator warm-ups'],
  note: 'Not a member yet? One round with us and you will want to be.',
};

/* ---------------- events engine ---------------- */

export type EventCat = 'golf' | 'dining' | 'entertainment' | 'community' | 'tournament';
export type EventStatus = 'available' | 'reserved' | 'waitlist' | 'soldout' | 'closed';

export interface ClubEvent {
  title: string; time: string; cat: EventCat; status: EventStatus; desc: string;
}

export const STATUS_META: Record<EventStatus, { label: string; color: string }> = {
  available: { label: 'Available', color: '#C7A15C' },
  reserved: { label: 'Reserved', color: '#8FA98F' },
  waitlist: { label: 'Wait Listed', color: '#D9A441' },
  soldout: { label: 'Sold Out', color: '#C25B4E' },
  closed: { label: 'Closed', color: '#6E6759' },
};

export const CAT_META: Record<EventCat, { label: string; color: string }> = {
  golf: { label: 'Golf Event', color: '#7FA98A' },
  dining: { label: 'Dining Event', color: '#C7A15C' },
  entertainment: { label: 'Entertainment', color: '#9A8FD8' },
  community: { label: 'Community', color: '#6FA8C9' },
  tournament: { label: 'Tournament', color: '#C25B4E' },
};

const DESC_MAGIC = 'We partnered with Autism Consulting of the Carolinas to launch a weekly Magic: The Gathering Club. Designed for middle school, high school students and young adults — both neurodivergent and neurotypical — our goal is a safe, supportive environment where participants can share experiences without judgment, build friendships, and strengthen community connections. Email Johanna Banks — johannabankslcsw@gmail.com.';
const DESC_SCRAMBLE = 'May–Sept, 1st and 3rd Sundays of the month. 4 PM shotgun, different formats each week. Teams — non members and members are welcome. Email Scott@500-club.com for questions on how to sign up.';
const DESC_DOGFIGHT = 'Tuesday night league 9 hole shotgun. Members / Non Members are welcome. Sign up through Scott@500-club.com.';
const DESC_WOMENS = "Women's League is a 9 hole shotgun, $35 for nine holes. Email Scott@500-club.com to sign up!";
const DESC_TACO = 'Street tacos, cold cervezas and race-day energy. $8 taco baskets every Tuesday in Victory Lane.';
const DESC_WINGS = 'Fried or grilled, tossed in your favorite sauce — Burnout Buffalo, Bogey BBQ, Carolina Gold & more. $9 wing baskets every Wednesday.';
const DESC_OPENMIC = 'The mic is yours. Sign-ups at 6:30 PM, show at 7. Full menu and bar service in Victory Lane.';
const DESC_LIVE = 'Local and regional acts take the stage every week. No cover, 21+ at the bar.';
const DESC_CHAMP = 'Two days. One champion. Stroke play across both nines of the championship course — members only.';
const DESC_MEMBERGUEST = 'Our flagship invitational. Members bring their best guest for two days of golf, pairings parties and Saturday night dinner.';
const DESC_WHISKEY = 'A guided five-pour whiskey journey with chef pairings in The 500 Room. 21+ only.';

/** Events for a JS Date (local). Recurrence mirrors the real club calendar. */
export function eventsForDate(d: Date): ClubEvent[] {
  const dow = d.getDay();
  const day = d.getDate();
  const month = d.getMonth(); // 0-based
  const y = d.getFullYear();
  const out: ClubEvent[] = [];
  const isSept2026 = y === 2026 && month === 8;
  const isOct2026 = y === 2026 && month === 9;

  if (dow === 0) out.push({ title: 'Magic: The Gathering Club', time: '2:00 PM', cat: 'community', status: 'available', desc: DESC_MAGIC });
  if (dow === 0 && (day <= 7 || (day >= 15 && day <= 21)) && month >= 4 && month <= 8)
    out.push({ title: 'Sunday Scramble Series', time: '4:00 PM', cat: 'golf', status: 'available', desc: DESC_SCRAMBLE });
  if (dow === 2) {
    out.push({ title: 'Taco Tuesday', time: 'All Day', cat: 'dining', status: 'available', desc: DESC_TACO });
    out.push({ title: 'Tuesday Night Dog Fight', time: '5:00 PM', cat: 'golf', status: 'available', desc: DESC_DOGFIGHT });
  }
  if (dow === 3) {
    out.push({ title: 'Wing Wednesday', time: 'All Day', cat: 'dining', status: 'available', desc: DESC_WINGS });
    out.push({ title: "Women's League — 9 Hole Shotgun", time: '5:00 PM', cat: 'golf', status: 'available', desc: DESC_WOMENS });
  }
  if (dow === 4) out.push({ title: 'Open Mic Night', time: '7:00 PM', cat: 'entertainment', status: 'available', desc: DESC_OPENMIC });
  if (dow === 5) out.push({ title: 'Live on the Lane', time: '8:00 PM', cat: 'entertainment', status: 'available', desc: DESC_LIVE });

  if (isSept2026 && day === 12) out.push({ title: 'Club Championship — Day 1', time: '7:30 AM', cat: 'tournament', status: 'reserved', desc: DESC_CHAMP });
  if (isSept2026 && day === 13) out.push({ title: 'Club Championship — Day 2', time: '7:30 AM', cat: 'tournament', status: 'reserved', desc: DESC_CHAMP });
  if (isOct2026 && day === 16) out.push({ title: 'Member Guest — Day 1', time: 'All Day', cat: 'tournament', status: 'waitlist', desc: DESC_MEMBERGUEST });
  if (isOct2026 && day === 17) out.push({ title: 'Member Guest — Day 2', time: 'All Day', cat: 'tournament', status: 'waitlist', desc: DESC_MEMBERGUEST });
  if (isOct2026 && day === 24) out.push({ title: 'Whiskey & Fairways Dinner', time: '6:30 PM', cat: 'dining', status: 'soldout', desc: DESC_WHISKEY });
  return out;
}

export interface DayEvents { date: Date; events: ClubEvent[] }

/** All events for a month, grouped by date, sorted ascending. */
export function eventsForMonth(year: number, month: number): DayEvents[] {
  const days = new Date(year, month + 1, 0).getDate();
  const out: DayEvents[] = [];
  for (let d = 1; d <= days; d++) {
    const date = new Date(year, month, d);
    const evs = eventsForDate(date);
    if (evs.length) out.push({ date, events: evs });
  }
  return out;
}

/** Flat upcoming list starting at a date. */
export function upcomingEvents(from: Date, count: number): DayEvents[] {
  const out: DayEvents[] = [];
  const d = new Date(from);
  let guard = 0;
  while (out.length < count && guard < 120) {
    const evs = eventsForDate(d);
    if (evs.length) out.push({ date: new Date(d), events: evs });
    d.setDate(d.getDate() + 1);
    guard++;
  }
  return out;
}

export const fmtDay = (d: Date) => d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
export const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* ---------------- dining ---------------- */

export interface MenuItem { name: string; price?: string; desc?: string; tags?: string[] }
export interface MenuSection { title: string; note?: string; items: MenuItem[]; columns?: boolean }

export const MENU_ALLDAY: MenuSection[] = [
  {
    title: 'Start Strong', note: 'Shareables & Flatbreads',
    items: [
      { name: 'Bang Bang Shrimp', price: '16', desc: 'Crispy shrimp · bang bang sauce · scallions · chili flakes', tags: ['House Favorite'] },
      { name: 'Dirty South Totchos', price: '14', desc: 'Tater tots · seasoned beef · queso · jalapeños · ranch · scallions' },
      { name: 'Loaded Potato Skins', price: '14', desc: 'Cheddar · bacon · sour cream · scallions' },
      { name: 'Mozzarella Sticks', price: '10', desc: 'Marinara' },
      { name: 'Buffalo Chicken Dip', price: '13', desc: 'Creamy, cheesy, baked · tortilla chips' },
      { name: 'Chicken Bacon Ranch Flatbread', price: '15', desc: 'Chicken · bacon · mozzarella · cheddar · ranch' },
      { name: 'Pepperoni Flatbread', price: '14', desc: 'Marinara · mozzarella · pepperoni · fresh basil' },
    ],
  },
  {
    title: 'Wings', note: 'Fried or grilled, tossed in your favorite sauce · ranch or bleu cheese',
    items: [
      { name: '6 Wings', price: '12' },
      { name: '12 Wings', price: '20', desc: "Grilled & tossed in Buffalo — Dale Jr.'s favorite", tags: ['Most Ordered'] },
    ],
  },
  {
    title: 'Smash Burgers', note: 'Single 10 · Double 15 · add bacon +2 · extra patty +5 · toasted bun & choice of side',
    items: [
      { name: 'Carolina Style', desc: 'American cheese · chili · slaw · white onion · mustard' },
      { name: 'Classic Style', desc: 'Cheddar · lettuce · tomato · red onion · dill pickle · 500 Club sauce' },
      { name: 'BBQ Style', desc: 'Cheddar · caramelized onions · bacon · dill pickles · Bogey BBQ sauce' },
    ],
  },
  {
    title: 'Handhelds', note: 'Served with your choice of side',
    items: [
      { name: 'Crispy Grouper Sandwich', price: '18', desc: 'Cheddar · lettuce · lemon crema' },
      { name: 'The 500 Club', price: '17', desc: 'Turkey · ham · cheddar · bacon · dijon · mayo · lettuce · tomato' },
      { name: 'Hot Honey Pimento Chicken', price: '16', desc: 'Pimento cheese · hot honey · pickles', tags: ['Most Ordered'] },
      { name: 'Grilled Chicken Sandwich', price: '15', desc: 'Provolone · bacon · lettuce · tomato' },
      { name: 'Buffalo Chicken Wrap', price: '15', desc: 'Buffalo sauce · lettuce · tomato · shredded cheese · ranch · flour tortilla' },
      { name: 'Chicken Salad Sandwich', price: '14', desc: 'House-made · lettuce · tomato' },
      { name: 'Chicken Salad Melt', price: '15', desc: 'Provolone · bacon · toasted sourdough' },
      { name: 'Carolina Gold Quesadilla', price: '14', desc: 'Jack cheese · caramelized onions · bacon · Carolina Gold BBQ · chicken or steak' },
      { name: 'Street Tacos (2)', price: '14', desc: 'Grouper, chicken or steak · lettuce · cheese · tomato · lime · cilantro crema · extra taco +5 · GF optional' },
    ],
  },
  {
    title: 'Salads', note: 'Small 7 · Large 14 · Wedge small 9 / large 18',
    items: [
      { name: 'Classic Caesar', desc: 'Romaine · brown butter croutons · parmesan · caesar dressing' },
      { name: 'House Salad', desc: 'Mixed greens · cherry tomatoes · cucumber · red onion · shredded cheese · choice of dressing' },
      { name: 'Wedge Salad', desc: 'Iceberg · bacon · red onion · cherry tomatoes · gorgonzola · bleu cheese dressing', tags: ['Add steak — most ordered'] },
    ],
  },
  {
    title: 'Sides', columns: true, note: 'Or sub a side salad +5',
    items: [
      { name: 'French Fries', price: '4' }, { name: 'Tater Tots', price: '4' },
      { name: 'Sweet Potato Fries', price: '5' }, { name: 'Beer Battered Onion Rings', price: '5' },
      { name: 'Fried Okra', price: '4' }, { name: 'Veggie Medley', price: '4' },
      { name: 'Mac & Cheese', price: '5' }, { name: 'Fruit Cup', price: '4' },
    ],
  },
  {
    title: 'Desserts',
    note: "Don't miss our signature Frozen Creamsicle",
    items: [
      { name: 'Seasonal Bread Pudding', price: '8', desc: 'Served warm with ice cream' },
      { name: 'House-Made Chocolate Brownie', price: '7', desc: 'Whipped cream & chocolate sauce' },
      { name: 'The Frozen Creamsicle', price: '9', desc: 'Our signature — sweet, icy, unforgettable', tags: ['Signature'] },
    ],
  },
  {
    title: 'Swing Juice', note: 'Signature cocktails',
    items: [
      { name: 'Frozen Water Hazard', price: '15', desc: 'Vodka · lemonade · sprite · Red Bull · blue Gatorade' },
      { name: 'Frozen Transfusion', price: '13', desc: 'A course classic with a frozen twist · vodka · grape juice · ginger ale' },
      { name: 'Frozen Orange Creamsicle', price: '13', desc: "House secret combination of vodka and liquors — trust us, it's delicious", tags: ['Signature'] },
      { name: 'Bulleit Old Fashioned', price: '15', desc: 'Smoked upon request · Bulleit bourbon · house-made old fashioned syrup · bitters' },
      { name: 'House Margarita', price: '10', desc: 'Astral tequila · triple sec · lime juice · agave' },
      { name: '500 Margarita', price: '16', desc: 'Don Julio tequila · Grand Marnier · lime juice · agave' },
      { name: 'Rusty Bumper', price: '16', desc: 'Rye whiskey · scotch · Luxardo liqueur · maple syrup · bitters · ginger ale' },
      { name: '500 Water Hazard', price: '15', desc: 'High Rock vodka · Red Bull · blue Gatorade · Tito’s +1' },
    ],
  },
  {
    title: 'On Draft', columns: true,
    items: [
      { name: 'Michelob Ultra', price: '4' }, { name: 'Miller Lite', price: '4' },
      { name: 'Jade IPA', price: '7' }, { name: 'Bristol Sunshine', price: '7' },
      { name: 'Red Oak', price: '7' }, { name: 'Guinness', price: '6' },
      { name: 'Blue Moon', price: '7' }, { name: 'Mango Cart', price: '7' },
      { name: 'Royal Bliss Lake Life', price: '7' }, { name: 'Royal Bliss 73 & Hazy', price: '7' },
    ],
  },
  {
    title: 'Bottles & Cans', columns: true, note: 'Domestics · Imports · IPAs · Craft',
    items: [
      { name: 'Budweiser / Bud Light', price: '4' }, { name: 'Coors Light / Yuengling', price: '4' },
      { name: 'White Claw', price: '5' }, { name: 'Corona Extra / Light / Premier', price: '5' },
      { name: 'Stella Artois', price: '5' }, { name: 'Pernicious IPA', price: '4.5' },
      { name: 'Juicy Jay', price: '6' }, { name: 'Nova Hazy', price: '7' },
      { name: 'Talladega Light', price: '5' }, { name: 'Happy Dad', price: '5' },
      { name: 'Bold Rock', price: '6' }, { name: 'Trail Pass N/A', price: '4' },
    ],
  },
  {
    title: 'Wine by the Glass', columns: true, note: 'Ask your server about specialty wines & pairings',
    items: [
      { name: 'Frontera Cabernet Sauvignon', price: '12' }, { name: 'Domaine Bousquet Pinot Noir', price: '12' },
      { name: 'Frontera Pinot Grigio', price: '12' }, { name: 'Frontera Sauvignon Blanc', price: '12' },
      { name: 'Frontera Chardonnay', price: '12' }, { name: 'Maschio Prosecco', price: '9' },
    ],
  },
];

export const WING_SAUCES = ['Burnout Buffalo (GF)', 'Bogey BBQ (GF)', 'Carolina Gold (GF)', 'Teriyaki', 'Jerk Rub (GF)', 'Coca Cola 500'];

export const MENU_TURN: MenuSection[] = [
  {
    title: 'The Turn — Lunch', note: 'Quick, hot, back to the first tee',
    items: [
      { name: 'Hotdog or Brat', price: '5', desc: 'Add chili or pimento cheese +1 · toppings: mayo, ketchup, mustard, relish, slaw, onion' },
      { name: 'Chicken Salad Wrap', price: '7', desc: 'House-made chicken salad with lettuce · soft flour tortilla' },
      { name: 'Turkey, Ham & Bacon Wrap', price: '9', desc: 'Sharp cheddar cheese and lettuce · soft flour tortilla' },
      { name: 'Ham & Sharp Cheddar Sandwich', price: '8', desc: 'Shaved ham, lettuce · soft white bread' },
      { name: 'House-Made Pimento Cheese', price: '6', desc: 'Soft white bread' },
      { name: 'Chips', price: '3', desc: 'Assorted variety' },
      { name: 'Candy', price: '2.75', desc: "Snickers, KitKat, Peanut M&M's, Reese's, Peanuts" },
    ],
  },
  {
    title: 'Turn Beverages', columns: true,
    items: [
      { name: 'Soft Drinks & Gatorade', price: '4' }, { name: 'Bottled Water', price: '3' },
      { name: 'Energy Drinks', price: '5' }, { name: 'Domestic Beer', price: '4' },
      { name: 'Seltzers & Twisted Tea', price: '5' }, { name: 'Import Beer', price: '5' },
      { name: 'Craft Beer', price: '6' }, { name: 'Frozen Cocktails', price: '13' },
      { name: "Chad's Canned Cocktails", price: '10' },
    ],
  },
];

export const MENU_KIDS: MenuSection[] = [
  {
    title: 'Kids Menu', note: 'Ages 12 & under · choice of entrée, one side & a drink · $7',
    items: [
      { name: 'Hamburger or Cheeseburger' }, { name: 'Grilled Cheese' },
      { name: 'Chicken & Cheese Quesadilla' }, { name: 'Butter Noodles' },
      { name: 'Chicken Tenders' }, { name: 'Hot Dog' }, { name: 'Mac & Cheese' },
    ],
  },
  {
    title: 'Kid Sides & Sweets', columns: true, note: 'Every kids meal comes with word scramble & tic-tac-toe',
    items: [
      { name: 'French Fries' }, { name: 'Fruit Cup' }, { name: 'Carrot Sticks' },
      { name: 'Scoop of Ice Cream', price: '2' },
    ],
  },
];

export const VICTORY_HOURS = [
  { d: 'Sunday', h: '11 AM – 8 PM' }, { d: 'Monday', h: 'Closed' },
  { d: 'Tuesday – Thursday', h: '11 AM – 9 PM' }, { d: 'Friday & Saturday', h: '4 PM – 9 PM' },
];
export const TURN_HOURS = [
  { d: 'Sunday – Thursday', h: '10 AM – 4 PM' }, { d: 'Friday & Saturday', h: '8 AM – 4 PM' },
];

export const DINING_POLICIES = [
  { title: 'Dress Code', items: ['Attire in good taste for all Members, guests and families is requested. Management reserves the right to deem any attire inappropriate.', 'Sheer / see-through clothing or offensive graphic t-shirts are not permitted.', 'Appropriate footwear must be worn at all times — bare feet are not permitted.'] },
  { title: 'Parties & Seating', items: ['Parties of 8 or more, please call the Club to make a reservation.', 'Parties of 12 or more need adequate notice and must be approved by a Food & Beverage Manager.', 'Parties of 6 or more will have an automatic 20% gratuity added.', 'Parties will be seated once everyone has arrived.'] },
  { title: 'House Rules', items: ['No outside food or beverages — wine by the bottle excepted with a $20 corkage fee.', 'Staff has the right to refuse service to anyone, including for foul or inappropriate behavior.', 'Children under 12 must be accompanied by an adult.', 'Anyone under 21 is not permitted to drink alcohol or sit at the bar.'] },
];

/* ---------------- golf ---------------- */

export const PROSHOP_HOURS = [
  { d: 'Monday', h: '10:30 AM – 6:30 PM' }, { d: 'Tuesday – Sunday', h: '7:00 AM – 6:30 PM' },
];
export const RANGE_HOURS = [
  { d: 'Monday', h: '10:30 AM – Dusk' }, { d: 'Tuesday – Sunday', h: '7:00 AM – Dusk' },
];
export const SIM_HOURS = [
  { d: 'Monday', h: '10:00 AM – 7:00 PM' }, { d: 'Tuesday – Saturday', h: '8:00 AM – 8:00 PM' }, { d: 'Sunday', h: '8:00 AM – 7:00 PM' },
];

export const RATES_WEEKDAY = [
  { time: 'Open – 12:00 PM', price: '$68' }, { time: '12:00 – 3:50 PM', price: '$58' }, { time: '4:00 PM – Close', price: '$48 · Twilight' },
];
export const RATES_WEEKEND = [
  { time: 'Open – 12:00 PM', price: '$93' }, { time: '12:00 – 3:50 PM', price: '$88' }, { time: '4:00 PM – Close', price: '$53 · Twilight' },
];
export const RATES_SPECIAL = [
  { name: 'Senior Rate — 60+', value: '$53', note: 'All day, Monday – Thursday' },
  { name: 'Hero Rate', value: '$43', note: 'Military · Veterans · Police · Fire · Medic — all day' },
  { name: '9 Holes', value: '$48', note: 'All day, every day' },
  { name: 'Juniors', value: 'Free / $24', note: 'Ages 11 & under free with paying adult · ages 12–15 $24' },
];

/** hole, yellow, checkered, green, red, extra, green diameter */
export const SCORECARD: (string | number)[][] = [
  [1, 399, 377, 354, 273, '297', 30], [2, 172, 153, 143, 122, '–', 23],
  [3, 385, 359, 334, 288, '310', 26], [4, 405, 363, 335, 290, '265', 23],
  [5, 201, 182, 163, 122, '–', 31], [6, 523, 493, 460, 424, '–', 28],
  [7, 364, 340, 308, 271, '327 / 232', 30], [8, 548, 525, 478, 431, '507 / 450', 29],
  [9, 429, 404, 383, 350, '–', 25], ['Front', '3,426', '3,196', '2,958', '2,571', '–', '–'],
  [10, 418, 398, 383, 365, '–', 23], [11, 552, 526, 500, 408, '483', 23],
  [12, 205, 177, 159, 128, '101', 26], [13, 339, 318, 274, 235, '299', 23],
  [14, 422, 395, 360, 311, '–', 23], [15, 377, 350, 298, 248, '–', 27],
  [16, 155, 140, 104, 94, '–', 25], [17, 506, 473, 435, 406, '–', 25],
  [18, 421, 391, 340, 305, '–', 26], ['Back', '3,395', '3,168', '2,853', '2,500', '–', '–'],
  ['Total', '6,821', '6,364', '5,811', '5,071', '–', '–'],
];

export const GOLF_RULES = [
  { title: 'Dress Code', items: [
    'Men & boys: collared or golf-appropriate shirts required. No tank tops, sleeveless shirts, sweatpants, cut-offs, swimwear, or short shorts.',
    'Women & girls: golf-appropriate shorts, pants, skirts and athleisure wear. No swimwear or short shorts.',
    'Appropriate footwear must be worn at all times. Playing barefoot is not permitted.'] },
  { title: 'General', items: [
    'The 500 Club is a play-at-your-own-risk facility. Fishing, swimming, strolling or jogging on the course, and pets on the course are prohibited.',
    'Prices are subject to change without notice. Groups may be paired together on busy days.',
    'Food and beverages must be purchased from the Club or beverage cart — no outside coolers.',
    'A valid driver’s license is required to rent a golf cart. Only golf staff are allowed in the cart storage area.',
    'Abusive language, threats and acts of violence will not be tolerated and may result in immediate removal.',
    'The Golf Course Superintendent determines when the course is suitable for play — maintenance must often continue during play.',
    'Golfers are responsible for property damage and injuries caused by errant golf.',
    'On Mondays, the course is closed for maintenance until 11 AM.',
    'Spectators are allowed with sufficient carts available and a paid cart rental fee. Lock your vehicle and secure belongings.'] },
  { title: 'Playing Regulations', items: [
    'Starting times are required for all play. Every player must check in with the Golf Pro Shop prior to play.',
    'Report at least 15 minutes before your tee time — failure to do so may forfeit your reserved time.',
    'No more than four players may play together. Each player must play out of their own bag — rental clubs available.',
    'A greens fee and/or cart fee covers one round. Additional holes require a supplemental fee.',
    'Carts must stay on paths around tees and greens. Driving golf balls outside course bounds is prohibited.'] },
  { title: 'Tee Times', items: [
    'Be on the tee at your designated time. Play shall start no earlier than the registered tee time.',
    'All play commences from the first hole unless authorized by the GM / Golf Professional and Head Superintendent.',
    'Back-9 and double-tee starts are allowed only with approval, after weather delays, or during shotguns and aerifying.',
    'To cancel a starting time, please notify the golf shop as soon as possible.'] },
  { title: 'Juniors & Handicap Flags', items: [
    'Junior golfers (under 16) may play anytime with an accompanying adult. Only non-accompanied junior members may walk.',
    'The course is ADA accessible. Blue flags, available at the Golf Shop, permit parking no closer than 15 yards to greens and tees.',
    'The Director of Golf has final decision on flag availability during adverse weather.'] },
  { title: 'Pace & Etiquette', items: [
    'Play at a moderate, four-hour pace and keep up with the group in front. Let faster groups play through.',
    'Play ready golf — hit when ready, regardless of honors. Limit lost-ball searches to 3 minutes, then drop and play on.',
    'Record scores on the next tee box, not on the green. Move immediately to the next tee after holing out.',
    'Rake bunkers and leave rakes outside, fill divots with the cart’s sand bottle, and repair all ball marks on greens.'] },
  { title: 'Members & Guests', items: [
    'Members pay no greens fees — cart fees only — and enjoy Pro Shop discounts and 14-day advance tee times.',
    'Members may bring up to three guests at a time; member-guests may receive a 10% discount up to 6 times per year.'] },
  { title: 'Golf Carts', items: [
    'No more than two riders and two bags per cart. A valid driver’s license is required to rent.',
    'Keep carts 20 yards from greens and tees and 30 feet from bunkers when off paths. Drivers are responsible for damage.',
    'No private or pull carts on the course without prior approval from the Director of Golf.'] },
  { title: 'Fees & Incidents', items: [
    'Golf fees are set by the Director of Golf with approval from the owners of The 500 Club and are subject to change.',
    'Report any injury, incident or accident to Pro Shop staff immediately so a report can be filed.',
    'Illegal activity will be reported to the Police Department immediately.'] },
];

export const MEMBER_BENEFITS = [
  'Two-week advance tee-time reservations', 'Member-only tee times after public play',
  'Member discount on food & beverage', 'Member discount in the Pro Shop',
  'Premium member-only tournaments', 'One free hour of simulator time daily',
  'Member referral program', '500 Vines Wine Club', 'Members-only snack bar',
  'Complimentary club storage', 'Reduced private event rental fees',
];

/* ---------------- tee times ---------------- */

export interface TeeSlot { time: string; players: number; price: number; period: 'Morning' | 'Midday' | 'Evening' }

function mins(t: string) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function label(min: number) {
  let h = Math.floor(min / 60); const m = min % 60;
  const ap = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12;
  return `${h}:${String(m).padStart(2, '0')}${ap}`;
}

export function buildSlots(): TeeSlot[] {
  const playersCycle = [4, 2, 1, 4, 3, 4, 2, 4];
  const out: TeeSlot[] = [];
  let i = 0;
  for (let t = mins('7:00'); t <= mins('11:10'); t += 10) {
    out.push({ time: label(t), players: playersCycle[i++ % playersCycle.length], price: 68, period: 'Morning' });
  }
  for (let t = mins('11:20'); t <= mins('15:50'); t += 10) {
    out.push({ time: label(t), players: playersCycle[(i + 2) % playersCycle.length], price: t < mins('12:00') ? 68 : 58, period: 'Midday' });
    i++;
  }
  for (let t = mins('16:20'); t <= mins('17:50'); t += 10) {
    out.push({ time: label(t), players: playersCycle[(i + 5) % playersCycle.length], price: 48, period: 'Evening' });
    i++;
  }
  return out;
}

export const TEE_DATES = (() => {
  const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 8, 17 + i);
    return { dow: names[d.getDay()], day: d.getDate(), mon: months[d.getMonth()], weekend: d.getDay() === 0 || d.getDay() > 4 };
  });
})();

export const BOOKING_RULES = [
  'Members may book up to 14 days in advance; non-members up to 7 days.',
  'Weekdays (Mon–Thu): singles and 9-hole play allowed at any time. Senior rate available. Inventory may be limited on Mondays for maintenance or outings.',
  'Weekends & holidays (Fri–Sun): singles allowed only with a 2 or 3 person booking. 9-hole play only after 2 PM or a small morning window off the back 9.',
  'Call the Pro Shop at (704) 872-9990 if you need additional assistance.',
];

/* ---------------- spaces for private events ---------------- */

export const EVENT_SPACES = [
  { name: 'The 500 Room', cap: 'Up to 160 guests', img: A.tableWedding, desc: 'Upstairs, overlooking the 18th green — home of the Turn Bar and our signature celebrations.' },
  { name: 'Victory Lane Buyout', cap: 'Up to 220 guests', img: A.sportsBar, desc: 'The whole sports bar, simulators included. Race-day energy with full F&B service.' },
  { name: 'Lakeside Lawn', cap: 'Up to 300 guests', img: A.lake, desc: 'Golden-hour ceremonies and tented receptions along the water.' },
];

export const STATS = [
  { n: 18, suffix: '', label: 'Championship Holes' },
  { n: 6821, suffix: '', label: 'Yards from the Tips', comma: true },
  { n: 2, suffix: '', label: 'Tour Simulators' },
  { n: 6, suffix: '', label: 'Days a Week in Victory Lane' },
];

/* ---------------- careers ---------------- */

export interface Job {
  id: string; title: string; dept: string; type: 'Full-time' | 'Part-time' | 'Seasonal';
  pay: string; desc: string; reqs: string[]; starts: string;
}

export const JOBS: Job[] = [
  {
    id: 'fnb-cook', title: 'Evening Line Cook', dept: 'Victory Lane — Food & Beverage', type: 'Full-time', pay: '$18–22 / hr',
    starts: 'Immediate', desc: 'Own the fryer-to-flattop line during our busiest stretch — smash burgers, wings in six sauces, and race-day volume. Small crew, big energy, zero egos.',
    reqs: ['2+ years on a hot line', 'Weekend availability', 'ServSafe preferred (we pay for the cert)'],
  },
  {
    id: 'fnb-server', title: 'Server / Bartender', dept: 'Victory Lane — Food & Beverage', type: 'Part-time', pay: '$2.13 / hr + tips',
    starts: 'Immediate', desc: 'Run the floor or the well during Taco Tuesday, Wing Wednesday and live music weekends. Our regulars tip like family because they become family.',
    reqs: ['1+ year serving or bartending', 'ABC permit or willing to obtain', 'Thursday–Sunday availability'],
  },
  {
    id: 'bev-cart', title: 'Beverage Cart Attendant', dept: 'On Course — Golf Operations', type: 'Seasonal', pay: '$14 / hr + tips',
    starts: 'April', desc: 'The most popular person on 18 holes. Stock the cart, learn every member\'s order by hole 3, and enjoy the best office view in Statesville.',
    reqs: ['Valid driver\'s license', '21+ preferred', 'Early morning flexibility'],
  },
  {
    id: 'outside-ops', title: 'Outside Golf Operations', dept: 'Pro Shop — Golf Operations', type: 'Part-time', pay: '$13 / hr + free golf',
    starts: 'Immediate', desc: 'First impressions and bag drops. Stage carts, run the range, and keep the first tee running like a pit crew.',
    reqs: ['Valid driver\'s license', 'Golf knowledge a plus — passion required', 'Weekend mornings'],
  },
  {
    id: 'events-coord', title: 'Events & Banquets Coordinator', dept: 'The 500 Room — Private Events', type: 'Full-time', pay: '$52–60K / yr',
    starts: 'October', desc: 'Weddings on the 18th green, corporate outings, holiday galas. You own the run-of-show from first inquiry to last dance.',
    reqs: ['2+ years events or hospitality management', 'Caterease or similar a plus', 'Calm under confetti'],
  },
  {
    id: 'turf-crew', title: 'Turf & Greens Crew', dept: 'Grounds — Golf Course Maintenance', type: 'Full-time', pay: '$16–18 / hr',
    starts: 'Immediate', desc: 'The artists behind TifEagle perfection. Mowing patterns, moisture management, and sunrises most people only see in photos.',
    reqs: ['Turf experience preferred — will train the right attitude', '5 AM start times', 'Valid driver\'s license'],
  },
  {
    id: 'pickle-lead', title: 'Pickleball Program Lead', dept: 'Racquets — Coming 2027', type: 'Part-time', pay: 'Competitive',
    starts: 'Courts opening soon', desc: 'Build our pickleball program from day one — clinics, ladders, leagues and socials for members and the public.',
    reqs: ['PPR/IPTPA certification a plus', 'League management experience', 'Evenings + weekends'],
  },
];

export const JOB_PERKS = [
  'Free golf & range access', 'Family meal every shift', 'Free simulator time', 'Victory Lane discounts',
  'Flexible scheduling', 'Tournament-day tips', '401(k) for full-time', 'The best crew in Iredell County',
];

export const CONTACT_DEPTS = [
  { name: 'Membership Sales', who: 'Tours, rates & referrals', phone: '(704) 872-9990 x3', email: 'membership@500-club.com' },
  { name: 'Golf Pro Shop', who: 'Tee times, lessons & outings', phone: '(704) 872-9990 x1', email: 'Scott@500-club.com' },
  { name: 'Victory Lane Dining', who: 'Reservations & large parties', phone: '(704) 872-9990 x2', email: 'fnb@500-club.com' },
  { name: 'Private Events', who: 'Weddings, galas & buyouts', phone: '(704) 872-9990 x4', email: 'events@500-club.com' },
  { name: 'Careers', who: 'Join the crew', phone: '(704) 872-9990 x5', email: 'careers@500-club.com' },
];
