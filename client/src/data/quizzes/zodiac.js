import { opt, choice, image, versus, slider, leader, breakdown, blendLine } from '../../quiz/engine';

export const ELEMENTS = {
  fire:  { label: 'Fire',  emoji: '🔥', color: '#ff6b35', color2: '#f43f5e' },
  earth: { label: 'Earth', emoji: '🌿', color: '#5fa052', color2: '#0f766e' },
  air:   { label: 'Air',   emoji: '💨', color: '#38bdf8', color2: '#6366f1' },
  water: { label: 'Water', emoji: '🌊', color: '#5b8dee', color2: '#7c3aed' },
};
export const ELEMENT_KEYS = Object.keys(ELEMENTS);

export const MODALITIES = {
  cardinal: { label: 'Cardinal', hint: 'the initiator' },
  fixed:    { label: 'Fixed',    hint: 'the anchor' },
  mutable:  { label: 'Mutable',  hint: 'the adapter' },
};
const MODALITY_KEYS = Object.keys(MODALITIES);

const sign = (key, name, glyph, traits, compatible) => ({ key, name, glyph, traits, compatible });

/** SIGNS[element][modality] */
export const SIGNS = {
  fire: {
    cardinal: sign('aries', 'Aries', '♈', 'Bold, direct, and first through every door. You start things other people only talk about, and you never back down from a challenge.', 'Leo & Sagittarius'),
    fixed:    sign('leo', 'Leo', '♌', 'Warm, loyal, and impossible to ignore. You lead with a big heart, and when you commit to people or plans you stay committed.', 'Aries & Sagittarius'),
    mutable:  sign('sagittarius', 'Sagittarius', '♐', 'Restless, optimistic, and always chasing the horizon. You collect experiences, say what you think, and bounce back fast.', 'Aries & Leo'),
  },
  earth: {
    cardinal: sign('capricorn', 'Capricorn', '♑', 'Ambitious, disciplined, and quietly relentless. You set the goal, build the plan, and climb until you get there.', 'Taurus & Virgo'),
    fixed:    sign('taurus', 'Taurus', '♉', 'Grounded, patient, and dependable. You find beauty in simple things and build a life that lasts.', 'Virgo & Capricorn'),
    mutable:  sign('virgo', 'Virgo', '♍', 'Observant, practical, and endlessly helpful. You notice what everyone else misses and quietly make things better.', 'Taurus & Capricorn'),
  },
  air: {
    cardinal: sign('libra', 'Libra', '♎', 'Charming, fair-minded, and a natural connector. You bring people together and make the first move toward harmony.', 'Gemini & Aquarius'),
    fixed:    sign('aquarius', 'Aquarius', '♒', 'Original, independent, and stubborn about your ideals. You think ten years ahead and refuse to be like everyone else.', 'Gemini & Libra'),
    mutable:  sign('gemini', 'Gemini', '♊', 'Curious, witty, and adaptable. You thrive on ideas, conversation, and the thrill of something new.', 'Libra & Aquarius'),
  },
  water: {
    cardinal: sign('cancer', 'Cancer', '♋', 'Intuitive, nurturing, and fiercely protective. You take charge of caring for the people you love.', 'Scorpio & Pisces'),
    fixed:    sign('scorpio', 'Scorpio', '♏', 'Intense, perceptive, and all-or-nothing. You feel deeply, hold on tightly, and see straight through pretence.', 'Cancer & Pisces'),
    mutable:  sign('pisces', 'Pisces', '♓', 'Dreamy, compassionate, and endlessly imaginative. You absorb the mood of every room and go wherever the current takes you.', 'Cancer & Scorpio'),
  },
};

