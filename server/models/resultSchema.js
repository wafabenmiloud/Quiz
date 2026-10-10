const mongoose = require("mongoose");

/** result model — one document per finished quiz */
const resultModel = new mongoose.Schema({
    username : { type : String },
    quizId : { type : String, index : true },
    outcome : { type : String },   /** e.g. "leo" */
    group : { type : String },     /** e.g. "fire"; same as outcome when a quiz has no groups */
    createdAt : { type : Date, default : Date.now}
})
const Result = mongoose.model("results", resultModel);
module.exports = { Result };
