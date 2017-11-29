var express = require("express");
var router = express.Router({mergeParams: true});

var Course = require("../models/course");

//Shows list of courses
router.get("/", isLoggedIn, function(req, res){
    res.render("courses/show");
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