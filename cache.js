// eslint-disable
// 2 main in-memory globals are needed:

if (process.env.NODE_ENV === "test" && !process.env.CI) {
  console.error("WARNING: ALL MESSAGES CAPTURED IN TEST MODE!!!!");
}

module.exports.channelSubscriptions = [];
module.exports.allChannels = {};

module.exports.setChannelSubscriptions = value => {
  module.exports.channelSubscriptions = value;
};

module.exports.setAllChannels = value => {
  module.exports.allChannels = value;
};
module.exports.isSubscribed = channel => {
  if (process.env.NODE_ENV === "test") {
    return true;
  }
  return module.exports.channelSubscriptions.includes(channel);
};
