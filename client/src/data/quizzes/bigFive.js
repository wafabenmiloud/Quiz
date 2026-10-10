import { slider } from '../../quiz/engine';

const pole = (key, title, emoji, description, matches) => ({ key, title, emoji, description, matches });

/**
 * Each trait is scored 0–100 from two keys, `${id}Hi` and `${id}Lo`.
 * `text` describes a low / middle / high score.
 */
const TRAITS = {
  o: {
    label: 'Openness', emoji: '🎨', color: '#a78bfa', color2: '#7c3aed',
    text: ['You prefer the familiar, the practical and the proven.', 'You balance new ideas with what already works.', 'You are imaginative and drawn to new ideas and experiences.'],
    hi: pole('open-high', 'The Explorer', '🧭', 'Imaginative and curious, you are happiest with a new idea to chase. Routine bores you; novelty wakes you up.', ['extra-high', 'consc-low']),
    lo: pole('open-low', 'The Realist', '🧱', 'Down-to-earth and practical, you trust what is proven. You would rather do one real thing well than discuss ten theories.', ['consc-high', 'neuro-low']),
  },
  c: {
    label: 'Conscientiousness', emoji: '📋', color: '#38bdf8', color2: '#2563eb',
    text: ['You are spontaneous and relaxed about plans and order.', 'You are organised when it matters and flexible when it does not.', 'You are organised, disciplined and reliable.'],
    hi: pole('consc-high', 'The Planner', '🗂️', 'Organised and dependable, you finish what you start. People know that if you said it will be done, it will be done.', ['open-low', 'agree-high']),
    lo: pole('consc-low', 'The Improviser', '🎲', 'Flexible and spontaneous, you work best without a script. You adapt quickly and rarely stress about the plan.', ['open-high', 'extra-high']),
  },
  e: {
    label: 'Extraversion', emoji: '🎉', color: '#f59e0b', color2: '#ea580c',
    text: ['You are reserved and recharge in quiet.', 'You enjoy company and solitude in roughly equal measure.', 'You are outgoing and energised by people.'],
    hi: pole('extra-high', 'The Socialite', '🥂', 'Outgoing and energetic, you come alive in company. You start the conversation and keep the room moving.', ['extra-low', 'open-high']),
    lo: pole('extra-low', 'The Observer', '🔭', 'Quiet and self-contained, you prefer depth to noise. You notice more than you say and choose your company carefully.', ['extra-high', 'agree-high']),
  },
  a: {
    label: 'Agreeableness', emoji: '🤝', color: '#34d399', color2: '#0d9488',
    text: ['You are direct, sceptical and hard to push around.', 'You are cooperative, but you hold your ground when needed.', 'You are warm, trusting and quick to help.'],
    hi: pole('agree-high', 'The Peacemaker', '🕊️', 'Warm and considerate, you tune in to how others feel. You would rather find common ground than win the argument.', ['neuro-high', 'extra-low']),
    lo: pole('agree-low', 'The Straight-Talker', '🎯', 'Frank and independent, you say what you think. You value truth over comfort and are not easily swayed.', ['neuro-low', 'consc-high']),
  },
  n: {
    label: 'Neuroticism', emoji: '🌊', color: '#fb7185', color2: '#e11d48',
    text: ['You are calm and hard to rattle.', 'You feel stress, but usually recover quickly.', 'You feel things strongly and react quickly to stress.'],
    hi: pole('neuro-high', 'The Sensitive Soul', '🌧️', 'You feel things deeply and notice trouble early. That sensitivity makes you perceptive, even when it is tiring.', ['agree-high', 'neuro-low']),
    lo: pole('neuro-low', 'The Steady Hand', '⚓', 'Calm and even-tempered, you stay level when others wobble. Setbacks rarely knock you off course for long.', ['neuro-high', 'open-high']),
  },
};
const TRAIT_KEYS = Object.keys(TRAITS);
const POLES = TRAIT_KEYS.flatMap((id) => [TRAITS[id].hi, TRAITS[id].lo].map((p) => ({ ...p, trait: id })));
const poleByKey = Object.fromEntries(POLES.map((p) => [p.key, p]));

/** agreeing raises the trait (plus) or lowers it (minus) */
const plus = (id, text) => slider(text, { [`${id}Lo`]: 1 }, { [`${id}Hi`]: 1 });
const minus = (id, text) => slider(text, { [`${id}Hi`]: 1 }, { [`${id}Lo`]: 1 });

