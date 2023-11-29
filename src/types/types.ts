export interface WordData {
  word: string;
  phonetics: {
    text: string;
    audio: string;
    license?: { name: string; url: string };
    sourceUrl?: string;
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
  license: { name: string; url: string };
  sourceUrls: string[];
}
