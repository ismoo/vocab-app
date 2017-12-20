var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");

var middleWareObj = {};

middleWareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "Please sign up or login first!")
        res.redirect("/register");
    }
};

middleWareObj.checkPermission = function(req, res, next){
    if(req.isAuthenticated()){
        CourseProgress.findById(req.params.id, function(err, foundProg){
           if(err){
               req.flash("error", "Error: course progress not found");
               res.redirect("back");
           } else{
               if(foundProg.user.equals(req.user._id)) {
                   return next();
               } else{
                   req.flash("error", "You don't have permission to do that");
                   res.redirect("back");
               }
           }
        });
    } else {
        req.flash("error", "Please sign up or login first!")
        res.redirect("back");
    }
};

middleWareObj.isDev = function(req, res, next){
    if(req.isAuthenticated()){
        if (req.user.username == "admin"){
            return next();
        } else{
            res.redirect("back");
        }
    } else {
        res.redirect("back");
    }
}

module.exports = middleWareObj;