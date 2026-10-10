import React, { useMemo } from "react";
import "./Result.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setChallenger } from "../redux/result_reducer";
import { decodeShare } from "../helper/share";
import { useTheme } from "../hooks/useTheme";
import RadarChart from "./RadarChart";

/** Landing page for a friend's share link. */
export default function SharedResult() {
  const { code } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shared = useMemo(() => decodeShare(code), [code]);
  const outcome = useMemo(
    () => (shared ? shared.quiz.resolve(shared.scores, shared.last) : null),
    [shared]
  );

  useTheme(outcome?.color, outcome?.color2);

  if (!shared) {
    return (
      <div className="result-page">
        <div className="result-card">
          <div className="result-emoji">🌫️</div>
          <h2 className="result-sign">This link has faded</h2>
          <p className="result-traits">The share link is incomplete or no longer valid.</p>
          <Link className="btn" to="/">Take the quiz</Link>
        </div>
      </div>
    );
  }

  const { quiz, name, scores, last } = shared;

  function acceptChallenge() {
    dispatch(setChallenger({ name, title: outcome.title, quizId: quiz.id, scores, last }));
    navigate("/");
  }

  return (
    <div className="result-page">
      <div className="result-card">
        <p className="shared-intro">{name} took the {quiz.title} quiz and got</p>

        <div className="result-emoji">{outcome.emoji}</div>
        <span className="result-badge">{outcome.badge}</span>
        <h2 className="result-sign">{outcome.title}</h2>
        {outcome.blend && <p className="result-blend">{outcome.blend}</p>}
        <p className="result-traits">{outcome.description}</p>

        <RadarChart rows={outcome.breakdown} max={outcome.radarMax} />

        <div className="result-cta">
          <button className="btn" onClick={acceptChallenge}>
            {quiz.id === "zodiac" ? `Check your compatibility with ${name}` : "Take the quiz and compare"}
          </button>
        </div>
      </div>
    </div>
  );
}
