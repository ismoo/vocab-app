var express = require("express");
var router = express.Router({mergeParams: true});

var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");
var User = require("../models/user");

var middleware = require("../middleware");

//Shows list of courses
router.get("/", middleware.isLoggedIn, function(req, res){
    //Find list of courses user is signed up for, and sends text/pic/id
    var enrolledCourses = [];
    var counter = req.user.userProgress.length;
    if (counter>0){
        User.findById(req.user.id).populate("userProgress").exec(function(err, popUser){
            if (err){
                console.log(err);
            } else{
                popUser.userProgress.forEach(function(el){
                    Course.findById(el.course, function(err, course){
                        if(err){
                            console.log(err);
                        } else{
                            enrolledCourses.push({name: course.name, image: course.image, description: course.description, id: el.id});
                            counter--;
                            if (counter <= 0){
                                enrolledCourses.sort(function(a, b){
                                    return (a.name.toUpperCase() < b.name.toUpperCase()) ? -1 : 1;
                                });
                                //console.log(enrolledCourses);
                                res.render("courses/show", {courses:enrolledCourses});
                            }
                        }
                    });
                });   
            }
        });
    } else{
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
            //ensure form only contains options for courses user is not signed up for
            User.findById(req.user.id).populate("userProgress").exec(function(err, popUser){
                if(err){
                    console.log(err);
                } else{
                    var invalidIDs = [];
                    popUser.userProgress.forEach(function(el){
                        invalidIDs.push(el.course.toString());
                    });
                    var validCourses = [];
                    courses.forEach(function(el){
                        if(!(invalidIDs.includes(el._id.toString()))){
                            validCourses.push(el);
                        }
                    });
                    res.render("courses/new", {courses: validCourses});
                }
            });
        }
    });
});

//Add course
router.post("/", middleware.isLoggedIn, function(req, res){
    Course.findById(req.body.courseSelection, function(err, course){
        if (err){
            console.log(err);
        } else {
            addCourse(req.user, course);
            res.redirect("/courses");   
        }
    });
});

//Vocab learning page
router.get("/:id", middleware.checkPermission, function(req, res){
    CourseProgress.findById(req.params.id, function(err, progress){
        if(err){
            console.log(err);
        } else {
            Course.findById(progress.course, function(err, course){
                if(err){
                    console.log(err);
                } else{
                    var wordNum = pickWord(progress, course);
                    res.render("courses/learn", {word: course.wordList[wordNum], num: wordNum, courseName: course.name, id:progress.id});
                }
            });
        }
    });
});

router.put("/:id", middleware.checkPermission, function(req, res){
    var word = req.query.word;
    var pass = req.query.pass;
    CourseProgress.findById(req.params.id, function(err, progress){
       if(err){
           console.log(err);
       } else{
           updateProgress(progress, word, pass);
           res.redirect("/courses/"+req.params.id);
       }
    });
});

//Delete course
router.delete("/:id", middleware.checkPermission, function(req, res){
    //First delete progress from list of user's progress, then delete progress itself
    var i = req.user.userProgress.indexOf(req.params.id);
    if (i > -1){
        req.user.userProgress.splice(i, 1);
        req.user.save();
    }
    CourseProgress.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/courses");
    });
});

function addCourse(userAdd, courseAdd){
    CourseProgress.create({
        course: courseAdd,
        user: userAdd,
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

function pickWord(courseProgress, course){
    var a = -1;
    if (courseProgress.progress.length < course.wordList.length)
        a = courseProgress.progress.length;
    else
        a = Math.floor(Math.random() * course.wordList.length);
    return a;
    
}

function updateProgress(courseProgress, word, pass){
    if (courseProgress.progress[word] === undefined){
        courseProgress.progress[word] = {attempts: 1, accuracy: ((pass == "true") ? 1 : 0)};
    } else {
        var a = courseProgress.progress[word].attempts;
        var ac = courseProgress.progress[word].accuracy;
        courseProgress.progress[word].accuracy = (ac*a+((pass == "true") ? 1 : 0))/(a+1);
        courseProgress.progress[word].attempts++;
    }
    courseProgress.save();
}


module.exports = router;