import { opt, choice, versus, slider, leader, blendLine } from '../../quiz/engine';

/** Four preference pairs. Score keys are the lowercase letters. */
const AXES = [
  {
    key: 'ei', poles: ['e', 'i'], labels: ['Extraverted', 'Introverted'], emoji: ['🗣️', '🌙'], color: '#f59e0b',
    text: ['You recharge around people and tend to think out loud.', 'You recharge alone and think before you speak.'],
  },
  {
    key: 'sn', poles: ['s', 'n'], labels: ['Sensing', 'Intuitive'], emoji: ['🔍', '🔮'], color: '#22c55e',
    text: ['You trust facts, details and what has worked before.', 'You trust patterns, possibilities and where things could go.'],
  },
  {
    key: 'tf', poles: ['t', 'f'], labels: ['Thinking', 'Feeling'], emoji: ['⚖️', '💗'], color: '#38bdf8',
    text: ['You decide with logic and consistency first.', 'You decide with people and values first.'],
  },
  {
    key: 'jp', poles: ['j', 'p'], labels: ['Judging', 'Perceiving'], emoji: ['🗓️', '🎒'], color: '#a78bfa',
    text: ['You like plans, closure and things settled.', 'You like options, flexibility and seeing what happens.'],
  },
];

const GROUPS = {
  nt: { label: 'Thinkers (NT)', emoji: '🧠', color: '#8b5cf6', color2: '#6366f1' },
  nf: { label: 'Dreamers (NF)', emoji: '🌱', color: '#22c55e', color2: '#0d9488' },
  sj: { label: 'Keepers (SJ)',  emoji: '🏛️', color: '#38bdf8', color2: '#2563eb' },
  sp: { label: 'Doers (SP)',    emoji: '⚡', color: '#f59e0b', color2: '#ea580c' },
};

const type = (name, emoji, description, matches) => ({ name, emoji, description, matches });

const TYPES = {
  intj: type('The Strategist', '♟️', 'Independent, long-range and quietly determined. You see how the pieces fit years ahead and build the plan to get there.', ['enfp', 'entp']),
  intp: type('The Theorist', '🧩', 'Curious, analytical and endlessly questioning. You take ideas apart to see how they work and rarely accept “because that is how it is done”.', ['entj', 'enfj']),
  entj: type('The Director', '🧭', 'Decisive, driven and built to lead. You spot inefficiency instantly and organise people and resources to fix it.', ['intp', 'infp']),
  entp: type('The Inventor', '💡', 'Quick, inventive and fond of a good debate. You generate ten ideas before breakfast and love testing them against other minds.', ['infj', 'intj']),
  infj: type('The Visionary', '🌌', 'Insightful, principled and quietly intense. You read people deeply and work toward a future that matters to you.', ['entp', 'enfp']),
  infp: type('The Idealist', '🕊️', 'Gentle, imaginative and guided by your values. You look for meaning in everything and stay loyal to what feels true.', ['enfj', 'entj']),
  enfj: type('The Mentor', '🌟', 'Warm, persuasive and tuned in to others. You see what people could become and help them get there.', ['infp', 'isfp']),
  enfp: type('The Spark', '🎆', 'Enthusiastic, creative and people-loving. You connect ideas and people effortlessly and make possibilities feel real.', ['intj', 'infj']),
  istj: type('The Guardian', '📚', 'Reliable, thorough and true to your word. You keep things running by doing what you said you would, properly.', ['esfp', 'estp']),
  isfj: type('The Protector', '🛡️', 'Loyal, attentive and quietly devoted. You remember the details that matter to people and look after them without fuss.', ['esfp', 'estp']),
  estj: type('The Organiser', '📋', 'Practical, direct and dependable. You bring order to chaos and expect things to be done right and on time.', ['istp', 'isfp']),
  esfj: type('The Host', '🤝', 'Sociable, caring and community-minded. You notice who needs what and bring people together.', ['isfp', 'istp']),
  istp: type('The Craftsperson', '🔧', 'Calm, hands-on and resourceful. You learn by doing and are at your best solving a real problem in real time.', ['estj', 'esfj']),
  isfp: type('The Artist', '🎨', 'Sensitive, easygoing and quietly original. You live in the moment and express yourself through what you make and do.', ['enfj', 'esfj']),
  estp: type('The Daredevil', '🏍️', 'Bold, energetic and quick on your feet. You act first, adjust as you go, and thrive when things get exciting.', ['isfj', 'istj']),
  esfp: type('The Entertainer', '🎤', 'Playful, generous and full of life. You turn ordinary moments into fun and bring everyone along with you.', ['istj', 'isfj']),
};

