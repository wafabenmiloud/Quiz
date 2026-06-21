import React from "react";
import "./Result.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { attempts_Number, getZodiacResult } from "../helper/helper";
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";

const ELEMENT_COLORS = {
  Fire:  "#ff6b35",
  Earth: "#6aaa5e",
  Air:   "#7ec8e3",
  Water: "#5b8dee",
};

const ELEMENTS = [
  { emoji: "🔥", label: "Fire",  idx: 0 },
  { emoji: "🌿", label: "Earth", idx: 1 },
  { emoji: "💨", label: "Air",   idx: 2 },
  { emoji: "🌊", label: "Water", idx: 3 },
];

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const attempts    = attempts_Number(result);
  const zodiac      = getZodiacResult(result, answers);
  const accentColor = ELEMENT_COLORS[zodiac.element] || "#c944e8";
  const maxTally    = Math.max(...zodiac.tally);

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="result-page">
      <div className="result-card">

        <div className="result-emoji">{zodiac.emoji}</div>

        <span
          className="result-badge"
          style={{
            color:       accentColor,
            borderColor: `${accentColor}66`,
            background:  `${accentColor}18`,
          }}
        >
          {zodiac.element} Sign
        </span>

        <h2 className="result-sign">{zodiac.sign}</h2>

        <p className="result-traits">{zodiac.traits}</p>

        <div className="result-divider" />

        <div className="result-stats">
          <div className="result-stat">
            <span className="stat-label">Hello</span>
            <span className="stat-value">{userId || "Star"}</span>
          </div>
          <div className="result-stat">
            <span className="stat-label">Answered</span>
            <span className="stat-value">{attempts} / {queue.length}</span>
          </div>
          <div className="result-stat">
            <span className="stat-label">Compatible</span>
            <span className="stat-value small">{zodiac.compatible}</span>
          </div>
        </div>

        <div className="result-tally">
          {ELEMENTS.map(({ emoji, label, idx }) => {
            const isDominant = zodiac.tally[idx] === maxTally;
            return (
              <div
                key={label}
                className={`tally-pill${isDominant ? " dominant" : ""}`}
                style={isDominant ? { background: accentColor } : {}}
              >
                {emoji} {label}: {zodiac.tally[idx]}
              </div>
            );
          })}
        </div>

        <div className="result-cta">
          <Link className="btn" to="/" onClick={onRestart}>
            Try Again
          </Link>
        </div>

      </div>
    </div>
  );
}
