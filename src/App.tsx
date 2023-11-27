import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Word from "./components/Word";

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
    fetchWordData(searchTerm);
  };

  return (
    <>
      <Header />
      <SearchBar onSearch={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {wordData ? (
        <Word wordData={wordData} />
      ) : (
        <p>No match found for the search query "{searchQuery}".</p>
      )}
    </>
  );
}

export default App;
