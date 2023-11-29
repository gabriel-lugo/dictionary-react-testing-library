import { useState } from "react";
import { WordData } from "../types/types";

export const useWordDataApi = () => {
  const [wordData, setWordDataState] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchWordData = async (word: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWordDataState(data[0]);
      setErrorState("");
      setSearchQuery(word);
    } catch (error) {
      console.error("Error fetching word data:", error);
      setWordDataState(null);
      setErrorState("Error fetching word data. Please try again.");
      setSearchQuery(word);
    } finally {
      setLoading(false);
    }
  };

  const setError = (errorMessage: string) => {
    setErrorState(errorMessage);
  };

  const setWordData = (data: WordData | null) => {
    setWordDataState(data);
  };

  return {
    wordData,
    loading,
    error,
    searchQuery,
    fetchWordData,
    setError,
    setWordData,
  };
};
