import { opt, choice, image, versus, slider, outcomeQuiz } from '../../quiz/engine';

const OUTCOMES = {
  fool: {
    label: 'The Fool', emoji: '🃏', color: '#facc15', color2: '#f97316', badge: 'Major Arcana · 0',
    matches: ['magician', 'sun'],
    description: 'The free spirit. You leap first and trust the ground to appear. New beginnings do not scare you — staying still does.',
  },
  magician: {
    label: 'The Magician', emoji: '🎩', color: '#f43f5e', color2: '#9333ea', badge: 'Major Arcana · I',
    matches: ['fool', 'star'],
    description: 'The maker. You turn ideas into real things with whatever is at hand. When you focus, the room bends around you.',
  },
  empress: {
    label: 'The Empress', emoji: '🌷', color: '#4ade80', color2: '#0d9488', badge: 'Major Arcana · III',
    matches: ['sun', 'star'],
    description: 'The nurturer. People and projects grow around you. You create comfort, beauty and abundance wherever you settle.',
  },
  hermit: {
    label: 'The Hermit', emoji: '🏮', color: '#94a3b8', color2: '#475569', badge: 'Major Arcana · IX',
    matches: ['star', 'empress'],
    description: 'The seeker. You need solitude to hear your own thoughts, and you come back from it carrying a light for everyone else.',
  },
  star: {
    label: 'The Star', emoji: '⭐', color: '#38bdf8', color2: '#6366f1', badge: 'Major Arcana · XVII',
    matches: ['hermit', 'empress'],
    description: 'The healer. Calm, hopeful and quietly inspiring. After every storm you are the one who believes things will be fine.',
  },
  sun: {
    label: 'The Sun', emoji: '☀️', color: '#fb923c', color2: '#dc2626', badge: 'Major Arcana · XIX',
    matches: ['fool', 'empress'],
    description: 'The radiant one. Warm, playful and openly joyful. You make success look easy and people feel lighter around you.',
  },
};

const questions = [
  image('Choose a path.', [
    opt('The cliff edge', { fool: 1 }, '🏔️'),
    opt('The workshop', { magician: 1 }, '⚗️'),
    opt('The garden', { empress: 1 }, '🌿'),
    opt('The mountain cave', { hermit: 1 }, '🕯️'),
  ]),
  choice('A stranger hands you a locked box. You...', [
    opt('Shake it, laugh, and take it on the road', { fool: 1 }),
    opt('Find a way to open it within the hour', { magician: 1 }),
    opt('Study it alone until it makes sense', { hermit: 1 }),
    opt('Trust that it will open when it is meant to', { star: 1 }),
  ]),
  versus('What recharges you?',
    opt('A crowd of happy people', { sun: 1 }, '🎉'),
    opt('A night entirely to myself', { hermit: 1 }, '🌙'),
  ),
  choice('Your friends come to you for...', [
    opt('Comfort, food and a place to rest', { empress: 1 }),
    opt('Hope when everything looks bleak', { star: 1 }),
    opt('Energy, jokes and a good time', { sun: 1 }),
    opt('A plan that actually works', { magician: 1 }),
  ]),
  slider('I would rather jump in than think it over.', { hermit: 1 }, { fool: 1 }),
  image('Pick a sky.', [
    opt('Blazing noon', { sun: 1 }, '🌞'),
    opt('A sky full of stars', { star: 1 }, '🌌'),
    opt('A soft golden dawn', { empress: 1 }, '🌄'),
    opt('Storm clouds rolling in', { magician: 1 }, '⛈️'),
  ]),
  versus('Which gift would you rather have?',
    opt('To make anything I imagine', { magician: 1 }, '✨'),
    opt('To make anyone feel at home', { empress: 1 }, '🏡'),
  ),
  choice('Your motto is closest to...', [
    opt('“Why not?”', { fool: 1 }),
    opt('“This too shall pass.”', { star: 1 }),
    opt('“Today is a good day.”', { sun: 1 }),
    opt('“Know yourself.”', { hermit: 1 }),
  ]),
];

const tarot = {
  id: 'tarot',
  title: 'Tarot Card',
  heading: ['Which Tarot Card', 'Guides You?'],
  emoji: '🔮',
  blurb: 'Six cards from the Major Arcana. One of them is yours.',
  typewriter: ['Fool, Magician, Empress, Hermit, Star or Sun?', `${questions.length} questions. One card.`, 'Draw the card that guides you.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Trust the first answer that feels right',
    'Reveal your card and how close the others came',
  ],
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default tarot;
