import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

const user = userEvent.setup();

beforeEach(() => {
  render(<App />);
});

const performSearch = async (word: string) => {
  const searchBar = screen.getByRole("textbox");
  await user.type(searchBar, word);

  const searchButton = screen.getByText("Search", { selector: "button" });
  await user.click(searchButton);

  await waitFor(() => {
    const result = screen.getByText(word, { selector: "h1" });
    expect(result).toBeVisible();
  });
};

it("should render the header", () => {
  const header = screen.getByRole("heading");
  expect(header).toBeVisible();
});

it("should render the search bar", () => {
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toBeVisible();
});

it("should render the search button", () => {
  const searchButton = screen.getByText("Search", { selector: "button" });
  expect(searchButton).toBeVisible();
});

it("should allow the user to type in the search bar", async () => {
  const searchTerm = "test";
  const searchBar = screen.getByRole("textbox");
  expect(searchBar).toHaveValue("");
  await user.click(searchBar);
  await user.type(searchBar, searchTerm);
  expect(searchBar).toHaveValue(searchTerm);
});

it("should allow the user to search for 'hello' and see the result", async () => {
  await performSearch("hello");
});

it("should allow the user to search for 'test' and see the result", async () => {
  await performSearch("test");
});

it("should allow the user to search for 'fantabulous' and see the result", async () => {
  await performSearch("fantabulous");
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

it("should allow the user to play audio if present", async () => {
  await performSearch("hello");

  const audioElement = document.querySelector("audio");

  expect(audioElement).toBeInTheDocument();

  if (audioElement) {
    userEvent.click(audioElement);
    expect(audioElement).toHaveAttribute("controls");
  } else {
    console.warn("No audio element found.");
  }
});

it("should toggle dark mode", async () => {
  const darkModeButton = screen.getByTitle("Toggle Dark or Light Mode");
  expect(darkModeButton).toBeInTheDocument();

  await user.click(darkModeButton);

  expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
});
