var mongoose = require("mongoose");

//stores user progress on a single vocab list, contains id to vocab plus progress array

var CourseProgressSchema = new mongoose.Schema({
    course: {type: mongoose.Schema.Types.ObjectId, ref: "Course"},
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    progress: [{
        attempts: Number,
        accuracy: Number
    }]
});

module.exports = mongoose.model("CourseProgress", CourseProgressSchema);