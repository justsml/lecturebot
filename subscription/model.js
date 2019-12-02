require("../db/index.js");
const mongoose = require("mongoose");
const { Schema } = mongoose;
// const { Types } = Schema;

const schema = new Schema(
  {
    channel: { type: String, unique: true },
    user: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", schema);
