import { useState } from "react";
import "../../css/Header.css";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);

    const rootElement = document.documentElement;
    rootElement.setAttribute("data-theme", isDarkMode ? "light" : "dark");
  };

  return (
    <header>
      <div className="header-content">
        <h1>Dictionary</h1>
        <button className="toggle-mode" onClick={toggleDarkMode}>
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
