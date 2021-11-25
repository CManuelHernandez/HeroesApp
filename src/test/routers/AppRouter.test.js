import { AppRouter } from "../../components/routers/AppRouter";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/authContext";

describe("Test in <AppRouter />", () => {
  test("should show the login if it is not authenticated", () => {
    const contextValue = {
      user: {
        logged: false,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("h1").text().trim()).toBe("LoginScreen");
  });

  test("shold show Marvel component if authenticated", () => {
    const contextValue = {
      user: {
        logged: true,
        name: "Man",
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // console.log(wrapper.html());

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
