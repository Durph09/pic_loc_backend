const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const placesRoutes = require("./routes/places-route"); // imports
const userRoutes = require("./routes/user-route");
const HttpError = require("./models/http-error");

const app = express(); //registering as middleware

app.use(bodyParser.json()); //registering as middleware

app.use("/api/places", placesRoutes); // => /api/places/....
app.use("/api/users", userRoutes); //registering as middleware

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ messsage: error.message || "An unknown error occured!" });
});

mongoose
  .connect(
    `mongodb+srv://crmahaney9:${process.env.MongoDB_Pass}@cluster0.hi3ljfj.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
