import { opt, choice, image, outcomeQuiz } from '../../quiz/engine';

const OUTCOMES = {
  wolf: {
    label: 'The Wolf', emoji: '🐺', color: '#94a3b8', color2: '#475569', badge: 'Spirit animal',
    matches: ['bear', 'dolphin'],
    description: 'Loyal to the bone and happiest with your pack. You lead when it is needed, protect your own, and never forget who showed up for you.',
  },
  owl: {
    label: 'The Owl', emoji: '🦉', color: '#a78bfa', color2: '#6d28d9', badge: 'Spirit animal',
    matches: ['cat', 'fox'],
    description: 'Quiet, watchful and wiser than you let on. You see what others miss, and when you finally speak, people listen.',
  },
  fox: {
    label: 'The Fox', emoji: '🦊', color: '#fb923c', color2: '#dc2626', badge: 'Spirit animal',
    matches: ['owl', 'dolphin'],
    description: 'Quick, clever and impossible to corner. You think on your feet, find the shortcut, and usually get away with it.',
  },
  dolphin: {
    label: 'The Dolphin', emoji: '🐬', color: '#38bdf8', color2: '#2563eb', badge: 'Spirit animal',
    matches: ['wolf', 'fox'],
    description: 'Playful, social and full of energy. You turn any group into a party and make people feel instantly at ease.',
  },
  bear: {
    label: 'The Bear', emoji: '🐻', color: '#d97706', color2: '#92400e', badge: 'Spirit animal',
    matches: ['wolf', 'cat'],
    description: 'Strong, calm and deeply protective. You love good food and long rests, and nobody wants to see you angry.',
  },
  cat: {
    label: 'The Cat', emoji: '🐱', color: '#f472b6', color2: '#be185d', badge: 'Spirit animal',
    matches: ['owl', 'bear'],
    description: 'Independent, graceful and entirely your own person. You give affection on your terms, which is exactly why it means so much.',
  },
};

// Every animal appears in six of the nine questions.
const questions = [
  image('Pick your perfect evening.', [
    opt('A bonfire with my closest people', { wolf: 1 }, '🔥'),
    opt('A book and total silence', { owl: 1 }, '📖'),
    opt('Game night — and I intend to win', { fox: 1 }, '🎲'),
    opt('Dancing until late', { dolphin: 1 }, '🎶'),
  ]),
  choice('A problem appears. You...', [
    opt('Step back and study it first', { owl: 1 }),
    opt('Find the clever shortcut', { fox: 1 }),
    opt('Call a friend and laugh about it', { dolphin: 1 }),
    opt('Stay calm and deal with it steadily', { bear: 1 }),
  ]),
  choice('Your friends love you for...', [
    opt('Your quick wit', { fox: 1 }),
    opt('Making everything more fun', { dolphin: 1 }),
    opt('Being their safe place', { bear: 1 }),
    opt('Your honesty — you never fake it', { cat: 1 }),
  ]),
  image('Choose a place to live.', [
    opt('A beach town', { dolphin: 1 }, '🏝️'),
    opt('A cabin in the mountains', { bear: 1 }, '🏔️'),
    opt('A flat of my own in the city', { cat: 1 }, '🏙️'),
    opt('A big house with everyone I love', { wolf: 1 }, '🌲'),
  ]),
  choice('On a lazy Sunday you...', [
    opt('Eat well and nap', { bear: 1 }),
    opt('Do exactly what I feel like, alone', { cat: 1 }),
    opt('Round everyone up for something', { wolf: 1 }),
    opt('Finally get to think in peace', { owl: 1 }),
  ]),
  choice('Someone crosses you. You...', [
    opt("Walk away. They're not worth it", { cat: 1 }),
    opt('Stand your ground — and so does your pack', { wolf: 1 }),
    opt('Notice everything and say little', { owl: 1 }),
    opt('Outsmart them quietly', { fox: 1 }),
  ]),
  choice("What's your superpower?", [
    opt('Loyalty', { wolf: 1 }),
    opt('Cunning', { fox: 1 }),
    opt('Strength', { bear: 1 }),
    opt('Joy', { dolphin: 1 }),
  ]),
  choice('Your ideal pace of life is...', [
    opt('Slow and thoughtful', { owl: 1 }),
    opt('Fast and social', { dolphin: 1 }),
    opt('Entirely on my terms', { cat: 1 }),
    opt('Steady, with long rests', { bear: 1 }),
  ]),
  image('Pick a time of day.', [
    opt('Dawn', { wolf: 1 }, '🌅'),
    opt('Midnight', { owl: 1 }, '🌙'),
    opt('Dusk', { fox: 1 }, '🌆'),
    opt('A sunny afternoon nap', { cat: 1 }, '☀️'),
  ]),
];

const spiritAnimal = {
  id: 'spirit-animal',
  title: 'Spirit Animal',
  heading: ['Meet Your', 'Spirit Animal'],
  emoji: '🐾',
  blurb: 'Wolf, owl, fox, dolphin, bear or cat — which one walks beside you?',
  typewriter: ['Wolf? Owl? Fox?', `${questions.length} questions. One animal.`, 'Find the creature that matches your soul.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Go with your first instinct',
    'Meet your animal and see which ones came close',
  ],
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default spiritAnimal;
