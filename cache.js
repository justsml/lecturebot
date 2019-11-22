// eslint-disable
// 2 main in-memory globals are needed:
module.exports.channelSubscriptions = []
module.exports.allChannels = {}

module.exports.setChannelSubscriptions = value => {
  module.exports.channelSubscriptions = value
}

module.exports.setAllChannels = value => {
  module.exports.allChannels = value
}
