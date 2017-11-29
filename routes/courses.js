var express = require("express");
var router = express.Router({mergeParams: true});

var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");

//Shows list of courses
router.get("/", isLoggedIn, function(req, res){
    var courses = [];
    var progress = req.user.userProgress;
    var counter = progress.length;
    progress.forEach(function (el){
        CourseProgress.findById(el, function(err, courseProg){
            if(err){
                console.log(err);
            } else{
                Course.findById(courseProg.course, function(err, course){
                    if(err){
                        console.log(err);
                    } else{
                        courses.push(course);
                        counter--;
                        if (counter <= 0){
                            res.render("courses/show", {courses: courses});
                        }
                    }
                });
            }

        });
    });
});

//Add course form
router.get("/new", isLoggedIn, function(req, res){
    Course.find({}, function(err, courses){
        if(err){
            console.log(err);
        }
        else {
            res.render("courses/new", {courses: courses});
        }
    });
});

//Add course
router.post("/", isLoggedIn, function(req, res){
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;