const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const { index, renderNewForm,  showListing, createListing, updateListing, renderEditForm, destoryListing } = require("../controllers/listings.js");
const multer  = require('multer')
const { storage }= require("../cloudConfig.js");
const upload = multer({ storage });
// const upload = multer({ dest: 'uploads/' })



router
    .route("/")
    .get(wrapAsync(index))
    .post( 
        isLoggedIn,
        upload.single("listing[image]"), 
        validateListing,
        wrapAsync(createListing)
    );
    
//New Route
router.get("/new",isLoggedIn, renderNewForm);
  

router
    .route("/:id")
    .get(wrapAsync(showListing ))
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"), 
        validateListing, 
        wrapAsync(updateListing))
    .delete(
        isLoggedIn, 
        isOwner, 
        wrapAsync(destoryListing))

//Edit Route
router.get(
    "/:id/edit", 
    isLoggedIn, 
    isOwner, 
    wrapAsync(renderEditForm)
);

module.exports = router;



// // Index Route
// router.get("/",wrapAsync(index));
  
//New Route
// router.get("/new",isLoggedIn, renderNewForm);
  
//Create Route
// router.post("/", isLoggedIn,validateListing, wrapAsync(createListing));

//Show Route
// router.get("/:id", wrapAsync(showListing ));

//Edit Route
// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

//Update Route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(updateListing));

//Delete Route
// router.delete("/:id", isLoggedIn, isOwner, wrapAsync(destoryListing));

