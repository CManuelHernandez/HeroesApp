import { MemoryRouter, Routes, Route } from "react-router-dom";
import { mount } from "enzyme";
import { HeroScreen } from "../../../components/hero/HeroScreen";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Test in <HeroScreen />", () => {
  test("it should not show the HeroScreen if there is no hero in the URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <Routes>
          <Route path="/hero" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find("h1").text().trim()).toBe("No Hero Page");
  });

  test("should show a hero if the parameter exists and is found", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("should return to the previous screen", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
        </Routes>
      </MemoryRouter>
    );

    wrapper.find("button").prop("onClick")();

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("should show the No Hero Page if we dont have a hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider12312312"]}>
        <Routes>
          <Route path="/hero/:heroeId" element={<HeroScreen />} />
          <Route path="/" element={<h1>No Hero Page</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe("No Hero Page");
  });
});
