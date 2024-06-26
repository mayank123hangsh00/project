const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const  MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"

main()
.then(() =>{
  console.log("connected to db");
})
.catch(err  =>{
  console.log(err);

});

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



app.get("/", (req,res) =>{
  res.send("root connected");
});


// index route
app.get("/Listings", async (req,res) =>{
   const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  });

  //New route
app.get("/listings/new", async(req,res) => {
  res.render("listings/new.ejs");
});


  //show route
  app.get("/listings/:id", async (req,res) =>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  });

//Create route
app.post("/listings", async(req,res) =>{
  const  newListing =  new Listing(req.body.listing);
   await newListing.save();
  res.redirect("/listings");
});

// Edit route
app.get("/listings/:id/edit", async (req,res) =>{
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//update route
app.put("/listings/:id", async (req,res) =>{
  let { id } = req.params;
 await Listing.findByIdAndUpdate(id, {...req.body.listing });
 res.redirect("/listings");
});

//Delete route
app.delete("/listings/:id", async(req,res) =>{
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});


//app.get("/testListing", async (req,res) =>{
//  let sampleListing = {
//    title: "demoo",
///    description: "demo description",
//    price: 1500,
  //  location: "pune",
  //  country: "India",
// };

//Listing.create(sampleListing)            
//    .then(createdListing => {
 //       console.log("Listing created:", createdListing);
 //   })
 //   .catch(error => {
 //       console.error("Error creating listing:", error);
  //  });





 // let sampleListing = new listing({
   // title: "My new villa",
  //  description: "By the beech",
  //  price: 1200,
  //  location:  "calangut,goa",
  //  country: "India"
 // });
 
// await sampleListing.save();
//  console.log("db was saved");
// res.send("successfull testing");
// });


app.listen(8080, () =>{
console.log("server is listening to port 8080");
});


