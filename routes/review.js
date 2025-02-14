// const express= require("express");
// const router= express.Router({mergeParams: true});
// const wrapAsnyc= require("../utlis/wrapasync.js");
// const expressError= require("../utlis/expresserror.js");
// const { isLoggedIn } = require("../middleware");


// const review=require("../models/review.js");
// const listing = require("../models/listing.js");
// const{validateReview}= require("../middleware.js")
// const reviewController= require("../controllers/reviews.js")

// //router.post("/",validateReview, wrapAsnyc(reviewController.createReview));
// router.post("/", isLoggedIn, validateReview, wrapAsnyc(reviewController.createReview));

  
  
//   //delete reiew route
//  router.delete("/:reviewId", wrapAsnyc(reviewController.destroyReview));

//   module.exports= router;

//chagpt
const express = require("express");
const User = require("../models/user"); // ✅ Add this at the top

const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utlis/wrapasync.js");
const expressError = require("../utlis/expresserror.js");
const { isLoggedIn, validateReview } = require("../middleware"); // Ensure validateReview is also imported

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const reviewController = require("../controllers/reviews.js");

// POST route for creating a review
// router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res, next) => {
//     console.log(req.body); // Debugging: Check what data is being sent

//     const listing = await Listing.findById(req.params.id);
//     if (!listing) {
//         req.flash("error", "Listing not found.");
//         return res.redirect("/listings");
//     }

//     const review = new Review(req.body.review); // Ensure it's req.body.review
//     review.author = req.user._id;
//     listing.reviews.push(review);

//     await review.save();
//     await listing.save();

//     req.flash("success", "Review added successfully!");
//     res.redirect(`/listings/${listing._id}`);
// }));

//chatg
// router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res, next) => {
//   console.log("Received Request Body:", req.body); // Debugging

//   if (!req.body.review || !req.body.review.comment || !req.body.review.rating) {
//       req.flash("error", "Invalid review data. Please check your input.");
//       return res.redirect(`/listings/${req.params.id}`);
//   }

//   const listing = await Listing.findById(req.params.id);
//   if (!listing) {
//       req.flash("error", "Listing not found.");
//       return res.redirect("/listings");
//   }

//   const review = new Review(req.body.review); // Ensure it's req.body.review
//   review.author = req.user._id;
//   listing.reviews.push(review);

//   await review.save();
//   await listing.save();

//   req.flash("success", "Review added successfully!");
//   res.redirect(`/listings/${listing._id}`);
// }));

//chatgpt2
router.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res, next) => {
  console.log("Before Saving Review:", req.body.review);

  // Convert rating to number
  req.body.review.rating = Number(req.body.review.rating);

  const listing = await Listing.findById(req.params.id);
  if (!listing) {
      req.flash("error", "Listing not found.");
      return res.redirect("/listings");
  }

  const review = new Review(req.body.review);
  review.author = req.user._id;
  listing.reviews.push(review);

  await review.save();
  await listing.save();

  req.flash("success", "Review added successfully!");
  res.redirect(`/listings/${listing._id}`);
}));



// DELETE route for deleting a review
router.delete("/:reviewId", wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Review deleted successfully!");
    res.redirect(`/listings/${id}`);
}));

module.exports = router;
