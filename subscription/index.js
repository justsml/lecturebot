const log = require("debug")("lecturebot:subscriptions");
const mongoose = require("mongoose");
const Subscription = mongoose.model("Subscription");

const getSubscriptions = () => {
  return Subscription.find({}).then(subs => {
    return subs.map(({ channel }) => channel);
  });
};

const removeSubscription = ({ user, channel }) => {
  log("Running removeSubscription:", { user, channel });
  return Subscription.findOne({ user, channel }).then(subscription => {
    if (!subscription) return `Subscription does not exist! Nothing removed.`;
    return Subscription.deleteMany({ user, channel }).then(
      () => `Lecturebot disabled for this channel!`
    );
  });
};

const createSubscription = ({ user, channel }) => {
  log("createSubscription: ", channel);
  return Subscription.findOne({ channel })
    .then(subscription => {
      log("createSubscription.findExisting ", channel);
      if (subscription) return `Cannot create subscription. Already exists.`;
      return Subscription.create({ user, channel }).then(
        () => `Created subscription for ${channel}`
      );
    })
    .catch(error => {
      console.error("ERROR: Failed to create subscription!", error);
      return `Subscription may already exist. Use /lecturebot-check to confirm.`;
    });
};

const create = (...args) => {
  return Subscription.create(...args);
};

const update = (...args) => {
  return Subscription.update(...args);
};

const deleteOne = (...args) => {
  return Subscription.deleteOne(...args);
};

module.exports = {
  getSubscriptions,
  removeSubscription,
  createSubscription,
  create,
  update,
  deleteOne
};