const questions = [
  choice("What's your ideal weekend plan?", [
    opt('An adventure trip or trying something bold and new', { fire: 1 }),
    opt('Relaxing at home with great food and comfort', { earth: 1 }),
    opt('Hanging out with a big, fun group of friends', { air: 1 }),
    opt('Quiet time alone — reflecting, journaling, or dreaming', { water: 1 }),
  ]),
  choice('When you face a big decision, you...', [
    opt('Trust your gut and act fast', { fire: 1, cardinal: 1 }),
    opt('Carefully weigh every pro and con', { earth: 1, fixed: 1 }),
    opt('Ask everyone around you for their opinion', { air: 1, mutable: 1 }),
    opt('Wait until something feels emotionally right', { water: 1, mutable: 1 }),
  ]),
  versus('Which sounds more like you?',
    opt('Starting something brand new', { cardinal: 1 }, '🚀'),
    opt('Perfecting what already works', { fixed: 1 }, '🛠️'),
  ),
  choice('Your friends would describe you as...', [
    opt('Energetic, fearless, and always up for a challenge', { fire: 1 }),
    opt('Reliable, grounded, and someone they can count on', { earth: 1 }),
    opt('Witty, curious, and great at conversation', { air: 1 }),
    opt('Warm, empathetic, and deeply caring', { water: 1 }),
  ]),
  choice('How do you handle conflict?', [
    opt('Face it head-on — I say what I think immediately', { fire: 1, cardinal: 1 }),
    opt('Stay calm, take time, then resolve it practically', { earth: 1, fixed: 1 }),
    opt('Talk it through — words are my best tool', { air: 1, mutable: 1 }),
    opt('Withdraw until my emotions settle, then reconnect', { water: 1, fixed: 1 }),
  ]),
  image('Pick your perfect first date.', [
    opt('A spontaneous road trip', { fire: 1 }, '🚗'),
    opt('A candlelit homemade dinner', { earth: 1 }, '🕯️'),
    opt('A gallery or live music', { air: 1 }, '🎨'),
    opt('A sunset walk by the water', { water: 1 }, '🌅'),
  ]),
  slider('Plans are more of a suggestion than a commitment.', { fixed: 1 }, { mutable: 1 }),
  choice('What motivates you most in life?', [
    opt('Winning, achieving goals, and being the best', { fire: 1, cardinal: 1 }),
    opt('Security, comfort, and long-term stability', { earth: 1, fixed: 1 }),
    opt('Ideas, learning, and intellectual growth', { air: 1, mutable: 1 }),
    opt('Deep, meaningful connections with others', { water: 1, fixed: 1 }),
  ]),
  choice("When you're stressed, you tend to...", [
    opt('Channel it into physical activity or action', { fire: 1, cardinal: 1 }),
    opt('Stick to routines and comfort food', { earth: 1, fixed: 1 }),
    opt('Vent to friends or scroll through social media', { air: 1, mutable: 1 }),
    opt('Cry it out, journal, or listen to emotional music', { water: 1, fixed: 1 }),
  ]),
  versus('When things change at the last minute, you...',
    opt('Stick with the plan', { fixed: 1 }, '📌'),
    opt('Go with the flow', { mutable: 1 }, '🍃'),
  ),
  image('Which element pulls you in?', [
    opt('Fire', { fire: 1 }, '🔥'),
    opt('Earth', { earth: 1 }, '⛰️'),
    opt('Wind', { air: 1 }, '🌬️'),
    opt('Water', { water: 1 }, '🌊'),
  ]),
  choice('In a group project, you usually...', [
    opt('Step up and take charge — you lead the team', { fire: 1, cardinal: 1 }),
    opt('Handle the detailed, hands-on practical work', { earth: 1, fixed: 1 }),
    opt('Generate creative ideas and keep energy high', { air: 1, mutable: 1 }),
    opt('Make sure everyone feels heard and included', { water: 1, mutable: 1 }),
  ]),
  slider("I'd rather lead the way than wait to see where things go.", { mutable: 1 }, { cardinal: 1 }),
  versus('Which would you choose?',
    opt('One clear goal to chase', { cardinal: 1 }, '🎯'),
    opt('Many doors left open', { mutable: 1 }, '🚪'),
  ),
  image('Choose your dream home.', [
    opt('A loft in a fast-paced city', { fire: 1 }, '🏙️'),
    opt('A cottage surrounded by nature', { earth: 1 }, '🏡'),
    opt('A sleek penthouse in the clouds', { air: 1 }, '🌆'),
    opt('A quiet house beside the sea', { water: 1 }, '🏖️'),
  ]),
];

/* ── Birth sign ─────────────────────────────────────────────── */
// [last month, last day] of each sign's season, in calendar order.
const SEASONS = [
  [1, 19, 'earth', 'cardinal'], [2, 18, 'air', 'fixed'], [3, 20, 'water', 'mutable'],
  [4, 19, 'fire', 'cardinal'], [5, 20, 'earth', 'fixed'], [6, 20, 'air', 'mutable'],
  [7, 22, 'water', 'cardinal'], [8, 22, 'fire', 'fixed'], [9, 22, 'earth', 'mutable'],
  [10, 22, 'air', 'cardinal'], [11, 21, 'water', 'fixed'], [12, 21, 'fire', 'mutable'],
  [12, 31, 'earth', 'cardinal'],
];

