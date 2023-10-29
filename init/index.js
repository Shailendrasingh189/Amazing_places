const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  // await mongoose.connect(MONGO_URL);
await mongoose.connect(dbUrl);  //instance of MONGO_URL

};

const initDB = async () => {
    let response = await geocodingClient.forwardGeocode({
    query: `${initData.data[0].location}, ${initData.data[0].country}`,
    limit: 1
  })
    .send();
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "653ce00a07b74af1fdb25f31",
    geometry: response.body.features[0].geometry
     
  }));
  // console.log(initData.data);
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();