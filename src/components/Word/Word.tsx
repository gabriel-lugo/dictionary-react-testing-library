import { useEffect, useState } from "react";
import { useFavoriteWords } from "../../contexts/FavoriteWordsContext";
import "../../css/Word.css";
import { WordData } from "../../types/types";
import LicenseContainer from "./LicenseContainer";
import MeaningItem from "./MeaningItem";
import PhoneticsItem from "./PhoneticsItem";
import SourceUrlsContainer from "./SourceUrlsContainer";
import WordHeader from "./WordHeader";

interface WordProps {
  wordData: WordData;
}

function Word({ wordData }: WordProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Custom hook to manage favorite words
  const { favoriteWords, addFavoriteWord } = useFavoriteWords();

  // Effect to update 'isSaved' when favoriteWords or wordData.word changes
  useEffect(() => {
    const isAlreadySaved =
      Array.isArray(favoriteWords) &&
      favoriteWords.some((savedWord) => savedWord.word === wordData.word);
    setIsSaved(isAlreadySaved);
  }, [wordData.word, favoriteWords]);

  // Handler for saving a word to favorite words
  const handleSaveClick = () => {
    if (!isSaved) {
      addFavoriteWord(wordData);
      setIsSaved(true);
    }
  };

  return (
    <div className="word-container">
      <WordHeader word={wordData.word} />
      <button onClick={handleSaveClick} disabled={isSaved}>
        {isSaved ? "Saved" : "Save"}
      </button>
      <div className="phonetics-container">
        <h2>Phonetics</h2>
        {wordData.phonetics.map((phonetic, index) => (
          <PhoneticsItem key={index} {...phonetic} />
        ))}
      </div>
      <div className="meanings-container">
        <h2>Meanings</h2>
        {wordData.meanings.map((meaning, index) => (
          <MeaningItem key={index} {...meaning} />
        ))}
      </div>
      <div className="bottom-container">
        <SourceUrlsContainer sourceUrls={wordData.sourceUrls} />
        <LicenseContainer
          name={wordData.license.name}
          url={wordData.license.url}
        />
      </div>
    </div>
  );
}

export default Word;
