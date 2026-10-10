import zodiac from './zodiac';
import loveLanguage from './loveLanguage';
import tarot from './tarot';
import sixteenTypes from './sixteenTypes';
import bigFive from './bigFive';
import enneagram from './enneagram';
import spiritAnimal from './spiritAnimal';
import houseSorting from './houseSorting';
import flagsQuiz from './flags';

/** The quiz catalogue. Add a quiz to a section and it appears on the home page. */
export const SECTIONS = [
  { title: 'Just for fun', quizzes: [zodiac, spiritAnimal, houseSorting, flagsQuiz, tarot] },
  { title: 'Know yourself', quizzes: [sixteenTypes, bigFive, enneagram, loveLanguage] },
];

export const QUIZZES = SECTIONS.flatMap((section) => section.quizzes);

export const DEFAULT_QUIZ_ID = zodiac.id;

export const getQuiz = (id) => QUIZZES.find((q) => q.id === id) || null;
