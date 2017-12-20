var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override");
    
var seed = require("./seed");
//seed();

var User = require("./models/user");
    
var courseRoutes = require("./routes/courses"),
    indexRoutes = require("./routes/index"),
    devtoolsRoutes = require("./routes/devtools");
    
//mongoose.connect("mongodb://localhost/vocab_app");
mongoose.connect("mongodb://maindev:clsb@ds161316.mlab.com:61316/vocab-app-db");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "asdf",
    resave: "false",
    saveUninitialized: "false"
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

//========= ROUTES ==========

app.use("/", indexRoutes);
app.use("/courses", courseRoutes);
app.use("/devtools", devtoolsRoutes);
    
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Vocab app launched");
});