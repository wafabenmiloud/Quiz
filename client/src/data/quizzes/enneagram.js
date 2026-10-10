import { opt, choice, image, outcomeQuiz } from '../../quiz/engine';

const OUTCOMES = {
  t1: {
    label: 'The Reformer', emoji: '⚖️', color: '#38bdf8', color2: '#2563eb', badge: 'Enneagram · Type 1',
    matches: ['t7', 't9'],
    description: 'Principled, purposeful and self-controlled. You have a clear sense of right and wrong and work hard to improve things — starting with yourself.',
  },
  t2: {
    label: 'The Helper', emoji: '💝', color: '#fb7185', color2: '#e11d48', badge: 'Enneagram · Type 2',
    matches: ['t4', 't8'],
    description: 'Generous, warm and people-focused. You notice what others need before they say it, and you feel best when you are making a difference to someone.',
  },
  t3: {
    label: 'The Achiever', emoji: '🏆', color: '#f59e0b', color2: '#ea580c', badge: 'Enneagram · Type 3',
    matches: ['t6', 't9'],
    description: 'Driven, adaptable and success-oriented. You set goals, hit them, and know how to present yourself at your best.',
  },
  t4: {
    label: 'The Individualist', emoji: '🎭', color: '#a78bfa', color2: '#7c3aed', badge: 'Enneagram · Type 4',
    matches: ['t2', 't5'],
    description: 'Expressive, sensitive and true to yourself. You feel things deeply and want your life to be unmistakably your own.',
  },
  t5: {
    label: 'The Investigator', emoji: '🔬', color: '#94a3b8', color2: '#475569', badge: 'Enneagram · Type 5',
    matches: ['t4', 't7'],
    description: 'Perceptive, private and independent. You step back to observe, gather knowledge, and guard your time and energy carefully.',
  },
  t6: {
    label: 'The Loyalist', emoji: '🧷', color: '#22c55e', color2: '#0f766e', badge: 'Enneagram · Type 6',
    matches: ['t9', 't3'],
    description: 'Committed, responsible and alert to risk. You prepare for what could go wrong and stand by the people and causes you trust.',
  },
  t7: {
    label: 'The Enthusiast', emoji: '🎈', color: '#facc15', color2: '#f97316', badge: 'Enneagram · Type 7',
    matches: ['t1', 't5'],
    description: 'Spontaneous, upbeat and always planning the next thing. You chase new experiences and keep your options wide open.',
  },
  t8: {
    label: 'The Challenger', emoji: '🦁', color: '#f43f5e', color2: '#b91c1c', badge: 'Enneagram · Type 8',
    matches: ['t2', 't9'],
    description: 'Strong, decisive and protective. You take charge, say what you mean, and refuse to be controlled.',
  },
  t9: {
    label: 'The Peacemaker', emoji: '🌿', color: '#34d399', color2: '#0d9488', badge: 'Enneagram · Type 9',
    matches: ['t6', 't8'],
    description: 'Easygoing, accepting and steady. You see every side, keep the peace, and make people feel comfortable around you.',
  },
};

// Each type appears in five questions: four of the nine choices, plus one tile question.
const questions = [
  choice('What drives you most?', [
    opt('Doing things the right way', { t1: 1 }),
    opt('Achieving something impressive', { t3: 1 }),
    opt('Understanding how things really work', { t5: 1 }),
    opt('Having as many great experiences as possible', { t7: 1 }),
  ]),
  choice('What do you fear most?', [
    opt('Being unwanted or unneeded', { t2: 1 }),
    opt('Being ordinary, with nothing that is truly mine', { t4: 1 }),
    opt('Being left without support when things go wrong', { t6: 1 }),
    opt("Being controlled or at someone's mercy", { t8: 1 }),
  ]),
  image('Pick your role in the group.', [
    opt('The protector', { t8: 1 }, '🛡️'),
    opt('The mediator', { t9: 1 }, '🕊️'),
    opt('The referee', { t1: 1 }, '⚖️'),
  ]),
  choice('At a party you are...', [
    opt('Working the room and making an impression', { t3: 1 }),
    opt('In a corner having one deep conversation', { t5: 1 }),
    opt('Starting the games and planning the after-party', { t7: 1 }),
    opt('Happily going along with whatever the group wants', { t9: 1 }),
  ]),
  choice('Under pressure you tend to...', [
    opt('Withdraw into your feelings', { t4: 1 }),
    opt('Run through every worst-case scenario', { t6: 1 }),
    opt('Push back harder', { t8: 1 }),
    opt('Get critical — of yourself most of all', { t1: 1 }),
  ]),
  choice('A free Saturday is for...', [
    opt('A rabbit hole of reading or research', { t5: 1 }),
    opt('Three different plans, all exciting', { t7: 1 }),
    opt('Doing nothing in particular, in peace', { t9: 1 }),
    opt('Helping a friend who needs a hand', { t2: 1 }),
  ]),
  image('What would you rather be known for?', [
    opt('My kindness', { t2: 1 }, '💝'),
    opt('My achievements', { t3: 1 }, '🏆'),
    opt('My originality', { t4: 1 }, '🎭'),
  ]),
  choice('People rely on you to...', [
    opt('Spot the problem nobody else saw coming', { t6: 1 }),
    opt('Take charge when no one else will', { t8: 1 }),
    opt('Hold everyone to a high standard', { t1: 1 }),
    opt('Get it done and make it look good', { t3: 1 }),
  ]),
  choice('What do you want most from the people close to you?', [
    opt('Freedom and fun', { t7: 1 }),
    opt('Calm, with no drama', { t9: 1 }),
    opt('To feel appreciated', { t2: 1 }),
    opt('To be truly understood', { t4: 1 }),
  ]),
  choice('In an argument you...', [
    opt('Say it straight, loudly if needed', { t8: 1 }),
    opt('Explain why you are right, point by point', { t1: 1 }),
    opt('Find the fastest route to a win-win', { t3: 1 }),
    opt('Go quiet and think it through later', { t5: 1 }),
  ]),
  image('Pick your survival tool.', [
    opt('A library', { t5: 1 }, '📚'),
    opt('A backup plan', { t6: 1 }, '🗺️'),
    opt('A plane ticket', { t7: 1 }, '✈️'),
  ]),
  choice('Your inner voice usually says...', [
    opt("“It's fine, let it go.”", { t9: 1 }),
    opt('“Who needs me right now?”', { t2: 1 }),
    opt('“Something is missing.”', { t4: 1 }),
    opt('“But what if it goes wrong?”', { t6: 1 }),
  ]),
];

const enneagram = {
  id: 'enneagram',
  title: 'Enneagram',
  heading: ['Discover Your', 'Enneagram Type'],
  emoji: '🌀',
  blurb: 'Nine types built around what motivates you and what you fear.',
  typewriter: ['Reformer? Helper? Challenger?', `${questions.length} questions. Nine types.`, 'Find out what really drives you.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Choose what has been true for most of your life',
    'Get your type and how close the other eight came',
  ],
  note: 'A short quiz can only suggest a type. For self-reflection, not a diagnosis.',
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default enneagram;
