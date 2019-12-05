const config = require("./config.js");

describe("has valid config object", () => {
  it("has segment.io key", () => {
    expect(config.segment_key).toBeTruthy();
  });
});
