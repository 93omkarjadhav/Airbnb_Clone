if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}



const express = require("express");
const app= express();
const mongoose = require("mongoose");
const User= require("./models/user");
console.log("User Model:", User);  // Debugging: Check if User is correctly imported

if (!User) {
    throw new Error("❌ User model is not loaded properly. Check your import and user.js file.");
}

console.log("User Model:", typeof User);
console.log("User Schema:", User.schema);
 
const path= require("path");
const methodoverride= require("method-override");
const ejsmate= require("ejs-mate");
const expressError= require("./utlis/expresserror.js");
const session= require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport= require("passport");
const LocalStrategy= require("passport-local");


const listingRouter= require("./routes/listing.js");
const reviewsRouter= require("./routes/review.js");
const userRouter= require("./routes/user.js");




//const mongo_url= "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl= process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to db");
}).catch(err =>{
  console.log(err);
});


async function main(){
    await mongoose.connect(dbUrl);
}


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const store= MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error", ()=>{
    console.log("error in mongo store", err);
});

const sessionOptions={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.get("/", (req, res) => {
    res.redirect("/listings");
});




app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next)=>{
    res.locals.success= req.flash("success");
    res.locals.error= req.flash("error");
    res.locals.currUser= req.user;
    next();
});

// app.get("/demouser", async(req,res)=>{
//     let fakeuser= new User({
//         email: "student@gmail.com",
//         username:"delta-student",
//     });
//    let registeredUser= await User.register(fakeuser, "helloworld");
//    res.send(registeredUser);

// });


app.use(express.urlencoded({extended: true}));
app.use(express.json()); // Add this to parse JSON requests


app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", userRouter);


app.all("*", (req,res, next)=>{
    next(new expressError(404, "Page not found!"));    
});

 app.use((err,req,res,next)=>{
    let {statuscode=500, message="something went wrong!"}= err;
    res.status(statuscode).render("error.ejs", {message});
   // res.status(statuscode).send(message);
 });

app.listen(9090,() =>{
    console.log("server is listening at port 9090");
}); 