var Course = require("../models/course");
var CourseProgress = require("../models/courseProgress");

var middleWareObj = {};

middleWareObj.isLoggedIn = function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        res.redirect("/register");
    }
};

middleWareObj.checkPermission = function(req, res, next){
    if(req.isAuthenticated()){
        CourseProgress.findById(req.params.id, function(err, foundProg){
           if(err){
               console.log(err);
           } else{
               if(foundProg.user.equals(req.user._id)) {
                   return next();
               } else{
                   res.redirect("back");
               }
           }
        });
    } else {
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