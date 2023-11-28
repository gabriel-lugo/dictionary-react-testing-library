interface WordHeaderProps {
  word: string;
}

function WordHeader({ word }: WordHeaderProps) {
  return <h1>{word}</h1>;
}

export default WordHeader;
