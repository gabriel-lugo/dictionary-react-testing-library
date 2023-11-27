import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Word from "./components/Word";
import "./css/global.css";

function App() {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchWordData = async (word: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWordData(data[0]);
      setError("");
      setSearchQuery(word);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordData(null);
      setError("Error fetching word data. Please try again.");
      setSearchQuery(word);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setError("Please enter a word.");
    } else {
      setError("");
      fetchWordData(searchTerm);
    }
  };

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
        {wordData && <Word wordData={wordData} />}
        {!wordData && searchQuery !== "" && !error && (
          <p>No match found for "{searchQuery}".</p>
        )}
      </main>
    </>
  );
}

export default App;
