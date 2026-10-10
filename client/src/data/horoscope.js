/**
 * Daily horoscopes, assembled from fixed phrase pools.
 * The same date + element always gives the same reading, and it changes at midnight.
 */

const OPENERS = {
  fire: [
    'Your energy arrives before you do today.',
    'Something you have been putting off suddenly looks easy.',
    'You are in the mood to start things, so start one.',
    'A spark of impatience is really a spark of ambition.',
    'Today rewards the bold move over the careful one.',
    'People will follow your lead if you offer one.',
  ],
  earth: [
    'Slow and steady is not a compromise today, it is the strategy.',
    'A small practical fix will feel better than a grand plan.',
    'Your patience pays out in a way you can actually see.',
    'Today is for finishing, not for starting.',
    'Someone is relying on your calm more than they let on.',
    'Comfort is productive today. Make your space feel right.',
  ],
  air: [
    'An idea you nearly dismissed deserves a second look.',
    'The right conversation today opens a door.',
    'Your curiosity is pointing somewhere useful, so follow it.',
    'You will change your mind about something, and that is fine.',
    'A message you send today lands better than you expect.',
    'Variety is the fuel today. Switch tasks before you stall.',
  ],
  water: [
    'Your first feeling about it is the accurate one.',
    'Someone needs to be heard today, and you are good at that.',
    'A quiet hour will give you more than a busy afternoon.',
    'An old memory surfaces with something new to tell you.',
    'Let today move at its own pace and it will carry you.',
    'What you sense under the surface is real. Trust it.',
  ],
};

const ADVICE = [
  'Say yes to the first invitation you receive.',
  'Write the thing down before you forget it.',
  'Reply to the message you have been avoiding.',
  'Take the longer route home.',
  'Ask one more question than you normally would.',
  'Put your phone in another room for an hour.',
  'Give a compliment you have been keeping to yourself.',
  'Finish one small task completely before lunch.',
  'Drink some water and go outside for ten minutes.',
  'Let somebody else choose for once.',
];

const MOODS = ['Bold', 'Calm', 'Playful', 'Focused', 'Tender', 'Restless', 'Hopeful', 'Curious', 'Steady', 'Dreamy'];
const COLOURS = ['Crimson', 'Amber', 'Emerald', 'Sky blue', 'Indigo', 'Violet', 'Rose', 'Gold', 'Teal', 'Silver'];
const HOURS = ['7 am', '9 am', '11 am', '1 pm', '3 pm', '5 pm', '7 pm', '9 pm'];

/** Small deterministic PRNG (mulberry32) seeded from a string. */
function seeded(text) {
  let h = 1779033703;
  for (let i = 0; i < text.length; i++) {
    h = Math.imul(h ^ text.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function dailyHoroscope(element, date = new Date()) {
  const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const random = seeded(`${day}:${element}`);
  const pick = (list) => list[Math.floor(random() * list.length)];
  return {
    text: `${pick(OPENERS[element])} ${pick(ADVICE)}`,
    mood: pick(MOODS),
    colour: pick(COLOURS),
    number: Math.floor(random() * 99) + 1,
    hour: pick(HOURS),
  };
}
