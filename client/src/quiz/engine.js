/**
 * Quiz engine — shared by every quiz in the catalogue.
 *
 * A quiz is { id, title, questions, resolve(scores, last), ambient(scores, last) }.
 * Question types:
 *   choice | image | versus → options: [{ text, emoji?, scores: { key: weight } }]
 *   slider                  → left / right: { label, scores }, answered 0–4
 * An answer is always the option's ORIGINAL index (or the slider step), so
 * shuffling the display order never changes what an answer means.
 */

export const SLIDER_LABELS = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];
const SLIDER_NEUTRAL = 2;
const SLIDER_WEIGHTS = [1, 0.5, 0, 0.5, 1];

export const isAnswered = (v) => v !== null && v !== undefined;

export function optionCount(question) {
  return question.type === 'slider' ? SLIDER_LABELS.length : question.options.length;
}

/** One display permutation per question; sliders keep their natural order. */
export function shuffledOrder(quiz) {
  return quiz.questions.map((q) => {
    const order = Array.from({ length: optionCount(q) }, (_, i) => i);
    if (q.type === 'slider') return order;
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
  });
}

function contributions(question, value) {
  if (!isAnswered(value)) return [];
  if (question.type === 'slider') {
    const side = value < SLIDER_NEUTRAL ? question.left : value > SLIDER_NEUTRAL ? question.right : null;
    if (!side) return [];
    return Object.entries(side.scores).map(([key, w]) => [key, w * SLIDER_WEIGHTS[value]]);
  }
  const option = question.options[value];
  return option ? Object.entries(option.scores) : [];
}

/**
 * Tally every answer. `last[key]` is the index of the latest question that
 * scored for `key` — used to break ties in favour of the most recent answer.
 */
export function scoreQuiz(quiz, result) {
  const scores = {};
  const last = {};
  quiz.questions.forEach((q, i) => {
    contributions(q, result[i]).forEach(([key, w]) => {
      scores[key] = (scores[key] || 0) + w;
      last[key] = i;
    });
  });
  return { scores, last };
}

/** Highest-scoring key; ties go to whichever was answered most recently. */
export function leader(keys, scores, last = {}) {
  return keys.reduce((best, key) => {
    if (best === null) return key;
    const a = scores[key] || 0;
    const b = scores[best] || 0;
    if (a > b) return key;
    if (a === b && (last[key] ?? -1) > (last[best] ?? -1)) return key;
    return best;
  }, null);
}

const rank = (priority, key) => {
  const i = priority.indexOf(key);
  return i === -1 ? priority.length : i;
};

/**
 * Whole-number percentages that always add up to 100.
 * When rounding has to favour one of several equal scores, `priority` keys
 * (the winner first) get the extra point, so the display never contradicts the result.
 */
export function percentages(keys, scores, priority = []) {
  const total = keys.reduce((sum, k) => sum + (scores[k] || 0), 0);
  if (!total) return Object.fromEntries(keys.map((k) => [k, 0]));
  const exact = keys.map((k) => ((scores[k] || 0) / total) * 100);
  const floors = exact.map(Math.floor);
  let remainder = 100 - floors.reduce((a, b) => a + b, 0);
  exact
    .map((v, i) => [v - floors[i], i])
    .sort((a, b) => b[0] - a[0] || rank(priority, keys[a[1]]) - rank(priority, keys[b[1]]))
    .forEach(([, i]) => { if (remainder > 0) { floors[i]++; remainder--; } });
  return Object.fromEntries(keys.map((k, i) => [k, floors[i]]));
}

/** Breakdown rows (one per key) for charts and bars. */
export function breakdown(meta, scores, priority = []) {
  const keys = Object.keys(meta);
  const pct = percentages(keys, scores, priority);
  return keys.map((key) => ({ key, ...meta[key], pct: pct[key] }));
}

/** resolve() + ambient() for quizzes where the top-scoring outcome simply wins. */
export function outcomeQuiz(outcomes) {
  const keys = Object.keys(outcomes);
  return {
    resolve(scores, last) {
      const key = leader(keys, scores, last);
      const runnerUp = leader(keys.filter((k) => k !== key), scores, last);
      const rows = breakdown(outcomes, scores, [key, runnerUp]);
      const o = outcomes[key];
      return {
        key,
        title: o.label,
        emoji: o.emoji,
        badge: o.badge,
        description: o.description,
        color: o.color,
        color2: o.color2,
        breakdown: rows,
        blend: blendLine(rows, [key, runnerUp]),
        matches: o.matches || [],
        facts: [
          { label: 'Runner-up', value: `${outcomes[runnerUp].emoji} ${outcomes[runnerUp].label}` },
          ...(o.matches ? [{ label: 'Gets along with', value: o.matches.map((k) => outcomes[k].label).join(' & ') }] : []),
          ...(o.facts || []),
        ],
      };
    },
    ambient(scores, last) {
      if (!keys.some((k) => scores[k] > 0)) return null;
      const o = outcomes[leader(keys, scores, last)];
      return { color: o.color, color2: o.color2 };
    },
  };
}

/** "62% Fire · 25% Air" — the two strongest parts of the blend. */
export function blendLine(rows, priority = []) {
  return [...rows]
    .sort((a, b) => b.pct - a.pct || rank(priority, a.key) - rank(priority, b.key))
    .slice(0, 2)
    .filter((r) => r.pct > 0)
    .map((r) => `${r.pct}% ${r.label}`)
    .join(' · ');
}

/* ── Question builders (keep the data files readable) ───────── */
export const opt = (text, scores, emoji) => ({ text, scores, emoji });
export const choice = (question, options) => ({ type: 'choice', question, options });
export const image = (question, options) => ({ type: 'image', question, options });
export const versus = (question, a, b) => ({ type: 'versus', question, options: [a, b] });
export const slider = (question, leftScores, rightScores) => ({
  type: 'slider',
  question,
  left: { scores: leftScores },
  right: { scores: rightScores },
});
