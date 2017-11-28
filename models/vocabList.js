var mongoose = require("mongoose");

//stores vocab list, plus information for displaying them

var VocabListSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    wordList: [{
        word: String,
        translation: String
    }]
});

module.exports = mongoose.model("VocabList", VocabListSchema);