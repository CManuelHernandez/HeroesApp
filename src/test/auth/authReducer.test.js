import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Test in authReducer", () => {
  test("should return the default state", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test("should authenticate and put the user name", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Manuel",
      },
    };
    const state = authReducer({ logged: false }, action);

    expect(state).toEqual({
      logged: true,
      name: "Manuel",
    });
  });

  test("should delete username and logged in false", () => {
    const action = {
      type: types.logout,
    };
    const state = authReducer({ logged: true, name: "Manuel" }, action);

    expect(state).toEqual({ logged: false });
  });
});
