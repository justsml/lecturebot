const Analytics = require('analytics-node')

let analytics

if (process.env.SEGMENT_IO_KEY) {
  const isDev = process.env.NODE_ENV !== 'production'
  analytics = new Analytics(process.env.SEGMENT_IO_KEY, { flushAt: isDev ? 1 : 30 })
} else {
  console.warn(new Error('ERROR: analytics-node imported but no SEGMENT_IO_KEY environment variable found!'))
}

module.exports.logEvent = eventName => data => {
  if (!analytics) return

  analytics.track({
    event: eventName,
    userId: data.user || data.userId,
    timestamp: new Date(),
    properties: data
  }, (err, data) => {
    if (err) return console.error(`SEGMENT FAILED TO LOG ${eventName}:`, err, data)
  })
}
