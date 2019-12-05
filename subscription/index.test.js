const mongoose = require("mongoose");
const connection = require("../db");
const Subscription = mongoose.model("Subscription");
const subscription = require("./index.js");
const testChannelId = "G00000000";
const testUserId = "U00000000";

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await Subscription.deleteMany({ channel: testChannelId });
});

// Helpers
const subscribeChannel = (channel = testChannelId) =>
  subscription.create({
    channel,
    user: "U00000000"
  });

it("can create a subscription", () => {
  return subscribeChannel().then(result => {
    expect(result).toBeTruthy();
  });
});
it("can remove a subscription", () => {
  return subscribeChannel().then(result => {
    expect(result).toBeTruthy();
    return subscription
      .removeSubscription({
        channel: testChannelId,
        user: testUserId
      })
      .then(results => {
        expect(results).toBeTruthy();
      });
  });
});
it("can create a subscription", () => {
  return subscription
    .createSubscription({ user: testUserId, channel: testChannelId })
    .then(result => {
      expect(result).toBeTruthy();
    });
});
it("can get subscriptions", () => {
  return subscribeChannel().then(() => {
    return subscription.getSubscriptions().then(results => {
      expect(results).toHaveLength(1);
    });
  });
});
it("can remove subscription", () => {
  return subscribeChannel().then(() => {
    return subscription
      .removeSubscription({ channel: testChannelId, user: testUserId })
      .then(results => {
        expect(results).toContain(`Lecturebot disabled for this channel!`);
      });
  });
});
it("can warn when remove finds no match", () => {
  return subscription
    .removeSubscription({ channel: testChannelId, user: testUserId })
    .then(results => {
      expect(results).toContain(
        `Subscription does not exist! Nothing removed.`
      );
    });
});
