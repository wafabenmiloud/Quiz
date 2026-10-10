import React from "react";

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 82;

const point = (i, n, r) => {
  const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
  return [CENTER + Math.cos(angle) * r, CENTER + Math.sin(angle) * r];
};

const ring = (n, r) => Array.from({ length: n }, (_, i) => point(i, n, r).join(",")).join(" ");

/**
 * Radar ("spider") chart of a result's blend. rows: [{ key, label, emoji, pct }]
 * Pass `max` when the percentages are absolute scores rather than shares of a whole.
 */
export default function RadarChart({ rows, max: fixedMax }) {
  const n = rows.length;
  // scale to the strongest axis so the shape stays readable when the blend is even
  const max = fixedMax || Math.max(...rows.map((r) => r.pct), 1);
  const shape = rows.map((r, i) => point(i, n, RADIUS * Math.max(r.pct / max, 0.04)).join(",")).join(" ");
  const summary = rows.map((r) => `${r.label} ${r.pct}%`).join(", ");

  return (
    <svg className="radar" viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Your blend: ${summary}`}>
      {[0.33, 0.66, 1].map((f) => (
        <polygon key={f} className="radar-ring" points={ring(n, RADIUS * f)} />
      ))}
      {rows.map((r, i) => {
        const [x, y] = point(i, n, RADIUS);
        return <line key={r.key} className="radar-axis" x1={CENTER} y1={CENTER} x2={x} y2={y} />;
      })}
      <polygon className="radar-shape" points={shape} />
      {rows.map((r, i) => {
        const [x, y] = point(i, n, RADIUS + 26);
        return (
          <text key={r.key} className="radar-label" x={x} y={y} textAnchor="middle" dominantBaseline="middle">
            <tspan x={x} dy="-0.45em">{r.emoji}</tspan>
            <tspan x={x} dy="1.25em" className="radar-pct">{r.pct}%</tspan>
          </text>
        );
      })}
    </svg>
  );
}
