interface SourceUrlsContainerProps {
  sourceUrls: string[];
}

function SourceUrlsContainer({ sourceUrls }: SourceUrlsContainerProps) {
  return (
    <div className="source-urls-container">
      <h3>Source URLs</h3>
      {sourceUrls.map((url, index) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      ))}
    </div>
  );
}

export default SourceUrlsContainer;
