import { useEffect } from "react";
import { WordData } from "../types/types";

export const saveWord = (
  savedWordData: WordData,
  setIsSaved: (value: boolean) => void
) => {
  const savedWordsString = sessionStorage.getItem("savedWords");
  const savedWords = savedWordsString ? JSON.parse(savedWordsString) : [];

  const isAlreadySaved = savedWords.some(
    (savedWord: WordData) => savedWord.word === savedWordData.word
  );

  if (!isAlreadySaved) {
    const updatedSavedWords = [...savedWords, savedWordData];
    sessionStorage.setItem("savedWords", JSON.stringify(updatedSavedWords));
    setIsSaved(true);
    return true;
  }

  return false;
};

export const useSavedStatus = (
  savedWordData: WordData,
  setIsSaved: (value: boolean) => void
) => {
  useEffect(() => {
    const savedWordsString = sessionStorage.getItem("savedWords");
    const savedWords = savedWordsString ? JSON.parse(savedWordsString) : [];

    const isAlreadySaved = savedWords.some(
      (savedWord: WordData) => savedWord.word === savedWordData.word
    );

    setIsSaved(isAlreadySaved);
  }, [setIsSaved, savedWordData.word]);
};
