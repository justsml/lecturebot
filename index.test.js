const config = require("./config.js");
const { bot, botHelpers, startServer } = require("./app.js");

describe("has valid config object", () => {
  it("has segment.io key", () => {
    expect(config.segment_key).toBeTruthy();
  });
});

describe("verify botHelpers", () => {
  it("can get channel", () => {
    return botHelpers(bot)
      .getChannels({})
      .then(channels => {
        expect(Object.entries(channels).length).toBeGreaterThanOrEqual(1);
      });
  });
});

it("can start app", () => {
  const { controller, server } = startServer();
  expect(controller).toBeTruthy();
});
