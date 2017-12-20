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
                  description: "The best Latin course, straight from Cambrdige. Caecillius est in horto",
                  image: "https://images-na.ssl-images-amazon.com/images/I/51UIQZQYggL._SX258_BO1,204,203,200_.jpg",
                  wordList: testWordList
};

var testCourse2 = {name: "German Edexcel",
                  description: "We've carried out extensive research with teachers and students, and trialled questions and mark schemes. Our content will include existing topics that teachers have told us they like teaching, and that motivate their students. All our papers are designed to be clear and concise and, where appropriate, questions feature scaffolding to help all students progress through the assessments confidently.",
                  image: "https://qualifications.pearson.com/content/dam/demo/stuntcontent/images/qualifications/GCSE-2016/gcse-german.png/_jcr_content/renditions/cq5dam.thumbnail.319.319.png?donotcache",
                  wordList: testWordList
};

var testCourse3 = {name: "Greek GSCE",
                  description: "Students of our Edexcel GCSE in Greek will learn to speak, listen, read, write and communicate effectively in Greek, as well as develop awareness and understanding of countries and communities where the language is spoken.",
                  image: "https://qualifications.pearson.com/content/dam/pdf/GCSE/Greek/2009/Specification%20and%20sample%20assessments/GCSE_Greek_Spec_2012.pdf/_jcr_content/renditions/cq5dam.thumbnail.319.319.png?donotcache",
                  wordList: testWordList
};


function addData(){
    var testCourses = [testCourse, testCourse2, testCourse3];
    testCourses.forEach(function (el){
        Course.create(el, function(err, course){
            if(err){
                console.log(err);
            } else{
                console.log(el.name + " created");
            }
        });
    });
}

module.exports = addData;