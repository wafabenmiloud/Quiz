const crypto = require('crypto');
const mongoose = require('mongoose');

/**
 * Admin-only routes need the ADMIN_TOKEN from .env in an `x-admin-token` header.
 * With no ADMIN_TOKEN configured they are closed to everyone.
 */
const requireAdmin = (req, res, next) => {
  const expected = process.env.ADMIN_TOKEN;
  const given = req.get('x-admin-token') || '';
  const ok = Boolean(expected)
    && given.length === expected.length
    && crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (!ok) return res.status(403).json({ error: 'forbidden' });
  next();
};

/** Fail fast instead of hanging while mongoose buffers queries with no connection. */
const requireDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'database_unavailable' });
  }
  next();
};

/** Small in-memory limiter: at most `max` requests per IP per `windowMs`. */
const rateLimit = ({ windowMs, max }) => {
  const hits = new Map();
  return (req, res, next) => {
    const now = Date.now();
    const recent = (hits.get(req.ip) || []).filter((t) => now - t < windowMs);
    if (recent.length >= max) {
      return res.status(429).json({ error: 'rate_limited' });
    }
    recent.push(now);
    hits.set(req.ip, recent);
    // keep the map from growing without bound
    if (hits.size > 5000) {
      for (const [ip, times] of hits) {
        if (!times.some((t) => now - t < windowMs)) hits.delete(ip);
      }
    }
    next();
  };
};

module.exports = { requireAdmin, requireDb, rateLimit };
