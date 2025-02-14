// const Listing= require("./models/listing");
// const expressError= require("./utlis/expresserror.js");
// const { listingSchema,reviewSchema}= require("./schema.js");




// module.exports.isLoggedIn= (req, res, next)=>{
//     console.log(req);
//     if(!req.isAuthenticated()){
//         req.session.redirectUrl= req.originalUrl;
//         req.flash("error","You must be logged in to create listing!");
//         return res.redirect("/login");
//     }
//     next();
// };

// module.exports.saveRedirectUrl= (req, res, next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl= req.session.redirectUrl;
//     }
//     next();
// };

// module.exports.isOwner= async(req, res, next)=>{
//     let {id} = req.params;
// let listing= await Listing.findById(id);  
// if(!listing.owner.equals(res.locals.currUser._id)){
//     req.flash("error", "you are not the owner of this listings ");
//     return res.redirect(`/listings/${id}`);
// }
// next();
// };

// module.exports.validatelisting= (req,res,next)=>{
//     let {error}= listingSchema.validate(req.body);
    

//     if(error){
//         let errmsg=error.details.map((el)=> el.message).join(",");
//      throw new expressError(400, errmsg);
//     }else{
//         next();
//     }
      
// };
// module.exports.validateReview= (req,res,next)=>{
//     let {error}= reviewSchema.validate(req.body);
//     if(error){
//         let errmsg=error.details.map((el)=> el.message).join(",");
//      throw new expressError(400, errmsg);
//     }else{
//         next();  
//     }
      
// };

//chatgpt

const Listing = require("./models/listing");
const expressError = require("./utlis/expresserror.js");
const { listingSchema, reviewSchema } = require("./schema.js");

// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    console.log("Current User:", req.user); // Debugging: Check if user is authenticated
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to create a listing!");
        return res.redirect("/login");
    }
    next();
};

// Middleware to store redirect URL for after login
module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

// Middleware to check if the logged-in user is the owner of a listing
module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    if (!listing.owner.equals(req.user._id)) { // FIX: Changed `res.locals.currUser._id` to `req.user._id`
        req.flash("error", "You are not the owner of this listing.");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

// Middleware to validate listing data
module.exports.validatelisting = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    } else {
        next();
    }
};

// Middleware to validate review data
// module.exports.validateReview = (req, res, next) => {
//     console.log("Review Body:", req.body); // Debugging: Check if review data is sent properly

//     if (!req.body.review) {
//         throw new expressError(400, "Invalid review data. Please check your input.");
//     }

//     let { error } = reviewSchema.validate(req.body.review); // FIX: Validating `req.body.review` instead of `req.body`

//     if (error) {
//         let errmsg = error.details.map((el) => el.message).join(",");
//         throw new expressError(400, errmsg);
//     } else {
//         next();
//     }
// };
module.exports.validateReview = (req, res, next) => {
    console.log("Raw Review Body:", req.body);
    console.log("Type of req.body.review:", typeof req.body.review);

    if (!req.body.review || typeof req.body.review !== "object") {
        console.log("❌ req.body.review is missing or not an object!");
        throw new expressError(400, "Invalid review data. Please check your input.");
    }

    // Convert rating to a number
    req.body.review.rating = Number(req.body.review.rating);

    // ✅ Validate `req.body`, not `req.body.review`
    let { error } = reviewSchema.validate(req.body); 

    if (error) {
        console.log("❌ Joi Validation Error:", error.details);
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new expressError(400, errmsg);
    } else {
        console.log("✅ Review validation passed!");
        next();
    }
};



