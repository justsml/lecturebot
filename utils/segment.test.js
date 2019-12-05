const segment = require("./segment.js");

const logTestEvent = segment.logEvent("Triggered Test Event");

it("should log message event to segment.io", done => {
  const payload = {
    ts: "844276697378.180006424049",
    client_msg_id: "any",
    thread_ts: "",
    userId: "U5AGW6XH8",
    channel: "GQPMB0G3Y",
    channel_name: "test-fakery",
    text: "This is a message from integration tests",
    team: "T5A06CG1F",
    event_type: "message",
    reply_count: 0,
    reply_users: undefined,
    reply_users_count: 0,
    replies: undefined,
    latest_reply: undefined
  };

  return logTestEvent(payload)
    .then(result => {
      expect(result).toBeUndefined();
      done();
    })
    .catch(done);
});