const questions = [
  versus("After a long week, you'd rather...",
    opt('Go out with a group', { e: 1 }, '🎉'),
    opt('Stay in and recharge', { i: 1 }, '🛋️'),
  ),
  versus('You trust...',
    opt('What I can see and measure', { s: 1 }, '📏'),
    opt('Patterns and hunches', { n: 1 }, '🔮'),
  ),
  slider("I'd rather be honest than tactful.", { f: 1 }, { t: 1 }),
  versus('Your ideal trip is...',
    opt('Booked and planned', { j: 1 }, '🗓️'),
    opt('Figured out on the way', { p: 1 }, '🎒'),
  ),
  slider('I feel energised after spending time with lots of people.', { i: 1 }, { e: 1 }),
  choice('A friend describes their trip. You ask about...', [
    opt('Where exactly they went and what it cost', { s: 1 }),
    opt('What the food was actually like', { s: 1 }),
    opt('What it made them think about', { n: 1 }),
    opt("Where they'd go if anything were possible", { n: 1 }),
  ]),
  versus('A good decision is...',
    opt('Logical and fair', { t: 1 }, '⚖️'),
    opt('Kind and considerate', { f: 1 }, '💗'),
  ),
  slider('I like to have things decided and settled.', { p: 1 }, { j: 1 }),
  versus('In a meeting you usually...',
    opt('Think out loud', { e: 1 }, '💬'),
    opt("Speak once I've thought it through", { i: 1 }, '🤔'),
  ),
  slider("I'm more interested in what could be than in what is.", { s: 1 }, { n: 1 }),
  choice("Someone's work has a flaw. You...", [
    opt('Point it out directly — it helps them', { t: 1 }),
    opt('Explain exactly what to fix', { t: 1 }),
    opt("Start with what's good, then mention it gently", { f: 1 }),
    opt('Only bring it up if they ask', { f: 1 }),
  ]),
  versus('A deadline is...',
    opt('Something I finish before', { j: 1 }, '✅'),
    opt('Something that gets me started', { p: 1 }, '⏰'),
  ),
  slider('I need time alone to feel like myself again.', { e: 1 }, { i: 1 }),
  versus('When learning something new, you want...',
    opt('Step-by-step practice', { s: 1 }, '📋'),
    opt('The big idea first', { n: 1 }, '💡'),
  ),
  slider('I often make decisions based on how people will feel.', { t: 1 }, { f: 1 }),
  choice('Your desk right now is...', [
    opt('Tidy, everything has a place', { j: 1 }),
    opt('Organised by a system only I understand', { j: 1 }),
    opt('A creative mess', { p: 1 }),
    opt('Wherever my laptop happens to be', { p: 1 }),
  ]),
  choice('Your phone rings unexpectedly. You...', [
    opt('Pick up straight away — nice surprise', { e: 1 }),
    opt('Answer, and probably talk for an hour', { e: 1 }),
    opt('Let it ring and text back later', { i: 1 }),
    opt("Wonder why they didn't just message", { i: 1 }),
  ]),
  slider('I prefer clear facts to theories.', { n: 1 }, { s: 1 }),
  versus('A friend shares a problem. You first...',
    opt('Look for a solution', { t: 1 }, '🔧'),
    opt('Offer comfort', { f: 1 }, '🤗'),
  ),
  slider('I keep my options open as long as possible.', { j: 1 }, { p: 1 }),
];

const groupOf = ([, sn, tf, jp]) => (sn === 'n' ? (tf === 't' ? 'nt' : 'nf') : (jp === 'j' ? 'sj' : 'sp'));

function resolve(scores, last) {
  const letters = AXES.map((axis) => leader(axis.poles, scores, last));
  const key = letters.join('');
  const t = TYPES[key];
  const groupKey = groupOf(letters);
  const group = GROUPS[groupKey];

  // one row per axis: how strongly the winning side was preferred (50–100%)
  const rows = AXES.map((axis, i) => {
    const side = axis.poles.indexOf(letters[i]);
    const total = (scores[axis.poles[0]] || 0) + (scores[axis.poles[1]] || 0);
    const pct = total ? Math.round(((scores[letters[i]] || 0) / total) * 100) : 50;
    return { key: axis.key, label: axis.labels[side], emoji: axis.emoji[side], color: axis.color, pct, text: axis.text[side] };
  });

  return {
    key,
    title: `${key.toUpperCase()} · ${t.name}`,
    emoji: t.emoji,
    badge: group.label,
    description: t.description,
    color: group.color,
    color2: group.color2,
    groupKey,
    groupLabel: group.label,
    breakdown: rows,
    radarMax: 100,
    blend: blendLine(rows),
    matches: t.matches,
    details: rows,
    statsRows: Object.entries(GROUPS).map(([k, g]) => ({ key: k, ...g })),
    facts: [
      { label: 'Temperament', value: `${group.emoji} ${group.label}` },
      { label: 'Gets along with', value: t.matches.map((k) => k.toUpperCase()).join(' & ') },
    ],
  };
}

function ambient(scores, last) {
  if (!Object.keys(scores).length) return null;
  const { color, color2 } = GROUPS[groupOf(AXES.map((axis) => leader(axis.poles, scores, last)))];
  return { color, color2 };
}

const sixteenTypes = {
  id: 'sixteen-types',
  title: '16 Personality Types',
  heading: ['Find Your', 'Four-Letter Type'],
  emoji: '🧬',
  blurb: 'Introvert or extravert? Thinker or feeler? Get your four-letter type.',
  typewriter: ['INFJ? ESTP? Something in between?', `${questions.length} questions. Four letters.`, 'Sixteen types. One is yours.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Pick what you usually do, not what you wish you did',
    'Get your four-letter type and how strong each preference is',
  ],
  note: 'Uses the same four-letter types as the MBTI®, but this is an independent quiz, not the official instrument. For self-reflection, not a diagnosis.',
  questions,
  resolve,
  ambient,
};

export default sixteenTypes;