/** birthday is "YYYY-MM-DD" (from <input type="date">). */
export function birthSign(birthday) {
  const match = /^\d{4}-(\d{2})-(\d{2})$/.exec(birthday || '');
  if (!match) return null;
  const month = Number(match[1]);
  const day = Number(match[2]);
  const season = SEASONS.find(([m, d]) => month < m || (month === m && day <= d));
  if (!season) return null;
  const [, , element, modality] = season;
  return { ...SIGNS[element][modality], element, modality };
}

/* ── Compatibility ──────────────────────────────────────────── */
const AFFINITY = {
  fire:  { fire: 0.92, air: 0.88, earth: 0.45, water: 0.38 },
  air:   { fire: 0.88, air: 0.90, earth: 0.42, water: 0.50 },
  earth: { fire: 0.45, air: 0.42, earth: 0.92, water: 0.88 },
  water: { fire: 0.38, air: 0.50, earth: 0.88, water: 0.90 },
};

/** 0–100 from two element blends, weighted by how much of each element each person has. */
export function compatibility(scoresA, scoresB) {
  const share = (scores) => {
    const total = ELEMENT_KEYS.reduce((s, k) => s + (scores[k] || 0), 0) || 1;
    return ELEMENT_KEYS.map((k) => (scores[k] || 0) / total);
  };
  const a = share(scoresA);
  const b = share(scoresB);
  let raw = 0;
  ELEMENT_KEYS.forEach((ka, i) => ELEMENT_KEYS.forEach((kb, j) => { raw += a[i] * b[j] * AFFINITY[ka][kb]; }));
  // Blends pull everything toward the middle, so stretch back out to a readable range.
  const score = Math.round(Math.min(99, Math.max(20, ((raw - 0.38) / (0.92 - 0.38)) * 79 + 20)));
  const verdict =
    score >= 80 ? 'Written in the stars — you two just get each other.' :
    score >= 60 ? 'A natural match with a little spark of difference.' :
    score >= 40 ? 'Opposites with potential — you balance each other out.' :
                  'A cosmic challenge. Expect fireworks, for better or worse.';
  return { score, verdict };
}

/* ── Quiz definition ────────────────────────────────────────── */
function resolve(scores, last) {
  const element = leader(ELEMENT_KEYS, scores, last);
  const modality = leader(MODALITY_KEYS, scores, last);
  const rising = leader(ELEMENT_KEYS.filter((k) => k !== element), scores, last);
  const s = SIGNS[element][modality];
  const rows = breakdown(ELEMENTS, scores, [element, rising]);
  return {
    key: s.key,
    title: `${s.name} ${s.glyph}`,
    emoji: ELEMENTS[element].emoji,
    badge: `${ELEMENTS[element].label} sign`,
    description: s.traits,
    color: ELEMENTS[element].color,
    color2: ELEMENTS[element].color2,
    groupKey: element,
    groupLabel: ELEMENTS[element].label,
    breakdown: rows,
    blend: blendLine(rows, [element, rising]),
    element,
    modality,
    facts: [
      { label: 'Rising element', value: `${ELEMENTS[rising].emoji} ${ELEMENTS[rising].label}` },
      { label: 'Modality', value: `${MODALITIES[modality].label} — ${MODALITIES[modality].hint}` },
      { label: 'Gets along with', value: s.compatible },
    ],
  };
}

function ambient(scores, last) {
  if (!ELEMENT_KEYS.some((k) => scores[k] > 0)) return null;
  const { color, color2 } = ELEMENTS[leader(ELEMENT_KEYS, scores, last)];
  return { color, color2 };
}

const zodiac = {
  id: 'zodiac',
  title: 'Zodiac Personality',
  heading: ['Discover Your', 'Zodiac Personality'],
  emoji: '♈',
  blurb: 'Which of the 12 signs matches how you actually think and feel?',
  typewriter: ['Fire, Earth, Air, or Water?', `${questions.length} questions. One cosmic truth.`, 'Discover your elemental identity.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Tap, swipe or use your keyboard — no right or wrong answers',
    'Get one of 12 signs, plus your full elemental blend',
  ],
  questions,
  resolve,
  ambient,
};

export default zodiac;
