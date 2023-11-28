import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const user = userEvent.setup();

beforeEach(() => {
  render(<App />);
});

test("renders the header", () => {
  const header = screen.getByRole("heading");
  expect(header).toBeVisible();
});

test("renders the searchbar", () => {
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeVisible();
});

test("renders the search button", () => {
  const searchButton = screen.getByText("Search", { selector: "button" });
  expect(searchButton).toBeVisible();
});

test("user can type in the searchbar", async () => {
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toHaveValue("");
  await user.click(searchBar);
  await user.type(searchBar, "test");
  expect(searchBar).toHaveValue("test");
});
