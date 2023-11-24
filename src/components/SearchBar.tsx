import "../css/SearchBar.css";

function SearchBar() {
  return (
    <div className="search-bar-container">
      <input type="text" placeholder="Search..." />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;
