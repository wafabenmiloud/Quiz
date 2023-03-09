const {Question} = require('../models/questionSchema');
const {Result} = require("../models/resultSchema");
const { answers } = require("../database/data");
const {questions} = require("../database/data");

/** get all questions */
const getQuestions = async (req, res) => {
  try {
    const q = await Question.find();
    res.json(q);
  } catch (error) {
    res.json({ error });
  }
};

/** insert all questinos */
const insertQuestions = async (req, res) => {
  try {
    const result = await  Question.insertMany({ questions, answers });
      res.json({ msg: "Data Saved Successfully...!", data: result });
  } catch (error) {
    res.json({ error });
  }
};

/** Delete all Questions */
const dropQuestions = async (req, res) => {
  try {
    await Question.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

/** get all result */
const getResult = async (req, res) => {
  try {
    const r = await Result.find();
    res.json(r);
  } catch (error) {
    res.json({ error });
  }
};

/** post all result */
const storeResult = async (req, res) => {
  try {
    const { username, result, attempts, points, achieved } = req.body;
    if (!username || !result) {
      throw new Error("Data not provided");
    }

    const savedResult = await Result.create({
      username,
      result,
      attempts,
      points,
      achieved,
    });

    if (!savedResult) {
      throw new Error("Could not save result");
    }

    res.json({ message: "Result saved successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { storeResult };



/** delete all result */
const dropResult = async (req, res) => {
  try {
    await Result.deleteMany();
    res.json({ msg: "Result Deleted Successfully...!" });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getResult,
  storeResult,
  dropResult,
};
