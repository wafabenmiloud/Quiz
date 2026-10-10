import { getQuiz } from '../data/quizzes';

/** Share links carry the result itself, so they work without the server. */

function toBase64Url(text) {
    let binary = '';
    new TextEncoder().encode(text).forEach((b) => { binary += String.fromCharCode(b); });
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(code) {
    const binary = atob(code.replace(/-/g, '+').replace(/_/g, '/'));
    return new TextDecoder().decode(Uint8Array.from(binary, (c) => c.charCodeAt(0)));
}

export function encodeShare({ quizId, name, scores, last }) {
    return toBase64Url(JSON.stringify({ q : quizId, n : name, s : scores, l : last }));
}

const numbersOnly = (obj) => Object.fromEntries(
    Object.entries(obj && typeof obj === 'object' ? obj : {})
        .filter(([k, v]) => k.length <= 20 && typeof v === 'number' && Number.isFinite(v))
        .slice(0, 20)
);

/** Returns { quiz, name, scores, last } or null if the link is malformed. */
export function decodeShare(code) {
    try {
        const data = JSON.parse(fromBase64Url(code));
        const quiz = getQuiz(data.q);
        if (!quiz) return null;
        const scores = numbersOnly(data.s);
        if (!Object.keys(scores).length) return null;
        return {
            quiz,
            name : String(data.n || 'A friend').slice(0, 40),
            scores,
            last : numbersOnly(data.l)
        };
    } catch {
        return null;
    }
}

export function shareUrl(payload) {
    return `${window.location.origin}/share/${encodeShare(payload)}`;
}

/* ── Result card image ──────────────────────────────────────── */
const FONT = "Centra, -apple-system, 'Segoe UI', sans-serif";
const EMOJI = "'Apple Color Emoji', 'Segoe UI Emoji', 'Noto Color Emoji', sans-serif";

function wrap(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    text.split(' ').forEach((word) => {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = next;
        }
    });
    if (line) lines.push(line);
    return lines;
}

/** Draws a 1080×1350 card (portrait, fits stories and feeds) and returns the canvas. */
export function drawShareCard({ quiz, name, outcome }) {
    const W = 1080, H = 1350;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#09090f';
    ctx.fillRect(0, 0, W, H);
    const glow = ctx.createRadialGradient(W / 2, 330, 0, W / 2, 330, 760);
    glow.addColorStop(0, `${outcome.color}66`);
    glow.addColorStop(1, `${outcome.color}00`);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    const glow2 = ctx.createRadialGradient(W, H, 0, W, H, 700);
    glow2.addColorStop(0, `${outcome.color2}55`);
    glow2.addColorStop(1, `${outcome.color2}00`);
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillStyle = '#8e8eae';
    ctx.font = `600 30px ${FONT}`;
    ctx.fillText(`✦  ${quiz.title.toUpperCase()} QUIZ  ✦`, W / 2, 110);

    ctx.font = `210px ${EMOJI}`;
    ctx.fillText(outcome.emoji, W / 2, 330);

    ctx.fillStyle = '#f0f0f8';
    ctx.font = `500 44px ${FONT}`;
    ctx.fillText(`${name} is`, W / 2, 520);

    let titleSize = 96;
    ctx.font = `700 ${titleSize}px ${FONT}`;
    while (ctx.measureText(outcome.title).width > W - 140 && titleSize > 48) {
        titleSize -= 4;
        ctx.font = `700 ${titleSize}px ${FONT}`;
    }
    ctx.fillText(outcome.title, W / 2, 620);

    ctx.fillStyle = outcome.color;
    ctx.font = `700 30px ${FONT}`;
    ctx.fillText(outcome.badge.toUpperCase(), W / 2, 710);

    ctx.fillStyle = '#b4b4cc';
    ctx.font = `400 32px ${FONT}`;
    wrap(ctx, outcome.description, W - 220).slice(0, 3).forEach((line, i) => {
        ctx.fillText(line, W / 2, 790 + i * 46);
    });

    // breakdown bars
    const rows = [...outcome.breakdown].sort((a, b) => b.pct - a.pct).slice(0, 4);
    const left = 150, barW = W - 300, top = 970;
    rows.forEach((row, i) => {
        const y = top + i * 72;
        ctx.textAlign = 'left';
        ctx.fillStyle = '#f0f0f8';
        ctx.font = `600 28px ${FONT}`;
        ctx.fillText(`${row.emoji}  ${row.label}`, left, y);
        ctx.textAlign = 'right';
        ctx.fillText(`${row.pct}%`, left + barW, y);
        ctx.fillStyle = 'rgba(255,255,255,0.09)';
        ctx.fillRect(left, y + 22, barW, 8);
        ctx.fillStyle = row.color;
        ctx.fillRect(left, y + 22, barW * row.pct / 100, 8);
    });

    ctx.textAlign = 'center';
    ctx.fillStyle = '#8e8eae';
    ctx.font = `500 28px ${FONT}`;
    ctx.fillText(`What are you? Take the quiz at ${window.location.host}`, W / 2, H - 70);

    return canvas;
}
