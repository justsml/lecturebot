const skillsLoader = require("./index.js");

const mockController = {
  on: jest.fn()
};

it("can register commands", () => {
  skillsLoader(mockController);
  expect(mockController.on.mock.calls.length).toEqual(1);
  expect(mockController.on.mock.calls[0][0]).toEqual("slash_command");
});
