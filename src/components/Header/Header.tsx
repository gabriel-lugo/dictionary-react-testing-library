import { useState } from "react";
import "../../css/Header.css";

function Header() {
  // State to track whether the page is in dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Handler for toggling dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);

    // Set the data-theme attribute on the root element to "light" or "dark"
    const rootElement = document.documentElement;
    rootElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <header>
      <div className="header-content">
        <h1>Dictionary</h1>
        <button
          className="toggle-mode"
          onClick={toggleDarkMode}
          title="Toggle Dark or Light Mode"
        >
          {isDarkMode ? (
            <i className="fa-regular fa-sun"></i>
          ) : (
            <i className="fa-regular fa-moon"></i>
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
