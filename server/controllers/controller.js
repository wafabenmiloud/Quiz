const {Question} = require('../models/questionSchema');
const {Result} = require("../models/resultSchema");
const { answers } = require("../database/data");
const {questions} = require("../database/data");

/** ids are short lowercase slugs — also keeps query operators out of filters */
const SLUG = /^[a-z0-9-]{1,40}$/;
const isSlug = (value) => typeof value === 'string' && SLUG.test(value);

/** get all questions */
const getQuestions = async (req, res) => {
  try {
    const q = await Question.find();
    res.json(q);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** insert all questinos */
const insertQuestions = async (req, res) => {
  try {
    const result = await  Question.insertMany({ questions, answers });
      res.json({ msg: "Data Saved Successfully...!", data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** Delete all Questions */
const dropQuestions = async (req, res) => {
  try {
    await Question.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** get all result */
const getResult = async (req, res) => {
  try {
    const r = await Result.find().sort({ createdAt: -1 }).limit(500);
    res.json(r);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** store one finished quiz */
const storeResult = async (req, res) => {
  try {
    const { username, quizId, outcome, group } = req.body || {};
    if (typeof username !== 'string' || !username.trim() || !isSlug(quizId) || !isSlug(outcome) || !isSlug(group)) {
      return res.status(400).json({ error: "bad_request" });
    }

    await Result.create({
      username: username.trim().slice(0, 40),
      quizId,
      outcome,
      group,
    });

    res.json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** aggregated, anonymous counts for one quiz: { total, outcomes, groups } */
const getStats = async (req, res) => {
  try {
    const { quizId } = req.query;
    if (!isSlug(quizId)) {
      return res.status(400).json({ error: "bad_request" });
    }

    const rows = await Result.aggregate([
      { $match: { quizId } },
      { $group: { _id: { outcome: "$outcome", group: "$group" }, count: { $sum: 1 } } },
    ]);

    const stats = { total: 0, outcomes: {}, groups: {} };
    rows.forEach(({ _id, count }) => {
      stats.total += count;
      stats.outcomes[_id.outcome] = (stats.outcomes[_id.outcome] || 0) + count;
      stats.groups[_id.group] = (stats.groups[_id.group] || 0) + count;
    });
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/** delete all result */
const dropResult = async (req, res) => {
  try {
    await Result.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getResult,
  storeResult,
  getStats,
  dropResult,
};
