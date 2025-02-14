const Listing= require("../models/listing");
const Review= require("../models/review")

// module.exports.createReview= async (req,res)=>{

//     let Listingg= await Listing.findById(req.params.id);
//     let newreview = new Review(req.body.review);
  
//     Listingg.reviews.push(newreview);
  
//    await newreview.save();
//    await Listingg.save();
//    req.flash("success", " new review created");
  
//   //   console.log("new review saved");
//   //   res.send("new review saved");
  
//    res.redirect(`/listings/${Listingg._id}`);
//   };

// module.exports.createReview = async (req, res) => {
//   let Listingg = await Listing.findById(req.params.id);
//   let newreview = new Review(req.body.review);
//   Listingg.reviews.push(newreview);
//   await newreview.save();
//   await Listingg.save();
//   req.flash("success", "New review created");
//   res.redirect(`/listings/${Listingg._id}`);
// };

// module.exports.createReview = async (req, res) => {
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);
//   newReview.author = req.user._id;  // Add author field
//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();
//   req.flash("success", "New review added!");
//   res.redirect(`/listings/${listing._id}`);
// };

module.exports.createReview = async (req, res) => {
  console.log("🚀 Review Body:", req.body); // Debugging log

  if (!req.body.review || !req.body.review.comment || !req.body.review.rating) {
      req.flash("error", "Invalid review data. Please check your input.");
      return res.redirect(`/listings/${req.params.id}`);
  }

  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "New review added!");
  res.redirect(`/listings/${listing._id}`);
};





//   module.exports.destroyReview=async( req, res)=>{
//     let {id, reviewId} = req.params;

//     await Listing.findByIdAndUpdate(id, {$pull :{ reviews: reviewId}});
//     await reviewId.findByIdAndDelete(reviewId);
//     req.flash("success", " Review Deleted");

//     res.redirect(`/listings/${id}`);
// }

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId); // ✅ Corrected this line

  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
