import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const user = userEvent.setup();

beforeEach(() => {
  render(<App />);
});

it("renders the header", () => {
  const header = screen.getByRole("heading");
  expect(header).toBeVisible();
});

it("renders the searchbar", () => {
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeVisible();
});

it("renders the search button", () => {
  const searchButton = screen.getByText("Search", { selector: "button" });
  expect(searchButton).toBeVisible();
});

it("user can type in the searchbar", async () => {
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toHaveValue("");
  await user.click(searchBar);
  await user.type(searchBar, "test");
  expect(searchBar).toHaveValue("test");
});

it("user can search for 'hello' and see the result", async () => {
  const searchBar = screen.getByRole("textbox");
  await userEvent.type(searchBar, "hello");

  const searchButton = screen.getByText("Search", { selector: "button" });
  await userEvent.click(searchButton);

  await waitFor(() => {
    const result = screen.getByText("hello");
    expect(result).toBeVisible();
  });
});

it("user can search for 'test' and see the result", async () => {
  const searchBar = screen.getByRole("textbox");
  await userEvent.type(searchBar, "test");

  const searchButton = screen.getByText("Search", { selector: "button" });
  await userEvent.click(searchButton);

  await waitFor(() => {
    const result = screen.getByText("test");
    expect(result).toBeVisible();
  });
});

it("user can search for 'fantabulous' and see the result", async () => {
  const searchBar = screen.getByRole("textbox");
  await userEvent.type(searchBar, "fantabulous");

  const searchButton = screen.getByText("Search", { selector: "button" });
  await userEvent.click(searchButton);

  await waitFor(() => {
    const result = screen.getByText("fantabulous", { selector: "h1" });
    expect(result).toBeVisible();
  });
});

it("should display an error message if the user searches for an empty string", async () => {
  const searchBar = screen.getByRole("textbox");
  await user.type(searchBar, " ");

  const searchButton = screen.getByText("Search", { selector: "button" });
  await user.click(searchButton);

  await waitFor(() => {
    const result = screen.getByText("Please enter a word.");
    expect(result).toBeVisible();
  });
});
