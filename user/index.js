require('../db/index.js')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const log = require('debug')('slackbot:authHandler')

function processAuthPayload (data) {
  if (!data.ok) {
    log('Auth Request failed:', data)
    return Promise.reject(new Error('Auth Request failed!'))
  }
  if (!data.access_token) {
    log('Failed to get access token:', data)
    return Promise.reject(new Error('Access Token Missing!'))
  }
  if (data.bot && data.bot.bot_user_id) {
    return addOrUpdateBot(data)
  }
  if (data.user && data.user.id) {
    return addOrUpdateUser(data)
  }
  log('non user payload:', data)
  return data
}

function addOrUpdateUser (data) {
  return getByUserSlackId({ userSlackId: data.user.id }).then(user => {
    if (user) {
      console.log('\nABOUT TO UPDATE', user.name, '\nNew Scope:', data.scope, '\nOld Scope:', user.scope)
      return patch({
        _id: user._id,
        name: data.user.name,
        email: data.user.email,
        token: data.access_token,
        avatar: (data.user && data.user.image_512) || (data.user && data.user.image_original),
        scope: data.scope,
        metadata: data
      })
    } else {
      console.log('\nCREATING USER FOR SLACKID:', data.user.id)
      return create({
        name: data.user.name,
        email: data.user.email,
        token: data.access_token,
        avatar: (data.user && data.user.image_512) || (data.user && data.user.image_original),
        scope: data.scope,
        userSlackId: data.user.id,
        teamSlackId: data.team && data.team.id,
        metadata: data
      })
    }
  })
}

function addOrUpdateBot (data) {
  return getByUserSlackId({ userSlackId: data.bot.bot_user_id })
    .then(user => {
      if (user) {
        console.log('UPDATING BOT:', user.name)
        return patch({
          _id: user._id,
          name: data.user.name,
          email: data.user.email,
          token: data.access_token,
          avatar: (data.user && data.user.image_512) || (data.user && data.user.image_original),
          scope: data.scope,
          metadata: data
        })
      } else {
        console.log('CREATING BOT FOR SLACKID:', data.bot.bot_user_id)
        return create({
          name: data.team_name,
          role: 'Bot',
          token: data.access_token,
          userSlackId: data.bot.bot_user_id,
          teamSlackId: data.team && data.team.id,
          metadata: data
        })
      }
    })
}

const getAll = ({ skip = 0, limit = 100, orderBy = 'name' }) => {
  return User.find({})
    .sort(orderBy)
    .limit(limit)
    .skip(skip)
    .select('-metadata')
}

const getOne = ({ _id }) => {
  return User.findOne({ _id }).select('-metadata')
}

const getByUserSlackId = ({ userSlackId }) => {
  return User.findOne({ userSlackId }).select('-metadata')
}

const getByEmail = ({ email }) => {
  return User.findOne({ email }).select('-metadata')
}

const createIfNotExists = ({ userSlackId, ...args }) => {
  return User.findOne({ userSlackId })
    .then((user) => {
      if (user && user.userSlackId) return null
      return User.create({ userSlackId, ...args })
    })
}

const create = ({ name, displayName, realName, role, email, avatar, token, scope, metadata, userSlackId, teamSlackId }) =>
  User.create({
    name,
    displayName,
    realName,
    role,
    email,
    avatar,
    token,
    scope,
    metadata,
    userSlackId,
    teamSlackId
  })

const update = ({ _id, name, displayName, realName, role, email, avatar, token, scope, metadata, userSlackId, teamSlackId }) =>
  User.findOneAndUpdate(
    { _id },
    { name, displayName, realName, role, email, avatar, token, scope, metadata, userSlackId, teamSlackId }
  )

const updateToken = ({ _id, token, scope, email, metadata }) =>
  User.findOneAndUpdate({ _id }, { $set: { token, scope, email, metadata, updatedAt: new Date() } })

const patch = ({ _id, ...changes }) =>
  User.findOneAndUpdate({ _id }, { $set: { ...changes, updatedAt: new Date() } })

const remove = ({ _id }) => User.findOneAndDelete({ _id })

module.exports = {
  getAll,
  getOne,
  getByUserSlackId,
  getByEmail,
  createIfNotExists,
  create,
  update,
  updateToken,
  patch,
  remove,
  processAuthPayload,
  addOrUpdateBot,
  addOrUpdateUser
}
