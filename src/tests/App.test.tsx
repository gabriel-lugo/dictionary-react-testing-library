import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App from "../App";
import { CurrentWordProvider } from "../contexts/CurrentWordContext";
import { FavoriteWordsProvider } from "../contexts/FavoriteWordsContext";

const user = userEvent.setup();

const setupApp = () => {
  render(
    <React.StrictMode>
      <CurrentWordProvider>
        <FavoriteWordsProvider>
          <App />
        </FavoriteWordsProvider>
      </CurrentWordProvider>
    </React.StrictMode>
  );
};

const performSearch = async (word: string) => {
  const searchBar = screen.getByRole("textbox");

  await user.type(searchBar, word);

  const searchButton = screen.getByText("Search", { selector: "button" });

  await user.click(searchButton);

  const result = await screen.findByText(word, { selector: "h1" });

  expect(result).toBeInTheDocument();

  await waitFor(() => {
    const loadingElement = screen.queryByText("Loading...");

    expect(loadingElement).not.toBeInTheDocument();
  });
};

describe("Rendering and basic interactions", () => {
  it("should render the header", () => {
    setupApp();

    const header = screen.getByText("Dictionary", { selector: "h1" });

    expect(header).toBeInTheDocument();
  });

  it("should render the search bar", () => {
    setupApp();

    const searchBar = screen.getByRole("textbox");

    expect(searchBar).toBeInTheDocument();
  });

  it("should render the search button", () => {
    setupApp();

    const searchButton = screen.getByText("Search", { selector: "button" });

    expect(searchButton).toBeInTheDocument();
  });

  it("should allow the user to type in the search bar", async () => {
    setupApp();

    const searchTerm = "test";

    const searchBar = screen.getByRole("textbox");

    expect(searchBar).toHaveValue("");

    await user.click(searchBar);

    await user.type(searchBar, searchTerm);

    expect(searchBar).toHaveValue(searchTerm);
  });
});

describe("Search functionality", () => {
  it("should allow the user to search for a word and see the result", async () => {
    setupApp();

    await performSearch("fantabulous");
  });

  it("should allow the user to search by pressing Enter", async () => {
    setupApp();

    const searchTerm = "hello";

    const searchBar = screen.getByRole("textbox");

    expect(searchBar).toHaveValue("");

    await user.type(searchBar, `${searchTerm}{enter}`);

    const result = await screen.findByText(searchTerm, { selector: "h1" });

    expect(result).toBeInTheDocument();

    await waitFor(() => {
      const loadingElement = screen.queryByText("Loading...");

      expect(loadingElement).not.toBeInTheDocument();
    });
  });
});

describe("Displaying results and error messages", () => {
  it("should display an error message if the user searches for an empty string", async () => {
    setupApp();

    const searchBar = screen.getByRole("textbox");

    await user.type(searchBar, " ");

    const searchButton = screen.getByText("Search", { selector: "button" });

    await user.click(searchButton);

    const result = await screen.findByText("Please enter a word.");

    expect(result).toBeInTheDocument();
  });

  it("should display 'No match found for word' if the word is not found", async () => {
    setupApp();

    const searchBar = screen.getByRole("textbox");

    await user.type(searchBar, "asdf");

    const searchButton = screen.getByText("Search", { selector: "button" });

    await user.click(searchButton);

    const result = await screen.findByText('No match found for "asdf".');

    expect(result).toBeInTheDocument();
  });

  it("should display 'No example available' if the word has no example", async () => {
    setupApp();

    await performSearch("hello");

    const exampleElement = screen.getByText("No example available", {
      selector: ".not-available",
    });

    expect(exampleElement).toBeInTheDocument();
  });

  it("should display 'No example available' if the word has no example", async () => {
    setupApp();

    await performSearch("hello");

    const exampleElement = screen.getByText("No example available", {
      selector: ".not-available",
    });

    expect(exampleElement).toBeInTheDocument();
  });

  it("should allow the user to play audio if present", async () => {
    setupApp();

    await performSearch("hello");

    const audioElement = screen.getByTitle("audio example");

    expect(audioElement).toBeInTheDocument();
  });

  it("should display 'No audio available' if the word has no audio", async () => {
    setupApp();

    await performSearch("fantabulous");

    const audioElement = document.querySelector("audio");

    const noAudioMessage = screen.getByText("No audio available", {
      selector: ".not-available",
    });

    expect(audioElement).not.toBeInTheDocument();

    expect(noAudioMessage).toBeInTheDocument();
  });
});

