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
    <div>
      <h1>{wordData.word}</h1>

      <div>
        <h2>Phonetics</h2>
        {wordData.phonetics.map((phonetic, index) => (
          <div key={index}>
            <p>{phonetic.text}</p>
            {phonetic.audio && <audio controls src={phonetic.audio} />}
          </div>
        ))}
      </div>

      <div>
        <h2>Meanings</h2>
        {wordData.meanings.map((meaning, index) => (
          <div key={index}>
            <h3>{meaning.partOfSpeech}</h3>
            {meaning.definitions.map((definition, index) => (
              <div key={index}>
                <p>{definition.definition}</p>
                {definition.synonyms.length > 0 && (
                  <p>Synonyms: {definition.synonyms.join(", ")}</p>
                )}
                {definition.antonyms.length > 0 && (
                  <p>Antonyms: {definition.antonyms.join(", ")}</p>
                )}
                {definition.example && <p>Example: {definition.example}</p>}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div>
        <h2>License</h2>
        <p>Name: {wordData.license.name}</p>
        <p>URL: {wordData.license.url}</p>
      </div>

      <div>
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
