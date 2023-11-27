import React from "react";
import "../css/Word.css";

interface WordProps {
  wordData: {
    word: string;
    phonetics: {
      text: string;
      audio: string;
    }[];
    meanings: {
      partOfSpeech: string;
      definitions: {
        definition: string;
        synonyms: string[];
        antonyms: string[];
        example?: string;
      }[];
    }[];
    license: {
      name: string;
      url: string;
    };
    sourceUrls: string[];
  };
}

const Word: React.FC<WordProps> = ({ wordData }) => {
  return (
    <div className="word-container">
      <h1>{wordData.word}</h1>

      <div className="phonetics-container">
        <h2>Phonetics</h2>
        {wordData.phonetics.map((phonetic, index) => (
          <div key={index} className="phonetic-item">
            <p>{phonetic.text}</p>
            {phonetic.audio && <audio controls src={phonetic.audio} />}
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
                {definition.example && (
                  <p>
                    <strong>Example:</strong> {definition.example}
                  </p>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="license-container">
        <h2>License</h2>
        <p>
          <strong>Name:</strong> {wordData.license.name}
        </p>
        <p>
          <strong>URL:</strong> {wordData.license.url}
        </p>
      </div>

      <div className="source-urls-container">
        <h2>Source URLs</h2>
        {wordData.sourceUrls.map((url, index) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Word;
