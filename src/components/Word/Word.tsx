import { WordData } from "../../App";
import "../../css/Word.css";
import LicenseContainer from "./LicenseContainer";
import MeaningItem from "./MeaningItem";
import PhoneticsItem from "./PhoneticsItem";
import SourceUrlsContainer from "./SourceUrlsContainer";
import WordHeader from "./WordHeader";

interface WordProps {
  wordData: WordData;
}

function Word({ wordData }: WordProps) {
  return (
    <div className="word-container">
      <WordHeader word={wordData.word} />

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
