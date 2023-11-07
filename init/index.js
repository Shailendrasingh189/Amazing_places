const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken: "pk.eyJ1IjoicHJhYmhhczE4OSIsImEiOiJjbG84bTBobDcwMzIxMmpwM29lMWo3c3pjIn0.3uHIxhsc5z1Dmb_hBoFRDA" });

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL;
// const dbUrl = "mongodb+srv://prabhasrajput189:4dv3rPgw6qSSEwIC@cluster0.pmyt9dm.mongodb.net/?retryWrites=true&w=majority"

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
// await mongoose.connect(dbUrl);  //instance of MONGO_URL

};

const initDB = async () => {
    let response = await geocodingClient.forwardGeocode({
    query: `${initData.data[0].location}, ${initData.data[0].country}`,
    limit: 1
  })
    .send();
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "6538b485a1d4c4c9311f2c9f",
    geometry: response.body.features[0].geometry
     
  }));
  // console.log(initData.data);
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();