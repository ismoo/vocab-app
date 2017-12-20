var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware = require("../middleware");

//Landing page
router.get("/", function(req, res){
    res.render("landing");
});

//Show register form
router.get("/register", function(req, res){
    res.render("register");
});

//Add user
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/courses");
        });
    });
});

//Show login form
router.get("/login", function(req, res) {
    res.render("login");
});

//Login user
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/courses",
        failureRedirect: "/login"
    }), function(req, res) {
});


//Logout user
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

module.exports = router;