import { WordData } from "../App";
import "../css/Word.css";

interface WordProps {
  wordData: WordData;
}

function Word({ wordData }: WordProps) {
  return (
    <div className="word-container">
      <h1>{wordData.word}</h1>

      <div className="phonetics-container">
        <h2>Phonetics</h2>
        {wordData.phonetics.map((phonetic, index) => (
          <div key={index} className="phonetic-item">
            {phonetic.sourceUrl ? (
              <p>
                <a href={phonetic.sourceUrl} target="_blank">
                  {phonetic.text}
                </a>
              </p>
            ) : (
              <p>{phonetic.text}</p>
            )}
            {phonetic.audio ? (
              <audio controls src={phonetic.audio} />
            ) : (
              <p className="not-available">No audio available</p>
            )}
          </div>
        ))}
      </div>

      <div className="meanings-container">
        <h2>Meanings</h2>
        {wordData.meanings.map((meaning, index) => (
          <div key={index} className="meaning-item">
            <h3>{meaning.partOfSpeech}</h3>
            {meaning.definitions.map((definition, index) => (
              <div key={index} className="definition-item">
                <p>{definition.definition}</p>
                {definition.synonyms.length > 0 && (
                  <p>
                    <strong>Synonyms:</strong> {definition.synonyms.join(", ")}
                  </p>
                )}
                {definition.antonyms.length > 0 && (
                  <p>
                    <strong>Antonyms:</strong> {definition.antonyms.join(", ")}
                  </p>
                )}
                {definition.example ? (
                  <p>
                    <strong>Example:</strong> "{definition.example}"
                  </p>
                ) : (
                  <p className="not-available">No example available</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="bottom-container">
        <div className="source-urls-container">
          <h3>Source URLs</h3>
          {wordData.sourceUrls.map((url, index) => (
            <a key={index} href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          ))}
        </div>

        <div className="license-container">
          <h3>License</h3>
          <p>
            <strong>Name:</strong> {wordData.license.name}
          </p>
          <p>
            <strong>URL:</strong> {wordData.license.url}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Word;
