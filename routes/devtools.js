var express = require("express");
var router = express.Router({mergeParams: true});

var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");
var User = require("../models/user");

var middleware = require("../middleware");

router.get("/", middleware.isDev, function(req, res){
    res.render("devtools/main");
});

router.post("/", middleware.isDev, function(req, res){
    var wordList = JSON.parse(req.body.courseWordList);
    wordList.sort(function(a, b){
        return b.frequency - a.frequency;
    });
    Course.create({name:req.body.courseName,
                   description:req.body.courseDescription,
                   image:req.body.courseImage,
                   wordList:wordList
    }, function(err, course){
        if (err){
            console.log(err);
        }
    });
    res.redirect("back");
});

module.exports = router;