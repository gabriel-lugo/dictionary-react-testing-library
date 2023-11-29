import { WordData } from "../types/types";

const wordData: WordData[] = [
  {
    word: "hello",
    phonetics: [
      {
        text: "/həˈləʊ/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9021983",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: '"Hello!" or an equivalent greeting.',
            synonyms: ["greeting"],
            antonyms: [],
          },
        ],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/hello"],
  },
  {
    word: "test",
    phonetics: [
      {
        text: "/test/",
        audio:
          "https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9014228",
        license: {
          name: "BY 3.0 US",
          url: "https://creativecommons.org/licenses/by/3.0/us",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "noun",
        definitions: [
          {
            definition: "A challenge, trial.",
            synonyms: ["examination", "quiz"],
            antonyms: ["recess"],
          },
        ],
      },
    ],
    license: {
      name: "CC BY-SA 3.0",
      url: "https://creativecommons.org/licenses/by-sa/3.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/test"],
  },
  {
    word: "fantabulous",
    phonetics: [
      {
        text: "/fænˈtæbjʊləs/",
        audio: "https://example.com/fantabulous-audio.mp3",
        sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=123456",
        license: {
          name: "CC BY 3.0",
          url: "https://creativecommons.org/licenses/by/3.0",
        },
      },
    ],
    meanings: [
      {
        partOfSpeech: "adjective",
        definitions: [
          {
            definition:
              "A blend of fantastic and fabulous, used to describe something exceptionally wonderful or amazing.",
            synonyms: ["amazing", "wonderful"],
            antonyms: ["ordinary", "mediocre"],
          },
        ],
      },
    ],
    license: {
      name: "CC BY-SA 4.0",
      url: "https://creativecommons.org/licenses/by-sa/4.0",
    },
    sourceUrls: ["https://en.wiktionary.org/wiki/fantabulous"],
  },
];

export default wordData;
