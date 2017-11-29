var mongoose = require("mongoose");

var User = require("./models/user");
var Course = require("./models/course");
var CourseProgress = require("./models/courseProgress");

var words = ["est", "pater", "mater", "filius", "servus", ""];
var translation = ["is", "father", "mother", "son", "slave"];
var testWordList = [];
words.forEach(function (el, i){
    testWordList[i] = {word: el, translation: translation[i], frequency: 1};
});


var testCourse = {name: "Cambridge Latin Course",
                  description: "The best Latin course, straight from Cambrdige. Caecillius est in horto xD",
                  image: "https://images-na.ssl-images-amazon.com/images/I/51UIQZQYggL._SX258_BO1,204,203,200_.jpg",
                  wordList: testWordList
};

function addCourse(userAdd, courseAdd){
    CourseProgress.create({
        course: courseAdd,
        progress: []
    }, function(err, courseProgress) {
        if (err){
            console.log(err);
        } else {
            userAdd.userProgress.push(courseProgress);
            userAdd.save();
        }
    });
}

function addData(){
    Course.create(testCourse, function(err, course){
        if(err){
            console.log(err);
        } else{
            console.log("CLC created");
            User.find({}, function(err, allUsers){
                if (err){
                    console.log(err);
                } else{
                    allUsers.forEach(function (el){ addCourse(el, course);});
                }
            });    
        }
    });
}

module.exports = addData;