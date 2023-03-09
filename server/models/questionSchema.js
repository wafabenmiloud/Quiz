const mongoose = require("mongoose");

/** question model */
const questionModel = new mongoose.Schema({
    questions: { type : Array, default: []},
    answers : { type : Array, default: []},
    createdAt: { type: Date, default: Date.now },
});
const Question = mongoose.model("questions", questionModel);
module.exports = {Question};