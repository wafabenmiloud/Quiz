import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./Result.css";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { rememberZodiac, saveResult } from "../helper/helper";
import { resetAllAction } from "../redux/question_reducer";
import { markSaved, resetResultAction } from "../redux/result_reducer";
import { getQuiz } from "../data/quizzes";
import { birthSign, compatibility, ELEMENTS } from "../data/quizzes/zodiac";
import { isAnswered, scoreQuiz, SLIDER_LABELS } from "../quiz/engine";
import { useTheme } from "../hooks/useTheme";
import RadarChart from "./RadarChart";
import { Reading, Reveal, ShareActions, Stats } from "./ResultExtras";

/** the AI reading costs money per use, so it stays off unless switched on at build time */
const AI_READING = process.env.REACT_APP_AI_READING === "true";

export default function Result() {
  const dispatch = useDispatch();
  const { quizId } = useSelector((state) => state.questions);
  const { result, userId, birthday, challenger, saved } = useSelector((state) => state.result);

  const quiz = getQuiz(quizId);
  const complete = Boolean(quiz) && result.length === quiz.questions.length && result.every(isAnswered);

  const { scores, last, outcome } = useMemo(() => {
    if (!complete) return {};
    const tally = scoreQuiz(quiz, result);
    return { ...tally, outcome: quiz.resolve(tally.scores, tally.last) };
  }, [complete, quiz, result]);

  // only play the reveal the first time this result is seen, not on every refresh
  const [revealing, setRevealing] = useState(!saved);
  const endReveal = useCallback(() => setRevealing(false), []);

  useTheme(outcome?.color, outcome?.color2);

  /** send the result to the server once, and remember it for the daily horoscope */
  useEffect(() => {
    if (!outcome || saved) return;
    if (quiz.id === "zodiac") {
      rememberZodiac({ name: userId, sign: outcome.title, element: outcome.element });
    }
    saveResult({
      username: userId,
      quizId: quiz.id,
      outcome: outcome.key,
      group: outcome.groupKey || outcome.key,
    }).finally(() => dispatch(markSaved()));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outcome?.key, saved]);

  if (!quiz) return <Navigate to="/" replace />;
  if (!complete) return <Navigate to="/quiz" replace />;

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  const isZodiac = quiz.id === "zodiac";
  const born = isZodiac ? birthSign(birthday) : null;
  const friend = challenger && challenger.quizId === quiz.id ? challenger : null;
  const match = friend && isZodiac ? compatibility(scores, friend.scores) : null;

  const readingPayload = {
    quiz: quiz.title,
    name: userId,
    outcome: outcome.title,
    blend: outcome.breakdown.map((r) => `${r.label} ${r.pct}%`).join(", "),
    answers: quiz.questions.map((q, i) => ({
      question: q.question,
      answer: q.type === "slider"
        ? SLIDER_LABELS[result[i]]
        : q.options[result[i]].text,
    })),
  };

  if (revealing) {
    return <Reveal symbols={outcome.breakdown.map((r) => r.emoji)} onDone={endReveal} />;
  }

  return (
    <div className="result-page">
      <div className="result-card">

        <div className="result-emoji">{outcome.emoji}</div>

        <span className="result-badge">{outcome.badge}</span>

        <h2 className="result-sign">{outcome.title}</h2>

        {outcome.blend && <p className="result-blend">{outcome.blend}</p>}

        <p className="result-traits">{outcome.description}</p>

        <div className="result-divider" />

        <RadarChart rows={outcome.breakdown} max={outcome.radarMax} />

        <div className="result-stats">
          <div className="result-stat">
            <span className="stat-label">Hello</span>
            <span className="stat-value">{userId || "Star"}</span>
          </div>
          {outcome.facts.map((fact) => (
            <div className="result-stat" key={fact.label}>
              <span className="stat-label">{fact.label}</span>
              <span className="stat-value small">{fact.value}</span>
            </div>
          ))}
        </div>

        {outcome.details && (
          <div className="result-section">
            <h3>In detail</h3>
            <div className="detail-list">
              {outcome.details.map((row) => (
                <div key={row.key} className="detail-row">
                  <div className="detail-head">
                    <span>{row.emoji} {row.label}</span>
                    <span>{row.pct}%</span>
                  </div>
                  <span className="stats-track"><span style={{ width: `${row.pct}%`, background: row.color }} /></span>
                  <p>{row.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {born && (
          <div className="result-section">
            <h3>Birth sign vs. personality</h3>
            <p className="compare-line">
              <span>By birth<br /><strong>{born.name} {born.glyph}</strong><br />{ELEMENTS[born.element].emoji} {ELEMENTS[born.element].label}</span>
              <span className="compare-vs">vs</span>
              <span>By personality<br /><strong>{outcome.title}</strong><br />{outcome.emoji} {outcome.groupLabel}</span>
            </p>
            <p className="section-hint">
              {born.key === outcome.key
                ? "A perfect match — you are exactly who the stars said you'd be."
                : born.element === outcome.element
                  ? `Same element, different sign: you're a ${born.name} with a ${outcome.title.split(" ")[0]} streak.`
                  : `Your chart says ${ELEMENTS[born.element].label}, but you live like ${outcome.groupLabel}.`}
            </p>
          </div>
        )}

        {friend && (
          <div className="result-section">
            <h3>You &amp; {friend.name}</h3>
            {match ? (
              <>
                <p className="compat-score">{match.score}%</p>
                <p className="section-hint">
                  {outcome.title} + {friend.title} — {match.verdict}
                </p>
              </>
            ) : (
              <p className="section-hint">
                {friend.title === outcome.title
                  ? `You both got ${outcome.title} — you speak the same language.`
                  : outcome.matches.includes(quiz.resolve(friend.scores, friend.last).key)
                    ? `You got ${outcome.title}; ${friend.name} got ${friend.title}. That's one of your best matches.`
                    : `You got ${outcome.title}; ${friend.name} got ${friend.title}. Different styles, plenty to learn from each other.`}
              </p>
            )}
          </div>
        )}

        <Stats quizId={quiz.id} outcome={outcome} refreshKey={saved} />

        {AI_READING && <Reading payload={readingPayload} />}

        <ShareActions quiz={quiz} name={userId} outcome={outcome} scores={scores} last={last} />

        <div className="result-cta">
          <Link className="btn" to="/" onClick={onRestart}>
            Try Another Quiz
          </Link>
          {isZodiac && <Link className="btn ghost" to="/today">Today's horoscope</Link>}
        </div>

        {quiz.note && <p className="fine-print">{quiz.note}</p>}

      </div>
    </div>
  );
}
