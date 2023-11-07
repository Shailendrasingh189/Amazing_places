const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index Route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

//New Route
module.exports.renderNewForm = (req, res) => {    
    res.render("listings/new.ejs");
};

//Create Route
module.exports.createListing =  async (req, res) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "...", filename);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image =  { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  await newListing.save();

  req.flash("success", " New Listings is created!");
  // console.log(Listing);
  res.redirect("/listings");
};

//Show Route
module.exports.showListing =  async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ 
      path: "reviews",
      populate: {
        path: "author",
      },
      })
      .populate("owner");
    if(!listing) {
      req.flash("error", "Listing you requested for does not exist!");
      res.redirect("/listings");
    }
    dates = Date.now();
    res.render("listings/show.ejs", { listing });
    // console.log(res.locals.currUser);
};

//Edit Route
module.exports.renderEditForm =  async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }

  let origiinalImageUrl = listing.image.url;

  let updateUrl = origiinalImageUrl.replace("/upload", "/upload/c_fill,h_300,w_300/e_blur:50");

  res.render("listings/edit.ejs", { listing, updateUrl });
};

//Update Route
module.exports.updateListing =  async (req, res) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  })
    .send();
    
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image = { url, filename };
      listing.geometry = response.body.features[0].geometry;
      await listing.save();
    }
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

//Delete Route
module.exports.destoryListing =  async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};