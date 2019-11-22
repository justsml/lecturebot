const mongoose = require('mongoose')
const Subscription = mongoose.model('Subscription')

const getSubscriptions = () => {
  return Subscription.find({})
    .then(subs => {
      return subs.map(({ channel }) => channel)
    })
}

const removeSubscriptions = ({ user, channel }) => {
  return Subscription.findOne({ user, channel })
    .then(subscription => {
      if (subscription) return `Subscription does not exist! Nothing removed.`
      return Subscription.deleteMany({ user, channel })
        .then(() => `Removed subscription for ${channel}`)
    })
}

const createSubscriptions = ({ user, channel }) => {
  return Subscription.findOne({ user, channel })
    .then(subscription => {
      if (subscription) return `Cannot create subscription. Already exists.`
      return Subscription.create({ user, channel })
        .then(() => `Created subscription for ${channel}`)
    })
}

module.exports = { getSubscriptions, removeSubscriptions, createSubscriptions }
