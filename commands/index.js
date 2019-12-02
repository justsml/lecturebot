const lecturebot = require("./lecturebot.js");

module.exports = function init(controller) {
  lecturebot(controller);
  return controller;
};
