import { opt, choice, image, versus, slider, outcomeQuiz } from '../../quiz/engine';

const OUTCOMES = {
  words: {
    label: 'Words of Affirmation', emoji: '💬', color: '#f472b6', color2: '#db2777', badge: 'Love language',
    matches: ['time', 'acts'],
    description: 'You feel most loved when someone says it out loud. A thoughtful message, a sincere compliment, or a simple “I’m proud of you” stays with you for days.',
  },
  time: {
    label: 'Quality Time', emoji: '⏳', color: '#f59e0b', color2: '#ea580c', badge: 'Love language',
    matches: ['words', 'touch'],
    description: 'Undivided attention is everything to you. Phones away, no rush, just being together — that is what makes you feel chosen.',
  },
  gifts: {
    label: 'Receiving Gifts', emoji: '🎁', color: '#a78bfa', color2: '#7c3aed', badge: 'Love language',
    matches: ['acts', 'words'],
    description: 'For you it is never about the price. A small, well-chosen gift proves someone was thinking of you when you were not there.',
  },
  acts: {
    label: 'Acts of Service', emoji: '🧺', color: '#34d399', color2: '#0d9488', badge: 'Love language',
    matches: ['gifts', 'time'],
    description: 'Actions speak louder than words. When someone takes a task off your plate without being asked, you feel truly cared for.',
  },
  touch: {
    label: 'Physical Touch', emoji: '🤗', color: '#fb7185', color2: '#e11d48', badge: 'Love language',
    matches: ['time', 'words'],
    description: 'A hug, a hand on your shoulder, sitting close on the sofa — physical closeness is how you feel safe and connected.',
  },
};

const questions = [
  choice('After a rough day, what helps the most?', [
    opt('Hearing “you handled that really well”', { words: 1 }),
    opt('Someone clearing their evening just for me', { time: 1 }),
    opt('Coming home to dinner already made', { acts: 1 }),
    opt('A long, quiet hug', { touch: 1 }),
  ]),
  image('Pick the best surprise.', [
    opt('A handwritten letter', { words: 1 }, '💌'),
    opt('A day trip, just us', { time: 1 }, '🗺️'),
    opt('A little wrapped present', { gifts: 1 }, '🎁'),
    opt('My chores, already done', { acts: 1 }, '✅'),
  ]),
  versus('Which means more to you?',
    opt('They remembered a tiny thing I once mentioned', { gifts: 1 }, '🧠'),
    opt('They reached for my hand without thinking', { touch: 1 }, '🤝'),
  ),
  slider('A compliment can keep me going for days.', { acts: 1 }, { words: 1 }),
  choice('What hurts the most?', [
    opt('Harsh or careless words', { words: 1 }),
    opt('Plans cancelled at the last minute', { time: 1 }),
    opt('A forgotten birthday', { gifts: 1 }),
    opt('Feeling physically distant', { touch: 1 }),
  ]),
  versus('How do you usually show you care?',
    opt('I do something useful for them', { acts: 1 }, '🛠️'),
    opt('I set aside real time for them', { time: 1 }, '☕'),
  ),
  choice('Your ideal anniversary is...', [
    opt('Swapping heartfelt speeches or notes', { words: 1 }),
    opt('A whole day with no distractions', { time: 1 }),
    opt('Exchanging something meaningful', { gifts: 1 }),
    opt('Being looked after from morning to night', { acts: 1 }),
  ]),
  slider('I would rather sit close in silence than talk for hours.', { words: 1 }, { touch: 1 }),
];

const loveLanguage = {
  id: 'love-language',
  title: 'Love Language',
  heading: ['Find Your', 'Love Language'],
  emoji: '💞',
  blurb: 'How do you give and receive affection? Five possible answers.',
  typewriter: ['Words, time, gifts, acts or touch?', `${questions.length} questions. One honest answer.`, 'Learn how you feel loved.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Go with your first instinct',
    'See your main love language and the full mix',
  ],
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default loveLanguage;
