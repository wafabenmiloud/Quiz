import React, { useMemo, useState } from "react";
import "./Result.css";
import { Link } from "react-router-dom";
import { ELEMENTS, ELEMENT_KEYS } from "../data/quizzes/zodiac";
import { dailyHoroscope } from "../data/horoscope";
import { lastZodiac } from "../helper/helper";
import { useTheme } from "../hooks/useTheme";

/** Daily horoscope for the element from the user's last zodiac result. */
export default function Today() {
  const mine = useMemo(() => {
    const saved = lastZodiac();
    return saved && ELEMENTS[saved.element] ? saved : null;
  }, []);
  const [element, setElement] = useState(mine?.element || ELEMENT_KEYS[0]);

  const today = useMemo(() => new Date(), []);
  const reading = dailyHoroscope(element, today);
  const meta = ELEMENTS[element];

  useTheme(meta.color, meta.color2);

  return (
    <div className="result-page">
      <div className="result-card">
        <p className="shared-intro">
          {today.toLocaleDateString("en", { weekday: "long", month: "long", day: "numeric" })}
        </p>

        <div className="result-emoji">{meta.emoji}</div>
        <span className="result-badge">{meta.label} · today</span>

        <h2 className="result-sign">
          {mine && mine.element === element ? `${mine.name}'s horoscope` : `${meta.label} horoscope`}
        </h2>
        {mine && mine.element === element && <p className="result-blend">{mine.sign}</p>}

        <p className="result-traits">{reading.text}</p>

        <div className="result-stats">
          <div className="result-stat"><span className="stat-label">Mood</span><span className="stat-value small">{reading.mood}</span></div>
          <div className="result-stat"><span className="stat-label">Colour</span><span className="stat-value small">{reading.colour}</span></div>
          <div className="result-stat"><span className="stat-label">Lucky number</span><span className="stat-value small">{reading.number}</span></div>
          <div className="result-stat"><span className="stat-label">Power hour</span><span className="stat-value small">{reading.hour}</span></div>
        </div>

        <div className="result-tally" role="tablist" aria-label="Element">
          {ELEMENT_KEYS.map((key) => (
            <button
              key={key}
              role="tab"
              aria-selected={key === element}
              className={`tally-pill${key === element ? " dominant" : ""}`}
              onClick={() => setElement(key)}
            >
              {ELEMENTS[key].emoji} {ELEMENTS[key].label}
              {mine?.element === key ? " (you)" : ""}
            </button>
          ))}
        </div>

        {!mine && (
          <p className="section-hint">
            Not sure which element you are? Take the zodiac quiz and this page will remember.
          </p>
        )}

        <div className="result-cta">
          <Link className="btn" to="/">{mine ? "Back to quizzes" : "Find my element"}</Link>
        </div>

        <p className="fine-print">For fun only — a new reading appears every day at midnight.</p>
      </div>
    </div>
  );
}