describe("Interaction with Favorite Words", () => {
  it("should display 'No favorites yet' if there are no favorites", async () => {
    setupApp();

    const favoriteWordsHeading = screen.getByText("Favorite Words", {
      selector: "h2",
    });

    expect(favoriteWordsHeading).toBeInTheDocument();

    const noFavoritesMessage = screen.getByText("No favorites yet");

    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it("should allow the user to add a word to favorites", async () => {
    setupApp();

    await performSearch("hello");

    const saveButton = screen.getByText("Save", { selector: "button" });

    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    const favoriteWordsHeading = screen.getByText("Favorite Words", {
      selector: "h2",
    });

    expect(favoriteWordsHeading).toBeInTheDocument();

    const favoriteWord = screen.getByText("hello", { selector: "h3" });

    expect(favoriteWord).toBeInTheDocument();
  });

  it("should display 'Saved' if the word is already saved", async () => {
    setupApp();

    await performSearch("hello");

    const saveButton = screen.getByText("Save", { selector: "button" });

    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    const favoriteWordsHeading = screen.getByText("Favorite Words", {
      selector: "h2",
    });

    expect(favoriteWordsHeading).toBeInTheDocument();

    const favoriteWord = screen.getByText("hello", { selector: "h3" });

    expect(favoriteWord).toBeInTheDocument();

    const saveButtonAfterSave = screen.getByText("Saved", {
      selector: "button",
    });

    expect(saveButtonAfterSave).toBeInTheDocument();
  });

  it("should show the saved word when the user clicks on it", async () => {
    setupApp();

    await performSearch("hello");

    const saveButton = screen.getByText("Save", { selector: "button" });

    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    const favoriteWordsHeading = screen.getByText("Favorite Words", {
      selector: "h2",
    });

    expect(favoriteWordsHeading).toBeInTheDocument();

    const favoriteWord = screen.getByText("hello", { selector: "h3" });

    expect(favoriteWord).toBeInTheDocument();

    await performSearch("test");

    await user.click(favoriteWord);

    const result = screen.getByText("hello", { selector: "h1" });

    expect(result).toBeInTheDocument();
  });

  it("should allow the user to remove a word from favorites", async () => {
    setupApp();

    await performSearch("hello");

    const saveButton = screen.getByText("Save", { selector: "button" });

    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    const favoriteWordsHeading = screen.getByText("Favorite Words", {
      selector: "h2",
    });

    expect(favoriteWordsHeading).toBeInTheDocument();

    const favoriteWord = screen.getByText("hello", { selector: "h3" });

    expect(favoriteWord).toBeInTheDocument();

    const removeButton = screen.getByText("Remove", { selector: "button" });

    expect(removeButton).toBeInTheDocument();

    await user.click(removeButton);

    const noFavoritesMessage = screen.getByText("No favorites yet");

    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it("should persist saved word after searching another word", async () => {
    setupApp();

    await performSearch("hello");

    const saveButton = screen.getByText("Save", { selector: "button" });

    expect(saveButton).toBeInTheDocument();

    await user.click(saveButton);

    const savedButton = await screen.findByText("Saved", {
      selector: "button",
    });

    expect(savedButton).toBeInTheDocument();

    await performSearch("test");

    await performSearch("hello");

    const savedButtonAfterSearch = await screen.findByText("Saved", {
      selector: "button",
    });

    expect(savedButtonAfterSearch).toBeInTheDocument();
  });
});

describe("Dark mode toggling", () => {
  it("should toggle dark mode", async () => {
    setupApp();

    const darkModeButton = screen.getByTitle("Toggle Dark or Light Mode");

    expect(darkModeButton).toBeInTheDocument();

    await user.click(darkModeButton);

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
