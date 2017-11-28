var mongoose = require("mongoose");

//stores user progress on a single vocab list, contains id to vocab plus progress array

var VocabProgressSchema = new mongoose.Schema({
    list: {type: mongoose.Schema.Types.ObjectId, ref: "VocabList"},
    progress: [{
        attempts: Number,
        accuracy: Number
    }]
});

module.exports = mongoose.model("VocabProgress", VocabProgressSchema);