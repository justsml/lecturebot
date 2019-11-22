require('../db/index.js')
const mongoose = require('mongoose')
const { Schema } = mongoose
// const { Types } = Schema;

const schema = new Schema(
  {
    channel: { type: String },
    user: { type: String }
  },
  { timestamps: true }
)

schema.index({
  channels: 1,
  users: 1
}, {
  unique: true
})

module.exports = mongoose.model('Subscription', schema)
