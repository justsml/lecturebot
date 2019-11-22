require('../db/index.js')
const mongoose = require('mongoose')
const { Schema } = mongoose
const roles = ['Instructor', 'Student', 'Admin', 'TA', 'Bot', 'All']

const schema = new Schema(
  {
    name: { type: String },
    displayName: { type: String },
    realName: { type: String },
    role: { type: String, enum: roles, default: 'Student' },
    userSlackId: { type: String, unique: true },
    botSlackId: { type: String },
    teamSlackId: { type: String },
    email: { type: String, unique: true },
    token: { type: String },
    scope: { type: String },
    avatar: { type: String },
    metadata: { type: Object }
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', schema)
