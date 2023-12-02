interface MeaningItemProps {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
  }[];
}

function MeaningItem({ partOfSpeech, definitions }: MeaningItemProps) {
  // Only show the first 5 definitions
  const slicedDefinitions = definitions.slice(0, 5);

  return (
    <div className="meaning-item">
      <h3>{partOfSpeech}</h3>
      {slicedDefinitions.map((definition, index) => (
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
  );
}

export default MeaningItem;
