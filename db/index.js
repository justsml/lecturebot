require("dotenv").config();
const log = require("debug")("lecturebot:db");
const mongoose = require("mongoose");
const models = require("./models.js");

// const { Schema, Collection } = mongoose
const connString = process.env.MONGODB_URI || "localhost/lecture-hub";

const isProd = process.env.NODE_ENV === "production";
const mongoUri = connString.includes("://")
  ? connString
  : `mongodb://${connString}`;

if (isProd && !process.env.MONGODB_URI) {
  console.error(
    "\n\n**WARNING:** Missing MONGODB_URI database string. Using Localhost Mongo Fallback!!!\n\n"
  );
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useFindAndModify: false,
  autoIndex: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const db = mongoose.connection
  .on("error", () => log("mongodb connection error!"))
  .once("open", () => log("mongodb successfully connected!"));

module.exports = db;
module.exports.mongoose = mongoose;
module.exports.models = models;
