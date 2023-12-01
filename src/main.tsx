import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { CurrentWordProvider } from "./contexts/CurrentWordContext.tsx";
import { FavoriteWordsProvider } from "./contexts/FavoriteWordsContext.tsx";
import "./css/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CurrentWordProvider>
      <FavoriteWordsProvider>
        <App />
      </FavoriteWordsProvider>
    </CurrentWordProvider>
  </React.StrictMode>
);
