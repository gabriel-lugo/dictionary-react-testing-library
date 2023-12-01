import { useContext } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import FavoriteWords from "./components/Word/FavoriteWords";
import Word from "./components/Word/Word";
import { CurrentWordContext } from "./contexts/CurrentWordContext";
import "./css/global.css";
import { useWordDataApi } from "./hooks/api";

function App() {
  // Using a custom hook to manage API data fetching
  const {
    wordData,
    loading,
    error,
    searchQuery,
    fetchWordData,
    setError,
    setWordData,
  } = useWordDataApi();

  // Accessing the currentWord context to manage the current word state
  const { currentWord, resetWord } = useContext(CurrentWordContext);

  // Handling the search functionality
  async function handleSearch(searchTerm: string) {
    if (searchTerm.trim() === "") {
      // Displaying an error if the search term is empty
      setError("Please enter a word.");
      setWordData(null);
    } else {
      // Clearing errors and fetching word data
      setError("");
      await fetchWordData(searchTerm);
      resetWord(); // Resetting the current word
    }
  }

  return (
    <>
      <Header />
      <main>
        <SearchBar onSearch={handleSearch} />
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {!wordData && !loading && searchQuery === "" && (
          <p>Use the search bar to search for a word.</p>
        )}
        {currentWord ? (
          <Word wordData={currentWord} />
        ) : (
          <>
            {wordData && <Word wordData={wordData} />}
            {!wordData && searchQuery !== "" && !error && (
              <p>No match found for "{searchQuery}".</p>
            )}
          </>
        )}
        <FavoriteWords />
      </main>
    </>
  );
}

export default App;
