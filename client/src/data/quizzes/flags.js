import { opt, choice, image, outcomeQuiz } from '../../quiz/engine';

const flags = (green, red) => [
  { label: '🟢 Green flag', value: green },
  { label: '🚩 Red flag', value: red },
];

const OUTCOMES = {
  book: {
    label: 'The Open Book', emoji: '📖', color: '#38bdf8', color2: '#2563eb', badge: 'Dating style',
    matches: ['retriever', 'planner'],
    description: 'You say what you feel, when you feel it. Nobody ever has to guess where they stand with you — for better and, occasionally, at 2 am.',
    facts: flags('Honest about feelings', 'Needs to talk it out right now'),
  },
  ghost: {
    label: 'The Slow Replier', emoji: '👻', color: '#94a3b8', color2: '#475569', badge: 'Dating style',
    matches: ['spirit', 'planner'],
    description: 'Independent and low-drama, you give people room to breathe. You also give them three days to wonder whether you are alive.',
    facts: flags('Never clingy', 'Vanishes mid-conversation'),
  },
  retriever: {
    label: 'The Golden Retriever', emoji: '🐕', color: '#facc15', color2: '#f97316', badge: 'Dating style',
    matches: ['book', 'detective'],
    description: 'All in, all the time. You love loudly, celebrate everything, and have already told your friends about them.',
    facts: flags('Endlessly affectionate', 'Too much, too soon'),
  },
  planner: {
    label: 'The Planner', emoji: '🗓️', color: '#34d399', color2: '#0d9488', badge: 'Dating style',
    matches: ['book', 'ghost'],
    description: 'Reliable to the minute. You remember every date, book every table, and get slightly twitchy when plans change.',
    facts: flags('Always shows up', 'Runs love like a calendar'),
  },
  detective: {
    label: 'The Detective', emoji: '🕵️', color: '#a78bfa', color2: '#6d28d9', badge: 'Dating style',
    matches: ['retriever', 'planner'],
    description: 'You notice everything: the mood, the pause, the thing they mentioned once in March. Mostly this is lovely. Mostly.',
    facts: flags('Remembers every detail', 'Knows who liked the photo'),
  },
  spirit: {
    label: 'The Free Spirit', emoji: '🦋', color: '#fb7185', color2: '#e11d48', badge: 'Dating style',
    matches: ['ghost', 'retriever'],
    description: 'Spontaneous, fun and impossible to pin down. Life with you is an adventure, as long as nobody asks where this is going.',
    facts: flags('Never boring', 'Allergic to labels'),
  },
};

// Every style appears in six of the nine questions.
const questions = [
  choice("They haven't replied in five hours. You...", [
    opt("Ask if everything's okay", { book: 1 }),
    opt("Hadn't noticed — I haven't replied either", { ghost: 1 }),
    opt('Send a meme, a selfie and a voice note', { retriever: 1 }),
    opt("Assume they're busy; we have plans on Friday anyway", { planner: 1 }),
  ]),
  choice('First date. You...', [
    opt('Keep it short and mysterious', { ghost: 1 }),
    opt('Already like them a lot', { retriever: 1 }),
    opt('Booked the table a week ago', { planner: 1 }),
    opt('Did some light research beforehand', { detective: 1 }),
  ]),
  image('Pick your gift style.', [
    opt('Something huge and heartfelt', { retriever: 1 }, '💐'),
    opt('Tickets booked months ahead', { planner: 1 }, '🎟️'),
    opt('The exact thing they mentioned once', { detective: 1 }, '🎁'),
    opt('A surprise trip, leaving now', { spirit: 1 }, '🎲'),
  ]),
  choice('Their ex likes their photo. You...', [
    opt("Don't have time to worry about it", { planner: 1 }),
    opt('Already know who the ex follows', { detective: 1 }),
    opt('Shrug. People are free', { spirit: 1 }),
    opt('Mention it and talk it through', { book: 1 }),
  ]),
  choice('After an argument you...', [
    opt('Replay every word looking for clues', { detective: 1 }),
    opt('Go for a drive to clear my head', { spirit: 1 }),
    opt('Want to resolve it tonight', { book: 1 }),
    opt('Need a day or three of silence', { ghost: 1 }),
  ]),
  choice('“So… what are we?” You say...', [
    opt('“Why label a good thing?”', { spirit: 1 }),
    opt("“Let's talk about it properly.”", { book: 1 }),
    opt('“…can I text you my answer?”', { ghost: 1 }),
    opt('“Yours. Obviously.”', { retriever: 1 }),
  ]),
  choice('Your texting style is...', [
    opt('Long, honest paragraphs', { book: 1 }),
    opt('Good morning and good night, every day', { retriever: 1 }),
    opt("Short — but I see when you're online", { detective: 1 }),
    opt('“Confirming 7 pm Saturday?”', { planner: 1 }),
  ]),
  choice('A weekend together should be...', [
    opt('Nice, with some time apart', { ghost: 1 }),
    opt('Planned hour by hour', { planner: 1 }),
    opt('Made up as we go', { spirit: 1 }),
    opt("All about what they've been hinting at", { detective: 1 }),
  ]),
  image('Pick your love-song energy.', [
    opt('A heartfelt ballad', { book: 1 }, '🎤'),
    opt('An instrumental', { ghost: 1 }, '🎧'),
    opt('A full marching band', { retriever: 1 }, '🎺'),
    opt('A road-trip anthem', { spirit: 1 }, '🎸'),
  ]),
];

const flagsQuiz = {
  id: 'flags',
  title: 'Red Flag / Green Flag',
  heading: ["What's Your", 'Red Flag & Green Flag?'],
  emoji: '🚩',
  blurb: 'Your best and worst dating habit, delivered with love.',
  typewriter: ['Green flag? Red flag? Both?', `${questions.length} questions. Zero judgement.`, 'Find out what dating you is really like.'],
  steps: [
    `Answer ${questions.length} quick questions honestly`,
    'Be honest — nobody is watching',
    'Get your dating style, with one green flag and one red flag',
  ],
  note: 'Just for fun. Nobody is only their red flag.',
  questions,
  ...outcomeQuiz(OUTCOMES),
};

export default flagsQuiz;
