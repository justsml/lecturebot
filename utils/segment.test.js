const segment = require("./segment.js");

const logTestEvent = segment.logEvent("Triggered Test Event");

it("should log event to segment", () => {
  logTestEvent();
});
