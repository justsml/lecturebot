const skillsLoader = require("./index.js");

const mockController = {
  on: jest.fn()
};

it("can register skills", () => {
  skillsLoader(mockController);
  expect(mockController.on.mock.calls.length).toEqual(5);
  expect(mockController.on.mock.calls[0][0]).toEqual("message");
  expect(mockController.on.mock.calls[1][0]).toEqual("message_changed");
  expect(mockController.on.mock.calls[2][0]).toEqual("message_deleted");
});