// The 20 Mini-IPIP items (public domain, ipip.ori.org), phrased in the first person.
const questions = [
  plus('e', 'I am the life of the party.'),
  plus('a', "I sympathise with others' feelings."),
  plus('c', 'I get chores done right away.'),
  plus('n', 'I have frequent mood swings.'),
  plus('o', 'I have a vivid imagination.'),
  minus('e', "I don't talk a lot."),
  minus('a', "I am not interested in other people's problems."),
  minus('c', 'I often forget to put things back in their proper place.'),
  minus('n', 'I am relaxed most of the time.'),
  minus('o', 'I am not interested in abstract ideas.'),
  plus('e', 'I talk to a lot of different people at parties.'),
  plus('a', "I feel others' emotions."),
  plus('c', 'I like order.'),
  plus('n', 'I get upset easily.'),
  minus('o', 'I have difficulty understanding abstract ideas.'),
  minus('e', 'I keep in the background.'),
  minus('a', 'I am not really interested in others.'),
  minus('c', 'I make a mess of things.'),
  minus('n', 'I seldom feel blue.'),
  minus('o', 'I do not have a good imagination.'),
];

function traitScore(id, scores) {
  const hi = scores[`${id}Hi`] || 0;
  const lo = scores[`${id}Lo`] || 0;
  return hi + lo ? Math.round((hi / (hi + lo)) * 100) : 50;
}

/** Traits ordered from most to least pronounced; ties go to the most recently answered. */
function ranked(scores, last) {
  const recent = (id) => Math.max(last[`${id}Hi`] ?? -1, last[`${id}Lo`] ?? -1);
  return TRAIT_KEYS
    .map((id) => ({ id, pct: traitScore(id, scores) }))
    .sort((a, b) => Math.abs(b.pct - 50) - Math.abs(a.pct - 50) || recent(b.id) - recent(a.id));
}

const level = (pct) => (pct > 50 ? 'High' : pct < 50 ? 'Low' : 'Balanced');
const band = (pct) => (pct < 40 ? 0 : pct > 60 ? 2 : 1);

function resolve(scores, last) {
  const order = ranked(scores, last);
  const top = order[0];
  const trait = TRAITS[top.id];
  const p = top.pct >= 50 ? trait.hi : trait.lo;

  const rows = TRAIT_KEYS.map((id) => {
    const pct = traitScore(id, scores);
    const { label, emoji, color, text } = TRAITS[id];
    return { key: id, label, emoji, color, pct, text: text[band(pct)] };
  });

  return {
    key: p.key,
    title: p.title,
    emoji: p.emoji,
    badge: `${level(top.pct)} ${trait.label}`,
    description: p.description,
    color: trait.color,
    color2: trait.color2,
    breakdown: rows,
    radarMax: 100,
    blend: order.slice(0, 2).map((t) => `${level(t.pct)} ${TRAITS[t.id].label}`).join(' · '),
    matches: p.matches,
    details: rows,
    statsRows: POLES.map((x) => ({ key: x.key, label: x.title, emoji: x.emoji, color: TRAITS[x.trait].color })),
    facts: [
      { label: 'Strongest trait', value: `${trait.emoji} ${trait.label}` },
      { label: 'Gets along with', value: p.matches.map((k) => poleByKey[k].title).join(' & ') },
    ],
  };
}

function ambient(scores, last) {
  if (!Object.keys(scores).length) return null;
  const { color, color2 } = TRAITS[ranked(scores, last)[0].id];
  return { color, color2 };
}

const bigFive = {
  id: 'big-five',
  title: 'Big Five',
  heading: ['Measure Your', 'Big Five Traits'],
  emoji: '🧪',
  blurb: 'The model psychologists use: five traits, each scored from 0 to 100.',
  typewriter: ['Open? Conscientious? Extraverted?', `${questions.length} statements. Five scores.`, 'The personality model researchers use.'],
  steps: [
    `Rate ${questions.length} short statements from disagree to agree`,
    'Describe yourself as you are now, not as you would like to be',
    'Get a 0–100 score for each of the five traits',
  ],
  note: 'Uses the public-domain Mini-IPIP items (ipip.ori.org). A short quiz gives a rough picture only. For self-reflection, not a diagnosis.',
  questions,
  resolve,
  ambient,
};

export default bigFive;
