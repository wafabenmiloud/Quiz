import React, { useEffect, useState } from "react";
import { fetchReading, fetchStats } from "../helper/helper";
import { drawShareCard, shareUrl } from "../helper/share";

/* ── Reveal ─────────────────────────────────────────────────── */
const REVEAL_MS = 2400;

/** Full-screen "reading the stars…" moment before the result appears. */
export function Reveal({ symbols, onDone }) {
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const timer = setTimeout(onDone, reduced ? 0 : REVEAL_MS);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="reveal" role="status" onClick={onDone}>
      <div className="reveal-orbit">
        {symbols.map((s, i) => (
          <span key={i} style={{ "--i": i, "--n": symbols.length }}>{s}</span>
        ))}
      </div>
      <p>Reading the stars…</p>
    </div>
  );
}

/* ── Live stats ─────────────────────────────────────────────── */
/**
 * "23% of people got Water". `refreshKey` changes once the user's own result
 * has been saved, so their answer is included in what they see.
 */
export function Stats({ quizId, outcome, refreshKey }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchStats(quizId).then((data) => {
      if (!cancelled && data && !data.error) setStats(data);
    });
    return () => { cancelled = true; };
  }, [quizId, refreshKey]);

  if (!stats || !stats.total) return null;

  const useGroups = Boolean(outcome.groupKey);
  const counts = useGroups ? stats.groups : stats.outcomes;
  const mine = counts[useGroups ? outcome.groupKey : outcome.key] || 0;
  const share = Math.round((mine / stats.total) * 100);
  const sameOutcome = stats.outcomes[outcome.key] || 0;

  return (
    <div className="result-section">
      <h3>Live stats</h3>
      <p className="stats-line">
        <strong>{share}%</strong> of {stats.total.toLocaleString()} quiz-takers got{" "}
        {useGroups ? outcome.groupLabel : outcome.title}
        {sameOutcome > 0 && <> · you're <strong>{outcome.title}</strong> #{sameOutcome.toLocaleString()}</>}
      </p>
      <div className="stats-bars">
        {(outcome.statsRows || outcome.breakdown).map((row) => {
          const pct = Math.round(((counts[row.key] || 0) / stats.total) * 100);
          return (
            <div key={row.key} className="stats-row">
              <span className="stats-label">{row.emoji} {row.label}</span>
              <span className="stats-track"><span style={{ width: `${pct}%`, background: row.color }} /></span>
              <span className="stats-pct">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── AI reading ─────────────────────────────────────────────── 
const READING_ERRORS = {
  not_configured: "The oracle isn't set up on this server yet.",
  rate_limited: "The oracle needs a short rest. Try again in a few minutes.",
};
export function Reading({ payload }) {
  const [state, setState] = useState({ status: "idle", text: "" });

  async function ask() {
    setState({ status: "loading", text: "" });
    const data = await fetchReading(payload);
    if (data?.reading) {
      setState({ status: "done", text: data.reading });
    } else {
      setState({
        status: "error",
        text: READING_ERRORS[data?.error] || "The oracle is unreachable right now. Please try again later.",
      });
    }
  }

  return (
    <div className="result-section">
      <h3>Your personal reading</h3>
      {state.status === "done" ? (
        <p className="reading-text">{state.text}</p>
      ) : (
        <>
          <p className="section-hint">An AI-written reading based on the answers you actually gave.</p>
          <button className="btn ghost" onClick={ask} disabled={state.status === "loading"}>
            {state.status === "loading" ? "Consulting the stars…" : "✨ Write my reading"}
          </button>
          {state.status === "error" && <p className="section-error" role="alert">{state.text}</p>}
        </>
      )}
    </div>
  );
}
/** Personalised paragraph written from the user's actual answers. */


/* ── Share ──────────────────────────────────────────────────── */
export function ShareActions({ quiz, name, outcome, scores, last }) {
  const [copied, setCopied] = useState(false);
  const url = shareUrl({ quizId: quiz.id, name, scores, last });
  const text = `I got ${outcome.title} on the ${quiz.title} quiz. What are you?`;

  function download() {
    const canvas = drawShareCard({ quiz, name, outcome });
    canvas.toBlob((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${quiz.id}-${outcome.key}.png`;
      link.click();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    }, "image/png");
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your link:", url);
    }
  }

  return (
    <div className="result-section">
      <h3>Share it</h3>
      <p className="section-hint">
        {quiz.id === "zodiac"
          ? "Send your link to a friend — when they finish the quiz you'll both see your compatibility."
          : "Send your link to a friend and compare results."}
      </p>
      <div className="share-actions">
        <button className="btn ghost" onClick={download}>⬇ Download card</button>
        <button className="btn ghost" onClick={copy}>{copied ? "✓ Link copied" : "🔗 Copy link"}</button>
        {navigator.share && (
          <button className="btn ghost" onClick={() => navigator.share({ title: quiz.title, text, url }).catch(() => {})}>
            ↗ Share
          </button>
        )}
      </div>
    </div>
  );
}
