const messageLogger = require("./message-logger.js");

const mockController = {
  on: jest.fn()
};

it("can register event listeners", () => {
  messageLogger(mockController);
  expect(mockController.on.mock.calls.length).toEqual(3);
});
