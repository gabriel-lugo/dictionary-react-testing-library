import { ChangeEvent, FormEvent, useState } from "react";
import "../../css/SearchBar.css";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  // Using state to manage the search term
  const [searchTerm, setSearchTerm] = useState("");

  // Handler for updating the search term
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handler for submitting the search term
  const handleSearch = () => {
    onSearch(searchTerm);
    setSearchTerm("");
  };

  // Handler for submitting the form
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
