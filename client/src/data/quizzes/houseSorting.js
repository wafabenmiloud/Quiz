import { opt, choice, image, versus, outcomeQuiz } from '../../quiz/engine';

// Four houses of an invented school of magic — the names are original to this quiz.
const OUTCOMES = {
  ember: {
    label: 'House Emberhart', emoji: '🦅', color: '#fb923c', color2: '#dc2626', badge: 'House of courage',
    matches: ['oaken', 'night'],
    description: 'The bold ones. Emberharts act while others hesitate, speak up when it is risky, and would rather fail bravely than never try.',
  },
  oaken: {
    label: 'House Oakenfold', emoji: '🐻', color: '#4ade80', color2: '#15803d', badge: 'House of loyalty',
    matches: ['ember', 'quill'],
    description: 'The steadfast ones. Oakenfolds keep their word, look after their own, and are the friends everyone else is lucky to have.',
  },
  quill: {
    label: 'House Quillmere', emoji: '🦉', color: '#a78bfa', color2: '#6d28d9', badge: 'House of wit',
    matches: ['oaken', 'night'],
    description: 'The curious ones. Quillmeres ask the question nobody else thought of and cannot rest until they have the answer.',
  },
  night: {
    label: 'House Nightspire', emoji: '🦊', color: '#2dd4bf', color2: '#0e7490', badge: 'House of ambition',
    matches: ['ember', 'quill'],
    description: 'The determined ones. Nightspires know exactly what they want, plan three moves ahead, and usually get there.',
  },
};

const questions = [
  choice('A sealed door stands in the castle cellar. You...', [
    opt('Open it. Obviously.', { ember: 1 }),
    opt('Fetch my friends first — we go together', { oaken: 1 }),
    opt('Study the runes around the frame', { quill: 1 }),
    opt("Work out who'd pay to know what's behind it", { night: 1 }),
  ]),
  image('Choose a magical object.', [
    opt('A sword that never dulls', { ember: 1 }, '🗡️'),
    opt('A lantern that guides friends home', { oaken: 1 }, '🕯️'),
    opt('A map of every secret', { quill: 1 }, '📜'),
    opt('A crown that commands', { night: 1 }, '👑'),
  ]),
  choice('Your worst nightmare is being...', [
    opt('A coward', { ember: 1 }),
    opt('Disloyal', { oaken: 1 }),
    opt('Ignorant', { quill: 1 }),
    opt('Forgettable', { night: 1 }),
  ]),
  versus('Which matters more?',
    opt("Doing what's right", { ember: 1 }, '⚔️'),
    opt("Knowing what's true", { quill: 1 }, '🔭'),
  ),
  choice('A classmate is cheating in the exam. You...', [
    opt('Call it out on the spot', { ember: 1 }),
    opt('Talk to them privately afterwards', { oaken: 1 }),
    opt("Don't care — I'll still outscore them", { quill: 1 }),
    opt('Remember it. That may be useful', { night: 1 }),
  ]),
  choice('Pick a class.', [
    opt('Duelling', { ember: 1 }),
    opt('Creature Keeping', { oaken: 1 }),
    opt('Rune Reading', { quill: 1 }),
    opt('Potion Brewing', { night: 1 }),
  ]),
  image('Choose a companion.', [
    opt('A fearless hawk', { ember: 1 }, '🦅'),
    opt('A faithful hound', { oaken: 1 }, '🐕'),
    opt('A watchful owl', { quill: 1 }, '🦉'),
    opt('A cunning fox', { night: 1 }, '🦊'),
  ]),
  versus('A friend asks you to break a rule for them.',
    opt("Of course. They're my friend", { oaken: 1 }, '🤝'),
    opt('Depends what I get out of it', { night: 1 }, '💰'),
  ),
  choice('How would you like to be remembered?', [
    opt('As the one who stood up', { ember: 1 }),
    opt('As the one who stayed', { oaken: 1 }),
    opt('As the one who figured it out', { quill: 1 }),
    opt('As the one who won', { night: 1 }),
  ]),
  choice("It's midnight. Where are you?", [
    opt('Sneaking out on a dare', { ember: 1 }),
    opt('In the kitchens with snacks for everyone', { oaken: 1 }),
    opt('Still in the library', { quill: 1 }),
    opt("Planning tomorrow's victory", { night: 1 }),
  ]),
];

const houseSorting = {
  id: 'house-sorting',
  title: 'House Sorting',
  heading: ['Get Sorted Into', 'Your House'],
  emoji: '🏰',
  blurb: 'A school of magic, four houses: courage, loyalty, wit or ambition.',
  typewriter: ['Brave, loyal, clever or ambitious?', `${questions.length} questions. Four houses.`, 'The sorting begins.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Choose what you would really do, not what sounds noble',
    'Find out which house claims you',
  ],
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default houseSorting;
