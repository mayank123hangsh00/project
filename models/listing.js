const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:   
      "https://images.unsplash.com/photo-1552529220-460ee…xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    set: (v) =>  // these are called turnary operators that is  same work as of if-else statements
    v === ""
    ? "https://images.unsplash.com/photo-1552529220-460ee…xMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    : v,
  },
  price:Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("listing", ListingSchema);
module.exports = Listing;

