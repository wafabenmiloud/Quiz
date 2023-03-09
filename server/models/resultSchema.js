const mongoose = require("mongoose");

/** result model */
const resultModel = new mongoose.Schema({
    username : { type : String },
    result : { type : Array, default : []},
    attempts : { type : Number, default : 0},
    points : { type : Number, default : 0},
    achived : { type : String, default : ''},
    createdAt : { type : Date, default : Date.now}
})
const Result = mongoose.model("results", resultModel);
module.exports = { Result };