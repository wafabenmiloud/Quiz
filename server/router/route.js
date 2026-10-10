const express = require('express');
const router = express.Router();

const { getQuestions,insertQuestions, dropQuestions, getResult,storeResult,getStats,dropResult} = require('../controllers/controller');
const { createReading } = require('../controllers/reading');
const { requireAdmin, requireDb, rateLimit } = require('../middleware/guards');

const TEN_MINUTES = 10 * 60 * 1000;

router.route('/questions')
        .get(requireDb, getQuestions)
        .post(requireAdmin, requireDb, insertQuestions)
        .delete(requireAdmin, requireDb, dropQuestions)

/** the full result list contains names, so only stats are public */
router.route('/result')
        .get(requireAdmin, requireDb, getResult)
        .post(rateLimit({ windowMs: TEN_MINUTES, max: 30 }), requireDb, storeResult)
        .delete(requireAdmin, requireDb, dropResult)

router.get('/stats', requireDb, getStats)

/** each reading is a paid API call, so keep the limit tight */
router.post('/reading', rateLimit({ windowMs: TEN_MINUTES, max: 5 }), createReading)

module.exports = router;
