require("dotenv").config();
const mongoose = require("mongoose");
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

require("./models.js");

const db = mongoose.connection
  .on("error", console.error.bind(console, "mongodb connection error:"))
  .once("open", console.info.bind(console, "mongodb successfully connected:"));

module.exports = db;
