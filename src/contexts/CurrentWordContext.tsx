import { createContext, ReactNode, useContext, useState } from "react";
import { WordData } from "../types/types";

interface CurrentWordContextValue {
  currentWord: WordData | null;
  setWord: (word: WordData | null) => void;
  resetWord: () => void;
}

export const CurrentWordContext = createContext<CurrentWordContextValue>(
  {} as CurrentWordContextValue
);

interface CurrentWordProviderProps {
  children: ReactNode;
}

export function CurrentWordProvider({ children }: CurrentWordProviderProps) {
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);

  const setWord = (word: WordData | null) => {
    setCurrentWord(word);
  };

  const resetWord = () => {
    setCurrentWord(null);
  };

  return (
    <CurrentWordContext.Provider value={{ currentWord, setWord, resetWord }}>
      {children}
    </CurrentWordContext.Provider>
  );
}

export const useCurrentWord = () => {
  return useContext(CurrentWordContext);
};
