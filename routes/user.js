const express = require("express");
const router = express.Router();

const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const { signUp, login, logOut, renderSignupForm, renderLoginForm } = require("../controllers/users.js");

// signup route
router
    .route("/signup")
    .get(renderSignupForm)
    .post(
        wrapAsync(signUp)
    );

//login route
router
    .route("/login")
    .get(renderLoginForm)
    .post(
        saveRedirectUrl, 
        passport.authenticate(
            "local", { 
                failureRedirect: '/login',
                failureFlash: true 
        }), 
        login
    );

//logout route
router.get("/logout", logOut);

module.exports = router;


//signup get route
// router.get("/signup", renderSignupForm);


//signup post route/ access route
// router.post("/signup",
//     wrapAsync(signUp)
// );

//login get route
// router.get("/login", renderLoginForm);

//login post route/ access route
// router.post("/login",
// saveRedirectUrl,
//  passport.authenticate("local", { 
//     failureRedirect: '/login', 
//     failureFlash: true }), 
//     login
// );

//logout route
// router.get("/logout", logOut);

