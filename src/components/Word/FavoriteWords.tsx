import { useCurrentWord } from "../../contexts/CurrentWordContext";
import { useFavoriteWords } from "../../contexts/FavoriteWordsContext";
import "../../css/FavoriteWords.css";
import { WordData } from "../../types/types";

function FavoriteWords() {
  const { favoriteWords, removeFavoriteWord } = useFavoriteWords();
  const { setWord } = useCurrentWord();

  const handleRemoveClick = (word: WordData) => {
    removeFavoriteWord(word);
  };

  const handleWordClick = (word: WordData) => {
    setWord(word);
  };

  return (
    <div className="favorite-words-container">
      <h2 className="favorite-words-heading">Favorite Words</h2>
      {Array.isArray(favoriteWords) && favoriteWords.length > 0 ? (
        <ul className="favorite-words-list">
          {favoriteWords.map((word: WordData) => (
            <li key={word.word} className="favorite-words-item">
              <h3
                onClick={() => handleWordClick(word)}
                className="clickable-word"
              >
                {word.word}
              </h3>
              <button
                onClick={() => handleRemoveClick(word)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-favorites-message">No favorites yet</p>
      )}
    </div>
  );
}

export default FavoriteWords;
