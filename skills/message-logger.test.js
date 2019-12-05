const messageLogger = require("./message-logger.js");

const mockController = {
  on: jest.fn()
};

it("can register event listeners", () => {
  messageLogger(mockController);
  expect(mockController.on.mock.calls.length).toEqual(3);
  expect(mockController.on.mock.calls[0][0]).toEqual("message");
  expect(mockController.on.mock.calls[1][0]).toEqual("message_changed");
  expect(mockController.on.mock.calls[2][0]).toEqual("message_deleted");
});
