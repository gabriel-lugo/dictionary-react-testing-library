import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Word from "./components/Word/Word";
import "./css/global.css";
import { useWordDataApi } from "./utils/api";

function App() {
  const {
    wordData,
    loading,
    error,
    searchQuery,
    fetchWordData,
    setError,
    setWordData,
  } = useWordDataApi();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim() === "") {
      setError("Please enter a word.");
      setWordData(null);
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
