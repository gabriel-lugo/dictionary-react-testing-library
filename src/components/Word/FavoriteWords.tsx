import { useEffect, useState } from "react";
import { WordData } from "../../App";

interface FavoriteWordsProps {
  favoriteWords: string[];
  onSelectWord: (selectedWordData: WordData | null) => void;
}

function FavoriteWords({ favoriteWords, onSelectWord }: FavoriteWordsProps) {
  const [wordsData, setWordsData] = useState<WordData[]>([]);

  useEffect(() => {
    const updatedWordsData = favoriteWords.map((word) =>
      JSON.parse(sessionStorage.getItem(word)!)
    );
    setWordsData(updatedWordsData);
  }, [favoriteWords]);

  return (
    <div>
      <h2>Favorite Words</h2>
      {wordsData.length === 0 ? (
        <p>No favorite words yet.</p>
      ) : (
        <ul>
          {wordsData.map((wordData, index) => (
            <li key={index}>
              <button onClick={() => onSelectWord(wordData)}>
                {wordData.word}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteWords;
