var express = require("express");
var router = express.Router({mergeParams: true});

var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");

var middleware = require("../middleware");

//Shows list of courses
router.get("/", middleware.isLoggedIn, function(req, res){
    var courses = [];
    var progress = req.user.userProgress;
    var counter = progress.length;
    if (counter > 0){
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
                                res.render("courses/show", {courses: courses.sort()});
                            }
                        }
                    });
                }
            });
        });
    } else {
        res.render("courses/show", {courses: []});
    }
    
});

//Add course form
router.get("/new", middleware.isLoggedIn, function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    Course.findById(req.body.courseSelection, function(err, course){
        if (err){
            console.log(err);
        } else {
            //console.log()
            // req.user.populate("userProgress").exec(function(err, x){
            //     if (err){
            //         console.log(err);
            //     } else {
            //         console.log(x);
                addCourse(req.user, course);
                res.redirect("/courses");   
               // }
            }
        });
    });
//});

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


module.exports = router;