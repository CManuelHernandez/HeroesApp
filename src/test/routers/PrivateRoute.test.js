import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/authContext";
import { PrivateRoute } from "../../components/routers/PrivateRoute";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Navigate: () => <span>Saliendo de aquí</span>,
}));

describe("Test in <PrivateRoute />", () => {
  Storage.prototype.setItem = jest.fn();

  test("should show the component if it is authenticated and save in the localStorage", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Manuel",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe("Private Component");
    expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/");
  });

  test("should block the component if it is not authenticated", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={["/"]}>
          <PrivateRoute>
            <h1>Private Component</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper.text().trim()).toBe("Saliendo de aquí");
  });
});
