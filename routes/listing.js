// const express= require("express");
// const router= express.Router();
// const wrapAsnyc= require("../utlis/wrapasync.js");
// const listing = require("../models/listing.js");
// const {isLoggedIn,isOwner,validatelisting}= require("../middleware.js");
// const listingController = require("../controllers/listing.js");
// const multer  = require('multer');
// const {storage}= require("../cloudConfig.js")
// const upload = multer({ storage });     //will store the file uploaded by user in uploads folder

// //making all routes together having commom paths req "/"
// router
// .route("/")
// .get( wrapAsnyc(listingController.index))
// .post(isLoggedIn,upload.single("listing[image]"), validatelisting,  wrapAsnyc(listingController.createListing)); 



// //new route
// router.get("/new",isLoggedIn, listingController.renderNewForm);


// router
// .route("/:id")
// .get( wrapAsnyc( listingController.showListing))
// .put(isLoggedIn, isOwner, upload.single("listing[image]"), validatelisting, wrapAsnyc(listingController.updateListing))
// .delete( isLoggedIn,isOwner,wrapAsnyc(listingController.destroyListing));




// //show route

// //create route   erroorrrrrrrr




// //edit route
// router.get("/:id/edit", isLoggedIn,isOwner, wrapAsnyc(listingController.renderEditForm));



// //update route  //can beeeeee


// //delete route



// module.exports= router; 

//chatgpt
const express = require("express");
const router = express.Router();
const wrapAsync = require("../utlis/wrapasync.js");
const Listing = require("../models/listing.js"); // Fixed variable name
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage }); // Middleware for handling image uploads


router
  .route("/")
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(
    isLoggedIn, 
    upload.single("listing[image]"), 
    validatelisting,  
    wrapAsync(listingController.createListing)
  );

// Route for rendering the new listing form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Routes for showing, updating, and deleting a specific listing
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show one listing
  .put(
    isLoggedIn, 
    isOwner, 
    upload.single("listing[image]"), 
    validatelisting, 
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// Route for rendering the edit form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
