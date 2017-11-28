var express = require("express");
var router = express.Router({mergeParams: true});

//Shows list of courses
router.get("/", isLoggedIn, function(req, res){
    res.render("courses/show")
});

//Add course form
router.get("/new", isLoggedIn, function(req, res){

});

//Add course
router.post("/", isLoggedIn, function(req, res){
    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/register");
}

module.exports = router;