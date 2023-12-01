import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { WordData } from "../types/types";

interface FavoriteWordsContextValue {
  favoriteWords: WordData[];
  addFavoriteWord: (word: WordData) => void;
  removeFavoriteWord: (word: WordData) => void;
}

export const FavoriteWordsContext = createContext<FavoriteWordsContextValue>(
  {} as FavoriteWordsContextValue
);

interface FavoriteWordsProviderProps {
  children: ReactNode;
}

export function FavoriteWordsProvider({
  children,
}: FavoriteWordsProviderProps) {
  const [favoriteWords, setFavoriteWords] = useState<WordData[]>(() => {
    const savedWordsString = sessionStorage.getItem("favoriteWords");
    return savedWordsString ? JSON.parse(savedWordsString) : [];
  });

  const addFavoriteWord = (word: WordData) => {
    setFavoriteWords((prevWords) => [...prevWords, word]);
  };

  const removeFavoriteWord = (word: WordData) => {
    setFavoriteWords((prevWords) =>
      prevWords.filter((favWord) => favWord.word !== word.word)
    );
  };

  // Save to sessionStorage when favoriteWords changes
  useEffect(() => {
    sessionStorage.setItem("favoriteWords", JSON.stringify(favoriteWords));
  }, [favoriteWords]);

  return (
    <FavoriteWordsContext.Provider
      value={{ favoriteWords, addFavoriteWord, removeFavoriteWord }}
    >
      {children}
    </FavoriteWordsContext.Provider>
  );
}

export const useFavoriteWords = () => {
  return useContext(FavoriteWordsContext);
};
