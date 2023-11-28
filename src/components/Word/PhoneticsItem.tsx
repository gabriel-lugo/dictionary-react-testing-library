interface PhoneticsItemProps {
  text: string;
  sourceUrl?: string;
  audio?: string;
}

function PhoneticsItem({ text, sourceUrl, audio }: PhoneticsItemProps) {
  return (
    <div className="phonetic-item">
      {sourceUrl ? (
        <p>
          <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        </p>
      ) : (
        <p>{text}</p>
      )}
      {audio ? (
        <audio controls src={audio} />
      ) : (
        <p className="not-available">No audio available</p>
      )}
    </div>
  );
}

export default PhoneticsItem;
