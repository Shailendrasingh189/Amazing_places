const express = require("express");
const router = express.Router({ mergeParams : true });
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { validateReview, isLoggedIn, isReviewAuthor }= require("../middleware.js");
const { destroyReview, createReview } = require("../controllers/reviews.js");


// Reviews
// Post Page
router.post("/",
  isLoggedIn,
  validateReview, 
  wrapAsync( createReview )
);
  
// Delete Review Route
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(destroyReview)
);


module.exports = router;